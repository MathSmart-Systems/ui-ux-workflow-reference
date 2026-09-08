/**
 * MathSmart Domain Types & Interfaces
 * AI-Powered Interactive Learning System for Enhancing Mathematics Skills Among Elementary Learners
 */

export type UserRole = 'STUDENT' | 'TEACHER_ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  studentId?: string;
  grade?: string;
  section?: string;
}

export type CompetencyMasteryStatus =
  | 'Mastered'
  | 'Improved'
  | 'Learning'
  | 'Developing'
  | 'Needs Improvement'
  | 'Needs Support'
  | 'Recommended'
  | 'Upcoming';

export interface CompetencyProgressTrajectory {
  date: string;
  score: number;
  label: string; // e.g., "Diagnostic", "Activity 1", "Activity 2", "Current"
}

export interface StudentCompetencyProgress {
  competencyId: string;
  competencyName: string;
  competencyCode: string;
  diagnosticScore: number;
  currentScore: number;
  status: CompetencyMasteryStatus;
  trajectory: CompetencyProgressTrajectory[];
  attemptsCount: number;
  unsuccessfulAttempts: number;
  lastStudiedDate?: string;
  incorrectPatterns?: string[];
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  grade: string;
  section: string;
  avatar: string;
  overallMastery: number;
  diagnosticStatus: 'not_started' | 'in_progress' | 'completed';
  diagnosticScore: number;
  currentRecommendedCompetencyId: string;
  competenciesMasteredCount: number;
  totalCompetenciesCount: number;
  modulesCompletedCount: number;
  totalModulesCount: number;
  status: 'active' | 'needs_intervention' | 'improving' | 'mastered' | 'inactive';
  activeInterventionCount: number;
  competencyProgress: StudentCompetencyProgress[];
}

export interface Competency {
  id: string;
  code: string;
  name: string;
  grade: string;
  domain: 'Numbers & Number Sense' | 'Geometry' | 'Patterns & Algebra' | 'Measurement' | 'Statistics & Probability';
  description: string;
  status: 'active' | 'inactive';
  associatedModuleIds: string[];
  assessmentQuestionCount: number;
  prerequisiteIds?: string[];
}

export interface ModuleRule {
  title: string;
  ruleFormula?: string;
  explanation: string;
  visualExample?: string;
  highlight?: string;
}

export interface WorkedExample {
  problem: string;
  steps: string[];
  solution: string;
  tip?: string;
}

export interface LearningModule {
  id: string;
  competencyId: string;
  competencyName: string;
  title: string;
  grade: string;
  estimatedMinutes: number;
  learningObjective: string;
  shortExplanation: string;
  rules: ModuleRule[];
  workedExamples: WorkedExample[];
  associatedActivityId: string;
  status: 'published' | 'draft';
  order: number;
}

export type QuestionType =
  | 'multiple_choice'
  | 'number_input'
  | 'fill_blank'
  | 'true_false'
  | 'matching'
  | 'ordering';

export interface MatchingPair {
  left: string;
  right: string;
}

export interface Question {
  id: string;
  competencyId: string;
  competencyName: string;
  text: string;
  type: QuestionType;
  choices?: string[];
  correctAnswer: string | string[]; // Single string or array for ordering/matching
  explanation: string;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  grade: string;
  status: 'active' | 'draft';
  visualAid?: string;
  matchingPairs?: MatchingPair[];
  itemsToOrder?: string[];
}

export interface InteractiveActivity {
  id: string;
  competencyId: string;
  competencyName: string;
  moduleId: string;
  title: string;
  description: string;
  questions: Question[];
  status: 'published' | 'draft';
  estimatedMinutes: number;
  points: number;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'diagnostic' | 'reassessment' | 'unit_quiz';
  grade: string;
  totalQuestions: number;
  questions: Question[];
  status: 'published' | 'draft';
  durationMinutes?: number;
  description?: string;
}

export interface CompetencyResultSummary {
  competencyId: string;
  competencyName: string;
  score: number;
  status: 'Mastered' | 'Needs Improvement' | 'Developing';
}

export interface RecommendedPathItem {
  competencyId: string;
  name: string;
  priority: number;
  reason: string;
  moduleId: string;
}

export interface DiagnosticAssessmentResult {
  id: string;
  studentId: string;
  assessmentId: string;
  overallScore: number;
  date: string;
  competencyResults: CompetencyResultSummary[];
  recommendedLearningPath: RecommendedPathItem[];
}

export type InterventionSeverity = 'HIGH' | 'MEDIUM' | 'LOW';
export type InterventionStatus = 'Needs Intervention' | 'In Progress' | 'Resolved';
export type InterventionType =
  | 'Additional Exercise'
  | 'One-on-One Remediation'
  | 'Additional Module'
  | 'Teacher Consultation'
  | 'Other';

export interface TeacherInterventionRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  competencyId: string;
  competencyName: string;
  competencyCode?: string;
  severity: InterventionSeverity;
  status: InterventionStatus;
  diagnosticScore: number;
  currentScore: number;
  attemptsCount: number;
  unsuccessfulAttempts: number;
  incorrectPatterns: string[];
  modulesAttempted: string[];
  aiLearningInsight: string;
  aiRecommendedIntervention: string;
  recordedInterventionType?: InterventionType;
  teacherNotes?: string;
  recordedAt?: string;
  recordedBy?: string;
  resolvedAt?: string;
}

export interface GradeLevel {
  id: string;
  name: string;
  level: number;
  studentCount: number;
  sectionCount: number;
}

export interface Section {
  id: string;
  name: string;
  gradeId: string;
  gradeName: string;
  adviser: string;
  studentCount: number;
}

export interface ActivityHistoryItem {
  id: string;
  activityId: string;
  activityTitle: string;
  competencyName: string;
  date: string;
  score: number;
  maxScore: number;
  accuracy: number;
  timeSpentSeconds: number;
}

// Aliases for convenience across components
export type Module = LearningModule;
export type InterventionItem = TeacherInterventionRecord;
