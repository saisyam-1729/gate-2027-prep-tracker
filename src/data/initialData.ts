import {
  DiagnosticBaselineItem,
  MistakeVaultItem,
  PortfolioProject,
  ReminderConfig,
  ResourceLink,
  RoadmapPhase,
  StudyTopic,
  WeeklyHourEntry,
} from '../types';
import { PHASE_1_AND_2_TOPICS } from './topicsPhase1And2';
import { PHASE_3_AND_4_TOPICS } from './topicsPhase3And4';
import { CERTIFICATION_TOPICS } from './certificationsTopics';

export const ALL_INITIAL_TOPICS: StudyTopic[] = [
  ...PHASE_1_AND_2_TOPICS,
  ...PHASE_3_AND_4_TOPICS,
  ...CERTIFICATION_TOPICS,
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 1,
    name: 'Phase 1: Foundations (Circuits, Engg Maths & DBMS)',
    originalDates: '19 Oct – 15 Nov 2026',
    revisedDates: '2 Nov – 6 Dec 2026',
    startDate: '2026-11-02',
    endDate: '2026-12-06',
    raFocus:
      'Circuits & network theorems (KCL/KVL, Node/Mesh, Thevenin/Norton/Max Power, Transients, AC), Digital circuits, ODEs, Laplace & Fourier, Vector calculus',
    daFocus:
      'DBMS: ER model, relational algebra, tuple calculus, SQL, normal forms (BCNF/3NF), file organization & B/B+ tree indexing',
    certFocus:
      'Micro-Slot (~1.5h/wk): Claude CCA-F Domains 1 & 2 (Agentic Loops, Subagents, Hooks, MCP) + GCP PMLE Sec 1 (BigQuery ML & Model Garden — pairs with DA SQL!)',
    targetHours: 75,
  },
  {
    id: 2,
    name: 'Phase 2: Robotics Core, Mechatronics & Classical AI',
    originalDates: '16 Nov – 20 Dec 2026',
    revisedDates: '7 Dec 2026 – 3 Jan 2027',
    startDate: '2026-12-07',
    endDate: '2027-01-03',
    raFocus:
      'Sensors & signal conditioning, Actuators (Hydraulic, Pneumatic, DC, Stepper, Servo), Engineering Mechanics, Robot Kinematics (2-Link Python FK), Automation & CIM, Python & DSA',
    daFocus:
      'Data warehousing (Star/Snowflake schemas, OLAP, measures) & Classical AI (A*, Minimax/Alpha-Beta, Propositional/Predicate Logic, Bayes Nets & Variable Elimination)',
    certFocus:
      'Micro-Slot (~1.5h/wk): Finish Claude CCA-F Domains 3–5 (CLAUDE.md, Structured Output, Context) & 12 Official Sample Qs + GCP PMLE Sec 2 & 3 (Feature Store, Dataflow, Distributed Training)',
    targetHours: 60,
  },
  {
    id: 3,
    name: 'Phase 3: Control Systems, Part B1 Electrical & DA Speed',
    originalDates: '21 Dec – 10 Jan 2027',
    revisedDates: '4 Jan – 24 Jan 2027',
    startDate: '2027-01-04',
    endDate: '2027-01-24',
    raFocus:
      'Control systems (Block/SFG, Time Response, Routh-Hurwitz, Root Locus, Bode, Nyquist, PID Simulation), Signals & Systems (LTI, Fourier, Laplace, Z, Sampling), Analog & Embedded (light-touch)',
    daFocus:
      'Timed high-speed revision of Probability & Statistics, Linear Algebra (SVD/LU/Projections), Calculus & Optimization, and Machine Learning',
    certFocus:
      'Micro-Slot (~1.5h/wk): GCP PMLE Sec 4, 5 & 6 (Serving, Kubeflow/Vertex MLOps Pipelines, Model Monitoring & Explainable AI — pairs with DA ML revision)',
    targetHours: 45,
  },
  {
    id: 4,
    name: 'Phase 4: Full Mocks, Numerical Methods & Weak-Topic Repair',
    originalDates: '11 Jan – 7 Feb 2027',
    revisedDates: '25 Jan – 5 Feb 2027',
    startDate: '2027-01-25',
    endDate: '2027-02-05',
    raFocus:
      'Topic tests, Numerical Methods (light-touch), NPTEL Sunday Mocks & 3 Full RA Composite Mocks (Common + Part B1 Electrical)',
    daFocus:
      'Official GATE DA 2024, 2025 & 2026 Full Timed CBT Mocks, GA 15/15 sprint & weak-topic repair',
    certFocus:
      'PAUSED (0h/wk): 100% GATE Exam Lock-in from 25 Jan. Sit for or finish GCP PMLE / Claude CCA-F before then, or right after GATE in mid-Feb 2027.',
    targetHours: 26,
  },
];

