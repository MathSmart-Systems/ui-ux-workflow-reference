/**
 * MathSmart Provider-Agnostic AI Service Interface & Adapter
 * 
 * DESIGN ARCHITECTURE:
 * [Frontend UI]
 *      ↓
 * [Application API Proxy (/api/ai/*)]
 *      ↓
 * [AI Service (Provider-Agnostic Core)]
 *      ↓
 * [Groq API (Llama 3 / Mixtral with high-throughput inference)]
 * 
 * CRITICAL PEDAGOGICAL BOUNDARY:
 * - Deterministic Logic handles: Objective grading, scores, attempts,
 *   competency calculations, progress metrics, and mastery thresholds.
 * - AI (Groq) handles: Pedagogical diagnosis, misconception pattern analysis,
 *   step-by-step misconception explanations, student encouragement feedback,
 *   and teacher-facing actionable intervention suggestions.
 */

export interface PatternAnalysisRequest {
  studentName: string;
  grade: string;
  competencyName: string;
  incorrectAttempts: {
    questionText: string;
    studentAnswer: string;
    correctAnswer: string;
  }[];
}

export interface PatternAnalysisResponse {
  misconceptionSummary: string;
  rootCause: string;
  recommendedRemediation: string;
  confidenceScore: number;
}

export interface StudentFeedbackRequest {
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  attemptsCount: number;
  competencyName: string;
}

export interface StudentFeedbackResponse {
  feedbackText: string;
  friendlyTip: string;
  encouragement: string;
}

export interface TeacherInsightRequest {
  studentName: string;
  grade: string;
  section: string;
  competencyName: string;
  diagnosticScore: number;
  currentScore: number;
  attemptsCount: number;
  incorrectPatterns: string[];
  modulesCompleted: string[];
}

export interface TeacherInsightResponse {
  insightSummary: string;
  learningGaps: string[];
  suggestedInterventionType: 'Additional Exercise' | 'One-on-One Remediation' | 'Additional Module' | 'Teacher Consultation' | 'Other';
  recommendedActions: string[];
  urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface RemediationSupportRequest {
  competencyName: string;
  currentMastery: number;
  studentGrade: string;
  specificGaps: string[];
}

export interface RemediationSupportResponse {
  recommendedModuleTitle: string;
  targetedPracticeFocus: string;
  visualMetaphorAdvice: string;
  scaffoldingSteps: string[];
}

/**
 * Provider-Agnostic AI Service Interface
 * Easily swappable between Groq server-side proxy, local dev mock, or future providers.
 */
export interface IAIService {
  analyzeLearningPattern(req: PatternAnalysisRequest): Promise<PatternAnalysisResponse>;
  generateStudentFeedback(req: StudentFeedbackRequest): Promise<StudentFeedbackResponse>;
  explainIncorrectAnswer(questionText: string, studentAnswer: string, correctAnswer: string): Promise<string>;
  generateTeacherInsight(req: TeacherInsightRequest): Promise<TeacherInsightResponse>;
  recommendLearningSupport(req: RemediationSupportRequest): Promise<RemediationSupportResponse>;
}

/**
 * Mock AIService Implementation (Simulating Groq Inference)
 * When deployed with backend, this calls `fetch('/api/ai/groq-service')` without exposing keys.
 */
class GroqReadyAIService implements IAIService {
  // Provider identifier for UI indicators
  public readonly targetProvider = 'Groq Cloud Inference (Llama 3 70B / 8B)';

  async analyzeLearningPattern(req: PatternAnalysisRequest): Promise<PatternAnalysisResponse> {
    // Simulate brief network latency for realistic UX
    await new Promise((res) => setTimeout(res, 400));

    const comp = req.competencyName.toLowerCase();

    if (comp.includes('integer') || comp.includes('multiplication')) {
      return {
        misconceptionSummary: `${req.studentName} appears to understand the calculation magnitude but consistently applies the wrong sign rule when multiplying two negative numbers.`,
        rootCause: 'Confusion between integer addition rules (where adding two negatives yields a negative) and multiplication rules (where two negatives yield a positive).',
        recommendedRemediation: 'Provide visual number-line counter movements and the "opposite of opposite" rule concrete manipulative exercise.',
        confidenceScore: 0.94,
      };
    }

    if (comp.includes('geometry') || comp.includes('angle')) {
      return {
        misconceptionSummary: `${req.studentName} is confusing supplementary angles (sum to 180°) with complementary angles (sum to 90°).`,
        rootCause: 'Lacks spatial anchor for straight-line intersections versus perpendicular corner indicators.',
        recommendedRemediation: 'Assign interactive angle protractor visualizer module focusing on real-world corner versus flat-line examples.',
        confidenceScore: 0.91,
      };
    }

    if (comp.includes('fraction') || comp.includes('decimal')) {
      return {
        misconceptionSummary: `${req.studentName} is treating the denominator as an independent whole number when adding fractions instead of finding a common denominator.`,
        rootCause: 'Over-generalizing whole number addition onto fractional parts (e.g. 1/3 + 1/4 = 2/7).',
        recommendedRemediation: 'Review equal fraction bar sharing modules before re-attempting operational questions.',
        confidenceScore: 0.89,
      };
    }

    return {
      misconceptionSummary: `${req.studentName} displays consistent conceptual grasp of early steps, but requires reinforcement on the final simplification stage.`,
      rootCause: 'Cognitive load during multi-step procedural execution.',
      recommendedRemediation: 'Targeted single-step verification drill before proceeding to combined problems.',
      confidenceScore: 0.88,
    };
  }

