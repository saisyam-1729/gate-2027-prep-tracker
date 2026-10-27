import React, { useState } from 'react';
import { ROADMAP_PHASES } from '../data/initialData';
import { PaperCode, StudyTopic, TopicStatus } from '../types';
import {
  CheckSquare,
  Square,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  Star,
  AlertCircle,
  Search,
  Filter,
} from 'lucide-react';

interface TopicTrackerViewProps {
  topics: StudyTopic[];
  onUpdateTopicStatus: (topicId: string, status: TopicStatus) => void;
  onUpdateTopicConfidence: (topicId: string, confidence: 0 | 1 | 2 | 3 | 4 | 5) => void;
  onToggleSubtopic: (topicId: string, subtopicId: string) => void;
  onUpdateTopicNotes: (topicId: string, notes: string) => void;
  onQuizMeWithAI: (topicId: string) => void;
}

export const TopicTrackerView: React.FC<TopicTrackerViewProps> = ({
  topics,
  onUpdateTopicStatus,
  onUpdateTopicConfidence,
  onToggleSubtopic,
  onUpdateTopicNotes,
  onQuizMeWithAI,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<0 | 1 | 2 | 3 | 4>(0); // 0 = All Phases
  const [paperFilter, setPaperFilter] = useState<'ALL' | PaperCode>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | TopicStatus | 'DUE_REVIEW'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<string[]>([
    'ra-a2-circuits-kcl-kvl',
    'ra-a2-network-theorems',
    'da-s5-dbms-er-relalg-sql',
  ]);

  const todayISO = new Date().toISOString().slice(0, 10);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredTopics = topics.filter((t) => {
    if (selectedPhase !== 0 && t.phase !== selectedPhase) return false;
    if (paperFilter !== 'ALL' && t.paper !== paperFilter && t.paper !== 'BOTH') return false;
    if (statusFilter === 'DUE_REVIEW') {
      if (!t.nextReviewDue || t.nextReviewDue > todayISO) return false;
    } else if (statusFilter !== 'ALL' && t.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q) ||
        t.syllabusExcerpt.toLowerCase().includes(q) ||
        t.primaryResource.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Phase Strip Selector */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <button
          onClick={() => setSelectedPhase(0)}
          className={`text-left p-3.5 rounded-xl border transition ${
            selectedPhase === 0
              ? 'bg-indigo-600/20 border-indigo-500 text-white'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            All 4 Phases
          </div>
          <div className="text-sm font-bold text-white mt-0.5">
            Complete Syllabus ({topics.length} Modules)
          </div>
          <div className="text-[11px] text-slate-400 mt-1">24 Oct 2026 – 7 Feb 2027</div>
        </button>

        {ROADMAP_PHASES.map((phase) => {
          const phaseTopics = topics.filter((t) => t.phase === phase.id);
          const doneCount = phaseTopics.filter((t) => t.status === 'done').length;
          return (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              className={`text-left p-3.5 rounded-xl border transition ${
                selectedPhase === phase.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-white'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-400">
                <span>Phase {phase.id}</span>
                <span className="font-mono text-emerald-400">
                  {doneCount}/{phaseTopics.length} Done
                </span>
              </div>
              <div className="text-xs font-bold text-white mt-1 line-clamp-1">
                {phase.name.replace(/^Phase \d: /, '')}
              </div>
              <div className="text-[11px] text-emerald-300/90 font-mono mt-1">
                {phase.revisedDates}
              </div>
            </button>
          );
        })}
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter topics by syllabus keyword, code, resource (e.g., Thevenin, DH, BCNF, Bode, Bayes)..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['ALL', 'RA', 'DA', 'BOTH', 'GA', 'CCA_F', 'GCP_PMLE'] as const).map((pf) => (
              <button
                key={pf}
                onClick={() => setPaperFilter(pf)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                  paperFilter === pf
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {pf === 'ALL'
                  ? 'All Tracks'
                  : pf === 'BOTH'
                  ? 'Shared RA+DA'
                  : pf === 'CCA_F'
                  ? 'Claude CCA-F'
                  : pf === 'GCP_PMLE'
                  ? 'GCP ML Eng'
                  : pf}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'ALL' | TopicStatus | 'DUE_REVIEW')
              }
              className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200"
            >
              <option value="ALL">All Statuses</option>
              <option value="in_progress">In Progress</option>
              <option value="not_started">Not Started</option>
              <option value="done">Completed ✓</option>
              <option value="DUE_REVIEW">🔄 Due for Spaced Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Topic Cards List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedIds.includes(topic.id);
          const completedSubs = topic.subtopics.filter((s) => s.completed).length;
          const totalSubs = topic.subtopics.length;
          const isDueReview = Boolean(
            topic.nextReviewDue && topic.nextReviewDue <= todayISO && topic.confidence > 0
          );

          return (
            <div
              key={topic.id}
              className={`rounded-xl border transition ${
                topic.status === 'done'
                  ? 'bg-emerald-950/15 border-emerald-500/40'
                  : topic.status === 'in_progress'
                  ? 'bg-indigo-950/20 border-indigo-500/40'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              {/* Topic Header Row */}
              <div className="p-5 flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-[280px]">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-xs font-bold">
                      {topic.code}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        topic.paper === 'RA'
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : topic.paper === 'DA'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : topic.paper === 'BOTH'
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : topic.paper === 'CCA_F'
                          ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                          : topic.paper === 'GCP_PMLE'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {topic.paper === 'BOTH'
                        ? 'SHARED RA + DA'
                        : topic.paper === 'CCA_F'
                        ? 'ANTHROPIC CCA-F'
                        : topic.paper === 'GCP_PMLE'
                        ? 'GOOGLE CLOUD PMLE'
                        : `GATE ${topic.paper}`}
                    </span>
                    <span className="text-xs text-slate-400">Phase {topic.phase}</span>
                    {topic.priority === 'light_touch' && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-medium">
                        Light-Touch Cut Policy
                      </span>
                    )}
                    {isDueReview && (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-bold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Review Due ({topic.nextReviewDue})
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(topic.id)}
                    className="text-left group flex items-center gap-2"
                  >
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-indigo-300 transition">
                      {topic.title}
                    </h3>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {/* Primary Resource Line (Handoff Requirement #4) */}
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <a
                      href={topic.primaryResourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-300 hover:text-indigo-200 font-medium inline-flex items-center gap-1 underline decoration-indigo-500/40"
                    >
                      📚 Primary Resource: {topic.primaryResource}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {topic.proxyPapers && (
                      <span className="text-slate-400">
                        🎯 Proxy PYQs: <span className="text-slate-300">{topic.proxyPapers}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Controls: Status, Confidence (1-5), Subtopics progress, AI Test button */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Confidence Rating 1..5 */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 mr-1">Confidence:</span>
                    {([1, 2, 3, 4, 5] as const).map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        title={`Set Confidence to ${rating}/5 (${
                          rating <= 2 ? '5d' : rating === 3 ? '10d' : '21d'
                        } spaced review)`}
                        onClick={() =>
                          onUpdateTopicConfidence(
                            topic.id,
                            topic.confidence === rating ? 0 : rating
                          )
                        }
                        className={`w-6 h-6 rounded text-xs font-mono font-bold transition flex items-center justify-center ${
                          topic.confidence >= rating
                            ? rating <= 2
                              ? 'bg-rose-500 text-white'
                              : rating === 3
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-900 text-slate-500 hover:bg-slate-800'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={topic.status}
                    onChange={(e) =>
                      onUpdateTopicStatus(topic.id, e.target.value as TopicStatus)
                    }
                    className={`rounded-lg px-3 py-2 text-xs font-bold border ${
                      topic.status === 'done'
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : topic.status === 'in_progress'
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done ✓</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => onQuizMeWithAI(topic.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Test Me (Claude/Gemini)
                  </button>
                </div>
              </div>

              {/* Subtopic Progress Bar */}
              <div className="px-5 pb-3 flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
                    style={{
                      width: `${Math.round((completedSubs / Math.max(1, totalSubs)) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {completedSubs}/{totalSubs} subtopics ({topic.estimatedHours}h est.)
                </span>
                {topic.nextReviewDue && (
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-400" /> Next Review: {topic.nextReviewDue}
                  </span>
                )}
              </div>

              {/* Expanded Details: Subtopic Checklists, Official Syllabus Excerpt, Curated Links, Notes */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-800/80 bg-slate-950/50 space-y-5">
                  <div className="text-xs text-slate-300 bg-slate-900/90 border border-slate-800 rounded-lg p-3">
                    <span className="font-bold text-indigo-300 uppercase tracking-wider mr-2">
                      Official GATE 2027 Syllabus Excerpt:
                    </span>
                    {topic.syllabusExcerpt}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Subtopic Checkboxes */}
                    <div className="lg:col-span-7 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Actionable Subtopic Checklist (Check off as you finish to feed Claude/Gemini):
                      </h4>
                      {topic.subtopics.map((sub) => (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => onToggleSubtopic(topic.id, sub.id)}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition ${
                            sub.completed
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200 line-through'
                              : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          {sub.completed ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <span>{sub.title}</span>
                        </button>
                      ))}
                    </div>

                    {/* Direct Topic Resource Links & Notes Box */}
                    <div className="lg:col-span-5 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Direct Topic Study Links (Videos, Notes & PYQs):
                        </h4>
                        <div className="space-y-1.5">
                          {topic.links.map((lnk, idx) => (
                            <a
                              key={idx}
                              href={lnk.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-indigo-300 transition"
                            >
                              <span className="truncate pr-2">{lnk.title}</span>
                              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400" /> Personal Notes, Formulas &
                          Confusion Points:
                        </h4>
                        <textarea
                          rows={3}
                          value={topic.notes}
                          onChange={(e) => onUpdateTopicNotes(topic.id, e.target.value)}
                          placeholder="Write formulas, tricky traps, or concepts that confused you (passed automatically to Claude/Gemini when testing)..."
                          className="w-full rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
