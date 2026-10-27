export type PaperCode = 'RA' | 'DA' | 'GA' | 'BOTH' | 'GCP_PMLE' | 'CCA_F';
export type TopicStatus = 'not_started' | 'in_progress' | 'done';
export type PriorityLevel = 'core' | 'maintenance' | 'light_touch';
export type ResourceCategory =
  | 'youtube'
  | 'nptel'
  | 'github'
  | 'forum'
  | 'book'
  | 'pyq'
  | 'practice'
  | 'official';

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  category: ResourceCategory;
  paper: PaperCode;
  authorOrSource: string;
  description: string;
  verified?: boolean;
  tags?: string[];
}

export interface SubTopicItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface TopicQuizLog {
  id: string;
  date: string;
  quizTitle: string;
  score: number;
  total: number;
  notes?: string;
  wrongTopics?: string[];
}

export interface StudyTopic {
  id: string;
  code: string;
  title: string;
  paper: PaperCode;
  section: string;
  phase: 1 | 2 | 3 | 4;
  priority: PriorityLevel;
  estimatedHours: number;
  status: TopicStatus;
  confidence: 0 | 1 | 2 | 3 | 4 | 5; // 0 = unrated, 1..5 rated
  lastStudied?: string; // ISO date string
  nextReviewDue?: string; // ISO date string based on 5/10/21 day rule
  primaryResource: string;
  primaryResourceUrl: string;
  proxyPapers?: string; // For RA topics: EE, IN, ME, PI proxy papers
  syllabusExcerpt: string;
  subtopics: SubTopicItem[];
  links: {
    title: string;
    url: string;
    type: ResourceCategory;
  }[];
  notes: string;
  quizLogs: TopicQuizLog[];
}

export interface RoadmapPhase {
  id: 1 | 2 | 3 | 4;
  name: string;
  originalDates: string;
  revisedDates: string;
  startDate: string;
  endDate: string;
  raFocus: string;
  daFocus: string;
  certFocus?: string;
  targetHours: number;
}

export interface WeeklyHourEntry {
  weekNumber: number;
  label: string;
  startDate: string;
  endDate: string;
  targetHours: number;
  raHours: number;
  daHours: number;
  gaHours: number;
  certHours?: number;
  notes: string;
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  topicId: string;
  topicName: string;
  paper: PaperCode;
  questionType: 'MCQ' | 'MSQ' | 'NAT';
  marks: 1 | 2;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  gateProxySource?: string;
}

export interface InteractiveQuiz {
  id: string;
  title: string;
  subtitle: string;
  paper: PaperCode;
  phase: number;
  durationMinutes: number;
  description: string;
  questions: QuizQuestion[];
}

export interface DiagnosticBaselineItem {
  qNum: number;
  topic: string;
  topicId: string;
  userReport: string;
  readAs: 'Gap' | 'Rusty' | 'Solid';
  implication: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  phase: number;
  paper: PaperCode;
  status: TopicStatus;
  description: string;
  deliverables: string[];
  starterCodeSnippet: string;
  libraries: string[];
  githubRepoUrl?: string;
}

export interface SyncConfig {
  gistId: string;
  githubToken: string;
  lastSyncedAt?: string;
  autoSync: boolean;
  syncStatus: 'local_only' | 'synced' | 'syncing' | 'error';
  errorMessage?: string;
}

export interface MistakeVaultItem {
  id: string;
  date: string;
  paper: PaperCode;
  topicId: string;
  topicTitle: string;
  trapOrMistake: string;
  coreFormulaOrFix: string;
  mastered: boolean;
}

export interface DailyCheckinRecord {
  date: string; // YYYY-MM-DD
  raProblemsDone: boolean;
  activeRecallOrQuizDone: boolean;
  ga15MinDone: boolean;
  trackerLogged: boolean;
  rescueModeUsed?: boolean;
  focusMinutesLogged: number;
}

export interface ReminderConfig {
  browserNotificationsEnabled: boolean;
  weekdayReminderTime: string; // e.g., "20:00"
  weekendReminderTime: string; // e.g., "09:00"
  gaReminderTime: string; // e.g., "13:30"
  soundChimeEnabled: boolean;
  targetRaAir: string;
  targetRaMarks: number;
  targetDaMarks: number;
  personalWhy: string;
}

export interface TrackerState {
  version: string;
  lastUpdated: string;
  candidateName: string;
  enrollmentId: string;
  targetExamDate: string;
  topics: StudyTopic[];
  weeklyHours: WeeklyHourEntry[];
  portfolioProjects: PortfolioProject[];
  globalQuizHistory: TopicQuizLog[];
  completedQuizIds: string[];
  mistakeVault?: MistakeVaultItem[];
  dailyCheckins?: Record<string, DailyCheckinRecord>;
  reminderConfig?: ReminderConfig;
}