export const RA_DIAGNOSTIC_BASELINE: DiagnosticBaselineItem[] = [
  {
    qNum: 1,
    topic: 'Series circuit current',
    topicId: 'ra-a2-circuits-kcl-kvl',
    userReport: 'Did not know',
    readAs: 'Gap',
    implication: 'Start from KCL/KVL & Ohm’s law fundamentals in Weekend 1 Block 1.',
  },
  {
    qNum: 2,
    topic: 'Thevenin equivalent',
    topicId: 'ra-a2-network-theorems',
    userReport: 'Guessed, got lucky',
    readAs: 'Gap',
    implication: 'Master Vth (open-circuit) and Rth (independent vs dependent source deactivation) in Weekend 1.',
  },
  {
    qNum: 3,
    topic: 'Maximum power transfer',
    topicId: 'ra-a2-network-theorems',
    userReport: 'Did not know',
    readAs: 'Gap',
    implication: 'Learn RL = Rth (DC) and ZL = Zth* (AC), Pmax = Vth² / (4Rth).',
  },
  {
    qNum: 4,
    topic: 'Flip-flops in a mod-10 counter',
    topicId: 'ra-a2-digital-circuits',
    userReport: 'Did not know',
    readAs: 'Gap',
    implication: 'Quick digital logic win: N states require n flip-flops where 2^(n-1) < N ≤ 2^n (so Mod-10 needs 4 FFs).',
  },
  {
    qNum: 5,
    topic: 'First-order differential equation',
    topicId: 'ra-a13-ode-laplace',
    userReport: 'Guessed intuitively, needs refresh',
    readAs: 'Rusty',
    implication: 'Your only honest 1/10 point — Maths background is strong; 2 hours of integrating factor & separable ODE drills will lock this in.',
  },
  {
    qNum: 6,
    topic: 'Curl of a gradient',
    topicId: 'ra-a12-multivariable-vector-calc',
    userReport: 'Did not know',
    readAs: 'Rusty',
    implication: 'Memorize core vector identities: curl(grad f) = ∇ × (∇f) = 0 (conservative field is irrotational) and div(curl F) = ∇ · (∇ × F) = 0.',
  },
  {
    qNum: 7,
    topic: 'Static friction',
    topicId: 'ra-a2-eng-mechanics',
    userReport: 'Did not know',
    readAs: 'Gap',
    implication: 'Classic GATE trap: if applied force P < μs·N, static friction f = P (NOT μs·N!).',
  },
  {
    qNum: 8,
    topic: 'Piezoelectric sensor',
    topicId: 'ra-a2-sensors-conditioning',
    userReport: 'Guessed, got lucky',
    readAs: 'Gap',
    implication: 'Understand charge leakage: piezoelectric transducers measure dynamic pressure/vibration/acceleration, never steady static force.',
  },
  {
    qNum: 9,
    topic: 'Degrees of freedom of a manipulator',
    topicId: 'ra-a3-robotics-kinematics',
    userReport: 'Did not know',
    readAs: 'Gap',
    implication: 'Learn Grübler’s formula M = d(N - 1 - J) + ∑f_i (d=3 planar, d=6 spatial) in Phase 2.',
  },
  {
    qNum: 10,
    topic: 'Second-order damping',
    topicId: 'ra-b13-time-response',
    userReport: 'Did not know',
    readAs: 'Gap',
    implication: 'Standard form s² + 2ζωn·s + ωn² = 0; ζ < 1 underdamped, ζ = 1 critically damped, ζ > 1 overdamped.',
  },
];

