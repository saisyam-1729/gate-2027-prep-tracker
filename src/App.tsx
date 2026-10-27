import React, { useEffect, useState } from 'react';
import {
  ALL_INITIAL_TOPICS,
  INITIAL_MISTAKE_VAULT,
  INITIAL_REMINDER_CONFIG,
  INITIAL_WEEKLY_HOURS,
  PORTFOLIO_PROJECTS,
} from './data/initialData';
import {
  DailyCheckinRecord,
  MistakeVaultItem,
  ReminderConfig,
  SyncConfig,
  TopicQuizLog,
  TopicStatus,
  TrackerState,
} from './types';
import {
  calculateNextReviewDate,
  loadSyncConfig,
  pullStateFromGitHubGist,
  pushStateToGitHubGist,
} from './utils/syncUtils';
import { DashboardView } from './components/DashboardView';
import { TopicTrackerView } from './components/TopicTrackerView';
import { QuizArenaView } from './components/QuizArenaView';
import { ResourceVaultView } from './components/ResourceVaultView';
import { AIHandoffView } from './components/AIHandoffView';
import { CalendarAndSyncView } from './components/CalendarAndSyncView';
import { HoursLogView } from './components/HoursLogView';
import { PortfolioLabView } from './components/PortfolioLabView';
import {
  FocusAIRHubView,
  playVictoryChime,
  triggerDesktopNotification,
} from './components/FocusAIRHubView';
import {
  LayoutDashboard,
  CheckSquare,
  Award,
  Library,
  Sparkles,
  Calendar,
  Clock,
  Cpu,
  Cloud,
  CheckCircle2,
  Flame,
  Bell,
  Zap,
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'gate_2027_prep_tracker_state_v1';
const BACKUP_SNAPSHOTS_KEY = 'gate_2027_prep_tracker_rolling_backups_v1';

export type ActiveTab =
  | 'dashboard'
  | 'focus_air'
  | 'topics'
  | 'quizzes'
  | 'resources'
  | 'ai_handoff'
  | 'calendar_sync'
  | 'hours_log'
  | 'portfolio';

function getInitialTrackerState(): TrackerState {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as TrackerState;
      if (parsed && Array.isArray(parsed.topics) && parsed.topics.length > 0) {
        // Ensure any newly added topics (such as GCP_PMLE and CCA_F micro-tracks) are merged into existing saved state
        const existingIds = new Set(parsed.topics.map((t) => t.id));
        const missingTopics = ALL_INITIAL_TOPICS.filter((t) => !existingIds.has(t.id));
        if (missingTopics.length > 0) {
          parsed.topics = [...parsed.topics, ...missingTopics];
        }
        if (!parsed.mistakeVault || parsed.mistakeVault.length === 0) {
          parsed.mistakeVault = INITIAL_MISTAKE_VAULT;
        }
        if (!parsed.reminderConfig) {
          parsed.reminderConfig = INITIAL_REMINDER_CONFIG;
        }
        if (!parsed.dailyCheckins) {
          parsed.dailyCheckins = {};
        }
        // Keep the hours log honest after the missed 24, 25, and 26 Oct sessions,
        // without overwriting hours the person has already typed in.
        const missedNotes: Record<number, { label: string; notes: string }> = {
          2: {
            label: 'Week 2 (19–25 Oct) — Restart Weekend (Circuits + DBMS)',
            notes:
              'Logged honestly: RA diagnostic only (~1h, 1/10). Sat 24 Oct and Sun 25 Oct study blocks were missed. Do not backfill fake hours. Circuits weekend moves to 31 Oct–1 Nov.',
          },
          3: {
            label: 'Week 3 (26 Oct – 1 Nov) — Restart after 3 missed sessions',
            notes:
              'Mon 26 Oct missed (with Sat 24 and Sun 25). Tue 27 Oct is a normal 2h restart: KCL/KVL, node and mesh, 15m GA. Wed–Fri stay 2h. Sat 31 Oct and Sun 1 Nov carry the original circuits weekend. Phase 1 still ends 29 Nov if this weekend happens.',
          },
        };
        parsed.weeklyHours = parsed.weeklyHours.map((w) => {
          const patch = missedNotes[w.weekNumber];
          if (!patch) return w;
          const untouched =
            (w.weekNumber === 2 && w.raHours <= 1 && w.daHours === 0 && w.gaHours === 0) ||
            (w.weekNumber === 3 &&
              w.raHours === 0 &&
              w.daHours === 0 &&
              w.gaHours === 0 &&
              (w.certHours || 0) === 0);
          if (!untouched) return w;
          return { ...w, label: patch.label, notes: patch.notes };
        });
        return parsed;
      }
    }
  } catch {
    // fallback to rolling backup if primary key was corrupted
    try {
      const backupsRaw = localStorage.getItem(BACKUP_SNAPSHOTS_KEY);
      if (backupsRaw) {
        const backups = JSON.parse(backupsRaw) as TrackerState[];
        if (Array.isArray(backups) && backups.length > 0) {
          return backups[0];
        }
      }
    } catch {
      // ignore
    }
  }

  return {
    version: '1.2.0',
    lastUpdated: new Date().toISOString(),
    candidateName: 'Potukuchi Shanmukha Sai Syam (@SyamP)',
    enrollmentId: 'M249R74',
    targetExamDate: '2027-02-07',
    topics: ALL_INITIAL_TOPICS,
    weeklyHours: INITIAL_WEEKLY_HOURS,
    portfolioProjects: PORTFOLIO_PROJECTS,
    globalQuizHistory: [
      {
        id: 'diag-ra-baseline',
        date: '2026-10-23',
        quizTitle: 'RA Diagnostic Baseline (10 Questions)',
        score: 1,
        total: 10,
        notes:
          'Honest baseline: 1/10 (Only Q5 first-order ODE was an intuitive guess; Q2 Thevenin & Q8 Piezoelectric were lucky guesses).',
        wrongTopics: [
          'Series circuit current',
          'Thevenin equivalent',
          'Maximum power transfer',
          'Mod-10 counter flip-flops',
          'Curl of a gradient',
          'Static friction',
          'Piezoelectric sensor',
          'Manipulator DOF',
          'Second-order damping',
        ],
      },
    ],
    completedQuizIds: [],
    mistakeVault: INITIAL_MISTAKE_VAULT,
    dailyCheckins: {},
    reminderConfig: INITIAL_REMINDER_CONFIG,
  };
}

