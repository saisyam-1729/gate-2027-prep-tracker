import React from 'react';
import { RA_DIAGNOSTIC_BASELINE, ROADMAP_PHASES } from '../data/initialData';
import { TrackerState } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  BookOpen,
  Clock,
  Target,
  Activity,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface DashboardViewProps {
  state: TrackerState;
  onNavigateTab: (
    tab:
      | 'dashboard'
      | 'focus_air'
      | 'topics'
      | 'quizzes'
      | 'resources'
      | 'ai_handoff'
      | 'calendar_sync'
      | 'hours_log'
      | 'portfolio'
  ) => void;
  onJumpToQuiz: () => void;
  onJumpToAIExaminer: (topicIds: string[]) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  onNavigateTab,
  onJumpToQuiz,
  onJumpToAIExaminer,
}) => {
  const todayISO = new Date().toISOString().slice(0, 10);

  const totalTopics = state.topics.length;
  const doneTopics = state.topics.filter((t) => t.status === 'done').length;
  const inProgressTopics = state.topics.filter((t) => t.status === 'in_progress').length;

  const raTopics = state.topics.filter((t) => t.paper === 'RA' || t.paper === 'BOTH');
  const raDone = raTopics.filter((t) => t.status === 'done').length;

  const daTopics = state.topics.filter((t) => t.paper === 'DA' || t.paper === 'BOTH');
  const daDone = daTopics.filter((t) => t.status === 'done').length;

  const ccafTopics = state.topics.filter((t) => t.paper === 'CCA_F');
  const ccafDone = ccafTopics.filter((t) => t.status === 'done').length;

  const pmleTopics = state.topics.filter((t) => t.paper === 'GCP_PMLE');
  const pmleDone = pmleTopics.filter((t) => t.status === 'done').length;

  const dueReviewTopics = state.topics.filter(
    (t) => t.nextReviewDue && t.nextReviewDue <= todayISO && t.confidence > 0
  );
  const upcomingReviews = state.topics
    .filter((t) => t.nextReviewDue && t.confidence > 0)
    .sort((a, b) => (a.nextReviewDue || '').localeCompare(b.nextReviewDue || ''));

  const totalHoursLogged = state.weeklyHours.reduce(
    (acc, w) => acc + w.raHours + w.daHours + w.gaHours + (w.certHours || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Handoff Open Items Resolution Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950/70 border border-emerald-500/30 rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Session Handoff Open Items — All 4 Resolved &
              Active
            </div>
            <h2 className="text-base md:text-lg font-bold text-white mt-1">
              Revised Roadmap Active (24 Oct – 7 Feb) • RA Baseline 1/10 Logged • Starting
              Confidences Set
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  Phase dates shifted to Revised Schedule (Status Banner: <b>ON TRACK</b>)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  Starting Confidence = 1 set for Circuits, ODEs & Vector Calculus; RA diagnostic
                  (1/10) logged
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  Weekend 1 Mixed Circuits Quiz + DA & GA Diagnostics ready in Quiz Arena
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  Official IIT Madras GATE 2027 dates verified: Feb 6–7, 13–14, 20–21, 2027
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateTab('focus_air')}
              className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow transition flex items-center gap-1.5"
            >
              ⚡ Start 90m Focus Timer & Top-AIR Hub →
            </button>
            <button
              onClick={onJumpToQuiz}
              className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" /> Take Weekend 1 Circuits Quiz →
            </button>
            <button
              onClick={() =>
                onJumpToAIExaminer(['ra-a2-circuits-kcl-kvl', 'ra-a2-network-theorems'])
              }
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Test Me with Claude/Gemini
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>GATE RA Track (80% Split)</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-mono">
            {raDone} / {raTopics.length}{' '}
            <span className="text-xs font-sans font-normal text-slate-400">modules done</span>
          </div>
          <div className="mt-2 text-xs text-indigo-300">
            Common (60m) + Part B1 Electrical (25m) + GA (15m)
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>GATE DA Track (20% Split)</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-mono">
            {daDone} / {daTopics.length}{' '}
            <span className="text-xs font-sans font-normal text-slate-400">modules done</span>
          </div>
          <div className="mt-2 text-xs text-emerald-300">
            Focus: DBMS, Warehousing & Classical AI Gaps
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Spaced Repetition Queue</span>
            <RotateCcw className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-mono">
            {dueReviewTopics.length} Due Today{' '}
            <span className="text-xs font-sans font-normal text-slate-400">
              ({upcomingReviews.length} scheduled)
            </span>
          </div>
          <div className="mt-2 text-xs text-amber-300">
            Intervals: 5d (Low 1–2) • 10d (Med 3) • 21d (High 4–5)
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Study Hours & Active Topics</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-mono">
            {totalHoursLogged.toFixed(1)} hrs{' '}
            <span className="text-xs font-sans font-normal text-slate-400">
              ({inProgressTopics} active, {doneTopics}/{totalTopics} done)
            </span>
          </div>
          <div className="mt-2 text-xs text-cyan-300">
            Target: 15h/wk (~2h weekdays, 5–6h/day weekends)
          </div>
        </div>
      </div>

      {/* Current Phase & This Week's Action Plan + Spaced Repetition Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Phase 1 Weekly Execution Plan */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Active Phase 1: Foundations (Now – 29 Nov 2026)
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Immediate Execution Plan: Circuits, Network Theorems & DBMS
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('topics')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              Open Full Checklist <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                ⚡ Saturday Plan (5–6 Hours, 100% RA)
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>
                  <b>1. KCL, KVL, Node & Mesh Analysis (2 × 90m blocks):</b> Watch NPTEL Prof.
                  Nagendra Krishnapura lectures, then solve 15–20 problems immediately.
                </li>
                <li>
                  <b>2. Network Theorems (60m block):</b> Thevenin, Norton, Superposition & Maximum
                  Power Transfer (especially dependent source R_th).
                </li>
                <li>
                  <b>3. Last 15 mins:</b> Check off subtopics, rate confidence (1–5) honestly, and
                  note what confused you.
                </li>
              </ul>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                🧠 Sunday Plan (5–6 Hours, RA + DA + Quiz)
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>
                  <b>1. Finish Network Theorems + Problems (90m):</b> Complete AC/DC max power &
                  Norton conversions.
                </li>
                <li>
                  <b>2. RC/RL Transients & AC Basics (90m):</b> Master{' '}
                  <code className="text-indigo-300">x(t) = x(∞) + [x(0+) - x(∞)]e^(-t/τ)</code>.
                </li>
                <li>
                  <b>3. DA — DBMS Only (60m):</b> ER Model, Relational Algebra & Tuple Calculus.
                </li>
                <li>
                  <b>4. Mixed Weekend Quiz (45m) + Log Hours (15m):</b> Take the built-in 10-Q
                  Circuits Quiz or pass checked topics to Claude/Gemini.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3.5 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-bold text-white">Weekday Routine (~2 hrs/day):</span> Hour 1 on
              new material/problems • Hour 2 on topic quiz or mistake-notebook review + 15-min daily
              General Aptitude sprint + <span className="text-violet-300 font-semibold">~1.5h/wk Micro-Slot for GCP PMLE & Claude CCA-F</span>.
            </div>
            <button
              onClick={() => onNavigateTab('calendar_sync')}
              className="px-3 py-1.5 rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 font-semibold flex items-center gap-1 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" /> Sync to Calendar
            </button>
          </div>

          {/* Low-Footprint Certifications Micro-Track Card */}
          <div className="bg-gradient-to-r from-violet-950/40 via-slate-950 to-sky-950/40 border border-violet-500/30 rounded-xl p-4 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold uppercase tracking-wider text-violet-300">
                ☁️ Low-Footprint Certifications Micro-Track (~1.5 hrs/wk • Zero GATE Disruption)
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Claude CCA-F: {ccafDone}/{ccafTopics.length} Domains
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  GCP PMLE: {pmleDone}/{pmleTopics.length} Sections
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <b>How both fit without derailing GATE:</b> Leverage your full-time AI/ML role + GATE DA overlap! Do <b>one 25-min commute/lunch slot on Wed/Thu</b> + <b>one 45-min Sunday evening slot</b>:
              {' '}<b>Phases 1–2 (Oct–Dec):</b> Anthropic <i>Claude Certified Architect – Foundations</i> (5 domains) + GCP PMLE Sec 1–3 (BigQuery ML & Feature Store pair directly with GATE DA DBMS/Warehousing).{' '}
              <b>Phase 3 (Dec 28–Jan 17):</b> GCP PMLE Sec 4–6 (MLOps Pipelines, Serving & Explainable AI).{' '}
              <b>Phase 4 (Jan 18–Feb 7):</b> Paused for 100% GATE Mock Lock-in!
            </p>
          </div>
        </div>

        {/* Right: Spaced Repetition Resurface Queue */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Spaced Repetition Engine (5d / 10d / 21d)
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Upcoming & Due Topic Reviews
                </h3>
              </div>
            </div>

            <div className="space-y-2.5">
              {upcomingReviews.slice(0, 6).map((t) => {
                const isOverdue = Boolean(t.nextReviewDue && t.nextReviewDue <= todayISO);
                return (
                  <div
                    key={t.id}
                    className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${
                      isOverdue
                        ? 'bg-rose-950/30 border-rose-500/40'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        [{t.code}] {t.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Confidence: {t.confidence}/5</span>
                        <span>•</span>
                        <span className={isOverdue ? 'text-rose-400 font-bold' : 'text-indigo-300'}>
                          Resurfaces: {t.nextReviewDue}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onJumpToAIExaminer([t.id])}
                      className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-indigo-600 text-xs font-semibold text-slate-200 hover:text-white shrink-0 transition"
                    >
                      Quiz Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Rating confidence 1–2 schedules review in <b>5 days</b>, confidence 3 in <b>10 days</b>,
            and confidence 4–5 in <b>21 days</b>.
          </div>
        </div>
      </div>

      {/* RA Diagnostic Baseline Breakdown (1/10 Honest Baseline) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              RA Diagnostic Baseline Breakdown (1 / 10 Honest Baseline — Logged Oct 23, 2026)
            </h3>
            <p className="text-xs text-slate-400">
              Every diagnostic question below is mapped directly to its corresponding module in your
              tracker so you can turn each Gap into a 4/5 or 5/5 strength.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="py-2 px-3">Q#</th>
                <th className="py-2 px-3">Diagnostic Topic</th>
                <th className="py-2 px-3">Your Own Report</th>
                <th className="py-2 px-3">Read As</th>
                <th className="py-2 px-3">Actionable Remediation in Tracker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              {RA_DIAGNOSTIC_BASELINE.map((item) => (
                <tr key={item.qNum} className="hover:bg-slate-950/60">
                  <td className="py-2.5 px-3 font-mono font-bold text-indigo-400">Q{item.qNum}</td>
                  <td className="py-2.5 px-3 font-semibold text-white">{item.topic}</td>
                  <td className="py-2.5 px-3 text-slate-300">{item.userReport}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                        item.readAs === 'Gap'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {item.readAs}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{item.implication}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
