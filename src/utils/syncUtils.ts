import { SyncConfig, TrackerState } from '../types';

const GIST_FILENAME = 'gate-2027-prep-tracker-state.json';
const SYNC_CONFIG_STORAGE_KEY = 'gate2027_sync_config_v1';
export const DEFAULT_CLOUD_GIST_ID = 'ef705b7841a16ed5a129699ce3ab10f9';

export function loadSyncConfig(): SyncConfig {
  try {
    const params = new URLSearchParams(window.location.search);
    const urlGist = params.get('gist');

    const raw = localStorage.getItem(SYNC_CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as SyncConfig;
      return {
        ...parsed,
        gistId: urlGist || parsed.gistId || DEFAULT_CLOUD_GIST_ID,
      };
    }
    return {
      gistId: urlGist || DEFAULT_CLOUD_GIST_ID,
      githubToken: '',
      autoSync: true,
      syncStatus: 'local_only',
    };
  } catch {
    return {
      gistId: DEFAULT_CLOUD_GIST_ID,
      githubToken: '',
      autoSync: true,
      syncStatus: 'local_only',
    };
  }
}

export function saveSyncConfig(config: SyncConfig): void {
  try {
    localStorage.setItem(SYNC_CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}

export async function pushStateToGitHubGist(
  state: TrackerState,
  token: string,
  existingGistId?: string
): Promise<{ gistId: string; htmlUrl: string; updatedAt: string }> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token.trim()}`,
    'Content-Type': 'application/json',
  };

  const payload = {
    description: `GATE 2027 RA & DA Prep Tracker State (@SyamP) — Updated ${new Date().toISOString()}`,
    public: false,
    files: {
      [GIST_FILENAME]: {
        content: JSON.stringify(state, null, 2),
      },
    },
  };

  const targetGistId = existingGistId?.trim() || DEFAULT_CLOUD_GIST_ID;
  const url = targetGistId
    ? `https://api.github.com/gists/${targetGistId}`
    : 'https://api.github.com/gists';

  const method = targetGistId ? 'PATCH' : 'POST';

  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub Gist Sync Failed (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return {
    gistId: data.id,
    htmlUrl: data.html_url,
    updatedAt: data.updated_at || new Date().toISOString(),
  };
}

export async function pullStateFromGitHubGist(
  gistId: string,
  token?: string
): Promise<TrackerState> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };
  if (token?.trim()) {
    headers.Authorization = `Bearer ${token.trim()}`;
  }

  const res = await fetch(`https://api.github.com/gists/${gistId.trim()}`, {
    method: 'GET',
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch Gist (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const fileObj =
    data.files?.[GIST_FILENAME] ||
    (Object.values(data.files || {})[0] as { content?: string } | undefined);

  if (!fileObj || !fileObj.content) {
    throw new Error(`No valid tracker state JSON found in Gist ${gistId}`);
  }

  const parsed = JSON.parse(fileObj.content) as TrackerState;
  if (!parsed.topics || !Array.isArray(parsed.topics)) {
    throw new Error('Gist is initialized but no full state has been pushed yet.');
  }
  return parsed;
}

export function calculateNextReviewDate(
  fromDateISO: string,
  confidence: 0 | 1 | 2 | 3 | 4 | 5
): string | undefined {
  if (confidence === 0) return undefined;
  const d = new Date(fromDateISO);
  // Per Session Handoff README:
  // "Review intervals: topics resurface after 5 days at low confidence, 10 at medium and 21 at high."
  const daysToAdd = confidence <= 2 ? 5 : confidence === 3 ? 10 : 21;
  d.setDate(d.getDate() + daysToAdd);
  return d.toISOString().slice(0, 10);
}
