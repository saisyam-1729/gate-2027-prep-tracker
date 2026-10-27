import { StudyTopic } from '../types';

export const PHASE_3_AND_4_TOPICS: StudyTopic[] = [
  // ============================================================================
  // PHASE 3: CONTROL & PART B1 ELECTRICAL (28 Dec 2026 – 17 Jan 2027)
  // ============================================================================
  {
    id: 'ra-b13-modeling-block-sfg',
    code: 'RA-B1.3a',
    title: 'Control Systems: Modeling, Transfer Functions, Block Diagrams & SFG',
    paper: 'RA',
    section: 'Part B1.3: Control Systems',
    phase: 3,
    priority: 'core',
    estimatedHours: 8,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Brian Douglas Control Systems (YouTube) + Norman Nise / Neso Academy',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L',
    proxyPapers: 'GATE EE / EC / IN (Control Systems — Block Diagram & Mason Gain Formula)',
    syllabusExcerpt: 'Mathematical modeling and representation of systems, feedback principle, transfer function, Block diagrams and Signal flow graphs.',
    subtopics: [
      { id: 's1', title: 'Open-loop vs Closed-loop feedback control & sensitivity', completed: false },
      { id: 's2', title: 'Transfer function representation & Force-Voltage / Force-Current analogies', completed: false },
      { id: 's3', title: 'Block diagram reduction rules', completed: false },
      { id: 's4', title: 'Signal Flow Graphs (SFG) & Mason’s Gain Formula', completed: false }
    ],
    links: [
      { title: 'Brian Douglas — All Control System Lecture Videos (YouTube)', url: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L', type: 'youtube' },
      { title: 'Neso Academy — Control Systems (Block Diagrams & SFG)', url: 'https://www.nesoacademy.org/ee/06-control-systems', type: 'youtube' },
      { title: 'NPTEL Control Engineering — Prof. Ramkrishna Pasumarthy (IIT Madras)', url: 'https://nptel.ac.in/courses/108106098', type: 'nptel' }
    ],
    notes: '',
    quizLogs: []
  },
  {
    id: 'ra-b13-time-response',
    code: 'RA-B1.3b',
    title: 'Control Systems: Transient & Steady-State Response of LTI Systems',
    paper: 'RA',
    section: 'Part B1.3: Control Systems',
    phase: 3,
    priority: 'core',
    estimatedHours: 8,
    status: 'not_started',
    confidence: 1,
    primaryResource: 'Brian Douglas + Nise Ch. 4 & 7 (Time Response & Steady State Error)',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L',
    proxyPapers: 'GATE EE / EC / IN (Time Response & Error Constants Kp, Kv, Ka)',
    syllabusExcerpt: 'Transient and Steady-state analysis of linear time-invariant systems.',
    subtopics: [
      { id: 's1', title: 'First-order system step & ramp response (time constant τ)', completed: false },
      { id: 's2', title: 'Second-order systems: undamped, underdamped, critically damped, overdamped (ζ, ωn)', completed: false },
      { id: 's3', title: 'Time domain specifications: rise time tr, peak time tp, peak overshoot Mp, settling time ts', completed: false },
      { id: 's4', title: 'Steady-state error, system Type (0, 1, 2) & static error constants Kp, Kv, Ka', completed: false }
    ],
    links: [
      { title: 'Brian Douglas — Final Value Theorem & Steady State Error', url: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L', type: 'youtube' },
      { title: 'GateOverflow EE — Control Systems Time Domain PYQs', url: 'https://gateoverflow.in/tag/control-systems', type: 'pyq' }
    ],
    notes: 'Diagnostic Q10 baseline: Second-order damping ratio ζ < 1 vs ζ = 1 vs ζ > 1 was a Gap. Very high GATE weightage.',
    quizLogs: []
  },
  {
    id: 'ra-b13-stability-routh-rootlocus',
    code: 'RA-B1.3c',
    title: 'Control Systems: Routh-Hurwitz Criterion & Root Locus',
    paper: 'RA',
    section: 'Part B1.3: Control Systems',
    phase: 3,
    priority: 'core',
    estimatedHours: 7,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Brian Douglas (Routh-Hurwitz & Root Locus videos) + Nise Ch. 6 & 8',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L',
    proxyPapers: 'GATE EE / EC / IN (Routh Array & Root Locus Rules)',
    syllabusExcerpt: 'Stability analysis using Routh-Hurwitz criterion, Root Loci.',
    subtopics: [
      { id: 's1', title: 'BIBO stability & pole locations in s-plane', completed: false },
      { id: 's2', title: 'Routh-Hurwitz stability table & special cases (zero in first column, row of zeros)', completed: false },
      { id: 's3', title: 'Root Locus angle & magnitude conditions, asymptotes, centroid, breakaway points', completed: false },
      { id: 's4', title: 'Imaginary axis crossing & gain K range for stability', completed: false }
    ],
    links: [
      { title: 'Brian Douglas — Routh-Hurwitz & Root Locus Playlist', url: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L', type: 'youtube' }
    ],
    notes: '',
    quizLogs: []
  },
  {
    id: 'ra-b13-bode-nyquist-pid',
    code: 'RA-B1.3d',
    title: 'Control Systems: Bode Plots, Nyquist, Compensators & PID Simulation',
    paper: 'RA',
    section: 'Part B1.3: Control Systems',
    phase: 3,
    priority: 'core',
    estimatedHours: 10,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Brian Douglas (Bode, Nyquist, Lead/Lag, PID) + Python PID Simulation',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L',
    proxyPapers: 'GATE EE / EC / IN (Bode Plot, Gain/Phase Margin, Nyquist, PID)',
    syllabusExcerpt: 'Stability analysis using Nyquist criteria, Bode plots, Lag, Lead and Lead-Lag compensators; P, PI and PID controllers.',
    subtopics: [
      { id: 's1', title: 'Bode magnitude (dB/decade) & phase plots, corner frequencies', completed: false },
      { id: 's2', title: 'Gain Margin (GM), Phase Margin (PM) & Nyquist encirclement criterion (N = P - Z)', completed: false },
      { id: 's3', title: 'Lead, Lag, and Lead-Lag compensators pole-zero placement', completed: false },
      { id: 's4', title: 'P, PI, PD, and PID controllers & Hands-on Python PID simulation project', completed: false }
    ],
    links: [
      { title: 'Brian Douglas — Bode Plots, Nyquist & PID Control', url: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L', type: 'youtube' },
      { title: 'Python Control Systems Library (python-control GitHub)', url: 'https://github.com/python-control/python-control', type: 'github' }
    ],
    notes: 'Includes Portfolio Project #2: Simulate a PID controller on a 2nd-order DC motor / robotic joint with disturbance rejection.',
    quizLogs: []
  },
  {
    id: 'ra-b12-signals-lti',
    code: 'RA-B1.2a',
    title: 'Signals & Systems: Continuous/Discrete Signals, LTI & Causality',
    paper: 'RA',
    section: 'Part B1.2: Signals and Systems',
    phase: 3,
    priority: 'core',
    estimatedHours: 7,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Oppenheim & Willsky + Neso Academy / MIT OCW 6.003 Signals & Systems',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRhG6s3jYIU48CqsT5cyiDTO',
    proxyPapers: 'GATE EC / EE / IN (Signals & Systems)',
    syllabusExcerpt: 'Representation of continuous and discrete time signals, shifting and scaling properties, linear time-invariant and causal systems; R.M.S. value, average value calculation.',
    subtopics: [
      { id: 's1', title: 'Signal operations: time-shifting, time-scaling, time-reversal, even/odd decomposition', completed: false },
      { id: 's2', title: 'Energy & Power signals, RMS value and average value calculation', completed: false },
      { id: 's3', title: 'System properties: Linearity, Time-Invariance, Causality, Stability, Invertibility', completed: false },
      { id: 's4', title: 'Continuous convolution integral & discrete convolution sum for LTI systems', completed: false }
    ],
    links: [
      { title: 'Neso Academy — Signals and Systems Playlist (YouTube)', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRhG6s3jYIU48CqsT5cyiDTO', type: 'youtube' },
      { title: 'MIT OCW RES.6-007 — Signals and Systems by Alan V. Oppenheim', url: 'https://ocw.mit.edu/courses/res-6-007-signals-and-systems-spring-2011/', type: 'youtube' }
    ],
    notes: '',
    quizLogs: []
  },
  {
    id: 'ra-b12-transforms-sampling',
    code: 'RA-B1.2b',
    title: 'Signals & Systems: Fourier, Laplace, Z-Transform & Sampling Theorem',
    paper: 'RA',
    section: 'Part B1.2: Signals and Systems',
    phase: 3,
    priority: 'core',
    estimatedHours: 8,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Oppenheim + MIT OCW RES.6-007 + Neso Academy Transforms',
    primaryResourceUrl: 'https://ocw.mit.edu/courses/res-6-007-signals-and-systems-spring-2011/',
    proxyPapers: 'GATE EC / EE / IN (Fourier, Z-Transform, Nyquist Sampling Rate)',
    syllabusExcerpt: 'Fourier series representation of continuous and discrete time periodic signals, Shannon’s sampling theorem, Definitions and properties of Fourier Transform, Laplace Transform and Z transform.',
    subtopics: [
      { id: 's1', title: 'Continuous & Discrete-Time Fourier Series (CTFS / DTFS) & Parseval’s Theorem', completed: false },
      { id: 's2', title: 'Continuous-Time Fourier Transform (CTFT) properties & duality', completed: false },
      { id: 's3', title: 'Shannon’s Sampling Theorem, Nyquist rate, aliasing & reconstruction filter', completed: false },
      { id: 's4', title: 'Z-Transform, Region of Convergence (ROC), causality & stability from ROC', completed: false }
    ],
    links: [
      { title: 'MIT OCW — Signals & Systems (Oppenheim Video Lectures)', url: 'https://ocw.mit.edu/courses/res-6-007-signals-and-systems-spring-2011/', type: 'youtube' },
      { title: 'Neso Academy — Signals & Systems Complete Playlist', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRhG6s3jYIU48CqsT5cyiDTO', type: 'youtube' }
    ],
    notes: '',
    quizLogs: []
  },
  {
    id: 'ra-b11-opamps-filters',
    code: 'RA-B1.1a',
    title: 'Analog Circuits: Op-Amps, Filters, Schmitt Triggers, ADC/DAC & SMPS',
    paper: 'RA',
    section: 'Part B1.1: Analog Circuits and Embedded Systems',
    phase: 3,
    priority: 'light_touch',
    estimatedHours: 6,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Ramakant Gayakwad (Op-Amps) + Sedra & Smith (Selective Light-Touch)',
    primaryResourceUrl: 'https://nptel.ac.in/courses/108106172',
    proxyPapers: 'GATE EE / IN / EC (Op-Amp circuits, 555 Timer, ADC/DAC resolution)',
    syllabusExcerpt: 'Analog filters - low-pass, high-pass, band-pass and band-reject; Amplifiers: biasing, equivalent circuit and frequency response, feedback amplifiers, operational amplifiers- characteristics and applications; oscillators; Voltage Controlled Oscillators and timers, Schmitt triggers, sample and hold circuits, Analog-to-Digital (A/D) and Digital-to-Analog (D/A) converters; Switched Mode Power Supplies (SMPS).',
    subtopics: [
      { id: 's1', title: 'Ideal Op-Amp circuits: inverting, non-inverting, summing, differential, integrator, differentiator', completed: false },
      { id: 's2', title: 'Schmitt trigger (hysteresis), active filters (LPF, HPF, BPF), 555 Timer & VCO basics', completed: false },
      { id: 's3', title: 'Sample & Hold, DAC (R-2R ladder, weighted resistor) & ADC (SAR, Flash, Dual-slope)', completed: false },
      { id: 's4', title: 'Amplifier feedback topologies & Buck/Boost SMPS duty-cycle formulas (light-touch)', completed: false }
    ],
    links: [
      { title: 'NPTEL Basic Electrical Circuits Week 8 — Op-Amp & Negative Feedback', url: 'https://www.youtube.com/playlist?list=PLdzewXO9j7aqkQARDMKuuboDmRahPHLWy', type: 'nptel' },
      { title: 'All About Circuits — Operational Amplifiers Textbook', url: 'https://www.allaboutcircuits.com/textbook/semiconductors/chpt-8/introduction-operational-amplifiers/', type: 'practice' }
    ],
    notes: 'Light-touch cut policy: Focus heavily on Op-Amps, Schmitt triggers, and ADC/DAC numericals (high yield & overlaps with Sensors). Keep BJT/MOSFET small-signal biasing light.',
    quizLogs: []
  },
  {
    id: 'ra-b11-embedded-mcu',
    code: 'RA-B1.1b',
    title: 'Embedded Systems: Microcontrollers, Timers, Interrupts & DAQ',
    paper: 'RA',
    section: 'Part B1.1: Analog Circuits and Embedded Systems',
    phase: 3,
    priority: 'light_touch',
    estimatedHours: 4,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Mazidi Microcontroller Basics + NPTEL Mechatronics Week 5',
    primaryResourceUrl: 'https://archive.nptel.ac.in/courses/112/107/112107298/',
    proxyPapers: 'GATE IN / EC (Microprocessor/Microcontroller memory interfacing & interrupts)',
    syllabusExcerpt: 'Microprocessor and microcontroller applications, components of microcontrollers (CPU, memory, I/O ports, timers), interrupt handling; memory and input-output interfacing; basics of data acquisition systems.',
    subtopics: [
      { id: 's1', title: 'Microprocessor vs Microcontroller architecture (CPU, RAM/ROM, GPIO, Timers/Counters)', completed: false },
      { id: 's2', title: 'Interrupt handling: polling vs interrupts, ISR, interrupt latency & priority', completed: false },
      { id: 's3', title: 'Memory address decoding (chip select logic) & memory-mapped vs I/O-mapped I/O', completed: false },
      { id: 's4', title: 'Data Acquisition Systems (DAQ) signal chain: sensor → conditioning → mux → S/H → ADC', completed: false }
    ],
    links: [
      { title: 'NPTEL Embedded Systems — IIT Delhi / IIT Kharagpur', url: 'https://nptel.ac.in/courses/108102045', type: 'nptel' }
    ],
    notes: 'Light-touch cut policy: Focus on memory address range calculations, timer clock counts, interrupt basics, and DAQ block chain.',
    quizLogs: []
  },
  {
    id: 'da-s1-prob-stats-core',
    code: 'DA-S1a (RA-A1.4)',
    title: 'Probability & Statistics: Axioms, Bayes, Random Variables & Distributions',
    paper: 'BOTH',
    section: 'DA Sec 1 / RA Sec A.1: Probability and Statistics',
    phase: 3,
    priority: 'maintenance',
    estimatedHours: 5,
    status: 'not_started',
    confidence: 4,
    primaryResource: 'GATE DA PYQs (2024–2026) + DS-AI-GATE Prob-Stats + Sheldon Ross / Blitzstein',
    primaryResourceUrl: 'https://github.com/DS-AI-GATE/dsai-gate',
    syllabusExcerpt: 'Counting, probability axioms, independent/mutually exclusive events, marginal/conditional/joint probability, Bayes Theorem, conditional expectation and variance, mean, median, mode, SD, correlation, covariance, PMF/PDF/CDF (Uniform, Bernoulli, Binomial, Exponential, Poisson, Normal, t, Chi-squared).',
    subtopics: [
      { id: 's1', title: 'Combinatorics, conditional probability, total probability & Bayes theorem', completed: false },
      { id: 's2', title: 'Expectation, variance, covariance, correlation & Law of Total Expectation/Variance', completed: false },
      { id: 's3', title: 'Discrete distributions: Bernoulli, Binomial, Poisson, Uniform', completed: false },
      { id: 's4', title: 'Continuous distributions: Uniform, Exponential (memoryless), Normal, Standard Normal', completed: false }
    ],
    links: [
      { title: 'Harvard Stat 110 — Prof. Joe Blitzstein (YouTube Playlist)', url: 'https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo', type: 'youtube' },
      { title: 'DS-AI-GATE — Probability & Statistics Notes & PYQs', url: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Probability-Statistics-Readme.md', type: 'github' }
    ],
    notes: 'Strong background (BSc/MSc Maths & Stats). Focus on timed GATE DA & ST/CS problem-solving speed.',
    quizLogs: []
  },
  {
    id: 'da-s1-inferential-stats',
    code: 'DA-S1b (RA-A1.4)',
    title: 'Inferential Statistics: CLT, Confidence Intervals & Hypothesis Testing',
    paper: 'BOTH',
    section: 'DA Sec 1 / RA Sec A.1: Probability and Statistics',
    phase: 3,
    priority: 'maintenance',
    estimatedHours: 4,
    status: 'not_started',
    confidence: 4,
    primaryResource: 'DS-AI-GATE Prob-Stats + GATE DA 2024–2026 PYQs',
    primaryResourceUrl: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Probability-Statistics-Readme.md',
    syllabusExcerpt: 't-distribution, chi-squared distributions, Central limit theorem, confidence interval, z-test, t-test, chi-squared test, hypothesis testing.',
    subtopics: [
      { id: 's1', title: 'Central Limit Theorem (CLT) & sampling distributions of sample mean/variance', completed: false },
      { id: 's2', title: 'Student’s t-distribution & Chi-squared distribution degrees of freedom', completed: false },
      { id: 's3', title: 'Confidence Intervals (known vs unknown variance)', completed: false },
      { id: 's4', title: 'Hypothesis testing (Type I/II errors, p-value, z-test, t-test, chi-squared goodness-of-fit)', completed: false }
    ],
    links: [
      { title: 'StatQuest with Josh Starmer — Statistics Fundamentals (YouTube)', url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9', type: 'youtube' },
      { title: 'shayan-ing/GATE-DA-NOTES — Probability & Stats Solved PYQs', url: 'https://github.com/shayan-ing/GATE-DA-NOTES', type: 'github' }
    ],
    notes: '',
    quizLogs: []
  },
  {
    id: 'da-s2-linalg-core',
    code: 'DA-S2a (RA-A1.1)',
    title: 'Linear Algebra: Vector Spaces, Rank, Linear Systems & Eigenvalues',
    paper: 'BOTH',
    section: 'DA Sec 2 / RA Sec A.1: Linear Algebra',
    phase: 3,
    priority: 'maintenance',
    estimatedHours: 4,
    status: 'not_started',
    confidence: 4,
    primaryResource: 'Gilbert Strang MIT 18.06 + 3Blue1Brown Essence of Linear Algebra + GATE PYQs',
    primaryResourceUrl: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
    syllabusExcerpt: 'Vector space, subspaces, linear dependence and independence, matrices, transpose, determinant, rank, nullity, trace, adjoint, Gaussian elimination, solutions to systems of linear equations, eigenvalues and eigenvectors.',
    subtopics: [
      { id: 's1', title: 'Vector spaces, subspaces, basis, dimension & Rank-Nullity Theorem', completed: false },
      { id: 's2', title: 'Systems of linear equations (Ax = b): consistency, unique vs infinite solutions', completed: false },
      { id: 's3', title: 'Determinant, trace, adjoint, inverse & Cayley-Hamilton Theorem', completed: false },
      { id: 's4', title: 'Eigenvalues, eigenvectors, algebraic vs geometric multiplicity & diagonalization', completed: false }
    ],
    links: [
      { title: '3Blue1Brown — Essence of Linear Algebra (YouTube)', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', type: 'youtube' },
      { title: 'MIT OCW 18.06 — Gilbert Strang Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'youtube' },
      { title: 'DS-AI-GATE — Linear Algebra Notes & Practice', url: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Linear-Algebra-Readme.md', type: 'github' }
    ],
    notes: 'Covers 100% of RA Linear Algebra and core DA Linear Algebra.',
    quizLogs: []
  },
  {
    id: 'da-s2-linalg-decompositions',
    code: 'DA-S2b',
    title: 'Linear Algebra (DA): Projections, Special Matrices, Quadratic Forms, LU & SVD',
    paper: 'DA',
    section: 'Section 2: Linear Algebra',
    phase: 3,
    priority: 'maintenance',
    estimatedHours: 4,
    status: 'not_started',
    confidence: 4,
    primaryResource: 'Gilbert Strang + DS-AI-GATE Linear Algebra + GATE DA PYQs',
    primaryResourceUrl: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Linear-Algebra-Readme.md',
    syllabusExcerpt: 'Projection matrix, orthogonal matrix, idempotent matrix, partition matrix and their properties, quadratic forms, projections, LU decomposition, singular value decomposition (SVD).',
    subtopics: [
      { id: 's1', title: 'Projection matrices (P² = P, Pᵀ = P), least squares projection & orthogonal matrices', completed: false },
      { id: 's2', title: 'Idempotent & partition matrices and eigenvalue properties', completed: false },
      { id: 's3', title: 'Quadratic forms xᵀAx: positive definite, positive semi-definite, Sylvesters criterion', completed: false },
      { id: 's4', title: 'LU Decomposition & Singular Value Decomposition (SVD: A = UΣVᵀ, low-rank approx)', completed: false }
    ],
    links: [
      { title: 'DS-AI-GATE — Linear Algebra Repository', url: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Linear-Algebra-Readme.md', type: 'github' }
    ],
    notes: '',
    quizLogs: []
  },
  {
    id: 'da-s3-calculus-opt',
    code: 'DA-S3 (RA-A1.2)',
    title: 'Calculus & Single-Variable Optimization (DA + RA Single Variable)',
    paper: 'BOTH',
    section: 'DA Sec 3 / RA Sec A.1: Calculus and Optimization',
    phase: 3,
    priority: 'maintenance',
    estimatedHours: 4,
    status: 'not_started',
    confidence: 4,
    primaryResource: 'DS-AI-GATE Calculus-Opt + GATE CS/DA/ME Calculus PYQs',
    primaryResourceUrl: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Calculus-and-Optimization-Readme.md',
    syllabusExcerpt: 'Functions of a single variable, limit, continuity and differentiability, mean value theorems, indeterminate forms, Taylor series, maxima and minima, optimization involving a single variable.',
    subtopics: [
      { id: 's1', title: 'Limits, L’Hôpital’s rule (indeterminate forms), continuity & differentiability', completed: false },
      { id: 's2', title: 'Rolle’s theorem, Lagrange’s & Cauchy’s Mean Value Theorems', completed: false },
      { id: 's3', title: 'Taylor & Maclaurin series expansions and error bounds', completed: false },
      { id: 's4', title: 'Maxima, minima, saddle points, convexity & single-variable optimization', completed: false }
    ],
    links: [
      { title: 'DS-AI-GATE — Calculus and Optimization Readme', url: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Calculus-and-Optimization-Readme.md', type: 'github' }
    ],
    notes: '',
    quizLogs: []
  },
  {
    id: 'da-s6-ml-supervised',
    code: 'DA-S6a',
    title: 'Machine Learning: Supervised Learning, Regression, SVM, Trees & Neural Nets',
    paper: 'DA',
    section: 'Section 6: Machine Learning',
    phase: 3,
    priority: 'maintenance',
    estimatedHours: 5,
    status: 'not_started',
    confidence: 5,
    primaryResource: 'GATE DA 2024–2026 PYQs + Andrew Ng / StatQuest + M.Tech / Work Experience',
    primaryResourceUrl: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Machine-Learning-Readme.md',
    syllabusExcerpt: 'Supervised Learning: simple/multiple linear regression, ridge regression, logistic regression, k-NN, naive Bayes, linear discriminant analysis (LDA), SVM, decision trees, bias-variance trade-off, LOO & k-fold cross-validation, MLP, feed-forward neural network.',
    subtopics: [
      { id: 's1', title: 'Closed-form OLS, Ridge (L2) regularization & Bias-Variance trade-off', completed: false },
      { id: 's2', title: 'Logistic regression, Naive Bayes, Gaussian LDA & k-NN decision boundaries', completed: false },
      { id: 's3', title: 'Support Vector Machines (hard/soft margin, dual formulation, kernel trick) & Decision Trees (Entropy, Gini)', completed: false },
      { id: 's4', title: 'MLP, backpropagation gradients, activation functions & LOO / k-fold Cross Validation', completed: false }
    ],
    links: [
      { title: 'DS-AI-GATE — Machine Learning Notes & Code', url: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Machine-Learning-Readme.md', type: 'github' },
      { title: 'StatQuest — Machine Learning Playlist (YouTube)', url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF', type: 'youtube' },
      { title: 'NPTEL Introduction to Machine Learning — Prof. Balaraman Ravindran (IIT Madras)', url: 'https://nptel.ac.in/courses/106106139', type: 'nptel' }
    ],
    notes: 'Core professional strength (Associate AI/ML Engineer). Focus on numerical closed-form calculations asked in GATE DA (e.g., SVM margin width, entropy gain, LDA projection, Ridge matrix).',
    quizLogs: []
  },
  {
    id: 'da-s6-ml-unsupervised',
    code: 'DA-S6b',
    title: 'Machine Learning: Clustering (k-Means/Medoid, Hierarchical) & PCA',
    paper: 'DA',
    section: 'Section 6: Machine Learning',
    phase: 3,
    priority: 'maintenance',
    estimatedHours: 3,
    status: 'not_started',
    confidence: 5,
    primaryResource: 'GATE DA 2024–2026 PYQs + DS-AI-GATE ML Notes',
    primaryResourceUrl: 'https://github.com/DS-AI-GATE/dsai-gate/blob/main/Machine-Learning-Readme.md',
    syllabusExcerpt: 'Unsupervised Learning: clustering algorithms, k-means/k-medoid, hierarchical clustering, top-down, bottom-up: single-linkage, multiple-linkage, dimensionality reduction, principal component analysis (PCA).',
    subtopics: [
      { id: 's1', title: 'k-Means & k-Medoids manual 1-2 iteration step calculations', completed: false },
      { id: 's2', title: 'Hierarchical clustering dendrograms: Single-linkage (min) vs Complete/Average-linkage', completed: false },
      { id: 's3', title: 'Principal Component Analysis (PCA): covariance matrix eigenvectors & proportion of variance explained', completed: false }
    ],
    links: [
      { title: 'GATE 2026 Official DA Question Paper (IIT Madras Portal)', url: 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/DA.pdf', type: 'official' }
    ],
    notes: '',
    quizLogs: []
  },

  // ============================================================================
  // PHASE 4: REVISION, NUMERICAL METHODS & FULL MOCKS (18 Jan – 7 Feb 2027)
  // ============================================================================
  {
    id: 'ra-a15-numerical-methods',
    code: 'RA-A1.5',
    title: 'Numerical Methods: Root Finding, Quadrature & ODE Solvers',
    paper: 'RA',
    section: 'Section A.1: Engineering Mathematics',
    phase: 4,
    priority: 'light_touch',
    estimatedHours: 3,
    status: 'not_started',
    confidence: 3,
    primaryResource: 'Chapra & Canale + GATE ME/EE/IN Numerical Methods Formula Sheet',
    primaryResourceUrl: 'https://gateoverflow.in/tag/numerical-methods',
    proxyPapers: 'GATE ME / EE / IN / CE (Numerical Methods)',
    syllabusExcerpt: 'Solutions of linear and non-linear algebraic equations; integration by trapezoidal and Simpson’s rules; finite differences, explicit single and multi-step methods for differential equations.',
    subtopics: [
      { id: 's1', title: 'Bisection, Regula-Falsi, Secant & Newton-Raphson iteration formulas', completed: false },
      { id: 's2', title: 'Gauss-Seidel & Jacobi iterative methods for linear systems', completed: false },
      { id: 's3', title: 'Trapezoidal rule, Simpson’s 1/3 and 3/8 integration rules', completed: false },
      { id: 's4', title: 'Forward Euler & Runge-Kutta (RK2/RK4) explicit ODE methods', completed: false }
    ],
    links: [
      { title: 'GateOverflow — Numerical Methods PYQs', url: 'https://gateoverflow.in/tag/numerical-methods', type: 'pyq' }
    ],
    notes: 'Light-touch cut policy: Pure formula-application questions (Newton-Raphson, Trapezoidal/Simpson, Euler step). Easy 2-3 marks with 3 hours of practice.',
    quizLogs: []
  },
  {
    id: 'ga-verbal-quant',
    code: 'GA-1',
    title: 'General Aptitude: Verbal, Quantitative, Analytical & Spatial Aptitude',
    paper: 'GA',
    section: 'Common Section: General Aptitude (15 Marks in BOTH Papers)',
    phase: 4,
    priority: 'core',
    estimatedHours: 10,
    status: 'in_progress',
    confidence: 4,
    primaryResource: 'GATEOverflow Aptitude Overflow PDF + 15-min Daily Slot',
    primaryResourceUrl: 'https://aptitude.gateoverflow.in/',
    syllabusExcerpt: '15 Marks in RA + 15 Marks in DA (Total 30 Marks across both exams): Verbal Aptitude, Quantitative Aptitude (Data Interpretation, Ratios, Percentages, Mensuration), Analytical Aptitude (Deduction, Induction), Spatial Aptitude (Paper folding, rotation, mirroring).',
    subtopics: [
      { id: 's1', title: 'Take General Aptitude Diagnostic Quiz (10 questions)', completed: false },
      { id: 's2', title: 'Spatial Aptitude: paper folding/cutting, 2D/3D rotations, mirror/water images', completed: false },
      { id: 's3', title: 'Analytical & Logical Reasoning: syllogisms, seating/blood relations, number series', completed: false },
      { id: 's4', title: 'Quantitative & Data Interpretation: charts, mixtures, work/time, geometry', completed: false }
    ],
    links: [
      { title: 'Aptitude Overflow (GATEOverflow Dedicated GA Portal)', url: 'https://aptitude.gateoverflow.in/', type: 'practice' },
      { title: 'GATEOverflow GO-PDFs — Aptitude Overflow Book Release', url: 'https://github.com/GATEOverflow/GO-PDFs/releases', type: 'github' }
    ],
    notes: '15 minutes daily habit. 15 marks in RA + 15 marks in DA — highest ROI section for boosting overall GATE score.',
    quizLogs: []
  },
  {
    id: 'mock-ra-series',
    code: 'MOCK-RA',
    title: 'GATE RA Full-Length Mock Tests & Proxy Section Timed Drills',
    paper: 'RA',
    section: 'Phase 4: Full Mocks & Weak-Topic Repair',
    phase: 4,
    priority: 'core',
    estimatedHours: 15,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'NPTEL Sunday GATE Mocks (2–5 PM IST) + Custom EE/IN/ME Composite Mocks',
    primaryResourceUrl: 'https://gate.nptel.ac.in/exam.html',
    proxyPapers: 'Composite 65-Q Simulation: 10 GA + 35 Common (Math/Mechatronics/Robotics) + 20 Part B1 (EE)',
    syllabusExcerpt: '65 Questions, 100 Marks, 180 Minutes CBT: 15 Marks GA + 60 Marks Part A Common + 25 Marks Part B1 Electrical.',
    subtopics: [
      { id: 's1', title: 'RA Mock #1 (Full 3-hour timed simulation + mistake log)', completed: false },
      { id: 's2', title: 'RA Mock #2 (Full 3-hour timed simulation + weak-topic repair)', completed: false },
      { id: 's3', title: 'RA Mock #3 (Full 3-hour timed simulation + virtual calculator speed check)', completed: false },
      { id: 's4', title: 'Final Formula Revision: Circuits, Kinematics, Sensors, Control & Signals', completed: false }
    ],
    links: [
      { title: 'NPTEL GATE Portal — Sunday Mock Tests (2–5 PM IST)', url: 'https://gate.nptel.ac.in/exam.html', type: 'official' },
      { title: 'IIT Madras Official GATE 2026 Question Papers & Answer Keys', url: 'https://gate2027.iitm.ac.in/download', type: 'official' }
    ],
    notes: '',
    quizLogs: []
  },
  {
    id: 'mock-da-series',
    code: 'MOCK-DA',
    title: 'GATE DA Past Papers (2024, 2025, 2026) & Full Timed Mocks',
    paper: 'DA',
    section: 'Phase 4: Full DA Mocks & Weak-Topic Repair',
    phase: 4,
    priority: 'core',
    estimatedHours: 12,
    status: 'not_started',
    confidence: 0,
    primaryResource: 'Official GATE DA 2024, 2025 & 2026 Papers + GATEOverflow DA Test Series',
    primaryResourceUrl: 'https://gate2027.iitm.ac.in/download',
    syllabusExcerpt: '65 Questions, 100 Marks, 180 Minutes CBT: 15 Marks GA + 85 Marks DA Subject.',
    subtopics: [
      { id: 's1', title: 'Solve Official GATE DA 2024 Paper (3-hour timed CBT simulation)', completed: false },
      { id: 's2', title: 'Solve Official GATE DA 2025 Paper (3-hour timed CBT simulation)', completed: false },
      { id: 's3', title: 'Solve Official GATE DA 2026 Paper (3-hour timed CBT simulation)', completed: false },
      { id: 's4', title: 'DBMS, Warehousing & Classical AI rapid-fire revision', completed: false }
    ],
    links: [
      { title: 'Official GATE 2026 DA Question Paper PDF (IIT Madras)', url: 'https://gate2027.iitm.ac.in/static/doc/download/2026/QPs/DA.pdf', type: 'official' },
      { title: 'iitmbsc-student-projects/gate-da Interactive Question Bank', url: 'https://iitmbsc-student-projects.github.io/gate-da/', type: 'practice' },
      { title: 'GATEOverflow — GATE DA 2026 Complete PYQ Book PDF', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateda-2026', type: 'github' }
    ],
    notes: '',
    quizLogs: []
  }
];