export function App() {
  const [state, setState] = useState<TrackerState>(getInitialTrackerState);
  const [syncConfig, setSyncConfig] = useState<SyncConfig>(loadSyncConfig);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [aiPreselectedTopics, setAiPreselectedTopics] = useState<string[]>([]);
  const [dismissedBannerToday, setDismissedBannerToday] = useState(false);

  // Persist to localStorage + maintain 3 rolling recovery snapshots
  useEffect(() => {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(LOCAL_STORAGE_KEY, serialized);

      const backupsRaw = localStorage.getItem(BACKUP_SNAPSHOTS_KEY);
      const backups: TrackerState[] = backupsRaw ? JSON.parse(backupsRaw) : [];
      const updatedBackups = [state, ...backups.slice(0, 2)];
      localStorage.setItem(BACKUP_SNAPSHOTS_KEY, JSON.stringify(updatedBackups));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  // Automatic Cross-Device Cloud Pull on initial page load & Debounced Auto-Push
  useEffect(() => {
    if (!syncConfig.gistId) return;
    pullStateFromGitHubGist(syncConfig.gistId, syncConfig.githubToken)
      .then((remoteState) => {
        setState((prev) => {
          const remoteTime = new Date(remoteState.lastUpdated || 0).getTime();
          const localTime = new Date(prev.lastUpdated || 0).getTime();
          if (remoteTime > localTime && Array.isArray(remoteState.topics)) {
            return remoteState;
          }
          return prev;
        });
      })
      .catch(() => {
        // ignore if offline or not yet pushed
      });
  }, [syncConfig.gistId, syncConfig.githubToken]);

  useEffect(() => {
    if (!syncConfig.autoSync || !syncConfig.githubToken || !syncConfig.gistId) return;
    const timeout = window.setTimeout(() => {
      pushStateToGitHubGist(state, syncConfig.githubToken, syncConfig.gistId)
        .then((res) => {
          setSyncConfig((prev) => ({
            ...prev,
            lastSyncedAt: res.updatedAt,
            syncStatus: 'synced',
          }));
        })
        .catch(() => {
          // ignore transient network errors
        });
    }, 2500);
    return () => clearTimeout(timeout);
  }, [state, syncConfig.autoSync, syncConfig.githubToken, syncConfig.gistId]);

  // Background Smart Reminder Watcher (checks every 45 seconds)
  useEffect(() => {
    const cfg = state.reminderConfig || INITIAL_REMINDER_CONFIG;
    const interval = window.setInterval(() => {
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;
      const todayKey = now.toISOString().slice(0, 10);
      const isWeekend = now.getDay() === 0 || now.getDay() === 6;

      const targetStudyTime = isWeekend ? cfg.weekendReminderTime : cfg.weekdayReminderTime;
      const firedStudyKey = `gate27_rem_study_${todayKey}`;
      const firedGaKey = `gate27_rem_ga_${todayKey}`;

      if (hhmm === targetStudyTime && !sessionStorage.getItem(firedStudyKey)) {
        sessionStorage.setItem(firedStudyKey, '1');
        if (cfg.soundChimeEnabled) playVictoryChime();
        triggerDesktopNotification(
          '🔥 GATE 2027 RA Top-AIR Study Block Starting!',
          'Lock in for your scheduled problem-solving session. Remember: solve 15 problems today—no zero days!'
        );
      }

      if (hhmm === cfg.gaReminderTime && !sessionStorage.getItem(firedGaKey)) {
        sessionStorage.setItem(firedGaKey, '1');
        if (cfg.soundChimeEnabled) playVictoryChime();
        triggerDesktopNotification(
          '🎯 15-Minute General Aptitude Sprint Time!',
          'Knock out 5 General Aptitude questions now to lock in 15 marks in both RA and DA.'
        );
      }
    }, 45000);

    return () => clearInterval(interval);
  }, [state.reminderConfig]);

  // Countdown to Feb 7, 2027
  const examDate = new Date('2027-02-07T09:00:00+05:30');
  const now = new Date();
  const daysRemaining = Math.max(
    0,
    Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  const todayISO = now.toISOString().slice(0, 10);
  const todayCheckin: DailyCheckinRecord = (state.dailyCheckins || {})[todayISO] || {
    date: todayISO,
    raProblemsDone: false,
    activeRecallOrQuizDone: false,
    ga15MinDone: false,
    trackerLogged: false,
    rescueModeUsed: false,
    focusMinutesLogged: 0,
  };
  const completedNonNegotiablesCount =
    Number(todayCheckin.raProblemsDone) +
    Number(todayCheckin.activeRecallOrQuizDone) +
    Number(todayCheckin.ga15MinDone) +
    Number(todayCheckin.trackerLogged);

  const dueReviewsCount = state.topics.filter(
    (t) => t.nextReviewDue && t.nextReviewDue <= todayISO && t.confidence > 0
  ).length;

  // Handlers
  const handleUpdateTopicStatus = (topicId: string, status: TopicStatus) => {
    const today = new Date().toISOString().slice(0, 10);
    setState((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      topics: prev.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              status,
              lastStudied: today,
              nextReviewDue:
                t.confidence > 0 ? calculateNextReviewDate(today, t.confidence) : t.nextReviewDue,
            }
          : t
      ),
    }));
  };

  const handleUpdateTopicConfidence = (
    topicId: string,
    confidence: 0 | 1 | 2 | 3 | 4 | 5
  ) => {
    const today = new Date().toISOString().slice(0, 10);
    setState((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      topics: prev.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              confidence,
              lastStudied: today,
              nextReviewDue: calculateNextReviewDate(today, confidence),
            }
          : t
      ),
    }));
  };

  const handleToggleSubtopic = (topicId: string, subtopicId: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setState((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      topics: prev.topics.map((t) => {
        if (t.id !== topicId) return t;
        const updatedSubs = t.subtopics.map((s) =>
          s.id === subtopicId ? { ...s, completed: !s.completed } : s
        );
        const allDone = updatedSubs.length > 0 && updatedSubs.every((s) => s.completed);
        const anyDone = updatedSubs.some((s) => s.completed);
        const newStatus: TopicStatus = allDone
          ? 'done'
          : anyDone
          ? 'in_progress'
          : t.status;
        return {
          ...t,
          subtopics: updatedSubs,
          status: newStatus,
          lastStudied: today,
        };
      }),
    }));
  };

  const handleUpdateTopicNotes = (topicId: string, notes: string) => {
    setState((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      topics: prev.topics.map((t) => (t.id === topicId ? { ...t, notes } : t)),
    }));
  };

  const handleRecordQuizResult = (
    log: TopicQuizLog,
    quizId?: string,
    topicConfidenceUpdates?: { topicId: string; confidence: 1 | 2 | 3 | 4 | 5 }[]
  ) => {
    const today = new Date().toISOString().slice(0, 10);
    setState((prev) => {
      const confMap = new Map<string, 1 | 2 | 3 | 4 | 5>();
      topicConfidenceUpdates?.forEach((u) => confMap.set(u.topicId, u.confidence));

      const existingCheckin = (prev.dailyCheckins || {})[today] || {
        date: today,
        raProblemsDone: false,
        activeRecallOrQuizDone: false,
        ga15MinDone: false,
        trackerLogged: false,
        focusMinutesLogged: 0,
      };

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        globalQuizHistory: [log, ...prev.globalQuizHistory],
        completedQuizIds:
          quizId && !prev.completedQuizIds.includes(quizId)
            ? [...prev.completedQuizIds, quizId]
            : prev.completedQuizIds,
        dailyCheckins: {
          ...(prev.dailyCheckins || {}),
          [today]: {
            ...existingCheckin,
            activeRecallOrQuizDone: true,
            trackerLogged: true,
          },
        },
        topics: prev.topics.map((t) => {
          const newConf = confMap.get(t.id);
          if (!newConf) return t;
          return {
            ...t,
            confidence: newConf,
            lastStudied: today,
            nextReviewDue: calculateNextReviewDate(today, newConf),
            quizLogs: [log, ...t.quizLogs],
          };
        }),
      };
    });
  };

  const handleUpdateWeekHours = (
    weekNumber: number,
    field: 'raHours' | 'daHours' | 'gaHours' | 'certHours' | 'notes',
    value: number | string
  ) => {
    setState((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      weeklyHours: prev.weeklyHours.map((w) =>
        w.weekNumber === weekNumber ? { ...w, [field]: value } : w
      ),
    }));
  };

  const handleUpdateProjectStatus = (projectId: string, status: TopicStatus) => {
    setState((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      portfolioProjects: prev.portfolioProjects.map((p) =>
        p.id === projectId ? { ...p, status } : p
      ),
    }));
  };

  const handleToggleDailyItem = (
    date: string,
    field:
      | 'raProblemsDone'
      | 'activeRecallOrQuizDone'
      | 'ga15MinDone'
      | 'trackerLogged'
      | 'rescueModeUsed'
  ) => {
    setState((prev) => {
      const current: DailyCheckinRecord = (prev.dailyCheckins || {})[date] || {
        date,
        raProblemsDone: false,
        activeRecallOrQuizDone: false,
        ga15MinDone: false,
        trackerLogged: false,
        rescueModeUsed: false,
        focusMinutesLogged: 0,
      };
      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        dailyCheckins: {
          ...(prev.dailyCheckins || {}),
          [date]: {
            ...current,
            [field]: !current[field],
          },
        },
      };
    });
  };

  const handleLogFocusSession = (
    minutes: number,
    track: 'raHours' | 'daHours' | 'gaHours' | 'certHours',
    topicId?: string
  ) => {
    const today = new Date().toISOString().slice(0, 10);
    const hoursDelta = Number((minutes / 60).toFixed(2));
    setState((prev) => {
      const currentCheckin: DailyCheckinRecord = (prev.dailyCheckins || {})[today] || {
        date: today,
        raProblemsDone: false,
        activeRecallOrQuizDone: false,
        ga15MinDone: false,
        trackerLogged: false,
        rescueModeUsed: false,
        focusMinutesLogged: 0,
      };

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        weeklyHours: prev.weeklyHours.map((w) => {
          // Week 3 is active week (26 Oct - 1 Nov 2026)
          if (w.weekNumber !== 3) return w;
          const prevVal = Number(w[track] || 0);
          return {
            ...w,
            [track]: Number((prevVal + hoursDelta).toFixed(2)),
          };
        }),
        dailyCheckins: {
          ...(prev.dailyCheckins || {}),
          [today]: {
            ...currentCheckin,
            raProblemsDone: track === 'raHours' ? true : currentCheckin.raProblemsDone,
            ga15MinDone: track === 'gaHours' ? true : currentCheckin.ga15MinDone,
            trackerLogged: true,
            focusMinutesLogged: currentCheckin.focusMinutesLogged + minutes,
          },
        },
        topics: prev.topics.map((t) =>
          topicId && t.id === topicId
            ? {
                ...t,
                status: t.status === 'not_started' ? 'in_progress' : t.status,
                lastStudied: today,
              }
            : t
        ),
      };
    });
  };

  const handleUpdateReminderConfig = (cfg: ReminderConfig) => {
    setState((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      reminderConfig: cfg,
    }));
  };

  const handleAddMistakeItem = (item: Omit<MistakeVaultItem, 'id' | 'date'>) => {
    const newItem: MistakeVaultItem = {
      ...item,
      id: `mv-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
    };
    setState((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      mistakeVault: [newItem, ...(prev.mistakeVault || [])],
    }));
  };

  const handleToggleMistakeMastered = (id: string) => {
    setState((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      mistakeVault: (prev.mistakeVault || []).map((m) =>
        m.id === id ? { ...m, mastered: !m.mastered } : m
      ),
    }));
  };

  const handleDeleteMistakeItem = (id: string) => {
    setState((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
      mistakeVault: (prev.mistakeVault || []).filter((m) => m.id !== id),
    }));
  };

  const handleQuickCloudSave = async () => {
    if (!syncConfig.githubToken) {
      setActiveTab('calendar_sync');
      return;
    }
    try {
      const res = await pushStateToGitHubGist(
        state,
        syncConfig.githubToken,
        syncConfig.gistId
      );
      setSyncConfig((prev) => ({
        ...prev,
        gistId: res.gistId,
        lastSyncedAt: res.updatedAt,
        syncStatus: 'synced',
      }));
    } catch {
      setActiveTab('calendar_sync');
    }
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Command Center', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'focus_air',
      label: 'Focus, Reminders & Top-AIR Hub',
      icon: <Flame className="w-4 h-4 text-amber-400" />,
      badge: `${completedNonNegotiablesCount}/4 Today`,
    },
    {
      id: 'topics',
      label: 'Syllabus & Checklists',
      icon: <CheckSquare className="w-4 h-4" />,
      badge: `${state.topics.filter((t) => t.status === 'done').length}/${state.topics.length}`,
    },
    {
      id: 'quizzes',
      label: 'Quiz & Diagnostic Arena',
      icon: <Award className="w-4 h-4" />,
      badge: '5 Ready',
    },
    {
      id: 'ai_handoff',
      label: 'Claude / Gemini Examiner',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'resources',
      label: 'End-to-End Resource Hub',
      icon: <Library className="w-4 h-4" />,
    },
    {
      id: 'hours_log',
      label: '17-Week Hours Log',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: 'portfolio',
      label: 'Python Robotics Lab',
      icon: <Cpu className="w-4 h-4" />,
    },
    {
      id: 'calendar_sync',
      label: 'Calendar & Device Sync',
      icon: <Calendar className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Persistent Smart Reminder Nudge Bar */}
      {!dismissedBannerToday && (completedNonNegotiablesCount < 4 || dueReviewsCount > 0) && (
        <div className="bg-gradient-to-r from-amber-950/90 via-indigo-950/90 to-slate-900 border-b border-amber-500/30 px-4 py-2 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-amber-200">
              <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
              <span>
                <b>Daily Top-AIR Reminder:</b> You have completed{' '}
                <b>{completedNonNegotiablesCount}/4</b> Daily Non-Negotiables today
                {!todayCheckin.ga15MinDone ? ' (15m General Aptitude still pending!)' : ''}
                {dueReviewsCount > 0 ? ` • ${dueReviewsCount} Spaced Review(s) due` : ''}. Zero
                zero-days between now and Feb 7!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('focus_air')}
                className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[11px] flex items-center gap-1 transition"
              >
                <Zap className="w-3 h-3" /> Launch Focus Timer & Check-In
              </button>
              <button
                onClick={() => setDismissedBannerToday(true)}
                className="text-slate-400 hover:text-slate-200 px-1.5 text-[11px]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Status & Countdown Header */}
      <header className="border-b border-slate-800/90 bg-slate-900/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center font-mono font-extrabold text-white text-sm shadow-lg">
              G27
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  GATE 2027 Command Center — RA (Top AIR Target) & DA
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" /> SLIGHTLY BEHIND (3 sessions missed)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {state.candidateName} •{' '}
                <a
                  href="https://github.com/saisyam-1729"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-300 hover:underline font-mono"
                >
                  github.com/saisyam-1729
                </a>{' '}
                • <span className="font-mono text-slate-300">saisyam1441@gmail.com</span> • GOAPS:{' '}
                <span className="font-mono text-slate-300">{state.enrollmentId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('focus_air')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-bold text-amber-300 transition"
              title="Open Deep-Work Focus Timer, Reminders & Top-AIR Blueprint"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Focus & Top-AIR Hub</span>
            </button>

            <div className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-1.5 text-right">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Countdown to Feb 7, 2027
              </div>
              <div className="text-base font-mono font-extrabold text-indigo-300">
                {daysRemaining} Days Remaining
              </div>
            </div>

            <button
              onClick={handleQuickCloudSave}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
              title="Sync progress across devices via GitHub Gist or JSON"
            >
              <Cloud className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">
                {syncConfig.gistId ? 'Cloud Synced' : 'Setup Cloud Sync'}
              </span>
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto pb-2 pt-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            state={state}
            onNavigateTab={setActiveTab}
            onJumpToQuiz={() => setActiveTab('quizzes')}
            onJumpToAIExaminer={(topicIds) => {
              setAiPreselectedTopics(topicIds);
              setActiveTab('ai_handoff');
            }}
          />
        )}

        {activeTab === 'focus_air' && (
          <FocusAIRHubView
            state={state}
            onToggleDailyItem={handleToggleDailyItem}
            onLogFocusSession={handleLogFocusSession}
            onUpdateReminderConfig={handleUpdateReminderConfig}
            onAddMistakeItem={handleAddMistakeItem}
            onToggleMistakeMastered={handleToggleMistakeMastered}
            onDeleteMistakeItem={handleDeleteMistakeItem}
            onJumpToAIExaminer={(topicIds) => {
              setAiPreselectedTopics(topicIds);
              setActiveTab('ai_handoff');
            }}
          />
        )}

        {activeTab === 'topics' && (
          <TopicTrackerView
            topics={state.topics}
            onUpdateTopicStatus={handleUpdateTopicStatus}
            onUpdateTopicConfidence={handleUpdateTopicConfidence}
            onToggleSubtopic={handleToggleSubtopic}
            onUpdateTopicNotes={handleUpdateTopicNotes}
            onQuizMeWithAI={(topicId) => {
              setAiPreselectedTopics([topicId]);
              setActiveTab('ai_handoff');
            }}
          />
        )}

        {activeTab === 'quizzes' && (
          <QuizArenaView
            topics={state.topics}
            globalQuizHistory={state.globalQuizHistory}
            completedQuizIds={state.completedQuizIds}
            onRecordQuizResult={handleRecordQuizResult}
            onJumpToAIExaminer={(topicIds) => {
              setAiPreselectedTopics(topicIds);
              setActiveTab('ai_handoff');
            }}
          />
        )}

        {activeTab === 'ai_handoff' && (
          <AIHandoffView state={state} initialSelectedTopicIds={aiPreselectedTopics} />
        )}

        {activeTab === 'resources' && <ResourceVaultView />}

        {activeTab === 'hours_log' && (
          <HoursLogView
            weeklyHours={state.weeklyHours}
            onUpdateWeekHours={handleUpdateWeekHours}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioLabView
            projects={state.portfolioProjects}
            onUpdateProjectStatus={handleUpdateProjectStatus}
          />
        )}

        {activeTab === 'calendar_sync' && (
          <CalendarAndSyncView
            state={state}
            syncConfig={syncConfig}
            onUpdateSyncConfig={setSyncConfig}
            onRestoreState={(newState) => setState(newState)}
          />
        )}
      </main>

      {/* Footer with Save Status & Rolling Backup Assurance */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-4 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              {syncConfig.gistId
                ? `Saved & Cloud Synced (Gist: ${syncConfig.gistId.slice(0, 8)}...)`
                : 'Auto-saved with 3-Snapshot Crash Recovery (Connect GitHub Gist in Calendar & Device Sync for cross-device sync)'}
            </span>
            <span>•</span>
            <span>Last updated: {new Date(state.lastUpdated).toLocaleTimeString()}</span>
          </div>
          <div>
            Official GATE 2027 Organizing Institute: IIT Madras (Feb 6–7, 13–14, 20–21, 2027)
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