  async generateStudentFeedback(req: StudentFeedbackRequest): Promise<StudentFeedbackResponse> {
    await new Promise((res) => setTimeout(res, 250));

    if (req.isCorrect) {
      return {
        feedbackText: 'Brilliant thinking! You accurately applied the mathematical rule.',
        friendlyTip: 'Keep this rule in mind as numbers grow larger!',
        encouragement: 'You are mastering this competency step by step!',
      };
    }

    // Pattern-based hints
    if (req.competencyName.toLowerCase().includes('integer')) {
      return {
        feedbackText: 'Not quite. Take another look at the signs of both numbers.',
        friendlyTip: 'Remember: Multiplying two numbers with the SAME sign always gives a POSITIVE answer. (- × - = +)',
        encouragement: 'Mistakes are just proof your brain is working hard. Try once more!',
      };
    }

    return {
      feedbackText: `Close try! The correct solution is ${req.correctAnswer}.`,
      friendlyTip: 'Try working backwards step-by-step to check your calculations.',
      encouragement: "Every attempt brings you closer to full mastery. Let's tackle the next one together!",
    };
  }

  async explainIncorrectAnswer(questionText: string, studentAnswer: string, correctAnswer: string): Promise<string> {
    await new Promise((res) => setTimeout(res, 300));
    return `When solving "${questionText}", choosing "${studentAnswer}" usually happens when applying addition sign rules instead of multiplication. Remember: Negative × Negative = Positive, so the correct answer is ${correctAnswer}.`;
  }

  async generateTeacherInsight(req: TeacherInsightRequest): Promise<TeacherInsightResponse> {
    await new Promise((res) => setTimeout(res, 500));

    if (req.currentScore < 50) {
      return {
        insightSummary: `${req.studentName} appears to understand basic calculation mechanisms but repeatedly applies the wrong sign rule when multiplying negative integers. Overall trajectory shows 3 stalled attempts.`,
        learningGaps: [
          'Negative integer multiplication sign laws (-a × -b = +ab)',
          'Distinction between integer addition and integer multiplication',
          'Confidence in multi-step signed arithmetic',
        ],
        suggestedInterventionType: 'One-on-One Remediation',
        recommendedActions: [
          'Conduct a 10-minute guided concrete manipulative or number-line session',
          'Assign the targeted ARAL remediation exercise "Integer Sign Foundations"',
          'Pair with a peer partner for oral explanation practice before next reassessment',
        ],
        urgencyLevel: 'HIGH',
      };
    }

    return {
      insightSummary: `${req.studentName} is showing steady progress from ${req.diagnosticScore}% to ${req.currentScore}%. Minor procedural pauses remain in fractional decomposition.`,
      learningGaps: ['Simplifying improper fractions', 'Finding least common denominators'],
      suggestedInterventionType: 'Additional Exercise',
      recommendedActions: [
        'Assign 5 interactive fractional bar drill questions',
        'Check again after next scheduled unit quiz',
      ],
      urgencyLevel: req.currentScore < 70 ? 'MEDIUM' : 'LOW',
    };
  }

  async recommendLearningSupport(req: RemediationSupportRequest): Promise<RemediationSupportResponse> {
    await new Promise((res) => setTimeout(res, 350));
    return {
      recommendedModuleTitle: `Targeted Mastery: ${req.competencyName}`,
      targetedPracticeFocus: 'Step-by-step visual sign rules & concrete counter exercises',
      visualMetaphorAdvice: 'Use the "flipping direction" analogy on a number line to illustrate why negative of a negative is positive.',
      scaffoldingSteps: [
        'Step 1: Visual pattern observation (3 × -2, 2 × -2, 1 × -2, 0 × -2, -1 × -2)',
        'Step 2: Interactive 4-quadrant sign rule matching',
        'Step 3: Rapid 5-item confidence check with immediate explanatory feedback',
      ],
    };
  }
}

// Export singleton instance
export const aiService: IAIService = new GroqReadyAIService();