export const INITIAL_REMINDER_CONFIG: ReminderConfig = {
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

export const INITIAL_MISTAKE_VAULT: MistakeVaultItem[] = [
  {
    id: 'mv-1',
    date: '2026-10-23',
    paper: 'RA',
    topicId: 'ra-a2-network-theorems',
    topicTitle: 'Network Theorems: Superposition & Maximum Power Transfer',
    trapOrMistake:
      'Diagnostic Q2/Q3 Gap: Trying to add power directly (P = P1 + P2) in Superposition, or forgetting how dependent sources & AC impedances affect Thevenin & Max Power Transfer.',
    coreFormulaOrFix:
      '1) Superposition applies ONLY to linear V and I; for power in same direction: P = (√P1 + √P2)². 2) With dependent sources, NEVER deactivate them—apply V_test/I_test. 3) Max Power: R_L = R_th (DC), Z_L = Z_th* (AC complex load), R_L = |Z_th| (AC resistive load), P_max = V_th² / (4 R_th).',
    mastered: false,
  },
  {
    id: 'mv-2',
    date: '2026-10-23',
    paper: 'RA',
    topicId: 'ra-a2-digital-circuits',
    topicTitle: 'Digital Circuits: Mod-N Counters & Flip-Flop Count',
    trapOrMistake:
      'Diagnostic Q4 Gap: Did not know how many flip-flops are required to construct a Mod-10 (decade) counter or what the unused states are.',
    coreFormulaOrFix:
      'For a Mod-N counter, minimum number of flip-flops n satisfies 2^(n-1) < N ≤ 2^n, i.e., n = ⌈log2(N)⌉. For Mod-10: 2³ < 10 ≤ 2⁴ => n = 4 flip-flops (6 unused states: 1010 to 1111). Output frequency = f_clk / N.',
    mastered: false,
  },
  {
    id: 'mv-3',
    date: '2026-10-23',
    paper: 'RA',
    topicId: 'ra-a12-multivariable-vector-calc',
    topicTitle: 'Vector Calculus: Curl of Gradient & Divergence of Curl',
    trapOrMistake:
      'Diagnostic Q6 Rusty: Forgot vector differential operator identities involving ∇ (del).',
    coreFormulaOrFix:
      '1) Curl of any scalar gradient is identically zero: ∇ × (∇f) = 0 (conservative field is irrotational). 2) Divergence of any vector curl is identically zero: ∇ · (∇ × F) = 0 (solenoidal). 3) ∇ · (∇f) = ∇²f (Laplacian).',
    mastered: false,
  },
  {
    id: 'mv-4',
    date: '2026-10-23',
    paper: 'RA',
    topicId: 'ra-a2-eng-mechanics',
    topicTitle: 'Engineering Mechanics: Static vs Kinetic Friction Trap',
    trapOrMistake:
      'Diagnostic Q7 Gap: Automatically plugging f = μ_s · N for friction force without checking if the block actually slips!',
    coreFormulaOrFix:
      'ALWAYS compute maximum impending static friction f_max = μ_s · N first. If applied tangential force P ≤ f_max, the body remains in static equilibrium and actual friction is f = P (NOT μ_s · N!). Only when P > f_max does motion occur with f = μ_k · N.',
    mastered: false,
  },
  {
    id: 'mv-5',
    date: '2026-10-23',
    paper: 'RA',
    topicId: 'ra-a2-sensors-conditioning',
    topicTitle: 'Sensors: Piezoelectric Transducer Static vs Dynamic Response',
    trapOrMistake:
      'Diagnostic Q8 Gap: Lucky guess on piezoelectric sensor; need crystal-clear understanding of why it cannot measure steady/static force.',
    coreFormulaOrFix:
      'Piezoelectric crystal generates charge Q = d · F with high output impedance (modeled as charge source || capacitor C_p). With input resistance R_in, it forms a high-pass filter with cutoff f_c = 1/(2π R_eq C_eq). At DC (ω = 0), charge leaks away—so it measures ONLY dynamic force, vibration, and acceleration (requires a Charge Amplifier).',
    mastered: false,
  },
  {
    id: 'mv-6',
    date: '2026-10-23',
    paper: 'RA',
    topicId: 'ra-a3-robotics-kinematics',
    topicTitle: 'Robot Kinematics: Grübler’s Degrees of Freedom (DOF) Formula',
    trapOrMistake:
      'Diagnostic Q9 Gap: Did not know how to compute the mobility (DOF) of planar or spatial mechanisms/manipulators.',
    coreFormulaOrFix:
      'Grübler-Kutzbach Formula: M = d(N - 1 - J) + ∑ f_i, where d = 3 for planar mechanisms (2 translations + 1 rotation) and d = 6 for spatial 3D mechanisms; N = total links (including fixed ground link!), J = total joints, f_i = DOF of joint i (1 for Revolute R or Prismatic P). For an open serial chain of n 1-DOF joints, M = n.',
    mastered: false,
  },
  {
    id: 'mv-7',
    date: '2026-10-23',
    paper: 'RA',
    topicId: 'ra-b13-time-response',
    topicTitle: 'Control Systems: 2nd-Order Characteristic Equation & Damping Ratio ζ',
    trapOrMistake:
      'Diagnostic Q10 Gap: Did not know how to extract natural frequency ω_n, damping ratio ζ, and peak overshoot M_p from a 2nd-order transfer function.',
    coreFormulaOrFix:
      'Standard denominator: s² + 2ζω_n·s + ω_n² = 0. 1) Match constant term to get ω_n = √(constant). 2) Match s-coefficient to get 2ζω_n => ζ. 3) Damped frequency ω_d = ω_n√(1 - ζ²). 4) Peak overshoot M_p = exp(-πζ / √(1 - ζ²)) × 100%. 5) 2% Settling time t_s ≈ 4 / (ζω_n).',
    mastered: false,
  },
  {
    id: 'mv-8',
    date: '2026-10-27',
    paper: 'DA',
    topicId: 'da-s5-dbms-norm-indexing',
    topicTitle: 'DBMS: 3NF vs BCNF Prime-Attribute Rule',
    trapOrMistake:
      'Common GATE DA/CS Trap: Declaring a relation in 2NF instead of 3NF when RHS of a non-superkey FD is a prime attribute (part of a candidate key).',
    coreFormulaOrFix:
      'For every non-trivial FD X → Y: BCNF requires X to be a Superkey. 3NF allows X to be a Superkey OR every attribute in Y to be a Prime Attribute (belongs to at least one candidate key).',
    mastered: false,
  },
];

export const INITIAL_WEEKLY_HOURS: WeeklyHourEntry[] = [
  {
    weekNumber: 0,
    label: 'Before 2 Nov 2026 — diagnostic only',
    startDate: '2026-10-12',
    endDate: '2026-11-01',
    targetHours: 0,
    raHours: 1,
    daHours: 0,
    gaHours: 0,
    notes:
      'Not part of the active plan. RA diagnostic on 23 Oct was 1/10 (~1h). Study slots on 24, 25, and 26 Oct were missed. The plan begins Monday 2 Nov 2026.',
  },
  {
    weekNumber: 1,
    label: 'Week 1 (2–8 Nov) — Phase 1 starts: Circuits',
    startDate: '2026-11-02',
    endDate: '2026-11-08',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes:
      'Day 1 is Monday 2 Nov: KCL/KVL, node and mesh. Sat 7 Nov and Sun 8 Nov are the first circuits weekend (theorems, then a short DBMS block and the circuits quiz).',
  },
  {
    weekNumber: 2,
    label: 'Week 2 (9–15 Nov) — Phase 1: Transients, AC & Digital start',
    startDate: '2026-11-09',
    endDate: '2026-11-15',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'RC/RL transients, AC basics, combinational digital logic + DBMS ER, relational algebra, and SQL.',
  },
  {
    weekNumber: 3,
    label: 'Week 3 (16–22 Nov) — Phase 1: Digital Sequential & ODEs',
    startDate: '2026-11-16',
    endDate: '2026-11-22',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'Counters/Flip-Flops, first and higher-order ODEs + DBMS normal forms and B+ tree indexing.',
  },
  {
    weekNumber: 4,
    label: 'Week 4 (23–29 Nov) — Phase 1: Laplace, Fourier & Vector Calc',
    startDate: '2026-11-23',
    endDate: '2026-11-29',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'Laplace transforms, Fourier series, gradient, divergence, and curl.',
  },
  {
    weekNumber: 5,
    label: 'Week 5 (30 Nov – 6 Dec) — Phase 1 checkpoint',
    startDate: '2026-11-30',
    endDate: '2026-12-06',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'Two-port networks, AC resonance, DBMS revision, and the Phase 1 foundations checkpoint.',
  },
  {
    weekNumber: 6,
    label: 'Week 6 (7–13 Dec) — Phase 2: Sensors & Actuators',
    startDate: '2026-12-07',
    endDate: '2026-12-13',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'Resistive, capacitive, inductive, and piezoelectric sensors; DC, stepper, and servo motors + data warehousing.',
  },
  {
    weekNumber: 7,
    label: 'Week 7 (14–20 Dec) — Phase 2: Engineering Mechanics',
    startDate: '2026-12-14',
    endDate: '2026-12-20',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'Free-body diagrams, friction, trusses, rigid-body plane motion + classical AI search (A*, alpha-beta).',
  },
  {
    weekNumber: 8,
    label: 'Week 8 (21–27 Dec) — Phase 2: Robot Kinematics & 2-Link Python Arm',
    startDate: '2026-12-21',
    endDate: '2026-12-27',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'Degrees of freedom, SO(3)/SE(3), DH forward kinematics, 2-link Python arm + classical AI logic.',
  },
  {
    weekNumber: 9,
    label: 'Week 9 (28 Dec – 3 Jan) — Phase 2: CIM, Python/DSA & Bayes Nets',
    startDate: '2026-12-28',
    endDate: '2027-01-03',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'CNC, PLC, AGV, shared Python/DSA + Bayesian networks and variable elimination.',
  },
  {
    weekNumber: 10,
    label: 'Week 10 (4–10 Jan) — Phase 3: Control Systems I',
    startDate: '2027-01-04',
    endDate: '2027-01-10',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'City allotment is 4 Jan. Block diagrams, signal-flow graphs, second-order time response, Routh-Hurwitz, root locus + timed probability and statistics.',
  },
  {
    weekNumber: 11,
    label: 'Week 11 (11–17 Jan) — Phase 3: Control II & Signals I',
    startDate: '2027-01-11',
    endDate: '2027-01-17',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'Bode, Nyquist, PID Python simulation, LTI signals + timed linear algebra.',
  },
  {
    weekNumber: 12,
    label: 'Week 12 (18–24 Jan) — Phase 3: Signals II, Op-Amps & last cert week',
    startDate: '2027-01-18',
    endDate: '2027-01-24',
    targetHours: 15,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'Sampling theorem, Z-transform, op-amps, ADC/DAC, MCU basics + timed ML and calculus. Cert micro-track pauses after Sunday 24 Jan.',
  },
  {
    weekNumber: 13,
    label: 'Week 13 (25–31 Jan) — Phase 4: Topic tests & Mock 1',
    startDate: '2027-01-25',
    endDate: '2027-01-31',
    targetHours: 16,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'Numerical-methods formula sprint, full DA 2024 paper, and RA composite mock 1. Certs stay paused.',
  },
  {
    weekNumber: 14,
    label: 'Week 14 (1–5 Feb) — Formula polish, then exams',
    startDate: '2027-02-01',
    endDate: '2027-02-05',
    targetHours: 10,
    raHours: 0,
    daHours: 0,
    gaHours: 0,
    notes: 'Monday–Friday light formula review only. GATE 2027 exams begin 6–7 Feb, then 13–14 and 20–21 Feb.',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-fk-2link',
    title: 'Portfolio Project 1: 2-Link & 3-Link Planar Robot Arm Forward Kinematics & Workspace Visualizer',
    phase: 2,
    paper: 'RA',
    status: 'not_started',
    description:
      'Implement homogeneous transformation matrices T_01(θ1) and T_12(θ2) from scratch in NumPy, verify with Denavit-Hartenberg (DH) tables and Peter Corke’s robotics-toolbox-python, and plot the reachable workspace and Jacobian manipulability ellipses.',
    deliverables: [
      'Pure NumPy SE(2)/SE(3) Homogeneous Transformation & DH Forward Kinematics module',
      'Interactive Matplotlib animation of a 2R planar arm tracking a circular continuous-path trajectory',
      'Reachable vs Dexterous Workspace scatter plot for link ratios L1 > L2 and L1 = L2',
      'Verification unit tests against NxRLab/ModernRobotics (FKinSpace / FKinBody)',
    ],
    libraries: ['numpy', 'matplotlib', 'modern_robotics', 'roboticstoolbox-python'],
    starterCodeSnippet: `import numpy as np
import matplotlib.pyplot as plt

def dh_transform(a: float, alpha: float, d: float, theta: float) -> np.ndarray:
    """Standard Denavit-Hartenberg 4x4 Homogeneous Transformation Matrix."""
    ct, st = np.cos(theta), np.sin(theta)
    ca, sa = np.cos(alpha), np.sin(alpha)
    return np.array([
        [ct, -st * ca,  st * sa, a * ct],
        [st,  ct * ca, -ct * sa, a * st],
        [0.0,      sa,       ca,      d],
        [0.0,     0.0,      0.0,    1.0]
    ])

def forward_kinematics_2r(L1: float, L2: float, theta1: float, theta2: float):
    """Returns joint-1 position (x1, y1), end-effector (x2, y2), and T_02 matrix."""
    T01 = dh_transform(a=L1, alpha=0.0, d=0.0, theta=theta1)
    T12 = dh_transform(a=L2, alpha=0.0, d=0.0, theta=theta2)
    T02 = T01 @ T12
    p1 = T01[:2, 3]
    p2 = T02[:2, 3]
    return p1, p2, T02

if __name__ == "__main__":
    p1, p2, T02 = forward_kinematics_2r(L1=1.0, L2=0.8, theta1=np.pi/4, theta2=np.pi/6)
    print("End-effector (x, y):", np.round(p2, 4))
    print("Homogeneous Transform T_02:\\n", np.round(T02, 4))`,
  },
  {
    id: 'proj-pid-sim',
    title: 'Portfolio Project 2: Closed-Loop PID Controller Simulation for a Robotic DC Servo Joint',
    phase: 3,
    paper: 'RA',
    status: 'not_started',
    description:
      'Simulate a 2nd-order DC servo actuator with inertia J, viscous damping b, and gravity disturbance torque. Compare P, PI, PD, and PID controllers (with anti-windup and derivative filtering) and compute GATE time-domain specs (rise time tr, peak overshoot Mp%, settling time ts, steady-state error ess).',
    deliverables: [
      'Discrete-time RK4 / Euler simulation of a 2nd-order actuator under P, PI, PD, and PID control',
      'Automated GATE Time-Response Calculator: extracts ωn, ζ, tr, tp, Mp%, ts(2%), and ess',
      'Comparison plots showing how Ki eliminates steady-state error (raises system Type) and Kd increases damping ζ',
      'Ziegler-Nichols & Root-Locus pole placement tuning comparison',
    ],
    libraries: ['numpy', 'scipy', 'matplotlib', 'control'],
    starterCodeSnippet: `import numpy as np

def simulate_pid_servo(Kp: float, Ki: float, Kd: float, dt=0.001, T_end=5.0):
    """Simulates a 2nd-order robotic joint J*theta_dd + b*theta_d = u + d_torque."""
    J, b = 0.05, 0.2          # Inertia (kg*m^2) and viscous friction (N*m*s/rad)
    steps = int(T_end / dt)
    theta, omega = 0.0, 0.0
    integral_err, prev_err = 0.0, 0.0
    ref = 1.0                 # 1 rad step command
    disturbance = -0.15       # Constant gravity load torque (tests PI steady-state error!)

    history = np.zeros((steps, 3))
    for k in range(steps):
        err = ref - theta
        integral_err += err * dt
        deriv_err = (err - prev_err) / dt if k > 0 else 0.0
        u = Kp * err + Ki * integral_err + Kd * deriv_err
        prev_err = err

        alpha = (u + disturbance - b * omega) / J
        omega += alpha * dt
        theta += omega * dt
        history[k] = [k * dt, theta, u]

    peak = np.max(history[:, 1])
    overshoot_pct = max(0.0, (peak - ref) / ref * 100.0)
    ss_error = abs(ref - history[-1, 1])
    return history, overshoot_pct, ss_error

if __name__ == "__main__":
    _, mp_pd, ess_pd = simulate_pid_servo(Kp=4.0, Ki=0.0, Kd=0.6)
    _, mp_pid, ess_pid = simulate_pid_servo(Kp=4.0, Ki=6.0, Kd=0.6)
    print(f"PD Controller  -> Overshoot: {mp_pd:.2f}%, Steady-State Error: {ess_pd:.4f} rad")
    print(f"PID Controller -> Overshoot: {mp_pid:.2f}%, Steady-State Error: {ess_pid:.4f} rad")`,
  },
];

export const CURATED_RESOURCE_VAULT: ResourceLink[] = [
  // OFFICIAL GATE 2027 LINKS
  {
    id: 'res-official-iitm',
    title: 'GATE 2027 Official Portal — IIT Madras',
    url: 'https://gate2027.iitm.ac.in/',
    category: 'official',
    paper: 'BOTH',
    authorOrSource: 'IIT Madras (Organizing Institute)',
    description: 'Official announcements, GOAPS login, city allotment (Jan 4, 2027), admit card, and exam schedule (Feb 6–7, 13–14, 20–21, 2027).',
    verified: true,
    tags: ['Official', 'Dates', 'GOAPS'],
  },
  {
    id: 'res-official-ra-syllabus',
    title: 'Official GATE 2027 RA (Robotics & Automation) Syllabus PDF',
    url: 'https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/RA_GATE2027_Syllabus.pdf',
    category: 'official',
    paper: 'RA',
    authorOrSource: 'IIT Madras',
    description: 'Official syllabus for the new RA paper: Part A Common (60 marks) + Part B1 Electrical / B2 Mechanical (25 marks) + GA (15 marks).',
    verified: true,
    tags: ['Syllabus', 'RA'],
  },
  {
    id: 'res-official-da-2026-qp',
    title: 'Official GATE 2026 DA Question Paper & Answer Keys',
    url: 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/DA.pdf',
    category: 'official',
    paper: 'DA',
    authorOrSource: 'IIT Madras Official Download Archive',
    description: 'Direct PDF of the official 2026 GATE Data Science & Artificial Intelligence paper hosted on gate2027.iitm.ac.in.',
    verified: true,
    tags: ['PYQ', 'DA', '2026'],
  },
  {
    id: 'res-official-pattern',
    title: 'GATE 2027 Question Paper Pattern & Marking Distribution (RA & DA)',
    url: 'https://gate2027.iitm.ac.in/question_paper_pattern',
    category: 'official',
    paper: 'BOTH',
    authorOrSource: 'IIT Madras',
    description: 'Confirms RA breakdown: 15 Marks GA + 60 Marks Common + 25 Marks Part B1/B2 = 100 Marks. DA: 15 Marks GA + 85 Marks Subject.',
    verified: true,
    tags: ['Pattern', 'Marks'],
  },
  {
    id: 'res-nptel-gate-portal',
    title: 'NPTEL GATE Preparation Portal & Free Sunday Live Mock Tests',
    url: 'https://gate.nptel.ac.in/exam.html',
    category: 'official',
    paper: 'BOTH',
    authorOrSource: 'NPTEL & IITs',
    description: 'Topic-mapped NPTEL lectures, video solutions to past GATE questions, and live GATE 2027 Mock Tests every Sunday (2:00 PM – 5:00 PM IST).',
    verified: true,
    tags: ['Mocks', 'NPTEL', 'Video Solutions'],
  },

  // GITHUB REPOSITORIES
  {
    id: 'res-gh-dsai-gate',
    title: 'DS-AI-GATE/dsai-gate — Complete GATE DA Community Resource Repo',
    url: 'https://github.com/DS-AI-GATE/dsai-gate',
    category: 'github',
    paper: 'DA',
    authorOrSource: 'DS-AI-GATE Community (2.4k+ Stars)',
    description: 'The #1 open-source GitHub repository for GATE DA: syllabus-aligned notebooks, notes, books, NPTEL links, and PYQs across all 7 sections.',
    verified: true,
    tags: ['GitHub', 'DA', 'Notes', 'Notebooks'],
  },
  {
    id: 'res-gh-dsai-explorer',
    title: 'DS-AI-GATE Interactive Syllabus Explorer & Memory Map',
    url: 'https://ds-ai-gate.github.io/dsai-gate/',
    category: 'github',
    paper: 'DA',
    authorOrSource: 'DS-AI-GATE',
    description: 'Interactive web syllabus explorer and mind-map for GATE Data Science & AI.',
    verified: true,
    tags: ['Interactive', 'DA', 'Mindmap'],
  },
  {
    id: 'res-gh-go-pdfs-da',
    title: 'GATEOverflow/GO-PDFs — GATE DA 2026 PYQ & Question Bank PDF Release',
    url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateda-2026',
    category: 'github',
    paper: 'DA',
    authorOrSource: 'GATEOverflow (@arjunsuresh)',
    description: 'Downloadable 22 MB PDF (da.pdf) compiling GATE DA, relevant GATE CSE, and UGC NET questions with verified community solutions.',
    verified: true,
    tags: ['GitHub', 'PYQ', 'GATEOverflow'],
  },
  {
    id: 'res-gh-iitm-gate-da',
    title: 'iitmbsc-student-projects/gate-da — IITM BS Student GATE DA Question Bank',
    url: 'https://github.com/iitmbsc-student-projects/gate-da',
    category: 'github',
    paper: 'DA',
    authorOrSource: 'IIT Madras BS Students',
    description: 'Actively maintained GATE DA question bank with worked solutions for GATE 2024 & 2025 DA papers.',
    verified: true,
    tags: ['GitHub', 'IITM', 'PYQ'],
  },
  {
    id: 'res-gh-shayan-notes',
    title: 'shayan-ing/GATE-DA-NOTES — Handwritten & Typed Subject Notes + Solved PYQs',
    url: 'https://github.com/shayan-ing/GATE-DA-NOTES',
    category: 'github',
    paper: 'DA',
    authorOrSource: 'shayan-ing',
    description: 'Topic-wise handwritten and typed PDFs covering ML, AI, Linear Algebra, Prob/Stats, Calculus, Python, DSA, DBMS, and Data Warehousing.',
    verified: true,
    tags: ['GitHub', 'Handwritten Notes', 'Data Warehousing'],
  },
  {
    id: 'res-gh-modern-robotics',
    title: 'NxRLab/ModernRobotics — Official Modern Robotics Python/MATLAB Code Library',
    url: 'https://github.com/NxRLab/ModernRobotics',
    category: 'github',
    paper: 'RA',
    authorOrSource: 'Prof. Kevin Lynch & Northwestern University (2.8k+ Stars)',
    description: 'pip install modern_robotics — Clean educational Python implementations of SO(3), SE(3), screw axes, forward/inverse kinematics, and dynamics.',
    verified: true,
    tags: ['GitHub', 'Robotics', 'Python', 'Kinematics'],
  },
  {
    id: 'res-gh-corke-toolbox',
    title: 'petercorke/robotics-toolbox-python — Robotics Toolbox for Python',
    url: 'https://github.com/petercorke/robotics-toolbox-python',
    category: 'github',
    paper: 'RA',
    authorOrSource: 'Prof. Peter Corke',
    description: 'Standard Python library for Denavit-Hartenberg (DHRobot, RevoluteDH, PrismaticDH) forward/inverse kinematics, trajectories, and 3D plotting.',
    verified: true,
    tags: ['GitHub', 'DH Parameters', 'Python'],
  },
  {
    id: 'res-gh-python-control',
    title: 'python-control/python-control — Python Control Systems Library',
    url: 'https://github.com/python-control/python-control',
    category: 'github',
    paper: 'RA',
    authorOrSource: 'Python Control Developers',
    description: 'Transfer functions, step_response, root_locus, bode_plot, nyquist_plot, margin (GM/PM), and PID simulation in Python.',
    verified: true,
    tags: ['GitHub', 'Control Systems', 'PID'],
  },

  // YOUTUBE CHANNELS & NPTEL PLAYLISTS
  {
    id: 'res-yt-krishnapura-circuits',
    title: 'NPTEL Basic Electrical Circuits — Prof. Nagendra Krishnapura (IIT Madras)',
    url: 'https://www.youtube.com/playlist?list=PLdzewXO9j7aqkQARDMKuuboDmRahPHLWy',
    category: 'nptel',
    paper: 'RA',
    authorOrSource: 'Prof. Nagendra Krishnapura (IIT Madras)',
    description: 'Gold-standard 12-week IIT Madras course covering KCL/KVL, Nodal, Mesh, Thevenin/Norton, Two-Port, Op-Amps, 1st/2nd Order Transients & AC Phasors.',
    verified: true,
    tags: ['Circuits', 'Phase 1', 'IIT Madras'],
  },
  {
    id: 'res-yt-modern-robotics',
    title: 'Modern Robotics: Mechanics, Planning, and Control (All Videos Playlist)',
    url: 'https://www.youtube.com/playlist?list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx',
    category: 'youtube',
    paper: 'RA',
    authorOrSource: 'Prof. Kevin Lynch (Northwestern University)',
    description: 'Crystal-clear short videos on Grübler’s DOF formula, Configuration Space, Rotation Matrices, Homogeneous Transformations, Forward Kinematics & Trajectories.',
    verified: true,
    tags: ['Robotics', 'Kinematics', 'Phase 2'],
  },
  {
    id: 'res-yt-iitm-intro-robotics',
    title: 'NPTEL Introduction to Robotics — Prof. Asokan T, Prof. B. Ravindran, Prof. K. Vasudevan (IIT Madras)',
    url: 'https://www.youtube.com/playlist?list=PLyqSpQzTE6M_XM9cvjLLO_Azt1FkgPhpH',
    category: 'nptel',
    paper: 'RA',
    authorOrSource: 'IIT Madras (GATE 2027 Organizing Institute)',
    description: 'Must-watch! Weeks 1–4 cover Coordinate Transformations & DH Forward Kinematics; Weeks 5–8 cover DC Motors, H-Bridges, BLDC, Stepper Motors & Encoders.',
    verified: true,
    tags: ['Robotics', 'Actuators', 'IIT Madras'],
  },
  {
    id: 'res-yt-brian-douglas',
    title: 'Brian Douglas — All Control System Lecture Videos (26-Video Masterclass)',
    url: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L',
    category: 'youtube',
    paper: 'RA',
    authorOrSource: 'Brian Douglas (Control Systems Lectures)',
    description: 'Best visual intuition for LTI systems, Transfer Functions, Routh-Hurwitz (including special cases), Bode Plots by hand, Nyquist, Root Locus, Lead/Lag & PID.',
    verified: true,
    tags: ['Control Systems', 'Phase 3', 'Part B1'],
  },
  {
    id: 'res-yt-neso-digital',
    title: 'Neso Academy — Digital Electronics Complete GATE Playlist',
    url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm',
    category: 'youtube',
    paper: 'RA',
    authorOrSource: 'Neso Academy',
    description: 'Comprehensive exam-focused coverage of Boolean algebra, K-Maps, MUX/Decoders, Flip-Flops (SR, JK, D, T), and Mod-N Synchronous/Asynchronous Counters.',
    verified: true,
    tags: ['Digital Circuits', 'Phase 1'],
  },
  {
    id: 'res-yt-neso-signals',
    title: 'Neso Academy — Signals and Systems Complete Playlist',
    url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRhG6s3jYIU48CqsT5cyiDTO',
    category: 'youtube',
    paper: 'RA',
    authorOrSource: 'Neso Academy',
    description: 'Covers signal shifting/scaling, RMS/average values, LTI causality/stability, Fourier Series/Transform, Laplace, Z-Transform & Sampling Theorem with GATE PYQs.',
    verified: true,
    tags: ['Signals & Systems', 'Part B1'],
  },
  {
    id: 'res-yt-3b1b',
    title: '3Blue1Brown — Essence of Linear Algebra, Calculus & Differential Equations',
    url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
    category: 'youtube',
    paper: 'BOTH',
    authorOrSource: 'Grant Sanderson (3Blue1Brown)',
    description: 'Unmatched geometric intuition for Eigenvalues, SVD, Divergence & Curl, ODEs, and Fourier Series.',
    verified: true,
    tags: ['Maths', 'Intuition'],
  },
  {
    id: 'res-yt-nptel-mechatronics',
    title: 'NPTEL Mechatronics — Prof. Pushparaj Mani Pathak (IIT Roorkee)',
    url: 'https://archive.nptel.ac.in/courses/112/107/112107298/',
    category: 'nptel',
    paper: 'RA',
    authorOrSource: 'Prof. P.M. Pathak (IIT Roorkee)',
    description: 'Directly maps to RA Section A.2: Sensors & Transducers (Week 2), Hydraulic/Pneumatic/Electrical Actuators (Week 3), Op-Amp Signal Conditioning & ADC/DAC (Week 4), Microcontrollers (Week 5), PLCs & PID (Week 7).',
    verified: true,
    tags: ['Mechatronics', 'Sensors', 'Actuators', 'PLC'],
  },
  {
    id: 'res-yt-nptel-dbms',
    title: 'NPTEL Data Base Management System — Prof. Partha Pratim Das (IIT Kharagpur)',
    url: 'https://www.youtube.com/playlist?list=PLMtBdv6WGV58X1rbEEO89nZyIj3ca3Hew',
    category: 'nptel',
    paper: 'DA',
    authorOrSource: 'Prof. Partha Pratim Das & Prof. S. Chattopadhyay (IIT KGP)',
    description: 'Rigorous IIT Kharagpur course covering ER Modeling, Relational Algebra, Tuple Relational Calculus, SQL, Functional Dependencies, Normal Forms (3NF/BCNF) & B+ Tree Indexing.',
    verified: true,
    tags: ['DBMS', 'DA', 'Phase 1'],
  },
  {
    id: 'res-yt-nptel-ai-khemani',
    title: 'NPTEL AI: Search Methods for Problem Solving — Prof. Deepak Khemani (IIT Madras)',
    url: 'https://www.youtube.com/playlist?list=PLEAYkSg4uSQ1FaQoCxoFvmMFnBsHTBokj',
    category: 'nptel',
    paper: 'DA',
    authorOrSource: 'Prof. Deepak Khemani (IIT Madras)',
    description: 'Taught by IIT Madras faculty: Uninformed/Informed Search, A* admissibility & consistency, and Adversarial Search (Minimax & Alpha-Beta Pruning).',
    verified: true,
    tags: ['Classical AI', 'DA', 'IIT Madras'],
  },

  // DISCUSSION FORUMS & COMMUNITIES
  {
    id: 'res-forum-gateoverflow',
    title: 'GATE Overflow Q&A Platform (CSE, DA, EE, EC, IN, ME)',
    url: 'https://gateoverflow.in/',
    category: 'forum',
    paper: 'BOTH',
    authorOrSource: 'GATE Overflow Community',
    description: 'The gold-standard peer-reviewed Q&A repository for every GATE past-year question since 1991 across DA, CS, EE, IN, EC, and ME.',
    verified: true,
    tags: ['Forum', 'PYQ', 'Solutions'],
  },
  {
    id: 'res-forum-reddit-gatetard',
    title: 'r/GATEtard — Reddit GATE Aspirants Community (DA & New RA Discussions)',
    url: 'https://www.reddit.com/r/GATEtard/',
    category: 'forum',
    paper: 'BOTH',
    authorOrSource: 'Reddit Community',
    description: 'Active daily discussions on GATE 2027 DA & RA preparation strategies, test series comparisons, mock test scores, and IIT admission cutoffs.',
    verified: true,
    tags: ['Reddit', 'Forum', 'Community'],
  },
  {
    id: 'res-forum-go-telegram',
    title: 'GATE Overflow Official Telegram Discussion Group',
    url: 'https://t.me/gateoverflow_cse',
    category: 'forum',
    paper: 'BOTH',
    authorOrSource: 'GATE Overflow Telegram',
    description: 'Real-time doubt clearing and peer discussion group referenced on GATE Overflow FAQ.',
    verified: true,
    tags: ['Telegram', 'Doubt Clearing'],
  },
  {
    id: 'res-forum-aptitude-overflow',
    title: 'Aptitude Overflow — Dedicated General Aptitude Practice Platform',
    url: 'https://aptitude.gateoverflow.in/',
    category: 'practice',
    paper: 'GA',
    authorOrSource: 'GATE Overflow',
    description: 'All past GATE General Aptitude questions (Verbal, Quantitative, Analytical, Spatial) across all branches for your 15-minute daily GA slot.',
    verified: true,
    tags: ['General Aptitude', 'Daily 15-min'],
  },

  // ANTHROPIC: CLAUDE CERTIFIED ARCHITECT – FOUNDATIONS (CCA-F)
  {
    id: 'res-ccaf-official-guide',
    title: 'Claude Certified Architect – Foundations (CCA-F) Official Exam Guide + 12 Sample Qs',
    url: 'https://github.com/schinchli/cloud-certification-exam-prep/blob/main/Anthropic%20Claude/README.md',
    category: 'github',
    paper: 'CCA_F',
    authorOrSource: 'Anthropic Official Exam Guide (via schinchli/cloud-certification-exam-prep)',
    description: 'Complete breakdown of all 5 weighted domains (Agentic Arch 27%, Tool/MCP 18%, Claude Code 20%, Prompt/Structured Output 20%, Context/Reliability 15%), 12 official sample questions, and 4 hands-on exercises.',
    verified: true,
    tags: ['Claude Architect', 'CCA-F', 'Official Guide', 'Sample Questions'],
  },
  {
    id: 'res-ccaf-skilljar',
    title: 'Anthropic Partner Academy — Official CCA-F Free Prep Courses (Skilljar)',
    url: 'https://anthropic-partners.skilljar.com/page/claude-certified-architect-foundations-prep-courses',
    category: 'official',
    paper: 'CCA_F',
    authorOrSource: 'Anthropic Academy (Skilljar)',
    description: 'Official curriculum: Building with the Claude API, Claude Code in Action, Introduction to Model Context Protocol (MCP), and Claude on Google Cloud.',
    verified: true,
    tags: ['Anthropic', 'Skilljar', 'Claude Code', 'MCP'],
  },
  {
    id: 'res-ccaf-17labs',
    title: 'CCAR-F Interactive 30-Task-Statement Study Guide & 49 Practice Questions',
    url: 'https://ccar-f.17labs.ai/',
    category: 'practice',
    paper: 'CCA_F',
    authorOrSource: 'CCAR-F (17labs.ai)',
    description: 'Interactive checklist & practice engine covering all 30 official CCA-F task statements, 16 out-of-scope exam traps, 49 domain questions, and the 12 official sample questions.',
    verified: true,
    tags: ['CCA-F', 'Interactive Quiz', '30 Task Statements'],
  },
  {
    id: 'res-ccaf-awesome',
    title: 'YiWang24/awesome-cca-f — Complete CCA-F Study Kit & 5 Jupyter Notebook Labs',
    url: 'https://github.com/YiWang24/awesome-cca-f',
    category: 'github',
    paper: 'CCA_F',
    authorOrSource: 'YiWang24',
    description: 'Open-source study kit mirroring the 5 CCA-F domains with Jupyter notebooks (agent loops, MCP error handling, CLAUDE.md, JSON schema output, context compression).',
    verified: true,
    tags: ['GitHub', 'CCA-F', 'Jupyter Labs'],
  },
  {
    id: 'res-ccaf-anthropic-courses',
    title: 'anthropics/courses — Official Anthropic API, Prompt Engineering & Tool Use Tutorials',
    url: 'https://github.com/anthropics/courses',
    category: 'github',
    paper: 'CCA_F',
    authorOrSource: 'Anthropic Official GitHub',
    description: 'Official interactive notebooks for Prompt Engineering, Real-World Prompting, Tool Use (structured outputs), and Prompt Evaluations.',
    verified: true,
    tags: ['GitHub', 'Anthropic', 'Tool Use', 'Prompts'],
  },

  // GOOGLE CLOUD PROFESSIONAL MACHINE LEARNING ENGINEER (GCP-PMLE)
  {
    id: 'res-pmle-official-guide',
    title: 'Official Google Cloud Professional ML Engineer Exam Guide PDF (June 2026 Edition)',
    url: 'https://services.google.com/fh/files/misc/professional_machine_learning_engineer_exam_guide_english_new.pdf',
    category: 'official',
    paper: 'GCP_PMLE',
    authorOrSource: 'Google Cloud Certification',
    description: 'Latest June 1, 2026 official exam blueprint covering Gemini Enterprise Agent Platform, Vertex AI, BigQuery ML, Model Garden, Feature Store, MLOps Pipelines, Model Armor & Monitoring.',
    verified: true,
    tags: ['GCP PMLE', 'Official Guide', '2026 Blueprint'],
  },
  {
    id: 'res-pmle-cert-page',
    title: 'Google Cloud Professional Machine Learning Engineer — Official Portal & Sample Questions',
    url: 'https://cloud.google.com/learn/certification/machine-learning-engineer',
    category: 'official',
    paper: 'GCP_PMLE',
    authorOrSource: 'Google Cloud',
    description: 'Official registration page, exam overview (50–60 MCQs/MSQs in 2 hours), official sample questions, and learning path links.',
    verified: true,
    tags: ['GCP PMLE', 'Official', 'Sample Questions'],
  },
  {
    id: 'res-pmle-andy-quiz',
    title: 'AndyTheFactory/gcp-pmle-quiz — 850+ GCP PMLE Practice Questions & Streamlit Quiz App',
    url: 'https://github.com/AndyTheFactory/gcp-pmle-quiz',
    category: 'github',
    paper: 'GCP_PMLE',
    authorOrSource: 'AndyTheFactory (GitHub)',
    description: 'Interactive Streamlit quiz repository with ~850 scenario-based Google Cloud Professional ML Engineer questions and detailed explanations.',
    verified: true,
    tags: ['GitHub', 'GCP PMLE', '850 Questions', 'Quiz'],
  },
  {
    id: 'res-pmle-angkj-questions',
    title: 'angkj1995/GCP-MLE-Practice-Questions — Comprehensive PMLE Scenario Bank',
    url: 'https://github.com/angkj1995/GCP-MLE-Practice-Questions',
    category: 'github',
    paper: 'GCP_PMLE',
    authorOrSource: 'angkj1995 (GitHub)',
    description: 'Curated collection of Google Cloud Professional ML Engineer scenario questions covering Dataflow, BigQuery ML, Vertex AI Pipelines, and Explainable AI.',
    verified: true,
    tags: ['GitHub', 'GCP PMLE', 'Practice Questions'],
  },
  {
    id: 'res-pmle-skillsboost',
    title: 'Google Cloud Skills Boost — Machine Learning Engineer Learning Path',
    url: 'https://www.cloudskillsboost.google/paths/17',
    category: 'practice',
    paper: 'GCP_PMLE',
    authorOrSource: 'Google Cloud Skills Boost',
    description: 'Official hands-on Qwiklabs and courses for BigQuery ML, Feature Store, Vertex AI Pipelines, Model Monitoring, and Generative AI Studio.',
    verified: true,
    tags: ['Qwiklabs', 'Hands-On', 'GCP PMLE'],
  },
];
