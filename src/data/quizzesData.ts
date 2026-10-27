import { InteractiveQuiz } from '../types';

export const BUILTIN_QUIZZES: InteractiveQuiz[] = [
  // ============================================================================
  // QUIZ 1: WEEKEND 1 CIRCUITS MIXED QUIZ (KCL/KVL, Node/Mesh, Network Theorems)
  // Requested explicitly in Session Handoff Open Items!
  // ============================================================================
  {
    id: 'quiz-weekend1-circuits',
    title: 'Weekend 1 Mixed Quiz: KCL/KVL, Node/Mesh & Network Theorems',
    subtitle: '10 GATE-Level Questions (EE/IN Proxy) • Covers RA-A2.1a & RA-A2.1b',
    paper: 'RA',
    phase: 1,
    durationMinutes: 45,
    description:
      'Specifically authored for your Weekend 1 milestone (Handoff Open Item #2). Tests KCL/KVL, passive sign convention, Nodal & Supernode analysis, Mesh analysis, Source Transformation, Superposition, Thevenin/Norton with dependent sources, and Maximum Power Transfer.',
    questions: [
      {
        id: 'w1-q1',
        questionNumber: 1,
        topicId: 'ra-a2-circuits-kcl-kvl',
        topicName: 'Circuits I: KCL/KVL & Series/Parallel',
        paper: 'RA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE EE / IN Foundation (Fixes Diagnostic Q1 Gap)',
        questionText:
          'Three resistors R1 = 4 Ω, R2 = 6 Ω, and R3 = 12 Ω are connected in parallel across an ideal 24 V DC voltage source. A series resistor Rs = 2 Ω is inserted between the positive terminal of the 24 V source and the parallel combination. What is the current I2 flowing through the 6 Ω resistor?',
        options: ['1.0 A', '2.0 A', '3.0 A', '4.0 A'],
        correctAnswer: '2.0 A',
        explanation:
          'Step 1: Equivalent resistance of the parallel combination Rp: 1/Rp = 1/4 + 1/6 + 1/12 = (3 + 2 + 1)/12 = 6/12 => Rp = 2 Ω.\nStep 2: Total circuit resistance R_total = Rs + Rp = 2 Ω + 2 Ω = 4 Ω.\nStep 3: Total source current I_total = 24 V / 4 Ω = 6 A.\nStep 4: Voltage across the parallel combination Vp = I_total × Rp = 6 A × 2 Ω = 12 V.\nStep 5: Current through R2 (6 Ω) is I2 = Vp / R2 = 12 V / 6 Ω = 2.0 A.',
      },
      {
        id: 'w1-q2',
        questionNumber: 2,
        topicId: 'ra-a2-circuits-kcl-kvl',
        topicName: 'Circuits I: Nodal Analysis',
        paper: 'RA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE IN Proxy',
        questionText:
          'At Node A in a resistive network, three branches meet: Branch 1 connects Node A to a 20 V source (referenced to ground) through a 5 Ω resistor; Branch 2 connects Node A directly to ground through a 10 Ω resistor; Branch 3 has an independent 2 A current source entering Node A from ground. What is the node voltage V_A with respect to ground?',
        options: ['10 V', '15 V', '20 V', '25 V'],
        correctAnswer: '20 V',
        explanation:
          'Apply KCL at Node A (sum of currents leaving Node A = sum of currents entering Node A):\n(V_A - 20)/5 + V_A/10 = 2\nMultiply entire equation by 10:\n2(V_A - 20) + V_A = 20\n3 V_A - 40 = 20 => 3 V_A = 60 => V_A = 20 V.\nNotice that since V_A = 20 V, zero current flows from the 20 V source, and all 2 A from the current source flows down the 10 Ω resistor (2 A × 10 Ω = 20 V).',
      },
      {
        id: 'w1-q3',
        questionNumber: 3,
        topicId: 'ra-a2-circuits-kcl-kvl',
        topicName: 'Circuits I: Supernode Analysis',
        paper: 'RA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE EE Proxy',
        questionText:
          'Nodes 1 and 2 have an ideal 12 V voltage source connected between them (with the positive terminal at Node 1, so V1 - V2 = 12 V). Node 1 has a 4 Ω resistor to ground and a 3 A current source entering it. Node 2 has a 2 Ω resistor to ground. What is the voltage V2 at Node 2?',
        options: ['-1 V', '0 V', '2 V', '4 V'],
        correctAnswer: '0 V',
        explanation:
          'Form a Supernode enclosing Nodes 1 and 2:\n1) Constraint equation: V1 - V2 = 12 => V1 = V2 + 12.\n2) KCL at Supernode (currents leaving through resistors = current entering):\nV1 / 4 + V2 / 2 = 3\nSubstitute V1 = V2 + 12:\n(V2 + 12)/4 + V2/2 = 3\nMultiply by 4: (V2 + 12) + 2·V2 = 12 => 3·V2 = 0 => V2 = 0 V (and V1 = 12 V).',
      },
      {
        id: 'w1-q4',
        questionNumber: 4,
        topicId: 'ra-a2-circuits-kcl-kvl',
        topicName: 'Circuits I: Mesh Analysis & Supermesh',
        paper: 'RA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE EE / EC Proxy',
        questionText:
          'A two-mesh planar circuit has Mesh 1 (current I1 clockwise) and Mesh 2 (current I2 clockwise). Mesh 1 contains a 30 V source and a 6 Ω resistor. Mesh 2 contains a 4 Ω resistor. The common branch between Mesh 1 and Mesh 2 contains an ideal 5 A current source pointing upward (in the direction of I1 and opposite to I2). Find the mesh current I1.',
        options: ['3.0 A', '4.0 A', '5.0 A', '6.0 A'],
        correctAnswer: '5.0 A',
        explanation:
          '1) Current source in the shared branch gives the constraint equation:\nI1 - I2 = 5 => I2 = I1 - 5.\n2) Write the Supermesh KVL equation around the outer perimeter (bypassing the shared 5 A branch):\n-30 + 6·I1 + 4·I2 = 0\nSubstitute I2 = I1 - 5:\n-30 + 6·I1 + 4(I1 - 5) = 0 => 10·I1 - 50 = 0 => I1 = 5.0 A (and I2 = 0 A).',
      },
      {
        id: 'w1-q5',
        questionNumber: 5,
        topicId: 'ra-a2-network-theorems',
        topicName: 'Circuits II: Superposition Theorem',
        paper: 'RA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE EE / IN Conceptual Trap',
        questionText:
          'In a linear resistive network containing two independent DC sources S1 and S2, Source S1 acting alone delivers 9 W to a load resistor R_L, and Source S2 acting alone delivers 16 W to the same load resistor R_L (with currents in the same direction). What is the total power delivered to R_L when both S1 and S2 act simultaneously?',
        options: ['25 W', '49 W', '35 W', '7 W'],
        correctAnswer: '49 W',
        explanation:
          'CRITICAL GATE TRAP: Power is a non-linear quantity (P = I²R), so Superposition does NOT apply directly to power! You must superpose current or voltage first:\nI1 = √(P1 / R_L) = 3 / √R_L\nI2 = √(P2 / R_L) = 4 / √R_L\nSince currents are in the same direction, I_total = I1 + I2 = 7 / √R_L.\nTotal power P = I_total² × R_L = (√P1 + √P2)² = (√9 + √16)² = (3 + 4)² = 49 W.',
      },
      {
        id: 'w1-q6',
        questionNumber: 6,
        topicId: 'ra-a2-network-theorems',
        topicName: 'Circuits II: Thevenin Equivalent (Independent Sources)',
        paper: 'RA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE EE / IN (Fixes Diagnostic Q2 Gap)',
        questionText:
          'A voltage divider consists of a 24 V source in series with R1 = 6 Ω and R2 = 12 Ω across ground. Output terminals A-B are taken across R2, with an additional series resistor R3 = 4 Ω connected between the R1-R2 junction and terminal A. What are the Thevenin voltage V_th and Thevenin resistance R_th looking into terminals A-B?',
        options: [
          'V_th = 16 V, R_th = 8 Ω',
          'V_th = 16 V, R_th = 4 Ω',
          'V_th = 12 V, R_th = 8 Ω',
          'V_th = 8 V, R_th = 12 Ω',
        ],
        correctAnswer: 'V_th = 16 V, R_th = 8 Ω',
        explanation:
          '1) Open-circuit voltage V_th: With terminals A-B open, zero current flows through R3 (4 Ω). Thus V_th equals the voltage across R2 (12 Ω):\nV_th = 24 × [12 / (6 + 12)] = 24 × (2/3) = 16 V.\n2) Thevenin resistance R_th: Deactivate the 24 V source (replace with a short circuit). Now R1 (6 Ω) and R2 (12 Ω) are in parallel, in series with R3 (4 Ω):\nR_th = (6 || 12) + 4 = (6×12)/(6+12) + 4 = 4 + 4 = 8 Ω.',
      },
      {
        id: 'w1-q7',
        questionNumber: 7,
        topicId: 'ra-a2-network-theorems',
        topicName: 'Circuits II: Thevenin Resistance with Dependent Source',
        paper: 'RA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE EE / EC High-Frequency Pattern',
        questionText:
          'A one-port network contains NO independent sources. Across terminals A-B, there is a resistor R = 10 Ω in parallel with a dependent current source that pushes current 0.3·V_ab UPWARD into terminal A (where V_ab is the voltage of terminal A with respect to B). What is the Thevenin equivalent resistance R_th looking into terminals A-B?',
        options: ['-5 Ω', '2.5 Ω', '5 Ω', '10 Ω'],
        correctAnswer: '-5 Ω',
        explanation:
          'Apply a test voltage source V_test = V_ab across terminals A-B and find the current I_test entering terminal A:\nBy KCL at terminal A: I_test = (current down 10 Ω resistor) - (current 0.3·V_ab entering from dependent source)\nI_test = V_ab / 10 - 0.3·V_ab = (0.1 - 0.3)·V_ab = -0.2·V_ab.\nTherefore, R_th = V_ab / I_test = 1 / (-0.2) = -5 Ω. (Yes! Dependent sources can produce negative input resistance in active circuits.)',
      },
      {
        id: 'w1-q8',
        questionNumber: 8,
        topicId: 'ra-a2-network-theorems',
        topicName: 'Circuits II: Norton Equivalent & Short-Circuit Current',
        paper: 'RA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE IN Proxy',
        questionText:
          'A linear two-terminal DC network has an open-circuit voltage of V_oc = 18 V and a short-circuit current of I_sc = 3 A. If a 3 Ω load resistor is connected across the terminals, what is the current flowing through the 3 Ω load?',
        options: ['1.5 A', '2.0 A', '3.0 A', '6.0 A'],
        correctAnswer: '2.0 A',
        explanation:
          '1) V_th = V_oc = 18 V, and I_N = I_sc = 3 A.\n2) R_th = V_oc / I_sc = 18 V / 3 A = 6 Ω.\n3) When R_L = 3 Ω is connected across the Thevenin equivalent (18 V in series with 6 Ω):\nI_L = V_th / (R_th + R_L) = 18 / (6 + 3) = 2.0 A.',
      },
      {
        id: 'w1-q9',
        questionNumber: 9,
        topicId: 'ra-a2-network-theorems',
        topicName: 'Circuits II: Maximum Power Transfer (DC)',
        paper: 'RA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE EE / IN (Fixes Diagnostic Q3 Gap)',
        questionText:
          'A sensor signal conditioning circuit has a Thevenin equivalent voltage V_th = 12 V and Thevenin resistance R_th = 9 Ω. What value of variable load resistance R_L maximizes the power transferred to the load, and what is that maximum power P_max?',
        options: [
          'R_L = 9 Ω, P_max = 4 W',
          'R_L = 9 Ω, P_max = 16 W',
          'R_L = 4.5 Ω, P_max = 8 W',
          'R_L = 18 Ω, P_max = 2 W',
        ],
        correctAnswer: 'R_L = 9 Ω, P_max = 4 W',
        explanation:
          'By the Maximum Power Transfer Theorem for a purely resistive DC network:\n1) Optimal load resistance: R_L = R_th = 9 Ω.\n2) Maximum power transferred: P_max = V_th² / (4 × R_th) = 12² / (4 × 9) = 144 / 36 = 4 W.',
      },
      {
        id: 'w1-q10',
        questionNumber: 10,
        topicId: 'ra-a2-network-theorems',
        topicName: 'Circuits II: Maximum Power Transfer (AC Impedance Matching)',
        paper: 'RA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE EE / EC Classic Trap',
        questionText:
          'An AC network has a Thevenin impedance Z_th = (3 + j4) Ω and open-circuit rms voltage V_th = 15 V. Case A: The load is a general complex impedance Z_L = R_L + jX_L. Case B: The load is restricted to a pure resistor R_L only. What are the optimal loads in Case A and Case B for maximum average power transfer?',
        options: [
          'Case A: Z_L = (3 - j4) Ω; Case B: R_L = 5 Ω',
          'Case A: Z_L = (3 + j4) Ω; Case B: R_L = 3 Ω',
          'Case A: Z_L = (3 - j4) Ω; Case B: R_L = 3 Ω',
          'Case A: Z_L = 5 Ω; Case B: R_L = 4 Ω',
        ],
        correctAnswer: 'Case A: Z_L = (3 - j4) Ω; Case B: R_L = 5 Ω',
        explanation:
          'Favorite GATE 2-mark question:\n• Case A (complex load Z_L allowed): Conjugate matching! Z_L = Z_th* = (3 - j4) Ω, which cancels the reactance (+j4 - j4 = 0) and leaves R_L = R_th = 3 Ω.\n• Case B (purely resistive load R_L only): R_L must equal the MAGNITUDE of Z_th! R_L = |Z_th| = √(3² + 4²) = 5 Ω.',
      },
    ],
  },

  // ============================================================================
  // QUIZ 2: GATE DA DIAGNOSTIC BASELINE QUIZ (10 Questions across all 7 DA Sections)
  // Requested in Session Handoff Open Items #3!
  // ============================================================================
  {
    id: 'quiz-da-diagnostic',
    title: 'GATE DA Diagnostic Baseline Quiz (All 7 Syllabus Sections)',
    subtitle: '10 Questions • Calibrates your DA Maintenance & Gap Baseline (DBMS, Warehouse, AI, ML, Math)',
    paper: 'DA',
    phase: 1,
    durationMinutes: 30,
    description:
      'Skipped during the earlier session (Handoff Open Item #3). Takes 25–30 minutes and establishes your exact baseline across DBMS, Data Warehousing, Classical AI, Machine Learning, Probability, Linear Algebra, and Calculus.',
    questions: [
      {
        id: 'da-diag-1',
        questionNumber: 1,
        topicId: 'da-s5-dbms-norm-indexing',
        topicName: 'DBMS: Normal Forms (Gap Check)',
        paper: 'DA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE DA / CS Pattern',
        questionText:
          'Consider a relation schema R(A, B, C, D) with the set of functional dependencies F = { A → B, B → C, C → A }. What is the highest normal form satisfied by R?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: '3NF',
        explanation:
          'Step 1: Find candidate keys. Since A, B, C determine each other (A → B → C → A) and nothing determines D, every candidate key must include D plus one of {A, B, C}. Candidate keys are AD, BD, CD.\nStep 2: Prime attributes = {A, B, C, D} (all attributes are prime!).\nStep 3: Check BCNF: For A → B, the LHS (A) is NOT a superkey, so R violates BCNF.\nStep 4: Check 3NF: For every FD X → Y, either X is a superkey OR Y is a prime attribute. Since B, C, A are all prime attributes, R is in 3NF!',
      },
      {
        id: 'da-diag-2',
        questionNumber: 2,
        topicId: 'da-s5-dbms-er-relalg-sql',
        topicName: 'DBMS: Relational Algebra & Division (Gap Check)',
        paper: 'DA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE DA 2025 Pattern',
        questionText:
          'In Relational Algebra, given relation Enrolled(student_id, course_id) and Course(course_id), which operator directly computes the student_ids of students who are enrolled in ALL courses listed in Course(course_id)?',
        options: [
          'Division operator: Enrolled ÷ Course',
          'Natural Join: Enrolled ⋈ Course',
          'Cartesian Product: Enrolled × Course',
          'Left Outer Join: Enrolled ⟕ Course',
        ],
        correctAnswer: 'Division operator: Enrolled ÷ Course',
        explanation:
          'The Relational Algebra division operator R(A, B) ÷ S(B) returns all values of A such that for every tuple b in S, the pair (a, b) appears in R — corresponding to universal quantification (∀) in Tuple Relational Calculus.',
      },
      {
        id: 'da-diag-3',
        questionNumber: 3,
        topicId: 'da-s5-warehousing-prep',
        topicName: 'Data Warehousing: OLAP Measures (Gap Check)',
        paper: 'DA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE DA Syllabus Sec 5',
        questionText:
          'In multidimensional data warehouse modeling, measures are categorized into Distributive, Algebraic, and Holistic. Which of the following correctly classifies (COUNT, AVG, MEDIAN) in that order?',
        options: [
          'Distributive, Algebraic, Holistic',
          'Algebraic, Distributive, Holistic',
          'Distributive, Holistic, Algebraic',
          'Holistic, Algebraic, Distributive',
        ],
        correctAnswer: 'Distributive, Algebraic, Holistic',
        explanation:
          '• Distributive: Can be computed by partitioning and merging sub-aggregates directly (SUM, COUNT, MIN, MAX).\n• Algebraic: Can be computed from a bounded number of distributive sub-aggregates (AVG = SUM / COUNT, Variance, Standard Deviation).\n• Holistic: No constant bound on storage needed from sub-aggregates to compute the global exact value (MEDIAN, MODE, RANK).',
      },
      {
        id: 'da-diag-4',
        questionNumber: 4,
        topicId: 'da-s7-ai-search-logic',
        topicName: 'Classical AI: A* Search Heuristics (Gap Check)',
        paper: 'DA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE DA 2024/2025 Pattern',
        questionText:
          'Suppose h1(n) and h2(n) are two admissible heuristics for A* search. Let h3(n) = max(h1(n), h2(n)) and h4(n) = h1(n) + h2(n). Which statement is ALWAYS true?',
        options: [
          'h3(n) is admissible and dominates both h1 and h2; h4(n) is not necessarily admissible',
          'Both h3(n) and h4(n) are admissible',
          'Neither h3(n) nor h4(n) is admissible',
          'h4(n) is admissible, while h3(n) can overestimate h*(n)',
        ],
        correctAnswer:
          'h3(n) is admissible and dominates both h1 and h2; h4(n) is not necessarily admissible',
        explanation:
          'Since h1(n) ≤ h*(n) and h2(n) ≤ h*(n), their maximum h3(n) = max(h1(n), h2(n)) ≤ h*(n) is guaranteed to be admissible and expands no more nodes than either h1 or h2. Their sum h4(n) = h1(n) + h2(n) can exceed h*(n) (unless they are mutually disjoint pattern databases).',
      },
      {
        id: 'da-diag-5',
        questionNumber: 5,
        topicId: 'da-s7-ai-uncertainty',
        topicName: 'Classical AI: Bayesian Networks & D-Separation (Gap Check)',
        paper: 'DA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE DA Core Topic',
        questionText:
          'In a Bayesian Network with 3 binary random variables A, B, C forming a V-structure (collider) A → C ← B (where A and B have no parents), which conditional independence statement holds?',
        options: [
          'A and B are marginally independent (A ⊥ B), but become conditionally dependent given C',
          'A and B are marginally dependent, and become conditionally independent given C (A ⊥ B | C)',
          'A and B are independent both marginally and conditionally given C',
          'The network requires 8 independent parameters to specify its joint distribution',
        ],
        correctAnswer:
          'A and B are marginally independent (A ⊥ B), but become conditionally dependent given C',
        explanation:
          'This is the classic "Explaining Away" (V-structure / collider) rule in Bayesian Networks: P(A,B,C) = P(A)P(B)P(C|A,B). Summing out C gives P(A,B) = P(A)P(B), so A ⊥ B marginally. However, observing the common effect C (or any descendant of C) activates the trail and makes A and B conditionally dependent!',
      },
      {
        id: 'da-diag-6',
        questionNumber: 6,
        topicId: 'da-s2-linalg-decompositions',
        topicName: 'Linear Algebra: Projections & Eigenvalues',
        paper: 'DA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE DA Syllabus Sec 2',
        questionText:
          'Let P be an n × n orthogonal projection matrix onto a k-dimensional subspace of ℝⁿ (where 0 < k < n), so P² = P and Pᵀ = P. What are the eigenvalues of P and what is trace(P)?',
        options: [
          'Eigenvalues are only 0 and 1; trace(P) = k = rank(P)',
          'Eigenvalues are +1 and -1; trace(P) = 0',
          'Eigenvalues are all 1; trace(P) = n',
          'Eigenvalues can be any real numbers in [0, 1]; trace(P) = 1',
        ],
        correctAnswer: 'Eigenvalues are only 0 and 1; trace(P) = k = rank(P)',
        explanation:
          'For any idempotent matrix P² = P, if P·v = λ·v then P²·v = λ²·v = λ·v => λ(λ - 1) = 0, so eigenvalues are strictly 0 or 1. The eigenspace for λ=1 has dimension k = rank(P), so trace(P) = sum of eigenvalues = k.',
      },
      {
        id: 'da-diag-7',
        questionNumber: 7,
        topicId: 'da-s1-prob-stats-core',
        topicName: 'Probability & Statistics: Bayes Theorem',
        paper: 'DA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE DA / CS Classic',
        questionText:
          'A diagnostic test for a rare fault (prevalence P(F) = 0.01) has sensitivity P(+ | F) = 0.99 and false-positive rate P(+ | ¬F) = 0.01. If a component tests positive (+), what is the posterior probability P(F | +) that it actually has the fault?',
        options: ['0.50', '0.99', '0.09', '0.90'],
        correctAnswer: '0.50',
        explanation:
          'By Bayes’ Theorem:\nP(F | +) = [P(+ | F)·P(F)] / [P(+ | F)·P(F) + P(+ | ¬F)·P(¬F)]\n= (0.99 × 0.01) / (0.99 × 0.01 + 0.01 × 0.99) = 1 / 2 = 0.50.',
      },
      {
        id: 'da-diag-8',
        questionNumber: 8,
        topicId: 'da-s6-ml-supervised',
        topicName: 'Machine Learning: Bias-Variance & Ridge Regression',
        paper: 'DA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE DA Syllabus Sec 6',
        questionText:
          'In Ridge Regression, we minimize ||y - Xw||₂² + λ||w||₂² with regularization parameter λ > 0. As λ increases from 0 toward ∞, how do the Bias and Variance of the estimator w_hat change?',
        options: [
          'Bias increases, Variance decreases',
          'Bias decreases, Variance increases',
          'Both Bias and Variance decrease',
          'Bias remains zero, Variance decreases',
        ],
        correctAnswer: 'Bias increases, Variance decreases',
        explanation:
          'Adding L2 penalty λ||w||₂² shrinks the weights toward zero, introducing bias (since E[w_hat] ≠ w_true for λ > 0) while reducing sensitivity to noise in X and y (decreasing variance). Notice also that (XᵀX + λI) is always invertible for λ > 0 even when XᵀX is singular!',
      },
      {
        id: 'da-diag-9',
        questionNumber: 9,
        topicId: 'da-s3-calculus-opt',
        topicName: 'Calculus & Optimization',
        paper: 'DA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE DA Syllabus Sec 3',
        questionText:
          'Consider the function f(x) = x³ - 6x² + 9x + 2 on ℝ. At what value of x does f(x) attain a local maximum, and what is the value of that local maximum?',
        options: [
          'x = 1, f(1) = 6',
          'x = 3, f(3) = 2',
          'x = 2, f(2) = 4',
          'x = 1, f(1) = 4',
        ],
        correctAnswer: 'x = 1, f(1) = 6',
        explanation:
          '1) First derivative: f\'(x) = 3x² - 12x + 9 = 3(x - 1)(x - 3) = 0 => critical points at x = 1 and x = 3.\n2) Second derivative: f\'\'(x) = 6x - 12.\nAt x = 1: f\'\'(1) = -6 < 0 => Local Maximum! Value f(1) = 1 - 6 + 9 + 2 = 6.\nAt x = 3: f\'\'(3) = +6 > 0 => Local Minimum, f(3) = 2.',
      },
      {
        id: 'da-diag-10',
        questionNumber: 10,
        topicId: 'both-python-dsa',
        topicName: 'Python & DSA: Graph & Heap',
        paper: 'DA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE DA / RA Shared Topic',
        questionText:
          'What is the tight worst-case time complexity of building a Binary Max-Heap from an unsorted array of n elements using the standard bottom-up heapify (Floyd’s) algorithm?',
        options: ['Θ(n)', 'Θ(n log n)', 'Θ(log n)', 'Θ(n²)'],
        correctAnswer: 'Θ(n)',
        explanation:
          'Bottom-up Build-Heap calls Heapify from index ⌊n/2⌋ down to 1. Because most nodes are near the bottom of the tree, the sum ∑_{h=0}^{⌊log n⌋} ⌈n / 2^(h+1)⌉ · O(h) converges to O(n).',
      },
    ],
  },

  // ============================================================================
  // QUIZ 3: GENERAL APTITUDE (GA) DIAGNOSTIC QUIZ (5 Questions, 15-min Slot)
  // Requested in Session Handoff Open Items #3!
  // ============================================================================
  {
    id: 'quiz-ga-diagnostic',
    title: 'General Aptitude (GA) 15-Minute Diagnostic Sprint',
    subtitle: '5 High-Yield Questions • Quantitative, Analytical, Spatial & Verbal (15 Marks in BOTH Papers)',
    paper: 'GA',
    phase: 1,
    durationMinutes: 15,
    description:
      'Quick 15-minute diagnostic for the General Aptitude section (worth 15 marks in RA + 15 marks in DA = 30 marks total).',
    questions: [
      {
        id: 'ga-q1',
        questionNumber: 1,
        topicId: 'ga-verbal-quant',
        topicName: 'GA: Quantitative Aptitude',
        paper: 'GA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE GA Past Pattern',
        questionText:
          'Pipe A can fill a tank in 12 hours and Pipe B can fill the same tank in 15 hours. An outlet Pipe C can empty the full tank in 20 hours. If all three pipes are opened simultaneously when the tank is empty, how many hours will it take to fill the tank completely?',
        options: ['10 hours', '8 hours', '9 hours', '12 hours'],
        correctAnswer: '10 hours',
        explanation:
          'Net fraction of tank filled per hour = 1/12 + 1/15 - 1/20 = (5 + 4 - 3) / 60 = 6 / 60 = 1 / 10.\nTherefore, the tank is filled in 10 hours.',
      },
      {
        id: 'ga-q2',
        questionNumber: 2,
        topicId: 'ga-verbal-quant',
        topicName: 'GA: Spatial Aptitude (Paper Folding & Cutting)',
        paper: 'GA',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GATE GA Spatial Section',
        questionText:
          'A square sheet of paper is folded in half along its horizontal midline, then folded in half again along its vertical midline (forming a smaller square of 1/4 area). A circular hole is punched completely through the center of this folded quarter-square, and a notch is cut on the outer corner (the corner containing the four free corners of the original sheet). When unfolded completely, what pattern appears?',
        options: [
          '4 circular holes symmetric about the center and 1 notch at each of the 4 outer corners',
          '1 circular hole at the center and 4 notches at the outer corners',
          '4 circular holes and 1 diamond hole at the center',
          '2 circular holes and 2 corner notches',
        ],
        correctAnswer:
          '4 circular holes symmetric about the center and 1 notch at each of the 4 outer corners',
        explanation:
          'A hole punched in the interior of the 4-layer folded quadrant reflects across both fold axes to create 4 symmetric circular holes. The corner containing the 4 original outer corners produces 1 notch on each of the 4 outer corners when unfolded.',
      },
      {
        id: 'ga-q3',
        questionNumber: 3,
        topicId: 'ga-verbal-quant',
        topicName: 'GA: Analytical Deductive Logic',
        paper: 'GA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE GA Syllogisms',
        questionText:
          'Statements: (1) All autonomous robots use sensors. (2) Some machines that use sensors use PID controllers.\nWhich conclusion logically and necessarily follows?',
        options: [
          'Neither "Some autonomous robots use PID controllers" nor "No autonomous robot uses a PID controller" necessarily follows',
          'Some autonomous robots definitely use PID controllers',
          'All machines using PID controllers are autonomous robots',
          'All sensors use autonomous robots',
        ],
        correctAnswer:
          'Neither "Some autonomous robots use PID controllers" nor "No autonomous robot uses a PID controller" necessarily follows',
        explanation:
          'Set R (autonomous robots) is a subset of S (things using sensors). Set P (PID controllers) intersects S, but that intersection in S may or may not overlap with subset R. Hence neither positive nor negative overlap between R and P is guaranteed.',
      },
      {
        id: 'ga-q4',
        questionNumber: 4,
        topicId: 'ga-verbal-quant',
        topicName: 'GA: Number Theory & Unit Digit',
        paper: 'GA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE GA Quantitative',
        questionText: 'What is the unit digit (last digit) of the number 7^(2027) + 3^(2027)?',
        options: ['0', '4', '6', '8'],
        correctAnswer: '0',
        explanation:
          'Both 7 and 3 have power-cycle length 4 for unit digits:\n2027 mod 4 = 3.\n• Unit digit of 7^(2027) = unit digit of 7³ = unit digit of 343 = 3.\n• Unit digit of 3^(2027) = unit digit of 3³ = unit digit of 27 = 7.\nSum of unit digits: 3 + 7 = 10 => unit digit is 0! (Alternatively, a^n + b^n for odd n is divisible by a + b = 7 + 3 = 10.)',
      },
      {
        id: 'ga-q5',
        questionNumber: 5,
        topicId: 'ga-verbal-quant',
        topicName: 'GA: Verbal & Critical Reasoning',
        paper: 'GA',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'GATE GA Verbal',
        questionText:
          'Choose the most appropriate wordpair to fill in the blanks: "Although the initial diagnostic score in Robotics was ______, the engineer’s strong mathematical foundation made rapid mastery ______."',
        options: [
          'modest ... feasible',
          'stellar ... improbable',
          'abysmal ... redundant',
          'prohibitive ... futile',
        ],
        correctAnswer: 'modest ... feasible',
        explanation:
          '"Although" sets up a contrast between a low/humble starting point ("modest") and an achievable/realistic positive outcome ("feasible").',
      },
    ],
  },

  // ============================================================================
  // QUIZ 4: ANTHROPIC CLAUDE CERTIFIED ARCHITECT – FOUNDATIONS (CCA-F)
  // 6 Official-Style Production Scenario Questions across all 5 Domains
  // ============================================================================
  {
    id: 'quiz-ccaf-foundations',
    title: 'Anthropic Claude Certified Architect – Foundations (CCA-F) Scenario Quiz',
    subtitle: '6 Production Scenario Questions • Covers All 5 Official CCA-F Domains',
    paper: 'CCA_F',
    phase: 1,
    durationMinutes: 20,
    description:
      'Tests the 5 official CCA-F domains: Agentic Architecture & Orchestration (27%), Tool Design & MCP Integration (18%), Claude Code Configuration (20%), Prompt Engineering & Structured Output (20%), and Context Management (15%).',
    questions: [
      {
        id: 'ccaf-q1',
        questionNumber: 1,
        topicId: 'ccaf-d1-agentic-arch',
        topicName: 'D1: Agentic Loops & Deterministic Policy Hooks (27%)',
        paper: 'CCA_F',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'CCA-F Official Sample Scenario (Customer Support Agent)',
        questionText:
          'Production metrics show that your customer support Claude agent occasionally calls process_refund BEFORE calling get_customer to verify account ownership (despite an explicit system prompt rule), and also attempts automated refunds above the strict $500 human-escalation limit. What is the most reliable architectural fix?',
        options: [
          'Implement programmatic SDK hooks / pre-execution handoff gates that block process_refund unless a verified customer ID exists in session state and deterministically trigger human escalation whenever amount > $500',
          'Add emphatic CAPITALIZED instructions and 5 few-shot examples in the system prompt reminding the model never to skip get_customer or exceed $500',
          'Lower the model temperature to 0.0 and parse the assistant text output for the string "REFUND_APPROVED"',
          'Combine get_customer, lookup_order, and process_refund into a single monolithic MCP tool',
        ],
        correctAnswer:
          'Implement programmatic SDK hooks / pre-execution handoff gates that block process_refund unless a verified customer ID exists in session state and deterministically trigger human escalation whenever amount > $500',
        explanation:
          'Core CCA-F Domain 1 principle (Tasks 1.4 & 1.5): Prompt instructions alone have a non-zero failure rate and cannot guarantee strict compliance for financial or security rules. Programmatic prerequisites and Agent SDK Hooks provide 100% deterministic enforcement.',
      },
      {
        id: 'ccaf-q2',
        questionNumber: 2,
        topicId: 'ccaf-d1-agentic-arch',
        topicName: 'D1: Hub-and-Spoke Multi-Agent Context Isolation (27%)',
        paper: 'CCA_F',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'CCA-F Domain 1 Task 1.2 & 1.3',
        questionText:
          'In a multi-agent research system using the Claude Agent SDK, a Coordinator agent spawns specialized WebSearch and Synthesis subagents via the Task tool. Why do the subagents fail to reference user constraints discussed in the first 3 turns of the Coordinator conversation?',
        options: [
          'Subagents do NOT automatically inherit the parent Coordinator conversation history; all required context and findings must be explicitly passed in the subagent Task prompt',
          'Subagents can only read context if max_tokens is set above 16,384',
          'The Coordinator must set stop_reason = "subagent_inherit" before invoking the Task tool',
          'Subagents share memory only when spawned sequentially rather than in parallel',
        ],
        correctAnswer:
          'Subagents do NOT automatically inherit the parent Coordinator conversation history; all required context and findings must be explicitly passed in the subagent Task prompt',
        explanation:
          'Under Task 1.2 & 1.3 of the CCA-F Exam Guide, subagents operate in isolated context windows so verbose intermediate exploration does not bloat the parent context. Because they do not inherit parent history automatically, the Coordinator must pass relevant constraints and prior findings explicitly in the Task prompt.',
      },
      {
        id: 'ccaf-q3',
        questionNumber: 3,
        topicId: 'ccaf-d2-tools-mcp',
        topicName: 'D2: Tool Design & MCP Error Handling (18%)',
        paper: 'CCA_F',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'CCA-F Domain 2 Task 2.2 & 2.3',
        questionText:
          'When an external database query inside an MCP tool times out, how should the MCP server return the failure to the Claude agent so it can make an informed recovery decision?',
        options: [
          'Return a structured MCP tool result with isError: true alongside metadata (errorCategory: "transient_timeout", isRetryable: true, and any partial results)',
          'Raise an unhandled Python exception so the MCP server process crashes and restarts',
          'Return HTTP 200 with a generic string {"status": "Operation failed"}',
          'Give the subagent access to all 25 system tools so it can search for an alternative database tool',
        ],
        correctAnswer:
          'Return a structured MCP tool result with isError: true alongside metadata (errorCategory: "transient_timeout", isRetryable: true, and any partial results)',
        explanation:
          'Task 2.2 specifies that MCP tools should return structured error metadata using the MCP isError: true flag, distinguishing transient (retryable) errors from validation or permission (non-retryable) errors so the agent never wastes turns retrying permanent failures or hallucinating empty results.',
      },
      {
        id: 'ccaf-q4',
        questionNumber: 4,
        topicId: 'ccaf-d3-claude-code',
        topicName: 'D3: Claude Code Configuration & CI/CD (20%)',
        paper: 'CCA_F',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'CCA-F Official Sample Q7 & Q8',
        questionText:
          'Your engineering team wants Claude Code to enforce specific Jest testing conventions whenever anyone on the team edits any *.test.tsx file, regardless of which subdirectory it lives in, and also wants to run Claude Code non-interactively in a GitHub Actions PR pipeline returning machine-parseable JSON. Which setup is correct?',
        options: [
          'Create .claude/rules/testing.md with YAML frontmatter paths: ["**/*.test.tsx"] committed to the repo, and run claude -p "..." --output-format json in CI',
          'Put the testing rules in ~/.claude/CLAUDE.md on the tech lead’s laptop, and run claude --interactive in CI',
          'Create a separate CLAUDE.md inside every single component folder, and pipe stdout to grep in CI',
          'Add a slash command in ~/.claude/commands/test.md with context: global',
        ],
        correctAnswer:
          'Create .claude/rules/testing.md with YAML frontmatter paths: ["**/*.test.tsx"] committed to the repo, and run claude -p "..." --output-format json in CI',
        explanation:
          'Task 3.1 & 3.6: .claude/rules/ files with YAML frontmatter paths: ["**/*.test.tsx"] apply glob-matched conventions across the entire repo and are version-controlled for all teammates (unlike ~/.claude/CLAUDE.md which is local to one user). In CI/CD, the -p (--print) flag runs Claude Code in headless non-interactive mode and --output-format json produces structured output.',
      },
      {
        id: 'ccaf-q5',
        questionNumber: 5,
        topicId: 'ccaf-d4-prompt-structured',
        topicName: 'D4: Guaranteed Structured Output & Batches API (20%)',
        paper: 'CCA_F',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'CCA-F Official Sample Q10 & Q11',
        questionText:
          'You need to extract invoice line items with 100% guaranteed JSON schema syntax compliance across 50,000 overnight PDF documents (where a 12-hour turnaround is acceptable) while minimizing API cost. What combination should you use?',
        options: [
          'Define an extraction tool with input_schema, force its invocation with tool_choice: {"type": "tool", "name": "extract_invoice"} (making optional fields nullable), and submit via the Message Batches API for 50% cost savings',
          'Ask Claude in the system prompt to "Output ONLY valid JSON with no markdown backticks" and call the synchronous Messages API in 50,000 parallel threads',
          'Use tool_choice: "auto" inside a multi-turn agentic loop submitted as a single Message Batch request',
          'Fine-tune Claude Opus on 500 JSON examples',
        ],
        correctAnswer:
          'Define an extraction tool with input_schema, force its invocation with tool_choice: {"type": "tool", "name": "extract_invoice"} (making optional fields nullable), and submit via the Message Batches API for 50% cost savings',
        explanation:
          'Task 4.3 & 4.5: Using tool_use with a JSON schema and explicit tool_choice eliminates JSON syntax errors entirely (and nullable fields prevent hallucination when fields are absent in a document). The Message Batches API provides a 50% cost discount with up to 24-hour processing for non-blocking batch workloads.',
      },
      {
        id: 'ccaf-q6',
        questionNumber: 6,
        topicId: 'ccaf-d5-context-reliability',
        topicName: 'D5: Long-Context Preservation & Provenance (15%)',
        paper: 'CCA_F',
        questionType: 'MCQ',
        marks: 1,
        gateProxySource: 'CCA-F Domain 5 Task 5.1',
        questionText:
          'In a long multi-turn transactional conversation, progressive summarization of prior turns causes the agent to turn exact figures ("Refund $142.80 for Order #88412 due by Nov 3") into vague summaries ("User requested a partial refund for a recent order"). How do you prevent this?',
        options: [
          'Extract transactional facts (amounts, dates, order IDs, statuses) into a persistent structured "case facts" block kept outside summarized history, and trim verbose 40-field tool outputs down to only the 5 relevant fields before appending to context',
          'Summarize the entire conversation every 2 turns using a smaller model',
          'Place all critical instructions only in the exact middle of a 150k-token prompt',
          'Disable tool result logging altogether',
        ],
        correctAnswer:
          'Extract transactional facts (amounts, dates, order IDs, statuses) into a persistent structured "case facts" block kept outside summarized history, and trim verbose 40-field tool outputs down to only the 5 relevant fields before appending to context',
        explanation:
          'Task 5.1 highlights "progressive summarization risk" where numerical values, percentages, dates, and customer constraints get lost. Maintaining a persistent structured "case facts" block and pruning bloated tool outputs prevents context degradation.',
      },
    ],
  },

  // ============================================================================
  // QUIZ 5: GOOGLE CLOUD PROFESSIONAL ML ENGINEER (GCP-PMLE)
  // 6 Official June 2026 Blueprint Scenario Questions
  // ============================================================================
  {
    id: 'quiz-gcp-pmle',
    title: 'Google Cloud Professional ML Engineer (GCP-PMLE) Scenario Quiz',
    subtitle: '6 Scenario Questions • June 2026 Exam Guide (BQML, Feature Store, MLOps, XAI)',
    paper: 'GCP_PMLE',
    phase: 2,
    durationMinutes: 20,
    description:
      'Tests the 6 official GCP Professional ML Engineer domains: Low-Code AI & BigQuery ML, Data & Feature Store, Distributed Training, Model Serving & Model Armor, Kubeflow/Vertex MLOps Pipelines, and Monitoring/Explainable AI.',
    questions: [
      {
        id: 'pmle-q1',
        questionNumber: 1,
        topicId: 'pmle-s1-lowcode-genai',
        topicName: 'Sec 1: BigQuery ML & Training-Serving Skew (~13%)',
        paper: 'GCP_PMLE',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GCP PMLE Official Domain 1',
        questionText:
          'Your data analysts built a churn classification model in BigQuery ML using manual feature bucketization and scaling inside the SELECT query of CREATE MODEL. During production ML.PREDICT calls, predictions are inaccurate because the serving query computes slightly different bucket boundaries. How should you eliminate this training-serving skew natively in BigQuery ML?',
        options: [
          'Move all feature engineering (ML.QUANTILE_BUCKETIZE, ML.STANDARD_SCALER) inside the CREATE MODEL ... TRANSFORM(...) clause so BigQuery ML automatically saves and applies the exact training transformations during ML.PREDICT',
          'Export the BigQuery table to Cloud Storage as CSV files and rewrite the model in custom PyTorch',
          'Run a nightly Cloud Scheduler job to recompute the entire table from scratch before every online request',
          'Switch from Logistic Regression to K-Means clustering',
        ],
        correctAnswer:
          'Move all feature engineering (ML.QUANTILE_BUCKETIZE, ML.STANDARD_SCALER) inside the CREATE MODEL ... TRANSFORM(...) clause so BigQuery ML automatically saves and applies the exact training transformations during ML.PREDICT',
        explanation:
          'In BigQuery ML, preprocessing placed inside the TRANSFORM() clause is persisted as part of the model artifact itself and automatically applied identically during ML.EVALUATE and ML.PREDICT, eliminating training-serving skew.',
      },
      {
        id: 'pmle-q2',
        questionNumber: 2,
        topicId: 'pmle-s2-data-featurestore',
        topicName: 'Sec 2: Feature Store & Point-in-Time Correctness (~16%)',
        paper: 'GCP_PMLE',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GCP PMLE Official Domain 2',
        questionText:
          'A real-time fraud detection model needs sub-20ms access to a user’s rolling 30-minute transaction velocity during online checkout, while data scientists need historical feature values to train new models without accidentally leaking future feature values into past training labels. Which Google Cloud architecture solves both?',
        options: [
          'Ingest streaming aggregates via Dataflow into Vertex AI / Agent Platform Feature Store with both Online Serving (low-latency lookup) and Offline Store point-in-time historical retrieval',
          'Query a raw BigQuery view directly on every checkout request and join using CURRENT_TIMESTAMP()',
          'Store features in Cloud Storage JSON files and read them from a Cloud Function',
          'Use Cloud SQL with full-table scans during training and serving',
        ],
        correctAnswer:
          'Ingest streaming aggregates via Dataflow into Vertex AI / Agent Platform Feature Store with both Online Serving (low-latency lookup) and Offline Store point-in-time historical retrieval',
        explanation:
          'Feature Store provides dual-storage semantics: low-latency online serving for real-time inference and point-in-time (time-travel) joins in the offline store to prevent target/time leakage when generating historical training datasets.',
      },
      {
        id: 'pmle-q3',
        questionNumber: 3,
        topicId: 'pmle-s3-scaling-training',
        topicName: 'Sec 3: Distributed Training & I/O Bottlenecks (~18%)',
        paper: 'GCP_PMLE',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GCP PMLE Official Domain 3',
        questionText:
          'You are training a large vision model on a single VM with 4 NVIDIA L4 GPUs using TensorFlow. Cloud Monitoring shows GPU utilization oscillating between 15% and 80%, while CPU waits on reading millions of small 20 KB JPEG files from Cloud Storage. What two changes should you make?',
        options: [
          'Consolidate small JPEGs into sharded TFRecord files in Cloud Storage, use tf.data with parallel interleave + .prefetch(tf.data.AUTOTUNE), and train with tf.distribute.MirroredStrategy',
          'Switch to MultiWorkerMirroredStrategy across 16 CPU-only nodes and read each JPEG sequentially via Python open()',
          'Store the 20 KB images in Cloud Spanner and reduce batch size to 1',
          'Use ParameterServerStrategy on a single GPU',
        ],
        correctAnswer:
          'Consolidate small JPEGs into sharded TFRecord files in Cloud Storage, use tf.data with parallel interleave + .prefetch(tf.data.AUTOTUNE), and train with tf.distribute.MirroredStrategy',
        explanation:
          'Millions of tiny files in GCS create high HTTP metadata overhead (the "small file problem"). Sharded TFRecords (~100–200 MB per shard) combined with tf.data.Dataset.interleave(num_parallel_calls=AUTOTUNE) and .prefetch(AUTOTUNE) keep the GPUs fed continuously, and MirroredStrategy is the standard synchronous data-parallel strategy for a single machine with multiple GPUs.',
      },
      {
        id: 'pmle-q4',
        questionNumber: 4,
        topicId: 'pmle-s4-serving-scaling',
        topicName: 'Sec 4: Model Serving & GenAI Safety (~19%)',
        paper: 'GCP_PMLE',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GCP PMLE June 2026 Guide Sec 4',
        questionText:
          'You are deploying a customer-facing Gemini-based enterprise assistant on Google Cloud. Security requires blocking prompt injection, jailbreak attempts, and sensitive PII leakage across both user prompts and model responses before they reach the application. Which managed capability should you configure?',
        options: [
          'Configure Google Cloud Model Armor (and Sensitive Data Protection integration) to inspect and enforce safety/prompt-injection policies on prompts and responses',
          'Use Vertex AI Vizier to tune the model temperature to 1.0',
          'Enable Vertex AI Batch Prediction instead of Online Endpoints',
          'Write a regular expression that blocks any prompt longer than 100 characters',
        ],
        correctAnswer:
          'Configure Google Cloud Model Armor (and Sensitive Data Protection integration) to inspect and enforce safety/prompt-injection policies on prompts and responses',
        explanation:
          'Per the June 2026 PMLE exam guide, Model Armor provides managed runtime security for generative AI applications, screening prompts and responses for prompt injection, jailbreaks, toxic content, and sensitive data (PII).',
      },
      {
        id: 'pmle-q5',
        questionNumber: 5,
        topicId: 'pmle-s5-mlops-pipelines',
        topicName: 'Sec 5: Automating MLOps Pipelines (~21%)',
        paper: 'GCP_PMLE',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GCP PMLE Highest-Weight Domain (21%)',
        questionText:
          'Your team wants a serverless ML orchestration pipeline where each step (data validation, training, evaluation against a blessing threshold, and conditional deployment to an Endpoint) is written as a lightweight Python function, artifacts and lineage are tracked automatically, and the pipeline triggers automatically whenever a new dataset lands in Cloud Storage. What should you build?',
        options: [
          'Define a Kubeflow Pipelines (KFP v2) workflow on Vertex AI Pipelines (with ML Metadata enabled) triggered via Eventarc on Cloud Storage object finalization',
          'Run a manual Jupyter notebook on a persistent VM every Friday afternoon',
          'Use Cloud Composer (Managed Airflow) to run heavy model training directly inside Airflow worker pods',
          'Deploy a static Docker container to App Engine without artifact tracking',
        ],
        correctAnswer:
          'Define a Kubeflow Pipelines (KFP v2) workflow on Vertex AI Pipelines (with ML Metadata enabled) triggered via Eventarc on Cloud Storage object finalization',
        explanation:
          'Vertex AI Pipelines (running KFP v2 or TFX) is serverless, tracks artifact lineage automatically in ML Metadata, supports lightweight @dsl.component Python steps and conditional deployment (@dsl.If), and integrates with Eventarc/PubSub for event-driven continuous training.',
      },
      {
        id: 'pmle-q6',
        questionNumber: 6,
        topicId: 'pmle-s6-monitoring-xai',
        topicName: 'Sec 6: Explainable AI & Skew vs Drift (~13%)',
        paper: 'GCP_PMLE',
        questionType: 'MCQ',
        marks: 2,
        gateProxySource: 'GCP PMLE Official Domain 6',
        questionText:
          'A medical imaging team deploys a convolutional neural network on Vertex AI to classify retinal scans and wants visual explanations that highlight cohesive image regions (superpixels) rather than noisy individual pixels. Meanwhile, a second team deployed a third-party model without access to its original training dataset and wants to detect if live production inputs are changing over time. Which pair of configurations is correct?',
        options: [
          'Use XRAI for the retinal image model explanations; configure Prediction Drift detection for the second model without training data',
          'Use Sampled Shapley for the image regions; configure Training-Serving Skew detection without training data',
          'Use Integrated Gradients for cohesive superpixel regions; disable Model Monitoring',
          'Use BigQuery ML TRANSFORM for both models',
        ],
        correctAnswer:
          'Use XRAI for the retinal image model explanations; configure Prediction Drift detection for the second model without training data',
        explanation:
          '1) Explainable AI: XRAI (eXplanation with Ranked Area Integrals) builds on Integrated Gradients to group pixels into meaningful superpixel regions for image models (whereas Integrated Gradients gives pixel-level attributions and Sampled Shapley is best for tabular/ensemble models).\n2) Monitoring: Training-Serving Skew requires access to the original training dataset baseline; when training data is unavailable, Prediction Drift monitors shifts in live serving input distributions over sliding time windows.',
      },
    ],
  },
];
