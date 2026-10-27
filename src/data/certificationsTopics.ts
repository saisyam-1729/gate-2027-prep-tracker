import { StudyTopic } from '../types';

export const CERTIFICATION_TOPICS: StudyTopic[] = [
  // ============================================================================
  // ANTHROPIC: CLAUDE CERTIFIED ARCHITECT – FOUNDATIONS (CCA-F)
  // 5 Official Exam Domains (60 Scenario Questions, 120 Mins, 720/1000 Pass)
  // ============================================================================
  {
    id: 'ccaf-d1-agentic-arch',
    code: 'CCAF-D1',
    title: 'Claude Architect D1: Agentic Architecture & Orchestration (27% Weight)',
    paper: 'CCA_F',
    section: 'Anthropic CCA-F Certification (Micro-Track)',
    phase: 1,
    priority: 'light_touch',
    estimatedHours: 2.5,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Anthropic Official CCA-F Study Guide (Domain 1) + Claude Code in Action (Skilljar)',
    primaryResourceUrl:
      'https://github.com/schinchli/cloud-certification-exam-prep/blob/main/Anthropic%20Claude/README.md',
    proxyPapers: 'CCA-F Official 12 Sample Questions & CCAR-F 30 Task Statements',
    syllabusExcerpt:
      'Task 1.1–1.7 (27% of exam): Agentic loops (stop_reason "tool_use" vs "end_turn"), multi-agent hub-and-spoke coordinator/subagent patterns, Task spawning & isolated subagent context, AgentDefinition configuration, SDK hooks (PostToolUse interception & deterministic policy enforcement), task decomposition (prompt chaining vs dynamic decomposition), and session state / fork_session.',
    subtopics: [
      {
        id: 'ccaf-d1-1',
        title: 'Task 1.1: Agentic loop lifecycle — checking stop_reason == "tool_use" vs "end_turn" (avoiding text-parsing anti-patterns & infinite loop caps)',
        completed: false,
      },
      {
        id: 'ccaf-d1-2',
        title: 'Task 1.2 & 1.3: Hub-and-spoke multi-agent orchestration — Coordinator routing vs isolated Subagent context (passing explicit context in Task prompt)',
        completed: false,
      },
      {
        id: 'ccaf-d1-3',
        title: 'Task 1.4 & 1.5: Multi-step enforcement & Agent SDK Hooks (PostToolUse data normalization & deterministic compliance blocks vs prompt-only hope)',
        completed: false,
      },
      {
        id: 'ccaf-d1-4',
        title: 'Task 1.6 & 1.7: Fixed pipeline (Prompt Chaining) vs Dynamic Adaptive Decomposition; session resumption (--resume), fork_session & stale context handling',
        completed: false,
      },
    ],
    links: [
      {
        title: 'Official CCA-F Complete Exam Guide + 12 Sample Questions (GitHub)',
        url: 'https://github.com/schinchli/cloud-certification-exam-prep/blob/main/Anthropic%20Claude/README.md',
        type: 'github',
      },
      {
        title: 'CCAR-F Interactive 30-Task-Statement Study Guide & Quizzes',
        url: 'https://ccar-f.17labs.ai/',
        type: 'practice',
      },
      {
        title: 'Anthropic Official Prep Courses (Skilljar Academy)',
        url: 'https://anthropic-partners.skilljar.com/page/claude-certified-architect-foundations-prep-courses',
        type: 'official',
      },
      {
        title: 'Awesome CCA-F Domain 1 Guide & Jupyter Notebook Lab',
        url: 'https://github.com/YiWang24/awesome-cca-f',
        type: 'github',
      },
    ],
    notes:
      'Micro-slot strategy: 25 mins on Wed/Thu evening. Key exam rule: When business rules require 100% deterministic guarantees (e.g., blocking >$500 refund or requiring identity verification first), use programmatic hooks/handoff gates rather than system prompt instructions alone.',
    quizLogs: [],
  },
  {
    id: 'ccaf-d2-tools-mcp',
    code: 'CCAF-D2',
    title: 'Claude Architect D2: Tool Design & MCP Integration (18% Weight)',
    paper: 'CCA_F',
    section: 'Anthropic CCA-F Certification (Micro-Track)',
    phase: 1,
    priority: 'light_touch',
    estimatedHours: 2.0,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Introduction to Model Context Protocol (Anthropic Skilljar) + CCA-F Domain 2 Guide',
    primaryResourceUrl:
      'https://anthropic-partners.skilljar.com/page/claude-certified-architect-foundations-prep-courses',
    proxyPapers: 'CCA-F Official Scenarios (Developer Productivity & Customer Support)',
    syllabusExcerpt:
      'Task 2.1–2.5 (18% of exam): Designing clear tool descriptions & input schemas, structured MCP error responses (isError: true, errorCategory, isRetryable), scoping tool distribution across agents (4–5 tools per subagent via allowedTools), MCP server configuration (.mcp.json, stdio vs sse, env var expansion), MCP resources vs tools, and built-in tools (Grep, Glob, Read, Write, Edit, Bash).',
    subtopics: [
      {
        id: 'ccaf-d2-1',
        title: 'Task 2.1: Tool interface design — detailed descriptions differentiating overlapping tools & consolidating redundant wrappers',
        completed: false,
      },
      {
        id: 'ccaf-d2-2',
        title: 'Task 2.2: Structured MCP error responses — isError: true flag, transient vs validation vs permission categories,isRetryable, and preserving partial results',
        completed: false,
      },
      {
        id: 'ccaf-d2-3',
        title: 'Task 2.3: Tool distribution & scoping — limiting subagents to 4–5 role-specific tools via allowedTools to prevent cross-role misuse',
        completed: false,
      },
      {
        id: 'ccaf-d2-4',
        title: 'Task 2.4 & 2.5: MCP .mcp.json config (${GITHUB_TOKEN} env expansion), MCP Resources (catalog exposure) vs Tools, and Glob (path match) vs Grep (content regex) → Read → Edit',
        completed: false,
      },
    ],
    links: [
      {
        title: 'Anthropic Official MCP & Tool Use Courses (GitHub anthropics/courses)',
        url: 'https://github.com/anthropics/courses',
        type: 'github',
      },
      {
        title: 'CCAR-F Domain 2 Task Statements (2.1–2.5) & Practice Items',
        url: 'https://ccar-f.17labs.ai/',
        type: 'practice',
      },
      {
        title: 'Awesome CCA-F Domain 2 Lab (02-tool-design-mcp.ipynb)',
        url: 'https://github.com/YiWang24/awesome-cca-f',
        type: 'github',
      },
    ],
    notes: '',
    quizLogs: [],
  },
  {
    id: 'ccaf-d3-claude-code',
    code: 'CCAF-D3',
    title: 'Claude Architect D3: Claude Code Configuration & Workflows (20% Weight)',
    paper: 'CCA_F',
    section: 'Anthropic CCA-F Certification (Micro-Track)',
    phase: 2,
    priority: 'light_touch',
    estimatedHours: 2.0,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Claude Code in Action (Anthropic Skilljar) + CCA-F Domain 3 Guide',
    primaryResourceUrl:
      'https://anthropic-partners.skilljar.com/page/claude-certified-architect-foundations-prep-courses',
    proxyPapers: 'CCA-F Official Scenario 3 (Claude Code for Large Codebases & CI/CD)',
    syllabusExcerpt:
      'Task 3.1–3.6 (20% of exam): CLAUDE.md configuration hierarchy (user ~/.claude/CLAUDE.md vs project root vs subdirectory & @import modularization), .claude/rules/ path-scoped YAML frontmatter globs, custom slash commands (.claude/commands/) vs Skills (.claude/skills/ SKILL.md with context: fork & allowed-tools), Plan Mode vs direct execution, iterative CLI verification, and CI/CD headless integration (-p / --print & --output-format json).',
    subtopics: [
      {
        id: 'ccaf-d3-1',
        title: 'Task 3.1 & 3.3: CLAUDE.md hierarchy (User vs Project vs Subdirectory) + .claude/rules/*.md with YAML frontmatter paths: ["**/*.test.tsx"] globs',
        completed: false,
      },
      {
        id: 'ccaf-d3-2',
        title: 'Task 3.2: Custom Slash Commands (.claude/commands/) vs Skills (.claude/skills/ SKILL.md with context: fork, allowed-tools, argument-hint)',
        completed: false,
      },
      {
        id: 'ccaf-d3-3',
        title: 'Task 3.4 & 3.5: Plan Mode (architectural multi-file migrations) vs Direct Execution (single-file bug fix), plus test-driven iterative refinement',
        completed: false,
      },
      {
        id: 'ccaf-d3-4',
        title: 'Task 3.6: CI/CD headless automation — claude -p ("--print" non-interactive mode), --output-format json, --json-schema, and independent review instances',
        completed: false,
      },
    ],
    links: [
      {
        title: 'Official CCA-F Exam Guide — Domain 3 Breakdown',
        url: 'https://github.com/schinchli/cloud-certification-exam-prep/blob/main/Anthropic%20Claude/README.md',
        type: 'github',
      },
      {
        title: 'CCAR-F Interactive Study Guide — Domain 3 (Tasks 3.1–3.6)',
        url: 'https://ccar-f.17labs.ai/',
        type: 'practice',
      },
    ],
    notes:
      'Key exam trap: ~/.claude/CLAUDE.md is user-local and NOT shared via git! Team-wide rules belong in root .claude/CLAUDE.md or .claude/rules/ committed to version control.',
    quizLogs: [],
  },
  {
    id: 'ccaf-d4-prompt-structured',
    code: 'CCAF-D4',
    title: 'Claude Architect D4: Prompt Engineering & Structured Output (20% Weight)',
    paper: 'CCA_F',
    section: 'Anthropic CCA-F Certification (Micro-Track)',
    phase: 2,
    priority: 'light_touch',
    estimatedHours: 2.0,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Building with the Claude API (Skilljar) + Anthropic Prompt Engineering Interactive Tutorial',
    primaryResourceUrl: 'https://github.com/anthropics/courses',
    proxyPapers: 'CCA-F Official Scenario 4 (Structured Data Extraction & Batch Processing)',
    syllabusExcerpt:
      'Task 4.1–4.6 (20% of exam): Explicit evaluation criteria vs vague instructions, few-shot prompting for ambiguous edge cases, guaranteed schema-compliant structured output via tool_use + input_schema + tool_choice, validation-retry-error feedback loops, Message Batches API (50% cost savings, up to 24h async processing, custom_id correlation), and multi-pass / multi-instance review architectures.',
    subtopics: [
      {
        id: 'ccaf-d4-1',
        title: 'Task 4.1 & 4.2: Explicit categorical criteria (reducing false positives) & targeted 2–4 few-shot examples with reasoning for edge cases',
        completed: false,
      },
      {
        id: 'ccaf-d4-2',
        title: 'Task 4.3: Guaranteed structured JSON via tool_use + JSON schema: tool_choice: "auto" vs "any" vs {"type": "tool", "name": "..."}, nullable optional fields & enumwith "other"',
        completed: false,
      },
      {
        id: 'ccaf-d4-3',
        title: 'Task 4.4: Validation-retry loops — feeding Pydantic/schema errors back with original document vs knowing when retry is futile (missing source info)',
        completed: false,
      },
      {
        id: 'ccaf-d4-4',
        title: 'Task 4.5 & 4.6: Message Batches API (50% discount, 24h max window, non-blocking workloads only, no multi-turn tool loops inside a single batch request) & multi-instance review',
        completed: false,
      },
    ],
    links: [
      {
        title: 'Anthropic Interactive Prompt Engineering & Tool Use Courses',
        url: 'https://github.com/anthropics/courses',
        type: 'github',
      },
      {
        title: 'CCAR-F Domain 4 Task Statements & Quiz (4.1–4.6)',
        url: 'https://ccar-f.17labs.ai/',
        type: 'practice',
      },
    ],
    notes: '',
    quizLogs: [],
  },
  {
    id: 'ccaf-d5-context-reliability',
    code: 'CCAF-D5',
    title: 'Claude Architect D5: Context Management & Reliability (15% Weight)',
    paper: 'CCA_F',
    section: 'Anthropic CCA-F Certification (Micro-Track)',
    phase: 2,
    priority: 'light_touch',
    estimatedHours: 1.5,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'CCA-F Official Exam Guide (Domain 5) + CCAR-F Interactive Guide',
    primaryResourceUrl:
      'https://github.com/schinchli/cloud-certification-exam-prep/blob/main/Anthropic%20Claude/README.md',
    proxyPapers: 'CCA-F Official 12 Sample Questions (Q9–Q12)',
    syllabusExcerpt:
      'Task 5.1–5.6 (15% of exam): Preserving critical facts across long contexts (extracting structured "case facts" blocks vs lossy progressive summarization, trimming verbose tool outputs, "lost in the middle" mitigation), escalation & ambiguity resolution patterns, error propagation in multi-agent systems, large codebase context management, and human review / claim-source provenance.',
    subtopics: [
      {
        id: 'ccaf-d5-1',
        title: 'Task 5.1 & 5.4: Context preservation — extracting persistent "case facts" blocks, trimming raw 40-field tool payloads to 5 needed fields, & scratchpad files',
        completed: false,
      },
      {
        id: 'ccaf-d5-2',
        title: 'Task 5.2: Escalation & ambiguity — honoring explicit customer escalation requests immediately vs resolving multiple-match ambiguity before escalating',
        completed: false,
      },
      {
        id: 'ccaf-d5-3',
        title: 'Task 5.3 & 5.5: Multi-agent partial results & source attribution — preserving claim-source mappings (URL, doc name, excerpt) & distinguishing empty results from timeout failures',
        completed: false,
      },
      {
        id: 'ccaf-d5-4',
        title: 'Task 5.6: Take the 12 Official Anthropic CCA-F Sample Questions & 49 CCAR-F Domain Practice Items',
        completed: false,
      },
    ],
    links: [
      {
        title: 'Official CCA-F 12 Sample Questions & Detailed Rationales',
        url: 'https://github.com/schinchli/cloud-certification-exam-prep/blob/main/Anthropic%20Claude/README.md#sample-questions',
        type: 'practice',
      },
      {
        title: 'Anthropic Certification Portal (Skilljar)',
        url: 'https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification',
        type: 'official',
      },
    ],
    notes: '',
    quizLogs: [],
  },

  // ============================================================================
  // GOOGLE CLOUD PROFESSIONAL MACHINE LEARNING ENGINEER (GCP-PMLE)
  // 6 Official June 2026 Exam Guide Domains (50–60 Questions, 120 Mins)
  // ============================================================================
  {
    id: 'pmle-s1-lowcode-genai',
    code: 'PMLE-S1',
    title: 'GCP ML Engineer Sec 1: Architecting Low-Code & GenAI Solutions (~13%)',
    paper: 'GCP_PMLE',
    section: 'Google Cloud Professional ML Engineer (Micro-Track)',
    phase: 1,
    priority: 'light_touch',
    estimatedHours: 2.0,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Official GCP PMLE June 2026 Exam Guide + BigQuery ML / Model Garden Docs',
    primaryResourceUrl:
      'https://services.google.com/fh/files/misc/professional_machine_learning_engineer_exam_guide_english_new.pdf',
    proxyPapers: 'AndyTheFactory/gcp-pmle-quiz (850 Qs)',
    syllabusExcerpt:
      'Section 1 (June 2026 Guide): 1.1 Developing ML models using BigQuery ML (classification, regression, ARIMA_PLUS forecasting, K-means, feature engineering with TRANSFORM, Gemini remote models in BQML) or AutoML on Gemini Enterprise Agent Platform. 1.2 Building AI solutions using Google Cloud AI APIs (Document AI, Vision, Speech, Translation) and Model Garden foundational models (Gemini, Imagen, Veo) with cost/latency optimization.',
    subtopics: [
      {
        id: 'pmle-s1-1',
        title: 'Decision Hierarchy: Pre-trained Cloud AI APIs (Vision, Document AI, Natural Language) → BigQuery ML (SQL tabular/forecasting) → AutoML → Custom Training',
        completed: false,
      },
      {
        id: 'pmle-s1-2',
        title: 'BigQuery ML (BQML): CREATE MODEL syntax, ML.TRANSFORM clause (prevents training-serving skew!), ML.EVALUATE, ML.EXPLAIN_PREDICT & calling Gemini from BigQuery',
        completed: false,
      },
      {
        id: 'pmle-s1-3',
        title: 'Gemini Enterprise Agent Platform Model Garden: Selecting & tuning Gemini, Imagen, Veo, and open-weight models (Gemma/Llama) for latency, cost & throughput',
        completed: false,
      },
    ],
    links: [
      {
        title: 'Official GCP PMLE Exam Guide PDF (June 1, 2026 Edition)',
        url: 'https://services.google.com/fh/files/misc/professional_machine_learning_engineer_exam_guide_english_new.pdf',
        type: 'official',
      },
      {
        title: 'AndyTheFactory/gcp-pmle-quiz (850 Practice Questions Repo)',
        url: 'https://github.com/AndyTheFactory/gcp-pmle-quiz',
        type: 'github',
      },
      {
        title: 'Google Cloud Professional ML Engineer Certification Page',
        url: 'https://cloud.google.com/learn/certification/machine-learning-engineer',
        type: 'official',
      },
    ],
    notes:
      'Synergy with GATE DA: BigQuery ML & SQL data transformations reinforce GATE DA Section 5 (DBMS & Data Warehousing)!',
    quizLogs: [],
  },
  {
    id: 'pmle-s2-data-featurestore',
    code: 'PMLE-S2',
    title: 'GCP ML Engineer Sec 2: Data Engineering, Feature Store & Prototyping (~16%)',
    paper: 'GCP_PMLE',
    section: 'Google Cloud Professional ML Engineer (Micro-Track)',
    phase: 2,
    priority: 'light_touch',
    estimatedHours: 2.5,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Google Cloud Skills Boost ML Engineer Path + AndyTheFactory/gcp-pmle-quiz',
    primaryResourceUrl: 'https://www.cloudskillsboost.google/paths/17',
    proxyPapers: 'angkj1995/GCP-MLE-Practice-Questions',
    syllabusExcerpt:
      'Section 2: 2.1 Exploring & preprocessing data (BigQuery SQL, Dataflow Apache Beam for streaming/unstructured, Dataproc Spark, Feature Store online low-latency vs offline batch serving, Cloud DLP PII redaction/tokenization). 2.2 Prototyping in Workbench & Colab Enterprise notebooks (IAM, VPC-SC, customer-managed encryption keys CMEK). 2.3 Tracking & running ML experiments.',
    subtopics: [
      {
        id: 'pmle-s2-1',
        title: 'Data Preprocessing Selection: BigQuery (SQL tabular) vs Cloud Dataflow / Apache Beam (streaming + unified batch/stream) vs Dataproc (migrating existing Spark/Hadoop)',
        completed: false,
      },
      {
        id: 'pmle-s2-2',
        title: 'Feature Store (Vertex AI / Agent Platform): Online serving (Bigtable/Optimized low-latency) vs Offline store (BigQuery), point-in-time lookups to prevent data leakage',
        completed: false,
      },
      {
        id: 'pmle-s2-3',
        title: 'Data Governance & PII: Cloud Data Loss Prevention (Sensitive Data Protection) — Redaction vs Masking vs Format-Preserving Encryption (FPE) vs Crypto-Hash for joins',
        completed: false,
      },
      {
        id: 'pmle-s2-4',
        title: 'Workbench & Colab Enterprise Best Practices: Service account least privilege, disabling public IP, VPC Service Controls, and Experiment tracking',
        completed: false,
      },
    ],
    links: [
      {
        title: 'angkj1995/GCP-MLE-Practice-Questions (GitHub)',
        url: 'https://github.com/angkj1995/GCP-MLE-Practice-Questions',
        type: 'github',
      },
      {
        title: 'Mastery Exam Prep — Official GCP PMLE 2026 Resource Guide',
        url: 'https://masteryexamprep.com/exams/gcp/professional-machine-learning-engineer/official-resources/',
        type: 'practice',
      },
    ],
    notes: '',
    quizLogs: [],
  },
  {
    id: 'pmle-s3-scaling-training',
    code: 'PMLE-S3',
    title: 'GCP ML Engineer Sec 3: Scaling Prototypes & Distributed Training (~18%)',
    paper: 'GCP_PMLE',
    section: 'Google Cloud Professional ML Engineer (Micro-Track)',
    phase: 2,
    priority: 'light_touch',
    estimatedHours: 2.5,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Official GCP PMLE Exam Guide Sec 3 + Vertex AI Distributed Training Docs',
    primaryResourceUrl:
      'https://services.google.com/fh/files/misc/professional_machine_learning_engineer_exam_guide_english_new.pdf',
    proxyPapers: 'AndyTheFactory/gcp-pmle-quiz',
    syllabusExcerpt:
      'Section 3 (~18%): Building custom training jobs (pre-built vs custom containers, PyTorch, JAX, Scikit-learn, TensorFlow), distributed training on GPUs/TPUs (Data Parallelism vs Model Parallelism, MirroredStrategy, MultiWorkerMirroredStrategy, TPUStrategy), Vizier hyperparameter tuning (Bayesian optimization, early stopping), and fine-tuning foundational models (PEFT/LoRA, supervised fine-tuning, RLHF).',
    subtopics: [
      {
        id: 'pmle-s3-1',
        title: 'Container Choice: Pre-built containers (standard frameworks) vs Custom Python package vs Custom Docker container (custom C++ deps / non-standard frameworks)',
        completed: false,
      },
      {
        id: 'pmle-s3-2',
        title: 'Distributed Training: MirroredStrategy (single-node multi-GPU), MultiWorkerMirroredStrategy (multi-node synchronous), TPUStrategy (Cloud TPU v4/v5e), & tf.data prefetch/interleave I/O bottleneck fixes',
        completed: false,
      },
      {
        id: 'pmle-s3-3',
        title: 'Hyperparameter Tuning (Vizier): Log-scale for learning rate, Bayesian optimization vs Grid/Random search, and automated early stopping (MedianStoppingRule)',
        completed: false,
      },
      {
        id: 'pmle-s3-4',
        title: 'GenAI Adaptation Ladder: Prompt Engineering / Few-Shot → RAG Grounding (dynamic facts) → Parameter-Efficient Fine-Tuning (LoRA for style/format) → RLHF',
        completed: false,
      },
    ],
    links: [
      {
        title: 'AndyTheFactory/gcp-pmle-quiz — Training & Scaling Practice',
        url: 'https://github.com/AndyTheFactory/gcp-pmle-quiz',
        type: 'github',
      },
    ],
    notes: '',
    quizLogs: [],
  },
  {
    id: 'pmle-s4-serving-scaling',
    code: 'PMLE-S4',
    title: 'GCP ML Engineer Sec 4: Serving, Scaling & GenAI Evaluation (~19%)',
    paper: 'GCP_PMLE',
    section: 'Google Cloud Professional ML Engineer (Micro-Track)',
    phase: 3,
    priority: 'light_touch',
    estimatedHours: 2.5,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Official GCP PMLE Exam Guide Sec 4 + Model Armor / Serving Docs',
    primaryResourceUrl:
      'https://services.google.com/fh/files/misc/professional_machine_learning_engineer_exam_guide_english_new.pdf',
    proxyPapers: 'AndyTheFactory/gcp-pmle-quiz',
    syllabusExcerpt:
      'Section 4 (~19%): Online prediction (low-latency synchronous REST/gRPC endpoints) vs Batch prediction (high-throughput asynchronous BigQuery/GCS), model compression (quantization FP32→INT8, pruning, knowledge distillation), autoscaling & GPU/CPU provisioning, canary traffic splitting, Edge/on-device deployment (TF Lite / LiteRT), and GenAI evaluation & Model Armor safety filters.',
    subtopics: [
      {
        id: 'pmle-s4-1',
        title: 'Online Prediction Endpoints (real-time user-facing, Private Endpoints via VPC Peering/PSC) vs Batch Prediction (nightly scoring of millions of BigQuery rows)',
        completed: false,
      },
      {
        id: 'pmle-s4-2',
        title: 'Latency & Cost Optimization: INT8 Post-Training Quantization, Knowledge Distillation (Teacher → Student), Dynamic Batching, and Nvidia Triton / vLLM serving',
        completed: false,
      },
      {
        id: 'pmle-s4-3',
        title: 'Safe Rollouts & GenAI Safety: Endpoint traffic splitting (90/10 canary), shadow deployments, GenAI Evaluation Service, and Model Armor (prompt injection & PII shields)',
        completed: false,
      },
    ],
    links: [
      {
        title: 'Mastery Exam Prep — Model Armor & GenAI Evaluation Notes',
        url: 'https://masteryexamprep.com/exams/gcp/professional-machine-learning-engineer/official-resources/',
        type: 'practice',
      },
    ],
    notes: '',
    quizLogs: [],
  },
  {
    id: 'pmle-s5-mlops-pipelines',
    code: 'PMLE-S5',
    title: 'GCP ML Engineer Sec 5: Automating & Orchestrating MLOps Pipelines (~21%)',
    paper: 'GCP_PMLE',
    section: 'Google Cloud Professional ML Engineer (Micro-Track)',
    phase: 3,
    priority: 'light_touch',
    estimatedHours: 3.0,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Vertex AI Pipelines (KFP v2 / TFX) + MLOps CI/CD Architecture Guide',
    primaryResourceUrl:
      'https://cloud.google.com/learn/certification/machine-learning-engineer',
    proxyPapers: 'AndyTheFactory/gcp-pmle-quiz (Highest-weight 21% section!)',
    syllabusExcerpt:
      'Section 5 (~21% — Highest Weight!): Orchestrating ML workflows with Vertex AI / Gemini Enterprise Agent Platform Pipelines (Kubeflow Pipelines KFP v2 vs TensorFlow Extended TFX), ML Metadata & artifact lineage, CI/CD for MLOps (Cloud Build, Artifact Registry, Model Registry approval gates), automated retraining triggers (Cloud Scheduler vs Eventarc/PubSub on data arrival or drift alert), and RAG / Vector Search pipelines.',
    subtopics: [
      {
        id: 'pmle-s5-1',
        title: 'Kubeflow Pipelines (KFP v2) vs TFX: When to use lightweight Python @dsl.component KFP vs full TF/TFDV/TFMA TFX components, plus caching & ML Metadata lineage',
        completed: false,
      },
      {
        id: 'pmle-s5-2',
        title: 'Event-Driven Continuous Training (CT): Cloud Storage / BigQuery event → Eventarc / PubSub → Cloud Functions / Cloud Run → Trigger Vertex AI Pipeline',
        completed: false,
      },
      {
        id: 'pmle-s5-3',
        title: 'CI/CD for MLOps: Git commit → Cloud Build (unit test components, compile pipeline YAML, push image to Artifact Registry) → Champion vs Challenger evaluation gate in Model Registry',
        completed: false,
      },
      {
        id: 'pmle-s5-4',
        title: 'Production RAG & Grounding Pipelines: Document chunking → Embeddings API → Vertex AI Vector Search (ScaNN approximate nearest neighbors) → Grounded Gemini generation',
        completed: false,
      },
    ],
    links: [
      {
        title: 'AndyTheFactory/gcp-pmle-quiz — MLOps & Pipelines Questions',
        url: 'https://github.com/AndyTheFactory/gcp-pmle-quiz',
        type: 'github',
      },
      {
        title: 'angkj1995/GCP-MLE-Practice-Questions',
        url: 'https://github.com/angkj1995/GCP-MLE-Practice-Questions',
        type: 'github',
      },
    ],
    notes: '',
    quizLogs: [],
  },
  {
    id: 'pmle-s6-monitoring-xai',
    code: 'PMLE-S6',
    title: 'GCP ML Engineer Sec 6: Monitoring, Drift/Skew & Explainable AI (~13%)',
    paper: 'GCP_PMLE',
    section: 'Google Cloud Professional ML Engineer (Micro-Track)',
    phase: 3,
    priority: 'light_touch',
    estimatedHours: 2.0,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Vertex Explainable AI & Model Monitoring Official Docs',
    primaryResourceUrl:
      'https://services.google.com/fh/files/misc/professional_machine_learning_engineer_exam_guide_english_new.pdf',
    proxyPapers: 'AndyTheFactory/gcp-pmle-quiz',
    syllabusExcerpt:
      'Section 6 (~13%): Monitoring AI solutions for Training-Serving Skew (serving feature distribution diverges from training baseline) vs Prediction Drift (serving feature distribution shifts over time when baseline is unavailable), Attribution Drift, Explainable AI methods (Sampled Shapley for tabular/any model, Integrated Gradients for differentiable neural nets, XRAI for image regions), and troubleshooting OOM/latency/permission errors.',
    subtopics: [
      {
        id: 'pmle-s6-1',
        title: 'Training-Serving Skew (compares live production requests to original training data) vs Prediction Drift (compares live production window t to window t-1 when training baseline is unavailable)',
        completed: false,
      },
      {
        id: 'pmle-s6-2',
        title: 'Explainable AI (XAI) Method Selection: Sampled Shapley (tabular / tree ensembles / black-box), Integrated Gradients (differentiable DNNs text/tabular), XRAI (region-level image superpixels)',
        completed: false,
      },
      {
        id: 'pmle-s6-3',
        title: 'Class Imbalance & Evaluation Metrics: Precision-Recall AUC (PR-AUC) for rare fraud/faults, ROC-AUC, Calibration, and fairness/bias slicing with What-If Tool / Model Evaluation',
        completed: false,
      },
    ],
    links: [
      {
        title: 'Official GCP PMLE Sample Questions & Exam Guide',
        url: 'https://cloud.google.com/learn/certification/machine-learning-engineer',
        type: 'official',
      },
    ],
    notes: '',
    quizLogs: [],
  },
];
