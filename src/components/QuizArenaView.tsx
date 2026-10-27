import React, { useState } from 'react';
import { BUILTIN_QUIZZES } from '../data/quizzesData';
import { InteractiveQuiz, StudyTopic, TopicQuizLog } from '../types';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  RotateCcw,
  PlusCircle,
  BookOpen,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

interface QuizArenaModalProps {
  topics: StudyTopic[];
  globalQuizHistory: TopicQuizLog[];
  completedQuizIds: string[];
  onRecordQuizResult: (
    log: TopicQuizLog,
    quizId?: string,
    topicConfidenceUpdates?: { topicId: string; confidence: 1 | 2 | 3 | 4 | 5 }[]
  ) => void;
  onJumpToAIExaminer: (preselectedTopicIds: string[]) => void;
}

export const QuizArenaView: React.FC<QuizArenaModalProps> = ({
  topics,
  globalQuizHistory,
  completedQuizIds,
  onRecordQuizResult,
  onJumpToAIExaminer,
}) => {
  const [activeQuiz, setActiveQuiz] = useState<InteractiveQuiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Manual quiz log form state (for logging external Claude/Gemini or NPTEL mock scores)
  const [manualTitle, setManualTitle] = useState('');
  const [manualTopicId, setManualTopicId] = useState(topics[0]?.id || '');
  const [manualScore, setManualScore] = useState(8);
  const [manualTotal, setManualTotal] = useState(10);
  const [manualConfidence, setManualConfidence] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [manualNotes, setManualNotes] = useState('');

  const handleStartQuiz = (q: InteractiveQuiz) => {
    setActiveQuiz(q);
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const handleSelectOption = (questionId: string, option: string) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    setSubmitted(true);

    let correctCount = 0;
    const wrongTopics: string[] = [];
    const topicPerformance: Record<string, { right: number; total: number }> = {};

    for (const q of activeQuiz.questions) {
      if (!topicPerformance[q.topicId]) {
        topicPerformance[q.topicId] = { right: 0, total: 0 };
      }
      topicPerformance[q.topicId].total += 1;

      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
        topicPerformance[q.topicId].right += 1;
      } else {
        if (!wrongTopics.includes(q.topicName)) {
          wrongTopics.push(q.topicName);
        }
      }
    }

    const confidenceUpdates: { topicId: string; confidence: 1 | 2 | 3 | 4 | 5 }[] =
      Object.entries(topicPerformance).map(([topicId, stats]) => {
        const ratio = stats.right / stats.total;
        const conf: 1 | 2 | 3 | 4 | 5 =
          ratio >= 0.9 ? 5 : ratio >= 0.75 ? 4 : ratio >= 0.5 ? 3 : ratio >= 0.25 ? 2 : 1;
        return { topicId, confidence: conf };
      });

    const newLog: TopicQuizLog = {
      id: `quiz-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      quizTitle: activeQuiz.title,
      score: correctCount,
      total: activeQuiz.questions.length,
      notes: `Completed in-app interactive test (${Math.round(
        (correctCount / activeQuiz.questions.length) * 100
      )}%).`,
      wrongTopics,
    };

    onRecordQuizResult(newLog, activeQuiz.id, confidenceUpdates);
  };

  const handleLogManualQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;
    const newLog: TopicQuizLog = {
      id: `manual-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      quizTitle: manualTitle.trim(),
      score: Number(manualScore),
      total: Number(manualTotal),
      notes: manualNotes.trim() || undefined,
    };
    onRecordQuizResult(
      newLog,
      undefined,
      manualTopicId ? [{ topicId: manualTopicId, confidence: manualConfidence }] : undefined
    );
    setManualTitle('');
    setManualNotes('');
  };

  if (activeQuiz) {
    const totalQuestions = activeQuiz.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;
    const correctCount = activeQuiz.questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    const totalMarks = activeQuiz.questions.reduce((acc, q) => acc + q.marks, 0);
    const earnedMarks = activeQuiz.questions.reduce((acc, q) => {
      const ans = selectedAnswers[q.id];
      if (!ans) return acc;
      if (ans === q.correctAnswer) return acc + q.marks;
      // GATE negative marking: -1/3 for 1-mark MCQ, -2/3 for 2-mark MCQ
      return acc - q.marks / 3;
    }, 0);

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <span>{activeQuiz.paper} Paper</span>
              <span>•</span>
              <span>Phase {activeQuiz.phase}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {activeQuiz.durationMinutes} mins
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{activeQuiz.title}</h2>
            <p className="text-sm text-slate-400 mt-0.5">{activeQuiz.subtitle}</p>
          </div>
          <button
            onClick={() => setActiveQuiz(null)}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition"
          >
            ← Back to Quiz Hub
          </button>
        </div>

        {submitted && (
          <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-emerald-950/60 border border-indigo-500/40 rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Award className="w-5 h-5" /> Quiz Graded & Logged to Tracker!
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Score: {correctCount} / {totalQuestions} Correct (
                  {Math.round((correctCount / totalQuestions) * 100)}%)
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  GATE Net Marks (with -1/3 & -2/3 negative marking):{' '}
                  <span className="font-mono font-bold text-indigo-300">
                    {earnedMarks.toFixed(2)} / {totalMarks}.00
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setSubmitted(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Quiz
                </button>
                <button
                  onClick={() => {
                    const topicIds = Array.from(
                      new Set(activeQuiz.questions.map((q) => q.topicId))
                    );
                    onJumpToAIExaminer(topicIds);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold"
                >
                  <Sparkles className="w-4 h-4" /> Drill Missed Concepts with Claude / Gemini
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {activeQuiz.questions.map((q) => {
            const chosen = selectedAnswers[q.id];
            const isCorrect = chosen === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`rounded-xl border p-5 transition ${
                  submitted
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-xs font-semibold">
                      Q{q.questionNumber}
                    </span>
                    <span className="text-xs font-medium text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-md">
                      {q.topicName}
                    </span>
                    {q.gateProxySource && (
                      <span className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                        {q.gateProxySource}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {q.marks} {q.marks === 1 ? 'Mark (-0.33)' : 'Marks (-0.67)'}
                  </span>
                </div>

                <p className="text-slate-100 text-base leading-relaxed font-medium mb-4">
                  {q.questionText}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options?.map((opt) => {
                    const isSelected = chosen === opt;
                    const isThisCorrect = opt === q.correctAnswer;

                    let btnStyle =
                      'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-600';
                    if (!submitted && isSelected) {
                      btnStyle =
                        'bg-indigo-600/25 border-indigo-500 text-indigo-100 ring-1 ring-indigo-500';
                    } else if (submitted) {
                      if (isThisCorrect) {
                        btnStyle =
                          'bg-emerald-500/20 border-emerald-500 text-emerald-100 font-semibold';
                      } else if (isSelected && !isThisCorrect) {
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 line-through';
                      } else {
                        btnStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, opt)}
                        className={`text-left px-4 py-3 rounded-lg border text-sm transition flex items-center justify-between gap-2 ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && isThisCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {submitted && isSelected && !isThisCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 text-sm text-slate-300 bg-slate-950/60 rounded-lg p-4">
                    <div className="font-semibold text-indigo-300 mb-1">
                      Step-by-Step GATE Solution & Concept Note:
                    </div>
                    <p className="whitespace-pre-line text-slate-300 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div className="sticky bottom-4 bg-slate-900/95 backdrop-blur border border-slate-700 rounded-xl p-4 flex items-center justify-between shadow-2xl">
            <div className="text-sm text-slate-300">
              Answered{' '}
              <span className="font-bold text-white">
                {answeredCount} of {totalQuestions}
              </span>{' '}
              questions
            </div>
            <button
              type="button"
              onClick={handleSubmitQuiz}
              className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg transition"
            >
              Submit & Grade Quiz (Auto-Updates Topic Confidence)
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Built-in Interactive Quizzes */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Interactive GATE 2027 Quiz & Diagnostic Arena
            </h2>
            <p className="text-sm text-slate-400">
              Includes your Weekend 1 Mixed Circuits Quiz + skipped DA & GA Diagnostics from the
              handoff README. Grading automatically updates topic confidence & spaced-repetition
              review dates!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {BUILTIN_QUIZZES.map((quiz) => {
            const isCompleted = completedQuizIds.includes(quiz.id);
            return (
              <div
                key={quiz.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        quiz.paper === 'RA'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : quiz.paper === 'DA'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : quiz.paper === 'CCA_F'
                          ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                          : quiz.paper === 'GCP_PMLE'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {quiz.paper === 'CCA_F'
                        ? 'Anthropic CCA-F'
                        : quiz.paper === 'GCP_PMLE'
                        ? 'Google Cloud PMLE'
                        : `GATE ${quiz.paper}`}{' '}
                      • {quiz.questions.length} Qs
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {quiz.durationMinutes} min
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2">{quiz.title}</h3>
                  <p className="text-xs text-indigo-300/90 mt-1 font-medium">{quiz.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">{quiz.description}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  {isCompleted ? (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </span>
                  ) : (
                    <span className="text-xs text-amber-400 flex items-center gap-1 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5" /> Action Item Ready
                    </span>
                  )}
                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                  >
                    {isCompleted ? 'Retake / Review Solutions' : 'Start Interactive Quiz →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Log External Quiz (Claude / Gemini / NPTEL Mock) + Quiz History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            Log Claude / Gemini or NPTEL Quiz Result
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            After taking a custom quiz in Claude or Gemini, record your score here to update your
            topic confidence and spaced-repetition schedule.
          </p>

          <form onSubmit={handleLogManualQuiz} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Quiz / Mock Title
              </label>
              <input
                type="text"
                required
                value={manualTitle}
                onChange={(e) => setManualTitle(e.target.value)}
                placeholder="e.g., Claude Quiz: RC/RL Transients & Nodal Analysis"
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Linked Topic (Updates Confidence & Review Interval)
              </label>
              <select
                value={manualTopicId}
                onChange={(e) => setManualTopicId(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    [{t.code}] {t.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Score</label>
                <input
                  type="number"
                  min={0}
                  value={manualScore}
                  onChange={(e) => setManualScore(Number(e.target.value))}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Out Of</label>
                <input
                  type="number"
                  min={1}
                  value={manualTotal}
                  onChange={(e) => setManualTotal(Number(e.target.value))}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  New Confidence
                </label>
                <select
                  value={manualConfidence}
                  onChange={(e) =>
                    setManualConfidence(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)
                  }
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white"
                >
                  <option value={1}>1 / 5 (5d review)</option>
                  <option value={2}>2 / 5 (5d review)</option>
                  <option value={3}>3 / 5 (10d review)</option>
                  <option value={4}>4 / 5 (21d review)</option>
                  <option value={5}>5 / 5 (21d review)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Key Mistakes / Takeaways Note
              </label>
              <textarea
                rows={2}
                value={manualNotes}
                onChange={(e) => setManualNotes(e.target.value)}
                placeholder="e.g., Forgot conjugate matching Z_L = Z_th* for AC max power; need to review Supermesh signs."
                className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition"
            >
              Save Quiz Log & Update Spaced Repetition
            </button>
          </form>
        </div>

        {/* Quiz Log History */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <h3 className="text-base font-bold text-white mb-1">
            Quiz & Diagnostic Log History ({globalQuizHistory.length} Logged)
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Pre-populated with your Oct 23, 2026 RA Diagnostic Baseline (1/10) from the handoff
            README.
          </p>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {globalQuizHistory.map((log) => {
              const pct = Math.round((log.score / Math.max(1, log.total)) * 100);
              return (
                <div
                  key={log.id}
                  className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-4 flex flex-col gap-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono text-slate-400 mr-2">{log.date}</span>
                      <span className="text-sm font-bold text-white">{log.quizTitle}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-bold ${
                        pct >= 75
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : pct >= 40
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {log.score} / {log.total} ({pct}%)
                    </span>
                  </div>
                  {log.notes && <p className="text-xs text-slate-300">{log.notes}</p>}
                  {log.wrongTopics && log.wrongTopics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {log.wrongTopics.map((wt) => (
                        <span
                          key={wt}
                          className="text-[11px] px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300"
                        >
                          Gap: {wt}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
