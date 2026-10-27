import React, { useEffect, useRef, useState } from 'react';
import {
  DailyCheckinRecord,
  MistakeVaultItem,
  PaperCode,
  ReminderConfig,
  TrackerState,
} from '../types';
import {
  Flame,
  Bell,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
  Trophy,
  PlusCircle,
  Sparkles,
  Volume2,
  CheckSquare,
  Square,
  Zap,
  Target,
  BookMarked,
  Trash2,
} from 'lucide-react';

interface FocusAIRHubViewProps {
  state: TrackerState;
  onToggleDailyItem: (
    date: string,
    field:
      | 'raProblemsDone'
      | 'activeRecallOrQuizDone'
      | 'ga15MinDone'
      | 'trackerLogged'
      | 'rescueModeUsed'
  ) => void;
  onLogFocusSession: (
    minutes: number,
    track: 'raHours' | 'daHours' | 'gaHours' | 'certHours',
    topicId?: string
  ) => void;
  onUpdateReminderConfig: (cfg: ReminderConfig) => void;
  onAddMistakeItem: (item: Omit<MistakeVaultItem, 'id' | 'date'>) => void;
  onToggleMistakeMastered: (id: string) => void;
  onDeleteMistakeItem: (id: string) => void;
  onJumpToAIExaminer: (topicIds: string[]) => void;
}

// Synthesize a clean completion chime using Web Audio API (no external audio file needed)
export function playVictoryChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.14);
      osc.stop(ctx.currentTime + idx * 0.14 + 0.45);
    });
  } catch {
    // ignore if browser blocks audio
  }
}

export function triggerDesktopNotification(title: string, body: string) {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      tag: 'gate-2027-tracker',
    });
    return true;
  }
  return false;
}

