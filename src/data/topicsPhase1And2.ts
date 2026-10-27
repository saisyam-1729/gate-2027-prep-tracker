import { StudyTopic } from '../types';

export const PHASE_1_AND_2_TOPICS: StudyTopic[] = [
  // ============================================================================
  // PHASE 1: FOUNDATIONS (Now – 29 Nov 2026)
  // RA Focus: Circuits & Network Theorems, Digital Circuits, Differential Equations,
  //           Laplace & Fourier, Vector Calculus
  // DA Focus: DBMS (ER model, relational algebra, SQL, normal forms, indexing)
  // ============================================================================
  {
    id: 'ra-a2-circuits-kcl-kvl',
    code: 'RA-A2.1a',
    title: 'Circuits I: Elements, KCL/KVL, Node & Mesh Analysis',
    paper: 'RA',
    section: 'Section A.2: Basics of Mechatronics (Circuits)',
    phase: 1,
    priority: 'core',
    estimatedHours: 8,
    status: 'in_progress',
    confidence: 1,
    lastStudied: '2026-10-24',
    nextReviewDue: '2026-10-29',
    primaryResource: 'NPTEL Basic Electrical Circuits (Prof. Nagendra Krishnapura, IITM) + Alexander & Sadiku Ch. 1–3',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLdzewXO9j7aqkQARDMKuuboDmRahPHLWy',
    proxyPapers: 'GATE EE / IN / EC (Network Theory — KCL, KVL, Nodal & Mesh)',
    syllabusExcerpt: 'Network Elements: Ideal voltage and current sources, dependent sources, R, L, C, M elements; Network solution methods: Kirchoff’s laws (KCL, KVL), Node and Mesh analysis.',
    subtopics: [
      { id: 's1', title: 'Ideal vs practical independent & dependent (VCVS, VCCS, CCVS, CCCS) sources', completed: false },
      { id: 's2', title: 'Passive sign convention, power absorption/delivery & R, L, C, Mutual Inductance (M) v-i relations', completed: false },
      { id: 's3', title: 'KCL, KVL, current division, voltage division & source transformation', completed: false },
      { id: 's4', title: 'Nodal analysis & Supernode with dependent sources (Solve 15–20 Sadiku/GATE problems)', completed: false },
      { id: 's5', title: 'Mesh analysis & Supermesh with current sources', completed: false }
    ],
    links: [
      { title: 'NPTEL Basic Electrical Circuits — Prof. Nagendra Krishnapura (YouTube Playlist)', url: 'https://www.youtube.com/playlist?list=PLdzewXO9j7aqkQARDMKuuboDmRahPHLWy', type: 'nptel' },
      { title: 'NPTEL Course Portal — Basic Electrical Circuits (IIT Madras)', url: 'https://nptel.ac.in/courses/108106172', type: 'nptel' },
      { title: 'GateOverflow EE — Network Theory Solved Questions', url: 'https://gateoverflow.in/tag/network-theory', type: 'pyq' }
    ],
    notes: 'Diagnostic Q1 baseline: Series circuit current was a Gap (Confidence = 1). Priority #1 for Weekend 1 (two 90-min blocks + 20 practice problems).',
    quizLogs: [
      {
        id: 'diag-ra-baseline',
        date: '2026-10-23',
        quizTitle: 'RA Diagnostic Baseline (10 Questions)',
        score: 1,
        total: 10,
        notes: 'Honest baseline: 1/10 (only Q5 first-order ODE was an intuitive guess; Q2 & Q8 were lucky guesses).',
        wrongTopics: ['Series circuit current', 'Thevenin equivalent', 'Maximum power transfer', 'Mod-10 counter flip-flops', 'Curl of a gradient', 'Static friction', 'Piezoelectric sensor', 'Manipulator DOF', 'Second-order damping']
      }
    ]
  },
  {
    id: 'ra-a2-network-theorems',
    code: 'RA-A2.1b',
    title: 'Circuits II: Thevenin, Norton, Superposition & Maximum Power Transfer',
    paper: 'RA',
    section: 'Section A.2: Basics of Mechatronics (Circuits)',
    phase: 1,
    priority: 'core',
    estimatedHours: 7,
    status: 'not_started',
    confidence: 1,
    lastStudied: '2026-10-24',
    nextReviewDue: '2026-10-29',
    primaryResource: 'NPTEL Basic Electrical Circuits Weeks 5–6 (Prof. Nagendra Krishnapura) + Alexander & Sadiku Ch. 4',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLdzewXO9j7aqkQARDMKuuboDmRahPHLWy',
    proxyPapers: 'GATE EE / IN / EC (Network Theorems)',
    syllabusExcerpt: 'Network Theorems: Thevenin’s, Norton’s, Superposition and Maximum Power Transfer theorem.',
    subtopics: [
      { id: 's1', title: 'Linearity & Superposition Theorem (deactivating independent sources)', completed: false },
      { id: 's2', title: 'Thevenin’s & Norton’s Equivalent Circuits (Case 1: Independent sources only)', completed: false },
      { id: 's3', title: 'Thevenin resistance Rth with dependent sources (Test source v_test / i_test method)', completed: false },
      { id: 's4', title: 'Maximum Power Transfer Theorem: DC (RL = Rth) and AC (ZL = Zth*) with Pmax = Vth² / (4Rth)', completed: false }
    ],
    links: [
      { title: 'NPTEL Basic Electrical Circuits Weeks 5–6 — Circuit Theorems', url: 'https://www.youtube.com/playlist?list=PLdzewXO9j7aqkQARDMKuuboDmRahPHLWy', type: 'nptel' },
      { title: 'Neso Academy — Network Theory Playlist (YouTube)', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgLR-hMp7wem-bdVN1iEhsh', type: 'youtube' }
    ],
    notes: 'Diagnostic Q2 (Thevenin) & Q3 (Maximum Power Transfer) were Gaps (Confidence = 1). Focus on dependent-source Rth calculation tricks.',
    quizLogs: []
  },
  {
    id: 'ra-a2-transients-ac-twoport',
    code: 'RA-A2.1c',
    title: 'Circuits III: DC/AC Transients, Phasors, Resonance, Two-Port & 3-Phase',
    paper: 'RA',
    section: 'Section A.2: Basics of Mechatronics (Circuits)',
    phase: 1,
    priority: 'core',
    estimatedHours: 9,
    status: 'not_started',
    confidence: 1,
    primaryResource: 'NPTEL Basic Electrical Circuits Weeks 7, 9–12 + Alexander & Sadiku Ch. 7–11, 12, 19',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLdzewXO9j7aqkQARDMKuuboDmRahPHLWy',
    proxyPapers: 'GATE EE / IN / EC (First/Second-Order Transients, Phasors, Two-Port)',
    syllabusExcerpt: 'Transient response of DC and AC networks, sinusoidal steady-state analysis, resonance, two-port networks, balanced three-phase circuits, complex power and power factor in AC circuits.',
    subtopics: [
      { id: 's1', title: 'First-order RC & RL transients: initial conditions (t=0+, t=∞) & x(t) = x(∞) + [x(0+) - x(∞)]e^(-t/τ)', completed: false },
      { id: 's2', title: 'Second-order RLC transients & Laplace domain s-network impedance analysis', completed: false },
      { id: 's3', title: 'Phasors, impedance Z(jω), series/parallel RLC resonance, Q-factor & bandwidth', completed: false },
      { id: 's4', title: 'Complex power (S = P + jQ), power factor correction & Balanced 3-Phase Star (Y) / Delta (Δ)', completed: false },
      { id: 's5', title: 'Two-Port Networks: Z, Y, h, and ABCD (transmission) parameters & interconnections', completed: false }
    ],
    links: [
      { title: 'NPTEL Basic Electrical Circuits Weeks 9–12 — Transients & Steady State', url: 'https://www.youtube.com/playlist?list=PLdzewXO9j7aqkQARDMKuuboDmRahPHLWy', type: 'nptel' }
    ],
    notes: 'Starting confidence set to 1 per handoff. Master the universal 1st-order transient formula x(t) = x(∞) + [x(0+) - x(∞)]e^(-t/τ) — solves 90% of GATE transient questions in under 90 seconds.',
    quizLogs: []
  },
  {
    id: 'ra-a2-digital-circuits',
    code: 'RA-A2.2',
    title: 'Digital Circuits: Boolean Algebra, Combinational & Sequential (Counters)',
    paper: 'RA',
    section: 'Section A.2: Basics of Mechatronics (Digital)',
    phase: 1,
    priority: 'core',
    estimatedHours: 8,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Neso Academy Digital Electronics + Morris Mano + NPTEL Digital Circuits',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm',
    proxyPapers: 'GATE CS / EC / EE / IN (Digital Logic)',
    syllabusExcerpt: 'Digital Circuits: Boolean algebra, combinational (multiplexers, encoders, decoders), and sequential circuits (flip-flops, counters).',
    subtopics: [
      { id: 's1', title: 'Boolean algebra laws, De Morgan’s theorem, SOP/POS & K-Map minimization (up to 4 variables)', completed: false },
      { id: 's2', title: 'Combinational circuits: Adders, Multiplexers (implementing any Boolean function via MUX), Encoders, Decoders', completed: false },
      { id: 's3', title: 'Latches vs Flip-Flops (SR, JK, D, T): characteristic equations & excitation tables', completed: false },
      { id: 's4', title: 'Ripple (asynchronous) vs Synchronous counters, Mod-N counters (⌈log₂N⌉ flip-flops), Ring & Johnson counters', completed: false }
    ],
    links: [
      { title: 'Neso Academy — Digital Electronics Complete Playlist (YouTube)', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm', type: 'youtube' },
      { title: 'NPTEL Digital Circuits — Prof. Santanu Chattopadhyay (IIT Kharagpur)', url: 'https://nptel.ac.in/courses/108105113', type: 'nptel' },
      { title: 'GateOverflow CSE — Digital Logic PYQs', url: 'https://gateoverflow.in/tag/digital-logic', type: 'pyq' }
    ],
    notes: 'Diagnostic Q4 (Flip-flops in a mod-10 counter = ⌈log₂10⌉ = 4) was a Gap. Very approachable given CS/M.Tech background.',
    quizLogs: []
  },
  {
    id: 'ra-a13-ode-laplace',
    code: 'RA-A1.3a',
    title: 'Differential Equations: First/Higher-Order ODEs, Euler-Cauchy & Laplace',
    paper: 'RA',
    section: 'Section A.1: Engineering Mathematics',
    phase: 1,
    priority: 'core',
    estimatedHours: 6,
    status: 'not_started',
    confidence: 1,
    lastStudied: '2026-10-23',
    nextReviewDue: '2026-10-28',
    primaryResource: 'MIT OCW 18.03 Differential Equations + Erwin Kreyszig + 3Blue1Brown',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63oTpyxCMLKt_JmB0WtSZfG',
    proxyPapers: 'GATE ME / EE / EC / IN / CS (Engineering Mathematics — ODEs & Laplace)',
    syllabusExcerpt: 'First-order equations (linear and nonlinear); higher-order linear differential equations with constant coefficients; Euler-Cauchy equation; initial and boundary value problems; Laplace transforms.',
    subtopics: [
      { id: 's1', title: 'First-order ODEs: separable, exact, integrating factor (dy/dx + P(x)y = Q(x)), Bernoulli', completed: false },
      { id: 's2', title: 'Higher-order linear ODEs with constant coefficients: complementary function & particular integral', completed: false },
      { id: 's3', title: 'Euler-Cauchy homogeneous equation (x²y\'\' + axy\' + by = f(x) via x = e^t) & Wronskian', completed: false },
      { id: 's4', title: 'Laplace Transforms & Inverse Laplace (partial fractions, shifting theorems, IVP solving)', completed: false }
    ],
    links: [
      { title: 'MIT 18.03 Differential Equations Lectures (YouTube)', url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63oTpyxCMLKt_JmB0WtSZfG', type: 'youtube' },
      { title: '3Blue1Brown — Differential Equations Playlist', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNPOjrT6KVlfJuKtYTftqH6', type: 'youtube' }
    ],
    notes: 'Diagnostic Q5 (First-order ODE) was the ONLY correct answer (1/10) — rusty but rebuildable quickly with Maths degrees. Starting confidence set to 1 per handoff.',
    quizLogs: []
  },
  {
    id: 'ra-a13-fourier-pde',
    code: 'RA-A1.3b',
    title: 'Fourier Series & Partial Differential Equations (Heat, Wave, Laplace)',
    paper: 'RA',
    section: 'Section A.1: Engineering Mathematics',
    phase: 1,
    priority: 'light_touch',
    estimatedHours: 4,
    status: 'not_started',
    confidence: 1,
    primaryResource: '3Blue1Brown (But what is a Fourier series?) + Kreyszig Ch. 11–12 (Selective)',
    primaryResourceUrl: 'https://www.youtube.com/watch?v=r6sGWTCMz2k',
    proxyPapers: 'GATE ME / EE / CE (Fourier Series & PDE classification)',
    syllabusExcerpt: 'Solutions of heat, wave, and Laplace\'s equations; Fourier series.',
    subtopics: [
      { id: 's1', title: 'Fourier series coefficients (a₀, aₙ, bₙ) & even/odd symmetry shortcuts', completed: false },
      { id: 's2', title: 'Classification of 2nd-order PDEs: Parabolic (Heat, B²-4AC=0), Hyperbolic (Wave, >0), Elliptic (Laplace, <0)', completed: false },
      { id: 's3', title: 'Separation of variables structure for 1D Heat (u_t = c²u_xx) & Wave (u_tt = c²u_xx) equations', completed: false }
    ],
    links: [
      { title: '3Blue1Brown — But what is a Fourier series? From heat flow to circle drawings', url: 'https://www.youtube.com/watch?v=r6sGWTCMz2k', type: 'youtube' }
    ],
    notes: 'Light-touch cut policy on PDEs: Learn PDE classification (B²-4AC) and standard solution forms; invest heavier time in Fourier Series since Signals & Systems (B1.2) depends on it.',
    quizLogs: []
  },
  {
    id: 'ra-a12-multivariable-vector-calc',
    code: 'RA-A1.2b',
    title: 'Multivariable & Vector Calculus: Multiple Integrals, Grad, Div, Curl',
    paper: 'RA',
    section: 'Section A.1: Engineering Mathematics',
    phase: 1,
    priority: 'core',
    estimatedHours: 5,
    status: 'not_started',
    confidence: 1,
    lastStudied: '2026-10-23',
    nextReviewDue: '2026-10-28',
    primaryResource: 'MIT OCW 18.02 Multivariable Calculus + 3Blue1Brown Div & Curl + Kreyszig Ch. 9–10',
    primaryResourceUrl: 'https://www.youtube.com/watch?v=rB83DpBJQsE',
    proxyPapers: 'GATE ME / EE / EC / IN (Vector Calculus & Multiple Integrals)',
    syllabusExcerpt: 'Evaluation of definite and improper integrals; double and triple integrals; partial derivatives, total derivative, Taylor series (in two variables), maxima and minima; gradient, divergence and curl, vector identities.',
    subtopics: [
      { id: 's1', title: 'Partial derivatives, total differential, Jacobian & 2-variable maxima/minima (Hessian test rt - s²)', completed: false },
      { id: 's2', title: 'Double & triple integrals, change of order of integration, polar/cylindrical/spherical coordinates', completed: false },
      { id: 's3', title: 'Gradient (∇f, directional derivative), Divergence (∇·F, solenoidal) & Curl (∇×F, irrotational)', completed: false },
      { id: 's4', title: 'Key vector identities: ∇×(∇f) = 0, ∇·(∇×F) = 0, Green’s, Stokes’ & Gauss Divergence Theorems', completed: false }
    ],
    links: [
      { title: '3Blue1Brown — Divergence and Curl: The language of Maxwell’s equations', url: 'https://www.youtube.com/watch?v=rB83DpBJQsE', type: 'youtube' },
      { title: 'MIT 18.02 Multivariable Calculus — Prof. Denis Auroux (YouTube)', url: 'https://www.youtube.com/playlist?list=PL4C4C8A7D06566F38', type: 'youtube' }
    ],
    notes: 'Diagnostic Q6 (Curl of a gradient ∇×(∇f) = 0) was missed (Rusty, Confidence = 1). Quick rebuild with your BSc/MSc Maths background.',
    quizLogs: []
  },
  {
    id: 'da-s5-dbms-er-relalg-sql',
    code: 'DA-S5a',
    title: 'DBMS I: ER Model, Relational Algebra, Tuple Relational Calculus & SQL',
    paper: 'DA',
    section: 'Section 5: Database Management and Warehousing',
    phase: 1,
    priority: 'core',
    estimatedHours: 7,
    status: 'not_started',
    confidence: 2,
    primaryResource: 'NPTEL DBMS (Prof. Partha Pratim Das, IIT KGP) + Silberschatz Korth + GateOverflow DBMS',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLMtBdv6WGV58X1rbEEO89nZyIj3ca3Hew',
    syllabusExcerpt: 'ER-model, relational model: relational algebra, tuple calculus, SQL, integrity constraints.',
    subtopics: [
      { id: 's1', title: 'ER Diagram: entities, weak entities, cardinality ratios (1:1, 1:N, M:N), minimum tables to convert ER to Relational', completed: false },
      { id: 's2', title: 'Relational Algebra operators (σ, π, ⋈, ÷ division operator) & query equivalence', completed: false },
      { id: 's3', title: 'Tuple Relational Calculus (TRC) safe queries, existential (∃) & universal (∀) quantifiers', completed: false },
      { id: 's4', title: 'SQL: GROUP BY, HAVING, correlated nested queries, EXISTS/NOT EXISTS, NULL three-valued logic & joins', completed: false }
    ],
    links: [
      { title: 'NPTEL Data Base Management System — IIT Kharagpur (YouTube Playlist)', url: 'https://www.youtube.com/playlist?list=PLMtBdv6WGV58X1rbEEO89nZyIj3ca3Hew', type: 'nptel' },
      { title: 'DS-AI-GATE — Database Management Readme & Notes', url: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Database-Management-Readme.md', type: 'github' },
      { title: 'GateOverflow CSE/DA — Databases Solved PYQs', url: 'https://gateoverflow.in/tag/databases', type: 'pyq' }
    ],
    notes: 'Priority DA gap area #1 from handoff. Sunday session dedicated to ER model + Relational Algebra + Tuple Calculus.',
    quizLogs: []
  },
  {
    id: 'da-s5-dbms-norm-indexing',
    code: 'DA-S5b',
    title: 'DBMS II: Functional Dependencies, Normal Forms, File Org & B/B+ Tree Indexing',
    paper: 'DA',
    section: 'Section 5: Database Management and Warehousing',
    phase: 1,
    priority: 'core',
    estimatedHours: 7,
    status: 'not_started',
    confidence: 2,
    primaryResource: 'NPTEL DBMS (IIT KGP) + Silberschatz Ch. 7, 14 + GATE CSE/DA DBMS PYQs',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLMtBdv6WGV58X1rbEEO89nZyIj3ca3Hew',
    syllabusExcerpt: 'Normal form, file organization, indexing, data types.',
    subtopics: [
      { id: 's1', title: 'Armstrong’s axioms, attribute closure (X⁺), candidate keys & canonical cover', completed: false },
      { id: 's2', title: 'Normal Forms: 1NF, 2NF, 3NF, BCNF — highest normal form identification', completed: false },
      { id: 's3', title: 'Lossless join decomposition test & dependency preservation test', completed: false },
      { id: 's4', title: 'Primary, clustering, secondary (dense vs sparse) indexing & B / B+ Tree order/block calculations', completed: false }
    ],
    links: [
      { title: 'NPTEL DBMS — Normalization & Indexing Lectures', url: 'https://www.youtube.com/playlist?list=PLMtBdv6WGV58X1rbEEO89nZyIj3ca3Hew', type: 'nptel' },
      { title: 'shayan-ing/GATE-DA-NOTES — DBMS & Normalization Notes', url: 'https://github.com/shayan-ing/GATE-DA-NOTES', type: 'github' }
    ],
    notes: 'High-yield topic: Every GATE DA paper asks 2–3 questions on Normal Forms, Lossless Decomposition, or B+ Tree node capacity.',
    quizLogs: []
  },

  // ============================================================================
  // PHASE 2: ROBOTICS CORE & CLASSICAL AI (30 Nov – 27 Dec 2026)
  // RA Focus: Sensors, Actuators, Engineering Mechanics, Robot Kinematics (with Python),
  //           Automation & CIM, Python & Data Structures
  // DA Focus: Data Warehousing, Classical AI (Search, Logic, Variable Elimination)
  // ============================================================================
  {
    id: 'ra-a2-sensors-conditioning',
    code: 'RA-A2.3',
    title: 'Sensors, Industrial Transducers & Signal Conditioning Circuits',
    paper: 'RA',
    section: 'Section A.2: Basics of Mechatronics (Sensors)',
    phase: 2,
    priority: 'core',
    estimatedHours: 8,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'NPTEL Mechatronics (Prof. P.M. Pathak, IIT Roorkee) + Nakra & Chaudhry / A.K. Sawhney',
    primaryResourceUrl: 'https://archive.nptel.ac.in/courses/112/107/112107298/',
    proxyPapers: 'GATE IN (Transducers & Industrial Instrumentation) + GATE ME (Mechatronics)',
    syllabusExcerpt: 'Sensors: Resistive, capacitive, inductive, piezoelectric, Hall effect sensors and associated signal conditioning circuits; transducers for industrial instrumentation- displacement (linear and angular), velocity, acceleration, force, torque, pressure.',
    subtopics: [
      { id: 's1', title: 'Resistive potentiometers, strain gauges (Gauge Factor GF = (ΔR/R)/ε) & Wheatstone bridge conditioning', completed: false },
      { id: 's2', title: 'Capacitive (differential area/distance/dielectric) & Inductive sensors (LVDT, RVDT)', completed: false },
      { id: 's3', title: 'Piezoelectric sensors (charge amplifier conditioning, dynamic force/acceleration — cannot measure static force!) & Hall effect sensors', completed: false },
      { id: 's4', title: 'Optical encoders (incremental vs absolute, Gray code resolution), tachometers, load cells & pressure transducers', completed: false }
    ],
    links: [
      { title: 'NPTEL Mechatronics — Prof. Pushparaj Mani Pathak (IIT Roorkee)', url: 'https://archive.nptel.ac.in/courses/112/107/112107298/', type: 'nptel' },
      { title: 'NPTEL Transducers for Instrumentation — IIT Kharagpur', url: 'https://nptel.ac.in/courses/108105064', type: 'nptel' },
      { title: 'GateOverflow IN — Transducers & Sensors PYQs', url: 'https://gateoverflow.in/?qa=questions&Se=IN', type: 'pyq' }
    ],
    notes: 'Diagnostic Q8 (Piezoelectric sensor) was a lucky guess (Gap). Builds directly on Phase 1 Circuits (Wheatstone bridges, RC charge amplifiers).',
    quizLogs: []
  },
  {
    id: 'ra-a2-actuators-motors',
    code: 'RA-A2.4',
    title: 'Actuators: Hydraulic, Pneumatic, DC, Stepper & Servo Motors',
    paper: 'RA',
    section: 'Section A.2: Basics of Mechatronics (Actuators)',
    phase: 2,
    priority: 'core',
    estimatedHours: 7,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'NPTEL Introduction to Robotics Weeks 5–8 (IIT Madras) + NPTEL Mechatronics Week 3',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLyqSpQzTE6M_XM9cvjLLO_Azt1FkgPhpH',
    proxyPapers: 'GATE EE / IN / ME (DC Motors, Stepper Step Angle, Hydraulic Force/Flow)',
    syllabusExcerpt: 'Actuators: Principles of operation, performance, torque-speed characteristics of hydraulic and pneumatic actuators, DC motors, stepper motors, and servo motors.',
    subtopics: [
      { id: 's1', title: 'Hydraulic & Pneumatic actuators: cylinders, directional control valves (4/3, 5/2), force & speed calculations', completed: false },
      { id: 's2', title: 'Brushed & Brushless DC (BLDC) motors: back-EMF (Eb = Ke·ω), torque (T = Kt·Ia) & torque-speed line', completed: false },
      { id: 's3', title: 'Stepper motors (VR, PM, Hybrid): step angle β = (Ns - Nr)/(Ns·Nr) × 360°, full/half/micro-stepping, pulse rate vs RPM', completed: false },
      { id: 's4', title: 'AC/DC Servo motors, gear reduction ratios, reflected inertia (J_eff = J_m + J_L / N²) & H-bridge PWM', completed: false }
    ],
    links: [
      { title: 'NPTEL Introduction to Robotics (Weeks 5–8 Electric Actuators) — IIT Madras YouTube', url: 'https://www.youtube.com/playlist?list=PLyqSpQzTE6M_XM9cvjLLO_Azt1FkgPhpH', type: 'nptel' },
      { title: 'NPTEL Course Page — Introduction to Robotics (Prof. Asokan T, IIT Madras)', url: 'https://archive.nptel.ac.in/courses/107/106/107106090/', type: 'nptel' }
    ],
    notes: 'IIT Madras’s own NPTEL Introduction to Robotics course (Prof. Asokan T, Prof. Balaraman Ravindran, Prof. Krishna Vasudevan) has 4 full weeks dedicated to DC, BLDC, and Stepper motors — directly authored by the GATE 2027 Organizing Institute!',
    quizLogs: []
  },
  {
    id: 'ra-a2-eng-mechanics',
    code: 'RA-A2.5',
    title: 'Engineering Mechanics: Statics, Friction, Trusses & Rigid Body Plane Motion',
    paper: 'RA',
    section: 'Section A.2: Basics of Mechatronics (Mechanics)',
    phase: 2,
    priority: 'core',
    estimatedHours: 8,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'NPTEL Engineering Mechanics (Prof. Manoj Harbola / IITM) + Meriam & Kraige',
    primaryResourceUrl: 'https://nptel.ac.in/courses/112106286',
    proxyPapers: 'GATE ME / XE-D / PI (Engineering Mechanics — Trusses, Friction, Rigid Body)',
    syllabusExcerpt: 'Engineering Mechanics: Free-body diagrams and equilibrium; friction and its applications- rolling friction, belt-pulley; trusses and frames; kinematics and dynamics of rigid bodies in plane motion.',
    subtopics: [
      { id: 's1', title: 'Free-Body Diagrams (FBD), 2D/3D static equilibrium (∑F = 0, ∑M = 0) & Lami’s theorem', completed: false },
      { id: 's2', title: 'Coulomb dry friction, impending motion, wedges, rolling resistance & belt-pulley friction (T₁/T₂ = e^(μβ))', completed: false },
      { id: 's3', title: 'Trusses & Frames: Method of Joints, Method of Sections & zero-force member identification', completed: false },
      { id: 's4', title: 'Plane kinematics (instantaneous center of zero velocity, ω, α) & rigid body kinetics (F = ma_G, ∑M_G = I_G·α)', completed: false }
    ],
    links: [
      { title: 'NPTEL Engineering Mechanics — IIT Madras', url: 'https://nptel.ac.in/courses/112106286', type: 'nptel' },
      { title: 'GateOverflow ME — Engineering Mechanics PYQs', url: 'https://gateoverflow.in/?qa=questions&Se=ME', type: 'pyq' }
    ],
    notes: 'Diagnostic Q7 (Static friction when applied force < μs·N) was a Gap. Remember: static friction equals the applied tangential force up to the limiting value μs·N!',
    quizLogs: []
  },
  {
    id: 'ra-a3-robotics-kinematics',
    code: 'RA-A3.1',
    title: 'Robot Kinematics: DOF, Rotation Matrices, Homogeneous Transforms & DH Forward Kinematics',
    paper: 'RA',
    section: 'Section A.3: Principles of Robotics and Automation',
    phase: 2,
    priority: 'core',
    estimatedHours: 12,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Kevin Lynch Modern Robotics (Book + YouTube) + IITM Intro to Robotics Weeks 1–4 + Python Project',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx',
    proxyPapers: 'GATE ME / PI (Robotics, DOF, DH Parameters, Homogeneous Transformations)',
    syllabusExcerpt: 'Robotic classification- serial and parallel manipulators, geometrical configuration, Links and joints, Coordinate systems and degrees-of-freedom; Rotation matrices in 2D and 3D; homogeneous transformations, forward kinematics. Robot applications- point-to-point and continuous path control, types of end-effectors, robot accuracy and repeatability.',
    subtopics: [
      { id: 's1', title: 'Serial vs Parallel manipulators, workspace (Cartesian, Cylindrical, Spherical, SCARA, Articulated) & Grübler’s DOF formula: M = d(N - 1 - J) + ∑f_i', completed: false },
      { id: 's2', title: '2D & 3D Rotation Matrices SO(3), Euler angles (RPY), orthogonality (R⁻¹ = Rᵀ, det(R) = +1)', completed: false },
      { id: 's3', title: 'Homogeneous Transformation Matrices SE(3) (4×4 matrix combining rotation & translation)', completed: false },
      { id: 's4', title: 'Denavit-Hartenberg (DH) parameters (a_i, α_i, d_i, θ_i) & Forward Kinematics of 2R/3R/SCARA arms', completed: false },
      { id: 's5', title: 'PTP vs Continuous Path control, end-effectors, Accuracy vs Spatial Resolution vs Repeatability & Python 2-Link FK Portfolio Code', completed: false }
    ],
    links: [
      { title: 'Modern Robotics All Videos — Prof. Kevin Lynch (YouTube Playlist)', url: 'https://www.youtube.com/playlist?list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx', type: 'youtube' },
      { title: 'NxRLab/ModernRobotics — Official Python/MATLAB Library (GitHub)', url: 'https://github.com/NxRLab/ModernRobotics', type: 'github' },
      { title: 'petercorke/robotics-toolbox-python — Robotics Toolbox for Python (GitHub)', url: 'https://github.com/petercorke/robotics-toolbox-python', type: 'github' },
      { title: 'NPTEL Introduction to Robotics Weeks 1–4 — IIT Madras YouTube', url: 'https://www.youtube.com/playlist?list=PLyqSpQzTE6M_XM9cvjLLO_Azt1FkgPhpH', type: 'nptel' },
      { title: 'NPTEL Robotics — Prof. Dilip Kumar Pratihar (IIT Kharagpur)', url: 'https://onlinecourses.nptel.ac.in/noc24_me88/preview', type: 'nptel' }
    ],
    notes: 'Diagnostic Q9 (Manipulator DOF via Grübler’s criterion) was a Gap. Includes Portfolio Project #1: Code Forward Kinematics & Workspace Plot of a 2-Link/3-Link Planar Arm in Python.',
    quizLogs: []
  },
  {
    id: 'ra-a3-cim-plc-automation',
    code: 'RA-A3.2',
    title: 'Computer Integrated Manufacturing (CIM), PLCs, CNC, AGVs & AS/RS',
    paper: 'RA',
    section: 'Section A.3: Principles of Robotics and Automation',
    phase: 2,
    priority: 'core',
    estimatedHours: 6,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Mikell P. Groover (Automation, Production Systems & CIM — Selective) + GATE ME/PI PYQs',
    primaryResourceUrl: 'https://nptel.ac.in/courses/112104288',
    proxyPapers: 'GATE ME / PI (NC/CNC BLU calculations, AGV traffic analysis, AS/RS, PLC Ladder Logic)',
    syllabusExcerpt: 'Computer Integrated Manufacturing- Automation in Manufacturing, Programmable Logic Controllers (PLCs) in manufacturing, Automated material handling systems, Automated storage and retrieval systems, Automated identification, detection and capture systems; computer numerical control; Basics of single and multi-axis positioning systems; Basics of concurrent design and manufacturing planning for automation.',
    subtopics: [
      { id: 's1', title: 'Types of Automation (Fixed, Programmable, Flexible) & Programmable Logic Controllers (PLC ladder logic gates, timers, counters)', completed: false },
      { id: 's2', title: 'CNC & Positioning Systems: Basic Length Unit (BLU / resolution), leadscrew pitch, pulse frequency & table feed rate', completed: false },
      { id: 's3', title: 'Automated Material Handling (AGV cycle time, delivery rate & fleet size formula) & AS/RS throughput', completed: false },
      { id: 's4', title: 'AIDC (Barcodes, RFID, Machine Vision) & Concurrent Engineering / CAPP basics', completed: false }
    ],
    links: [
      { title: 'NPTEL Automation in Manufacturing — Prof. Shrikrishna N. Joshi (IIT Guwahati)', url: 'https://nptel.ac.in/courses/112103293', type: 'nptel' },
      { title: 'GateOverflow ME/PI — Computer Integrated Manufacturing & CNC PYQs', url: 'https://gateoverflow.in/?qa=questions&Se=ME', type: 'pyq' }
    ],
    notes: 'Very high-scoring numerical area in GATE ME/PI: CNC BLU = pitch / (N_steps × gear_ratio), and AGV number of vehicles needed. Read Groover selectively.',
    quizLogs: []
  },
  {
    id: 'both-python-dsa',
    code: 'DA-S4 (RA-A2.6)',
    title: 'Python Programming, Data Structures & Algorithms (Shared RA & DA)',
    paper: 'BOTH',
    section: 'DA Sec 4 / RA Sec A.2: Programming, Data Structures & Algorithms',
    phase: 2,
    priority: 'maintenance',
    estimatedHours: 5,
    status: 'not_started',
    confidence: 5,
    primaryResource: 'GATE DA 2024–2026 & GATE CS DSA PYQs + DS-AI-GATE Prog-Algo',
    primaryResourceUrl: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Programming-and-Algorithms-Readme.md',
    syllabusExcerpt: 'Programming in Python, flowcharts, recursion, basic data structures: stacks, queues, linked lists, trees, binary search tree, binary heap, hash tables, graphs; Search & sorting (selection, bubble, insertion, mergesort, quicksort); graph traversals (BFS/DFS) and shortest path (Dijkstra/Bellman-Ford).',
    subtopics: [
      { id: 's1', title: 'Python output tracing: mutability, slicing, list comprehensions, scoping & recursion call counts', completed: false },
      { id: 's2', title: 'Stacks, Queues, Linked Lists, Hash Tables (collision resolution) & Binary Heaps (build-heap O(n))', completed: false },
      { id: 's3', title: 'Binary Search Trees (BST) traversals & Sorting complexities/recurrences (Merge, Quick, Insertion, Bubble, Selection)', completed: false },
      { id: 's4', title: 'Graph Theory, BFS, DFS (tree/back/cross edges) & Shortest Path (Dijkstra, Bellman-Ford)', completed: false }
    ],
    links: [
      { title: 'DS-AI-GATE — Programming and Algorithms Readme', url: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Programming-and-Algorithms-Readme.md', type: 'github' },
      { title: 'GateOverflow CSE/DA — Programming & DS PYQs', url: 'https://gateoverflow.in/tag/programming-in-c', type: 'pyq' }
    ],
    notes: 'Strongest overlap between RA and DA! Your M.Tech CSE makes this a guaranteed full-marks section in both papers.',
    quizLogs: []
  },
  {
    id: 'da-s5-warehousing-prep',
    code: 'DA-S5c',
    title: 'Data Warehousing, Multidimensional Schemas, Concept Hierarchies & Data Transformation',
    paper: 'DA',
    section: 'Section 5: Database Management and Warehousing',
    phase: 2,
    priority: 'core',
    estimatedHours: 4,
    status: 'not_started',
    confidence: 2,
    primaryResource: 'Jiawei Han & Micheline Kamber (Data Mining Ch. 3–4) + shayan-ing/GATE-DA-NOTES DW Folder',
    primaryResourceUrl: 'https://github.com/shayan-ing/GATE-DA-NOTES',
    syllabusExcerpt: 'Data transformation such as normalization, discretization, sampling, compression; data warehouse modelling: schema for multidimensional data models, concept hierarchies, measures: categorization and computations.',
    subtopics: [
      { id: 's1', title: 'Data preprocessing: Min-Max, Z-score & Decimal scaling normalization; binning/discretization; sampling & compression', completed: false },
      { id: 's2', title: 'Multidimensional Data Models: Star Schema, Snowflake Schema & Fact Constellation (Galaxy Schema)', completed: false },
      { id: 's3', title: 'OLAP Cube operations: Roll-up, Drill-down, Slice, Dice, Pivot & Concept Hierarchies (total vs partial order)', completed: false },
      { id: 's4', title: 'Categorization of Measures: Distributive (SUM, COUNT, MIN, MAX), Algebraic (AVG, SD) & Holistic (MEDIAN, MODE, RANK)', completed: false }
    ],
    links: [
      { title: 'shayan-ing/GATE-DA-NOTES — Data Warehousing & Data Mining Notes', url: 'https://github.com/shayan-ing/GATE-DA-NOTES', type: 'github' },
      { title: 'DS-AI-GATE — Database & Warehousing Resources', url: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Database-Management-Readme.md', type: 'github' }
    ],
    notes: 'Priority DA gap area #2 from handoff. Pay special attention to Distributive vs Algebraic vs Holistic measures and Star vs Snowflake cuboid counts (∏(L_i + 1)).',
    quizLogs: []
  },
  {
    id: 'da-s7-ai-search-logic',
    code: 'DA-S7a',
    title: 'Classical AI I: Uninformed/Informed Search, Adversarial Search & Propositional/Predicate Logic',
    paper: 'DA',
    section: 'Section 7: Artificial Intelligence',
    phase: 2,
    priority: 'core',
    estimatedHours: 6,
    status: 'not_started',
    confidence: 3,
    primaryResource: 'Russell & Norvig (AIMA Ch. 3–5, 7–9) + NPTEL AI Search Methods (Prof. Deepak Khemani, IITM)',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLEAYkSg4uSQ1FaQoCxoFvmMFnBsHTBokj',
    syllabusExcerpt: 'Search: informed, uninformed, adversarial; logic, propositional, predicate.',
    subtopics: [
      { id: 's1', title: 'Uninformed Search: BFS, UCS, DFS, IDDFS — completeness, optimality, time & space complexity', completed: false },
      { id: 's2', title: 'Informed Search: Greedy Best-First, A* Search — Admissible (h(n) ≤ h*(n)) vs Consistent (Monotonic) heuristics in Tree vs Graph search', completed: false },
      { id: 's3', title: 'Adversarial Search: Minimax algorithm & Alpha-Beta (α-β) pruning node cutoffs', completed: false },
      { id: 's4', title: 'Propositional & First-Order Predicate Logic: CNF, Unification, Resolution refutation & quantifier equivalences', completed: false }
    ],
    links: [
      { title: 'NPTEL AI: Search Methods for Problem Solving — Prof. Deepak Khemani (IIT Madras YouTube)', url: 'https://www.youtube.com/playlist?list=PLEAYkSg4uSQ1FaQoCxoFvmMFnBsHTBokj', type: 'nptel' },
      { title: 'UC Berkeley CS188 Intro to AI — Pieter Abbeel & Dan Klein (YouTube)', url: 'https://www.youtube.com/playlist?list=PLsOU6EOcj51L06BN35402567360240240', type: 'youtube' },
      { title: 'DS-AI-GATE — Artificial Intelligence Notes & PYQs', url: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Artificial-Intelligence-Readme.md', type: 'github' }
    ],
    notes: 'Priority DA gap area #3 from handoff. Prof. Deepak Khemani is from IIT Madras (GATE 2027 Organizing Institute). Practice Alpha-Beta pruning traces and A* heuristic admissibility vs consistency.',
    quizLogs: []
  },
  {
    id: 'da-s7-ai-uncertainty',
    code: 'DA-S7b',
    title: 'Classical AI II: Bayesian Networks, D-Separation, Variable Elimination & Sampling',
    paper: 'DA',
    section: 'Section 7: Artificial Intelligence',
    phase: 2,
    priority: 'core',
    estimatedHours: 5,
    status: 'not_started',
    confidence: 2,
    primaryResource: 'Russell & Norvig (AIMA Ch. 13–14) + UC Berkeley CS188 Bayes Nets + DS-AI-GATE AI Notes',
    primaryResourceUrl: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Artificial-Intelligence-Readme.md',
    syllabusExcerpt: 'Reasoning under uncertainty topics — conditional independence representation, exact inference through variable elimination, and approximate inference through sampling.',
    subtopics: [
      { id: 's1', title: 'Bayesian Networks: joint distribution factorization P(X₁..Xₙ) = ∏ P(Xᵢ | Parents(Xᵢ)) & counting independent parameters', completed: false },
      { id: 's2', title: 'Conditional Independence & D-Separation (Active vs Inactive triples: Causal chain, Common cause, V-structure / Explaining away)', completed: false },
      { id: 's3', title: 'Exact Inference: Variable Elimination (factor product, summing out hidden variables, intermediate factor size)', completed: false },
      { id: 's4', title: 'Approximate Inference via Sampling: Prior Sampling, Rejection Sampling, Likelihood Weighting & Gibbs Sampling (MCMC)', completed: false }
    ],
    links: [
      { title: 'DS-AI-GATE — Artificial Intelligence Readme', url: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Artificial-Intelligence-Readme.md', type: 'github' },
      { title: 'shayan-ing/GATE-DA-NOTES — AI & Bayesian Networks Solved PYQs', url: 'https://github.com/shayan-ing/GATE-DA-NOTES', type: 'github' }
    ],
    notes: 'Every single GATE DA paper (2024, 2025, 2026) has featured questions on Bayes Net parameter count, Markov blanket / D-separation, and MCMC / Likelihood Weighting!',
    quizLogs: []
  }
];
