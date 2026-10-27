import { ROADMAP_PHASES } from '../data/initialData';
import { StudyTopic, TrackerState } from '../types';

export type AIQuizMode =
  | 'topic_checkoff_quiz'
  | 'weekend_mixed_review'
  | 'spaced_repetition_drill'
  | 'socratic_concept_tutor'
  | 'full_section_mock'
  | 'cert_scenario_examiner';

export function generateAIExaminerPrompt(params: {
  state: TrackerState;
  mode: AIQuizMode;
  selectedTopicIds: string[];
  questionCount: number;
  difficulty: 'GATE_1_Mark_2_Mark_Mix' | 'Hard_2_Mark_Numerical_Focus' | 'Conceptual_Bridge';
  targetAI: 'Claude' | 'Gemini';
}): string {
  const { state, mode, selectedTopicIds, questionCount, difficulty, targetAI } = params;

  const doneTopics = state.topics.filter((t) => t.status === 'done');
  const inProgressTopics = state.topics.filter((t) => t.status === 'in_progress');
  const selectedTopics: StudyTopic[] =
    selectedTopicIds.length > 0
      ? state.topics.filter((t) => selectedTopicIds.includes(t.id))
      : [...doneTopics, ...inProgressTopics].slice(0, 5);

  const today = new Date().toISOString().slice(0, 10);
  const dueForReview = state.topics.filter(
    (t) => t.nextReviewDue && t.nextReviewDue <= today && t.confidence > 0
  );

  const totalLoggedHours = state.weeklyHours.reduce(
    (acc, w) => acc + w.raHours + w.daHours + w.gaHours,
    0
  );

  const modeInstructions: Record<AIQuizMode, string> = {
    topic_checkoff_quiz: `Generate an interactive, rigorous ${questionCount}-question GATE-standard quiz ONLY on the selected topics and checked-off subtopics below. Present questions either one-by-one (waiting for my answer) or as a numbered test paper, then grade my responses with full step-by-step derivations and tell me what confidence rating (1 to 5) I should log back into my tracker.`,
    weekend_mixed_review: `Run my Weekly Mixed Review (${questionCount} questions: ~80% RA, ~20% DA) combining my recently completed/in-progress topics with my low-confidence gaps. Test whether I can switch contexts under exam pressure without hints.`,
    spaced_repetition_drill: `Run a Spaced-Repetition Retention Drill (${questionCount} questions) targeting my due-for-review topics (5-day low confidence / 10-day medium / 21-day high confidence). Focus specifically on the mistakes and notes I logged previously.`,
    socratic_concept_tutor: `Act as my Socratic Robotics & Data Science Professor. Walk me through the selected topic(s) from first principles, leveraging my strong Mathematics, Statistics, and CSE/ML background to build intuition for the electrical/mechanical/control concepts, then test me with ${questionCount} numerical problems.`,
    full_section_mock: `Simulate a timed GATE CBT Mini-Mock (${questionCount} questions with 1-mark and 2-mark weightage, including MCQ with -1/3 and -2/3 negative marking, MSQ, and NAT numerical questions).`,
    cert_scenario_examiner: `Generate ${questionCount} production scenario-based multiple-choice questions modeled strictly on the official Anthropic Claude Certified Architect – Foundations (CCA-F) and/or Google Cloud Professional Machine Learning Engineer (June 2026 Exam Guide) blueprints for the selected domains below. Include realistic architectural distractors and explain why each distractor fails in production.`,
  };

  const selectedTopicDetails = selectedTopics
    .map((t) => {
      const checkedSubs = t.subtopics.filter((s) => s.completed).map((s) => s.title);
      const pendingSubs = t.subtopics.filter((s) => !s.completed).map((s) => s.title);
      return [
        `• [${t.code}] ${t.title} (${t.paper} | Status: ${t.status.toUpperCase()} | Confidence: ${
          t.confidence === 0 ? 'Unrated' : `${t.confidence}/5`
        })`,
        `  - Official Syllabus Scope: ${t.syllabusExcerpt}`,
        t.proxyPapers ? `  - GATE Proxy Papers to emulate: ${t.proxyPapers}` : '',
        checkedSubs.length > 0
          ? `  - Checked-off Subtopics ✅: ${checkedSubs.join('; ')}`
          : `  - Checked-off Subtopics ✅: (Just starting / testing whole topic)`,
        pendingSubs.length > 0
          ? `  - Subtopics Still In Progress ⏳: ${pendingSubs.join('; ')}`
          : '',
        t.notes ? `  - My Study Notes / Confusion Points: "${t.notes}"` : '',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');

  const recentQuizSummary =
    state.globalQuizHistory.length > 0
      ? state.globalQuizHistory
          .slice(0, 5)
          .map(
            (q) =>
              `- [${q.date}] ${q.quizTitle}: ${q.score}/${q.total}${
                q.notes ? ` (${q.notes})` : ''
              }${
                q.wrongTopics && q.wrongTopics.length > 0
                  ? ` | Missed: ${q.wrongTopics.join(', ')}`
                  : ''
              }`
          )
          .join('\n')
      : '- [2026-10-23] RA Diagnostic Baseline: 1/10 (Only Q5 first-order ODE guessed intuitively)';

  return `# GATE 2027 Preparation State & Examiner Handoff (for ${targetAI})
Date: ${today} | Candidate: Sai Syam (@SyamP, Enrollment ID: ${state.enrollmentId})
Target Exams: GATE 2027 Robotics & Automation (RA - Part B1 Electrical) [80% time] + Data Science & AI (DA) [20% time]
Official Exam Window: Feb 6–7, 13–14, 20–21, 2027 (IIT Madras Organizing Institute)

## 1. Candidate Profile & Standing Rules (Do Not Reopen)
- Background: BSc (Maths, Econ, Stats), MSc (Maths & CS), M.Tech (CSE); Full-time Associate AI/ML Engineer.
- Strengths: Maths, Statistics, Python, DSA, Machine Learning.
- Starting Point in RA: Honest 1/10 on RA diagnostic baseline (no prior EE/ME coursework; building durable first-principles mastery for long-term robotics career).
- Specialisation: RA Part B1 (Electrical Engineering: Analog/Embedded, Signals & Systems, Control Systems).
- Cut Policy if time runs short: PDEs, Numerical Methods, Analog Circuits, and Embedded Systems are light-touch; Circuits, Sensors/Actuators, Kinematics, Control Systems, and Signals stay top priority.

## 2. Live Progress Snapshot from GATE 2027 Tracker
- Topics Completed: ${doneTopics.length} / ${state.topics.length}
- Topics In Progress: ${inProgressTopics.length}
- Total Study Hours Logged: ${totalLoggedHours.toFixed(1)} hrs (Target: 15 hrs/week)
- Current Roadmap Schedule:
${ROADMAP_PHASES.map((p) => `  * ${p.name}: ${p.revisedDates}`).join('\n')}

## 3. Recent Quiz & Diagnostic History
${recentQuizSummary}

## 4. Spaced-Repetition Topics Currently Due for Review (${dueForReview.length})
${
  dueForReview.length > 0
    ? dueForReview
        .map(
          (t) =>
            `- [${t.code}] ${t.title} (Confidence: ${t.confidence}/5, Due: ${t.nextReviewDue})`
        )
        .join('\n')
    : '- None overdue today.'
}

## 5. Selected Topics & Checked-Off Subtopics for This Testing Session
${selectedTopicDetails || 'No specific topic selected — test my current Phase 1 active topics (RA Circuits + DA DBMS).'}

---
## YOUR TASK FOR THIS SESSION (${mode.toUpperCase().replace(/_/g, ' ')})
${modeInstructions[mode]}

**Difficulty Calibration:** ${
    difficulty === 'GATE_1_Mark_2_Mark_Mix'
      ? 'Authentic GATE mix (40% 1-mark conceptual/quick numericals, 60% 2-mark multi-step NAT/MCQ/MSQ).'
      : difficulty === 'Hard_2_Mark_Numerical_Focus'
      ? 'High-rigor 2-mark GATE NAT & MCQ numerical problems (emulating IIT Madras paper style).'
      : 'First-principles conceptual bridge + guided numerical application.'
  }

At the end of our quiz, output a compact **"Tracker Update Block"** telling me:
1. My exact score (e.g., X/${questionCount}),
2. Recommended updated Confidence Score (1 to 5) for each tested topic,
3. Specific mistakes or formulas to paste into my topic Notes box.`;
}