export const FocusAIRHubView: React.FC<FocusAIRHubViewProps> = ({
  state,
  onToggleDailyItem,
  onLogFocusSession,
  onUpdateReminderConfig,
  onAddMistakeItem,
  onToggleMistakeMastered,
  onDeleteMistakeItem,
  onJumpToAIExaminer,
}) => {
  const todayISO = new Date().toISOString().slice(0, 10);
  const checkins = state.dailyCheckins || {};
  const todayCheckin: DailyCheckinRecord = checkins[todayISO] || {
    date: todayISO,
    raProblemsDone: false,
    activeRecallOrQuizDone: false,
    ga15MinDone: false,
    trackerLogged: false,
    rescueModeUsed: false,
    focusMinutesLogged: 0,
  };

  const reminderConfig: ReminderConfig = state.reminderConfig || {
    browserNotificationsEnabled: false,
    weekdayReminderTime: '20:00',
    weekendReminderTime: '09:00',
    gaReminderTime: '13:30',
    soundChimeEnabled: true,
    targetRaAir: 'Top 50 AIR in GATE 2027 Robotics & Automation (RA)',
    targetRaMarks: 72,
    targetDaMarks: 68,
    personalWhy:
      'Robotics will define the next decade. I am combining my Maths, Statistics, and M.Tech CSE/AI strengths with deep first-principles mastery of Circuits, Mechatronics, Kinematics, and Control to secure a top AIR in GATE 2027 RA & DA—no zero days, no excuses.',
  };

  // Focus Timer State
  const [selectedPresetMinutes, setSelectedPresetMinutes] = useState<number>(90);
  const [secondsLeft, setSecondsLeft] = useState<number>(90 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [focusTrack, setFocusTrack] = useState<'raHours' | 'daHours' | 'gaHours' | 'certHours'>('raHours');
  const [focusTopicId, setFocusTopicId] = useState<string>(state.topics[0]?.id || '');
  const [timerStatusMsg, setTimerStatusMsg] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  // Mistake Vault Form State
  const [mvPaper, setMvPaper] = useState<PaperCode>('RA');
  const [mvTopicId, setMvTopicId] = useState<string>(state.topics[0]?.id || '');
  const [mvTrap, setMvTrap] = useState<string>('');
  const [mvFix, setMvFix] = useState<string>('');
  const [mvFilter, setMvFilter] = useState<'ALL' | 'UNMASTERED' | 'MASTERED'>('ALL');
  const [notifStatus, setNotifStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (reminderConfig.soundChimeEnabled) {
              playVictoryChime();
            }
            triggerDesktopNotification(
              '🎯 GATE 2027 Focus Block Complete!',
              `Awesome discipline, Syam! Your ${selectedPresetMinutes}-minute ${focusTrack.replace('Hours', '').toUpperCase()} block is done. Logging hours now!`
            );
            onLogFocusSession(selectedPresetMinutes, focusTrack, focusTopicId);
            setTimerStatusMsg(
              `Completed & auto-logged ${selectedPresetMinutes} mins (${(selectedPresetMinutes / 60).toFixed(2)} hrs) to Active Week!`
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [
    isRunning,
    selectedPresetMinutes,
    focusTrack,
    focusTopicId,
    reminderConfig.soundChimeEnabled,
    onLogFocusSession,
  ]);

  const selectPreset = (mins: number, defaultTrack: 'raHours' | 'daHours' | 'gaHours' | 'certHours') => {
    setIsRunning(false);
    setSelectedPresetMinutes(mins);
    setSecondsLeft(mins * 60);
    setFocusTrack(defaultTrack);
    setTimerStatusMsg(null);
  };

  const formatMMSS = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleEnableBrowserNotifications = async () => {
    if (!('Notification' in window)) {
      setNotifStatus('Browser notifications are not supported in this browser.');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      onUpdateReminderConfig({
        ...reminderConfig,
        browserNotificationsEnabled: true,
      });
      triggerDesktopNotification(
        '🔥 GATE 2027 Top-AIR Reminders Activated!',
        'You will now receive study block alerts, 15-min GA nudges, and spaced-repetition reminders.'
      );
      setNotifStatus('Desktop notifications enabled & verified!');
    } else {
      setNotifStatus('Notification permission was not granted by browser.');
    }
  };

  const handleTestReminder = () => {
    if (reminderConfig.soundChimeEnabled) {
      playVictoryChime();
    }
    const sent = triggerDesktopNotification(
      '⚡ GATE 2027 RA Top-AIR Reminder (@SyamP)',
      'Time for your problem-solving block! Remember: solve 15 numerical problems today—no zero days.'
    );
    if (sent) {
      setNotifStatus('Sent live desktop notification & audio chime!');
    } else {
      setNotifStatus(
        'Played audio chime! (Click "Enable Desktop Alerts" first to allow OS popups.)'
      );
    }
  };

  // Compute Last 14 Days Consistency & Streak
  const last14Days: { date: string; label: string; score: number; isToday: boolean }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const rec = checkins[iso];
    const score = rec
      ? Number(rec.raProblemsDone) +
        Number(rec.activeRecallOrQuizDone) +
        Number(rec.ga15MinDone) +
        Number(rec.trackerLogged) +
        (rec.rescueModeUsed ? 2 : 0)
      : 0;
    last14Days.push({
      date: iso,
      label: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
      score,
      isToday: i === 0,
    });
  }

  let currentStreak = 0;
  for (let i = last14Days.length - 1; i >= 0; i--) {
    if (last14Days[i].score > 0) {
      currentStreak++;
    } else if (!last14Days[i].isToday) {
      break;
    }
  }

  // ============================================================================
  // GATE RA TOP-AIR SCORE PROJECTOR (Out of 100 Marks)
  // ============================================================================
  // Pillar 1: General Aptitude (15 Marks)
  const gaTopics = state.topics.filter((t) => t.paper === 'GA');
  const gaReadiness =
    gaTopics.reduce((acc, t) => acc + (t.status === 'done' ? 1 : t.confidence / 5), 0) /
    Math.max(1, gaTopics.length);
  const projectedGaMarks = 6.0 + gaReadiness * 8.0; // Baseline 6/15 -> up to 14/15

  // Pillar 2: Engg Maths + Python + DSA in RA (~20 Marks — Syam's Unfair Strength!)
  const mathCsCodes = [
    'RA-A1.1',
    'RA-A1.2a',
    'RA-A1.2b',
    'RA-A1.3a',
    'RA-A1.3b',
    'RA-A1.4',
    'RA-A1.5',
    'RA-A2.6',
  ];
  const mathCsTopics = state.topics.filter((t) => mathCsCodes.includes(t.code));
  const mathCsReadiness =
    mathCsTopics.reduce(
      (acc, t) => acc + (t.status === 'done' ? 1 : Math.max(0.35, t.confidence / 5)),
      0
    ) / Math.max(1, mathCsTopics.length);
  const projectedMathCsMarks = 8.5 + mathCsReadiness * 9.5; // Baseline 8.5/20 -> up to 18/20

  // Pillar 3: Mechatronics & Robotics Core (Part A2 + A3, ~40 Marks)
  const coreRaCodes = [
    'RA-A2.1a',
    'RA-A2.1b',
    'RA-A2.1c',
    'RA-A2.2',
    'RA-A2.3',
    'RA-A2.4',
    'RA-A2.5',
    'RA-A3.1',
    'RA-A3.2',
  ];
  const coreRaTopics = state.topics.filter((t) => coreRaCodes.includes(t.code));
  const coreRaReadiness =
    coreRaTopics.reduce((acc, t) => {
      const subRatio =
        t.subtopics.filter((s) => s.completed).length / Math.max(1, t.subtopics.length);
      const confRatio = t.confidence / 5;
      return acc + (t.status === 'done' ? 1 : Math.max(subRatio, confRatio));
    }, 0) / Math.max(1, coreRaTopics.length);
  const projectedCoreRaMarks = 4.0 + coreRaReadiness * 26.0; // Baseline 4/40 -> up to 30/40

  // Pillar 4: Electrical Part B1 (25 Marks: Control + Signals + Analog/Embedded)
  const b1Codes = ['RA-B1.3a', 'RA-B1.3b', 'RA-B1.2', 'RA-B1.1a', 'RA-B1.1b'];
  const b1Topics = state.topics.filter((t) => b1Codes.includes(t.code));
  const b1Readiness =
    b1Topics.reduce((acc, t) => {
      const subRatio =
        t.subtopics.filter((s) => s.completed).length / Math.max(1, t.subtopics.length);
      const confRatio = t.confidence / 5;
      return acc + (t.status === 'done' ? 1 : Math.max(subRatio, confRatio));
    }, 0) / Math.max(1, b1Topics.length);
  const projectedB1Marks = 2.0 + b1Readiness * 17.0; // Baseline 2/25 -> up to 19/25

  const totalProjectedRaScore =
    projectedGaMarks + projectedMathCsMarks + projectedCoreRaMarks + projectedB1Marks;

  // Mistake Vault List
  const mistakeList = (state.mistakeVault || []).filter((item) => {
    if (mvFilter === 'UNMASTERED') return !item.mastered;
    if (mvFilter === 'MASTERED') return item.mastered;
    return true;
  });

  const handleAddMistake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mvTrap.trim() || !mvFix.trim()) return;
    const foundTopic = state.topics.find((t) => t.id === mvTopicId);
    onAddMistakeItem({
      paper: mvPaper,
      topicId: mvTopicId,
      topicTitle: foundTopic ? `[${foundTopic.code}] ${foundTopic.title}` : 'General Concept',
      trapOrMistake: mvTrap.trim(),
      coreFormulaOrFix: mvFix.trim(),
      mastered: false,
    });
    setMvTrap('');
    setMvFix('');
  };

  return (
    <div className="space-y-7">
      {/* North-Star Dream & Top-AIR Mission Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 border border-indigo-500/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" /> North-Star Mission: {reminderConfig.targetRaAir}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              “At Any Cost, Clear Both Exams — With a Respectable AIR in GATE Robotics (RA)”
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              “{reminderConfig.personalWhy}”
            </p>
          </div>

          <div className="bg-slate-950/90 border border-indigo-500/40 rounded-xl p-4 text-center min-w-[210px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              Live Projected GATE RA Score
            </div>
            <div className="text-3xl font-mono font-extrabold text-emerald-400 mt-1">
              {totalProjectedRaScore.toFixed(1)}{' '}
              <span className="text-sm text-slate-400">/ {reminderConfig.targetRaMarks}+ Target</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              70+ Marks in New Paper = <b className="text-amber-300">Top 25–50 AIR</b>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Deep-Work Focus Timer + Daily Non-Negotiables & Anti-Zero-Day Rescue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Deep-Work Focus Studio & Auto-Logger */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" /> Deep-Work Focus Timer & Auto-Hours Logger
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Lock In Without Distractions (Auto-Logs to Active Week)
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
              Today: {todayCheckin.focusMinutesLogged}m focused
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: '90m RA Deep Block', mins: 90, track: 'raHours' as const },
              { label: '60m Theorems / DA', mins: 60, track: 'raHours' as const },
              { label: '45m Mixed Quiz', mins: 45, track: 'raHours' as const },
              { label: '25m Rescue / Cert', mins: 25, track: 'certHours' as const },
              { label: '15m Daily GA Sprint', mins: 15, track: 'gaHours' as const },
              { label: '60m Sunday DA Block', mins: 60, track: 'daHours' as const },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => selectPreset(p.mins, p.track)}
                className={`px-3 py-2 rounded-lg border text-xs font-bold transition ${
                  selectedPresetMinutes === p.mins && focusTrack === p.track
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="text-5xl sm:text-6xl font-mono font-extrabold text-white tracking-wider">
              {formatMMSS(secondsLeft)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Log Hours Under Track:
                </label>
                <select
                  value={focusTrack}
                  onChange={(e) =>
                    setFocusTrack(
                      e.target.value as 'raHours' | 'daHours' | 'gaHours' | 'certHours'
                    )
                  }
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white font-semibold"
                >
                  <option value="raHours">GATE RA (80% Main Track)</option>
                  <option value="daHours">GATE DA (20% Maintenance Track)</option>
                  <option value="gaHours">General Aptitude (15m Daily Slot)</option>
                  <option value="certHours">Certs Micro-Track (GCP PMLE / Claude CCA-F)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Active Topic Being Studied:
                </label>
                <select
                  value={focusTopicId}
                  onChange={(e) => setFocusTopicId(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white"
                >
                  {state.topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      [{t.code}] {t.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRunning((prev) => !prev)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Block
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Start Focus Block
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsRunning(false);
                  setSecondsLeft(selectedPresetMinutes * 60);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>

              <button
                type="button"
                onClick={() => {
                  if (reminderConfig.soundChimeEnabled) playVictoryChime();
                  onLogFocusSession(selectedPresetMinutes, focusTrack, focusTopicId);
                  setTimerStatusMsg(
                    `Logged +${selectedPresetMinutes} mins (${(
                      selectedPresetMinutes / 60
                    ).toFixed(2)} hrs) to Active Week & updated today's streak!`
                  );
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition"
                title="Finished early or forgot to run timer? Click to log this block immediately."
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Complete & Log {selectedPresetMinutes}m Now
              </button>
            </div>

            {timerStatusMsg && (
              <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-300 font-medium">
                {timerStatusMsg}
              </div>
            )}
          </div>
        </div>

        {/* Right: Daily Non-Negotiables, Streak & Anti-Slump Rescue Mode */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-4 h-4" /> Anti-Zero-Day Accountability & Streak Engine
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Today’s 4 Non-Negotiables ({todayISO})
                </h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-extrabold">
                <Flame className="w-4 h-4 text-amber-400" /> {currentStreak} Day Streak
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  field: 'raProblemsDone' as const,
                  title: '1. Solved 10–15 Numerical Problems in Today’s RA Block',
                  sub: 'Working Rule #1: Never watch lectures passively without solving problems immediately.',
                },
                {
                  field: 'activeRecallOrQuizDone' as const,
                  title: '2. Completed Active Recall Quiz or Reviewed Mistake Vault',
                  sub: 'Take a 5-Q Claude/Gemini quiz or review 3 formulas/traps below.',
                },
                {
                  field: 'ga15MinDone' as const,
                  title: '3. Completed Daily 15-Minute General Aptitude Sprint',
                  sub: 'Protects 15 marks in GATE RA + 15 marks in GATE DA = 30 high-ROI marks.',
                },
                {
                  field: 'trackerLogged' as const,
                  title: '4. Logged Honest Confidence (1–5) & Study Hours',
                  sub: 'Keeps spaced-repetition intervals (5d/10d/21d) and drift flags accurate.',
                },
              ].map((item) => {
                const checked = Boolean(todayCheckin[item.field]);
                return (
                  <button
                    key={item.field}
                    type="button"
                    onClick={() => onToggleDailyItem(todayISO, item.field)}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${
                      checked
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className={`text-xs font-bold ${checked ? 'line-through' : ''}`}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Emergency Exhausted Workday Rescue Protocol */}
            <div className="bg-rose-950/25 border border-rose-500/30 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1 min-w-[220px]">
                <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Exhausted After Full-Time Work? Never Lose 2 Weeks Again!
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  On brutal workdays, activate <b>25-Min No-Zero-Day Rescue Mode</b>: solve just 3
                  RA problems + 2 GA questions + 1 Mistake card to keep your momentum alive.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  selectPreset(25, 'raHours');
                  onToggleDailyItem(todayISO, 'rescueModeUsed');
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition shrink-0 ${
                  todayCheckin.rescueModeUsed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {todayCheckin.rescueModeUsed
                  ? '✓ Rescue Sprint Logged'
                  : 'Activate 25m Rescue Sprint'}
              </button>
            </div>
          </div>

          {/* 14-Day Momentum Strip */}
          <div className="pt-3 border-t border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Last 14 Days Consistency Heatmap (No Zero Days Policy):
            </div>
            <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5">
              {last14Days.map((d) => (
                <div
                  key={d.date}
                  title={`${d.date}: ${d.score} accountability points`}
                  className={`rounded-lg p-1.5 text-center border ${
                    d.score >= 3
                      ? 'bg-emerald-500/30 border-emerald-500/50 text-emerald-200'
                      : d.score >= 1
                      ? 'bg-indigo-500/25 border-indigo-500/40 text-indigo-200'
                      : d.isToday
                      ? 'bg-slate-900 border-amber-500/50 text-amber-300'
                      : 'bg-slate-950 border-slate-800/80 text-slate-500'
                  }`}
                >
                  <div className="text-[9px] font-mono">{d.date.slice(8, 10)}</div>
                  <div className="text-[10px] font-bold mt-0.5">
                    {d.score > 0 ? `${d.score}✓` : '·'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: GATE RA Top-AIR Mathematical Score Blueprint + Smart Desktop Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: GATE RA 72+/100 Top-AIR Score Simulator */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" /> GATE 2027 RA Top-AIR Score Blueprint (72+ / 100 Marks)
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                How You Beat Both Pure-Mechanical and Pure-Electrical Candidates
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Because <b>GATE RA</b> is a brand-new paper in 2027, Mechanical students will drop marks
            in <b>Circuits, Digital, Python/DSA, and Part B1 Electrical</b>, while Electrical
            students will skip <b>Robot Kinematics (DH/SE3), Mechanics, and CIM</b>. Your Maths +
            CSE background + robotics-ordered plan gives you a massive structural edge across all 4
            pillars:
          </p>

          <div className="space-y-3">
            {[
              {
                pillar: 'Pillar 1: General Aptitude (15 Marks)',
                strategy: 'Daily 15-min slot • Verbal, Quant, Analytical & Spatial',
                current: projectedGaMarks,
                target: 13.5,
                max: 15,
                color: 'bg-amber-500',
              },
              {
                pillar: 'Pillar 2: Engg Maths + Python + DSA (~20 Marks in Part A)',
                strategy:
                  'Your Unfair Advantage! Linear Algebra, Calculus, ODE/Laplace, Prob/Stats, Python & Graphs',
                current: projectedMathCsMarks,
                target: 17.0,
                max: 20,
                color: 'bg-cyan-500',
              },
              {
                pillar: 'Pillar 3: Mechatronics & Robotics Core (~40 Marks in Part A2 & A3)',
                strategy:
                  'Circuits (KCL/KVL/Thevenin/AC), Digital, Sensors, Actuators, FBD/Friction, Grübler DOF & DH Kinematics',
                current: projectedCoreRaMarks,
                target: 26.5,
                max: 40,
                color: 'bg-indigo-500',
              },
              {
                pillar: 'Pillar 4: Part B1 Electrical Specialisation (25 Marks)',
                strategy:
                  'Heavy priority on Control Systems (Routh/Bode/Root Locus/PID) + Signals & Systems; light-touch Op-Amps/ADC',
                current: projectedB1Marks,
                target: 16.0,
                max: 25,
                color: 'bg-emerald-500',
              },
            ].map((p) => {
              const pct = Math.min(100, Math.round((p.current / p.max) * 100));
              const targetPct = Math.round((p.target / p.max) * 100);
              return (
                <div
                  key={p.pillar}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-white">{p.pillar}</span>
                    <span className="font-mono text-slate-300">
                      Projected:{' '}
                      <b className="text-emerald-300">{p.current.toFixed(1)}</b> / Target:{' '}
                      <b className="text-amber-300">{p.target.toFixed(1)}</b> (Max {p.max})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{p.strategy}</div>
                  <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${p.color} transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-300"
                      style={{ left: `${targetPct}%` }}
                      title={`Top-AIR Target: ${p.target}/${p.max}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Desktop Notification & Reminder Configuration */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Bell className="w-4 h-4" /> Smart Desktop & Audio Reminder Engine
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Never Miss a Study Slot or Spaced Review
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fires browser desktop notifications and audio chimes at your daily study start times
                and alerts you whenever low-confidence topics resurface for review.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleEnableBrowserNotifications}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition"
              >
                <Bell className="w-3.5 h-3.5" />
                {reminderConfig.browserNotificationsEnabled
                  ? 'Desktop Alerts Active ✓'
                  : 'Enable Desktop Alerts'}
              </button>
              <button
                type="button"
                onClick={handleTestReminder}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> Test Alert & Chime Now
              </button>
            </div>

            {notifStatus && (
              <div className="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-xs text-indigo-200">
                {notifStatus}
              </div>
            )}

            <div className="space-y-3 bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Weekday Alert
                  </label>
                  <input
                    type="time"
                    value={reminderConfig.weekdayReminderTime}
                    onChange={(e) =>
                      onUpdateReminderConfig({
                        ...reminderConfig,
                        weekdayReminderTime: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Weekend Alert
                  </label>
                  <input
                    type="time"
                    value={reminderConfig.weekendReminderTime}
                    onChange={(e) =>
                      onUpdateReminderConfig({
                        ...reminderConfig,
                        weekendReminderTime: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    15m GA Nudge
                  </label>
                  <input
                    type="time"
                    value={reminderConfig.gaReminderTime}
                    onChange={(e) =>
                      onUpdateReminderConfig({
                        ...reminderConfig,
                        gaReminderTime: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Personal North-Star Commitment Statement (Editable):
                </label>
                <textarea
                  rows={2}
                  value={reminderConfig.personalWhy}
                  onChange={(e) =>
                    onUpdateReminderConfig({
                      ...reminderConfig,
                      personalWhy: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 p-2 text-xs text-slate-200"
                />
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            Tip: Keep this tab pinned in your browser—background interval checks will automatically
            chime and notify you at your configured times!
          </div>
        </div>
      </div>

      {/* Row 3: High-Yield Mistake & Formula Vault (Handoff Working Rule: Mistakes-Notebook Review) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <BookMarked className="w-4 h-4" /> High-Yield Mistake & Formula Vault (Active Error
              Notebook)
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Turn Every Diagnostic Gap & Quiz Trap Into Guaranteed Exam Marks
            </h3>
            <p className="text-xs text-slate-400">
              Pre-populated with your Oct 23 RA Diagnostic gaps (Thevenin, Max Power, Mod-10
              Counter, Curl of Gradient, Static Friction, Piezoelectric, Grübler DOF, 2nd-Order
              Damping). Review these during your Weekday Hour-2 slot!
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['ALL', 'UNMASTERED', 'MASTERED'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setMvFilter(f)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  mvFilter === f
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f === 'ALL'
                  ? `All Cards (${(state.mistakeVault || []).length})`
                  : f === 'UNMASTERED'
                  ? 'Needs Drill'
                  : 'Mastered ✓'}
              </button>
            ))}
          </div>
        </div>

        {/* Add New Mistake / Formula Card Form */}
        <form
          onSubmit={handleAddMistake}
          className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
        >
          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Track</label>
            <select
              value={mvPaper}
              onChange={(e) => setMvPaper(e.target.value as PaperCode)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-2 text-xs text-white"
            >
              <option value="RA">GATE RA</option>
              <option value="DA">GATE DA</option>
              <option value="GA">GATE GA</option>
              <option value="CCA_F">Claude CCA-F</option>
              <option value="GCP_PMLE">GCP PMLE</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Topic</label>
            <select
              value={mvTopicId}
              onChange={(e) => setMvTopicId(e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-2 text-xs text-white"
            >
              {state.topics.map((t) => (
                <option key={t.id} value={t.id}>
                  [{t.code}] {t.title}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Exam Trap / Mistake Made
            </label>
            <input
              type="text"
              required
              value={mvTrap}
              onChange={(e) => setMvTrap(e.target.value)}
              placeholder="e.g., Forgot sign of dependent source in Supermesh..."
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Core Formula / First-Principles Fix
            </label>
            <input
              type="text"
              required
              value={mvFix}
              onChange={(e) => setMvFix(e.target.value)}
              placeholder="e.g., Always write KVL around outer loop & constraint I1-I2=Is..."
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white"
            />
          </div>
          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </form>

        {/* Mistake Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mistakeList.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-4 flex flex-col justify-between gap-3 transition ${
                item.mastered
                  ? 'bg-emerald-950/15 border-emerald-500/30'
                  : 'bg-slate-950/90 border-slate-800'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[11px] font-bold">
                    {item.paper} • {item.topicTitle}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleMistakeMastered(item.id)}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition ${
                        item.mastered
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-emerald-500/20 hover:text-emerald-300'
                      }`}
                    >
                      {item.mastered ? 'Mastered ✓' : 'Mark Mastered'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteMistakeItem(item.id)}
                      className="text-slate-500 hover:text-rose-400 transition"
                      title="Delete card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-rose-300 bg-rose-950/30 border border-rose-500/20 rounded-lg p-2.5">
                  <b className="uppercase tracking-wider text-[10px] text-rose-400 block mb-0.5">
                    ⚠️ Trap / Gap:
                  </b>
                  {item.trapOrMistake}
                </div>

                <div className="text-xs text-emerald-200 bg-emerald-950/30 border border-emerald-500/20 rounded-lg p-2.5 font-mono leading-relaxed">
                  <b className="font-sans uppercase tracking-wider text-[10px] text-emerald-400 block mb-0.5">
                    ✅ Formula / Fix:
                  </b>
                  {item.coreFormulaOrFix}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span>Logged: {item.date}</span>
                <button
                  type="button"
                  onClick={() => onJumpToAIExaminer([item.topicId])}
                  className="text-indigo-300 hover:text-indigo-200 font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Drill 5 Similar Problems in Claude/Gemini →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
