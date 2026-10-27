import React, { useState } from 'react';
import { TrackerState } from '../types';
import { AIQuizMode, generateAIExaminerPrompt } from '../utils/aiPromptGenerator';
import {
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  CheckSquare,
  Square,
  BrainCircuit,
} from 'lucide-react';

interface AIHandoffViewProps {
  state: TrackerState;
  initialSelectedTopicIds?: string[];
}

export const AIHandoffView: React.FC<AIHandoffViewProps> = ({
  state,
  initialSelectedTopicIds = [],
}) => {
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(
    initialSelectedTopicIds.length > 0
      ? initialSelectedTopicIds
      : state.topics
          .filter((t) => t.status === 'in_progress' || t.status === 'done')
          .map((t) => t.id)
  );
  const [mode, setMode] = useState<AIQuizMode>('topic_checkoff_quiz');
  const [questionCount, setQuestionCount] = useState<number>(8);
  const [difficulty, setDifficulty] = useState<
    'GATE_1_Mark_2_Mark_Mix' | 'Hard_2_Mark_Numerical_Focus' | 'Conceptual_Bridge'
  >('GATE_1_Mark_2_Mark_Mix');
  const [targetAI, setTargetAI] = useState<'Claude' | 'Gemini'>('Claude');
  const [copied, setCopied] = useState(false);
  const [paperFilter, setPaperFilter] = useState<
    'ALL' | 'RA' | 'DA' | 'GA' | 'CCA_F' | 'GCP_PMLE'
  >('ALL');

  const toggleTopicSelection = (id: string) => {
    setSelectedTopicIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const generatedPrompt = generateAIExaminerPrompt({
    state,
    mode,
    selectedTopicIds,
    questionCount,
    difficulty,
    targetAI,
  });

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredTopics = state.topics.filter((t) => {
    if (paperFilter === 'ALL') return true;
    if (paperFilter === 'RA') return t.paper === 'RA' || t.paper === 'BOTH';
    if (paperFilter === 'DA') return t.paper === 'DA' || t.paper === 'BOTH';
    return t.paper === paperFilter;
  });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900 to-violet-950/80 border border-indigo-500/30 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" /> Claude & Gemini Live Examiner Bridge
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Pass Checked-Off Progress to Claude or Gemini for Instant GATE Testing
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              As you check off subtopics, rate your confidence, and log notes, this generator
              compiles your exact real-time state, diagnostic baseline, and due spaced-repetition
              items into a structured prompt so Claude or Gemini can immediately quiz you at GATE
              2027 rigor.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="https://claude.ai/new"
              target="_blank"
              rel="noreferrer"
              onClick={handleCopyPrompt}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow transition"
            >
              Copy & Open Claude.ai <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://gemini.google.com/app"
              target="_blank"
              rel="noreferrer"
              onClick={handleCopyPrompt}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition"
            >
              Copy & Open Google Gemini <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Configuration Column */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              1. Configure Testing Mode & Rigor
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Target AI Assistant
                </label>
                <select
                  value={targetAI}
                  onChange={(e) => setTargetAI(e.target.value as 'Claude' | 'Gemini')}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white"
                >
                  <option value="Claude">Claude (Anthropic)</option>
                  <option value="Gemini">Gemini (Google)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Number of Questions
                </label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white"
                >
                  <option value={5}>5 Questions (15-min Quick Check)</option>
                  <option value={8}>8 Questions (30-min Topic Quiz)</option>
                  <option value={10}>10 Questions (45-min Weekend Mixed)</option>
                  <option value={15}>15 Questions (60-min Section Mock)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Examiner Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as AIQuizMode)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white"
              >
                <option value="topic_checkoff_quiz">
                  Topic Check-Off Quiz (Tests Checked Subtopics Only)
                </option>
                <option value="weekend_mixed_review">
                  Sunday Mixed Review (80% RA / 20% DA Context Switch)
                </option>
                <option value="spaced_repetition_drill">
                  Spaced-Repetition Drill (Targets 5d / 10d / 21d Due Topics)
                </option>
                <option value="socratic_concept_tutor">
                  Socratic First-Principles Tutor (Math → Robotics/Circuits Bridge)
                </option>
                <option value="full_section_mock">
                  Timed GATE CBT Mini-Mock (MCQ + MSQ + NAT with Negative Marking)
                </option>
                <option value="cert_scenario_examiner">
                  Certification Scenario Examiner (Google Cloud PMLE & Anthropic Claude CCA-F)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Difficulty Calibration
              </label>
              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(
                    e.target.value as
                      | 'GATE_1_Mark_2_Mark_Mix'
                      | 'Hard_2_Mark_Numerical_Focus'
                      | 'Conceptual_Bridge'
                  )
                }
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white"
              >
                <option value="GATE_1_Mark_2_Mark_Mix">
                  Authentic GATE Mix (1-Mark Conceptual + 2-Mark Numerical)
                </option>
                <option value="Hard_2_Mark_Numerical_Focus">
                  IIT Madras Hard 2-Mark NAT & Multi-Concept Focus
                </option>
                <option value="Conceptual_Bridge">
                  Intuitive First-Principles + Step-by-Step Guided Problems
                </option>
              </select>
            </div>
          </div>

          {/* Topic Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                2. Select Topics to Include ({selectedTopicIds.length})
              </h3>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedTopicIds(
                      state.topics
                        .filter((t) => t.status === 'done' || t.status === 'in_progress')
                        .map((t) => t.id)
                    )
                  }
                  className="text-[11px] px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30"
                >
                  Select Active/Done
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTopicIds([])}
                  className="text-[11px] px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {(['ALL', 'RA', 'DA', 'GA', 'CCA_F', 'GCP_PMLE'] as const).map((pf) => (
                <button
                  key={pf}
                  onClick={() => setPaperFilter(pf)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                    paperFilter === pf
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {pf === 'CCA_F' ? 'Claude CCA-F' : pf === 'GCP_PMLE' ? 'GCP PMLE' : pf}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 max-h-[310px] overflow-y-auto pr-1">
              {filteredTopics.map((t) => {
                const isSelected = selectedTopicIds.includes(t.id);
                const checkedCount = t.subtopics.filter((s) => s.completed).length;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTopicSelection(t.id)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition ${
                      isSelected
                        ? 'bg-indigo-950/50 border-indigo-500/50 text-white'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">
                        [{t.code}] {t.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Status: {t.status.replace('_', ' ')}</span>
                        <span>•</span>
                        <span>
                          Subtopics: {checkedCount}/{t.subtopics.length}
                        </span>
                        <span>•</span>
                        <span>Conf: {t.confidence || '-'}/5</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Live Prompt Output */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Live Context-Aware Handoff Prompt for {targetAI}
              </h3>
              <p className="text-xs text-slate-400">
                Automatically embeds your checked subtopics, confidence ratings, quiz logs, and
                spaced-repetition due list.
              </p>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Handoff Prompt
                </>
              )}
            </button>
          </div>

          <textarea
            readOnly
            value={generatedPrompt}
            className="w-full flex-1 min-h-[480px] rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 leading-relaxed focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
