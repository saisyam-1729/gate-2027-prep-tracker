import React, { useState } from 'react';
import { ROADMAP_PHASES } from '../data/initialData';
import { SyncConfig, TrackerState } from '../types';
import {
  DEFAULT_CALENDAR_EMAIL,
  GITHUB_PROFILE_URL,
  GITHUB_REPO_URL,
  generateFullPrepICS,
  generateGoogleCalendarUrl,
} from '../utils/calendarUtils';
import {
  pullStateFromGitHubGist,
  pushStateToGitHubGist,
  saveSyncConfig,
} from '../utils/syncUtils';
import {
  Calendar,
  Cloud,
  Download,
  Upload,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  FileJson,
  Mail,
  Github,
} from 'lucide-react';

interface CalendarAndSyncViewProps {
  state: TrackerState;
  syncConfig: SyncConfig;
  onUpdateSyncConfig: (cfg: SyncConfig) => void;
  onRestoreState: (newState: TrackerState) => void;
}

export const CalendarAndSyncView: React.FC<CalendarAndSyncViewProps> = ({
  state,
  syncConfig,
  onUpdateSyncConfig,
  onRestoreState,
}) => {
  const [calendarEmail, setCalendarEmail] = useState(DEFAULT_CALENDAR_EMAIL);
  const [weekdayHour, setWeekdayHour] = useState(20); // 8:00 PM
  const [weekendHour, setWeekendHour] = useState(9); // 9:00 AM
  const [gistTokenInput, setGistTokenInput] = useState(syncConfig.githubToken || '');
  const [gistIdInput, setGistIdInput] = useState(
    syncConfig.gistId || 'ef705b7841a16ed5a129699ce3ab10f9'
  );
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedDeviceLink, setCopiedDeviceLink] = useState(false);

  const liveGitHubPagesUrl = `https://saisyam-1729.github.io/gate-2027-prep-tracker/?gist=${
    gistIdInput || 'ef705b7841a16ed5a129699ce3ab10f9'
  }`;
  const localLanUrl = `http://172.16.2.52:5173/?gist=${
    gistIdInput || 'ef705b7841a16ed5a129699ce3ab10f9'
  }`;
  const vercelImportUrl = `https://vercel.com/new/import?s=${encodeURIComponent(
    GITHUB_REPO_URL
  )}`;
  const gcalDirectImportSettingsUrl = `https://calendar.google.com/calendar/r/settings/export?authuser=${encodeURIComponent(
    calendarEmail
  )}`;
  const gcalOpenAccountUrl = `https://calendar.google.com/calendar/r?authuser=${encodeURIComponent(
    calendarEmail
  )}`;

  const handleDownloadICS = () => {
    const icsContent = generateFullPrepICS(
      state.topics,
      weekdayHour,
      weekendHour,
      calendarEmail
    );
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GATE-2027-RA-DA-Schedule-${calendarEmail.split('@')[0]}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gate-2027-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as TrackerState;
        if (parsed.topics && Array.isArray(parsed.topics)) {
          onRestoreState(parsed);
          setSyncMessage('Successfully imported tracker state from JSON backup!');
        } else {
          setSyncMessage('Error: Invalid tracker JSON structure.');
        }
      } catch (err) {
        setSyncMessage(
          `Error parsing JSON: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    };
    reader.readAsText(file);
  };

  const handlePushToGist = async () => {
    if (!gistTokenInput.trim()) {
      setSyncMessage(
        'Please enter a GitHub Personal Access Token (with "gist" scope) to push.'
      );
      return;
    }
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const res = await pushStateToGitHubGist(state, gistTokenInput, gistIdInput);
      const updatedCfg: SyncConfig = {
        ...syncConfig,
        githubToken: gistTokenInput.trim(),
        gistId: res.gistId,
        lastSyncedAt: res.updatedAt,
        syncStatus: 'synced',
      };
      setGistIdInput(res.gistId);
      saveSyncConfig(updatedCfg);
      onUpdateSyncConfig(updatedCfg);
      setSyncMessage(
        `Saved to Cloud Gist (${res.gistId}) under saisyam-1729! Any device opening your link will pull this state.`
      );
    } catch (err) {
      setSyncMessage(
        err instanceof Error ? err.message : 'Failed to push to GitHub Gist.'
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const handlePullFromGist = async () => {
    if (!gistIdInput.trim()) {
      setSyncMessage('Please enter your existing Gist ID to pull progress from cloud.');
      return;
    }
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const remoteState = await pullStateFromGitHubGist(gistIdInput, gistTokenInput);
      onRestoreState(remoteState);
      const updatedCfg: SyncConfig = {
        ...syncConfig,
        githubToken: gistTokenInput.trim(),
        gistId: gistIdInput.trim(),
        lastSyncedAt: new Date().toISOString(),
        syncStatus: 'synced',
      };
      saveSyncConfig(updatedCfg);
      onUpdateSyncConfig(updatedCfg);
      setSyncMessage('Successfully pulled latest progress from Cloud Gist!');
    } catch (err) {
      setSyncMessage(
        err instanceof Error ? err.message : 'Failed to pull from GitHub Gist.'
      );
    } finally {
      setIsSyncing(false);
    }
  };

  // Pre-built Google Calendar quick-add links routed directly to saisyam1441@gmail.com
  const satGCalUrl = generateGoogleCalendarUrl({
    title: '⚡ GATE 2027 Saturday Deep-Dive: 100% RA (Circuits / Robotics / Control)',
    details:
      'Block 1 (90m): NPTEL/Modern Robotics lectures + 15 problems.\nBlock 2 (90m): Problem solving.\nBlock 3 (60m): Next module.\nLast 15m: Update GATE 2027 Tracker & rate confidence (1-5).',
    dateStr: '2026-10-31',
    startHour: weekendHour,
    startMinute: 0,
    durationMinutes: 330,
    recurrenceRule: 'RRULE:FREQ=WEEKLY;BYDAY=SA;UNTIL=20270131T235959Z',
    calendarEmail,
  });

  const sunGCalUrl = generateGoogleCalendarUrl({
    title: '🧠 GATE 2027 Sunday Session: RA Core (3h) + DA Gap (1h) + Mixed Quiz (45m)',
    details:
      '1) Finish RA weekend module with problems (180m)\n2) Dedicated DA session: DBMS / Warehousing / Classical AI (60m)\n3) Mixed Quiz via Tracker or Claude/Gemini (45m)\n4) Log weekly hours (15m).',
    dateStr: '2026-11-01',
    startHour: weekendHour,
    startMinute: 0,
    durationMinutes: 330,
    recurrenceRule: 'RRULE:FREQ=WEEKLY;BYDAY=SU;UNTIL=20270131T235959Z',
    calendarEmail,
  });

  const weekdayGCalUrl = generateGoogleCalendarUrl({
    title: '🎯 GATE 2027 Weekday Study Slot (1h Problems + 45m Quiz/Review + 15m GA)',
    details:
      'Hour 1: New material or GATE proxy problems.\nHour 2: Topic quiz / mistake-notebook review + 15-min General Aptitude set.',
    dateStr: '2026-10-27',
    startHour: weekdayHour,
    startMinute: 0,
    durationMinutes: 120,
    recurrenceRule: 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;UNTIL=20270205T235959Z',
    calendarEmail,
  });

  const certMicroGCalUrl = generateGoogleCalendarUrl({
    title:
      '☁️ Low-Footprint Cert Micro-Sprint: Anthropic Claude CCA-F & Google Cloud PMLE (45m)',
    details:
      'Low-footprint certification micro-track (~1.5 hrs/week total across Wed & Sun):\n1) 25 mins: 1 CCA-F Task Statement (ccar-f.17labs.ai / Skilljar) OR 1 GCP PMLE Section (BigQuery ML / Feature Store / MLOps)\n2) 20 mins: 10 scenario practice questions (AndyTheFactory/gcp-pmle-quiz or CCA-F 12 Sample Qs).\nAutomatically pauses Jan 18, 2027 for 100% GATE Lock-in!',
    dateStr: '2026-10-28',
    startHour: 13,
    startMinute: 0,
    durationMinutes: 45,
    recurrenceRule: 'RRULE:FREQ=WEEKLY;BYDAY=WE,SU;UNTIL=20270117T235959Z',
    calendarEmail,
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Sync Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4" /> Calendar Sync ({calendarEmail})
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Synced to Your Google Calendar ({calendarEmail})
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Every Google Calendar link below includes{' '}
              <code className="text-indigo-300">authuser={calendarEmail}</code> so it routes
              directly to your personal Gmail calendar (even if you are signed into multiple
              accounts), and the Master <code className="text-indigo-300">.ics</code> file embeds
              15-minute native popup alarms (<code className="text-indigo-300">VALARM</code>) for{' '}
              <code className="text-indigo-300">{calendarEmail}</code>.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/70 border border-slate-800/80 rounded-lg p-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> Target Calendar Email Account
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={calendarEmail}
                  onChange={(e) => setCalendarEmail(e.target.value)}
                  className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white font-mono"
                />
                <a
                  href={gcalOpenAccountUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-indigo-300 flex items-center gap-1 shrink-0"
                >
                  Open GCal <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" /> Weekday Start (Mon–Fri)
                </label>
                <select
                  value={weekdayHour}
                  onChange={(e) => setWeekdayHour(Number(e.target.value))}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
                >
                  <option value={6}>6:00 AM – 8:00 AM</option>
                  <option value={7}>7:00 AM – 9:00 AM</option>
                  <option value={19}>7:00 PM – 9:00 PM</option>
                  <option value={20}>8:00 PM – 10:00 PM (Recommended)</option>
                  <option value={21}>9:00 PM – 11:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" /> Weekend Start (Sat–Sun)
                </label>
                <select
                  value={weekendHour}
                  onChange={(e) => setWeekendHour(Number(e.target.value))}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
                >
                  <option value={8}>8:00 AM – 1:30 PM</option>
                  <option value={9}>9:00 AM – 2:30 PM (Recommended)</option>
                  <option value={10}>10:00 AM – 3:30 PM</option>
                  <option value={14}>2:00 PM – 7:30 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={handleDownloadICS}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition"
            >
              <Download className="w-4 h-4" />
              1. Download Master .ics ({calendarEmail.split('@')[0]})
            </button>
            <a
              href={gcalDirectImportSettingsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
            >
              <ExternalLink className="w-4 h-4" />
              2. Open {calendarEmail.split('@')[0]} GCal Import Page
            </a>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              One-Click Google Calendar Recurring Series (Routed to {calendarEmail}):
            </div>
            <div className="grid grid-cols-1 gap-2">
              <a
                href={weekdayGCalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs text-slate-200 transition"
              >
                <span>🎯 Add Mon–Fri 2-Hour Weekday Study + 15m GA Series</span>
                <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              </a>
              <a
                href={satGCalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs text-slate-200 transition"
              >
                <span>⚡ Add Saturday 5.5-Hour 100% RA Deep-Dive Series</span>
                <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              </a>
              <a
                href={sunGCalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs text-slate-200 transition"
              >
                <span>🧠 Add Sunday 5.5-Hour RA + DA Maintenance + Mixed Quiz Series</span>
                <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              </a>
              <a
                href={certMicroGCalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-violet-950/30 hover:bg-violet-900/40 border border-violet-500/30 text-xs text-violet-200 transition"
              >
                <span>☁️ Add Wed & Sun 45-Min Cert Micro-Sprint (Claude CCA-F + GCP PMLE)</span>
                <ExternalLink className="w-3.5 h-3.5 text-violet-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Cross-Device Cloud, GitHub Profile & Vercel Sync Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Cloud className="w-4 h-4" /> GitHub (saisyam-1729), Vercel & Multi-Device Cloud Sync
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Live Deployments & Two-Way GitHub Gist Cloud Sync
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Linked to{' '}
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-300 underline font-semibold"
              >
                github.com/saisyam-1729
              </a>{' '}
              and <code className="text-emerald-300">saisyam1441@gmail.com</code>.
            </p>
          </div>

          {/* Live Multi-Device Access Links */}
          <div className="bg-emerald-950/25 border border-emerald-500/30 rounded-xl p-3.5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                📱 Live Cloud & Mobile Access Links:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(liveGitHubPagesUrl);
                    setCopiedDeviceLink(true);
                    setTimeout(() => setCopiedDeviceLink(false), 2000);
                  }}
                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition"
                >
                  {copiedDeviceLink ? 'Copied Live URL ✓' : 'Copy Cloud Sync URL'}
                </button>
                <a
                  href={vercelImportUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-[11px] font-bold flex items-center gap-1 transition"
                  title="One-click import saisyam-1729/gate-2027-prep-tracker into your Vercel account (saisyam1441@gmail.com)"
                >
                  ▲ Deploy on Vercel <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div className="text-xs font-mono text-slate-200 break-all bg-slate-950/80 border border-slate-800 rounded px-2.5 py-1.5">
              🌐 Live GitHub Pages:{' '}
              <a
                href={liveGitHubPagesUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-300 underline"
              >
                {liveGitHubPagesUrl}
              </a>
            </div>
            <div className="text-xs font-mono text-slate-300 break-all bg-slate-950/80 border border-slate-800 rounded px-2.5 py-1.5">
              📶 Same-WiFi LAN URL:{' '}
              <a
                href={localLanUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-300 underline"
              >
                {localLanUrl}
              </a>
            </div>
            <div className="text-xs font-mono text-slate-300 break-all bg-slate-950/80 border border-slate-800 rounded px-2.5 py-1.5 flex items-center justify-between">
              <span>
                <Github className="w-3.5 h-3.5 inline mr-1 text-slate-400" /> Repo:{' '}
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-300 underline"
                >
                  {GITHUB_REPO_URL}
                </a>
              </span>
            </div>
          </div>

          <div className="space-y-3 bg-slate-950/70 border border-slate-800/80 rounded-lg p-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                GitHub Personal Access Token (with `gist` scope for saisyam-1729)
              </label>
              <input
                type="password"
                value={gistTokenInput}
                onChange={(e) => setGistTokenInput(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Cloud Gist ID (Pre-configured under saisyam-1729)
              </label>
              <input
                type="text"
                value={gistIdInput}
                onChange={(e) => setGistIdInput(e.target.value)}
                placeholder="ef705b7841a16ed5a129699ce3ab10f9"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                disabled={isSyncing}
                onClick={handlePushToGist}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                Push State to Cloud Gist
              </button>
              <button
                type="button"
                disabled={isSyncing}
                onClick={handlePullFromGist}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-100 text-xs font-bold transition"
              >
                <Download className="w-3.5 h-3.5" />
                Pull State from Cloud Gist
              </button>
            </div>

            {syncMessage && (
              <div className="p-3 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-xs text-indigo-200 flex items-start gap-2">
                {syncMessage.startsWith('Error') || syncMessage.startsWith('Failed') ? (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <span>{syncMessage}</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2.5">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileJson className="w-3.5 h-3.5 text-amber-400" /> Local JSON Snapshot Export /
              Import & Crash Recovery
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={handleExportJSON}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                <Download className="w-3.5 h-3.5" /> Export JSON
              </button>
              <label className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition">
                <Upload className="w-3.5 h-3.5" /> Import JSON
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  try {
                    const raw = localStorage.getItem(
                      'gate_2027_prep_tracker_rolling_backups_v1'
                    );
                    if (!raw) {
                      setSyncMessage('No rolling backup snapshot found yet.');
                      return;
                    }
                    const snaps = JSON.parse(raw) as TrackerState[];
                    const target = snaps[1] || snaps[0];
                    if (target && Array.isArray(target.topics)) {
                      onRestoreState(target);
                      setSyncMessage(
                        `Restored rolling backup snapshot from ${new Date(
                          target.lastUpdated
                        ).toLocaleTimeString()}!`
                      );
                    }
                  } catch {
                    setSyncMessage('Could not restore rolling backup.');
                  }
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-indigo-950/70 hover:bg-indigo-900/70 border border-indigo-500/30 text-indigo-200 text-xs font-semibold transition"
                title="Restore automatic rolling snapshot from localStorage"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Restore Auto-Backup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Official GATE 2027 Schedule & Revised Roadmap Comparison Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
        <h3 className="text-base font-bold text-white mb-1">
          Revised 4-Phase Roadmap & Official IIT Madras GATE 2027 Milestones
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Updated per Handoff Open Item #1 & #4: Phase dates shifted to the revised schedule so
          false behind-plan flags do not fire on day one, and official IIT Madras dates confirmed.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="py-2.5 px-3">Phase</th>
                <th className="py-2.5 px-3">Original Dates (Old)</th>
                <th className="py-2.5 px-3 text-emerald-400">Revised Active Dates</th>
                <th className="py-2.5 px-3">RA Focus (80% Time — Common + B1 Electrical)</th>
                <th className="py-2.5 px-3">DA Focus (20% Time — Gaps & Maintenance)</th>
                <th className="py-2.5 px-3 text-violet-300">Certs Micro-Track (~1.5h/wk)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              {ROADMAP_PHASES.map((p) => (
                <tr key={p.id} className="hover:bg-slate-950/50">
                  <td className="py-3 px-3 font-bold text-indigo-300">{p.name}</td>
                  <td className="py-3 px-3 text-slate-500 line-through">{p.originalDates}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-emerald-300">
                    {p.revisedDates}
                  </td>
                  <td className="py-3 px-3 text-slate-300">{p.raFocus}</td>
                  <td className="py-3 px-3 text-slate-300">{p.daFocus}</td>
                  <td className="py-3 px-3 text-violet-200/90">{p.certFocus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
