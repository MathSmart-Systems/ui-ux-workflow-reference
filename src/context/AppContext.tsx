import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  UserProfile,
  UserRole,
  Student,
  Competency,
  LearningModule,
  Question,
  InteractiveActivity,
  Assessment,
  TeacherInterventionRecord,
  GradeLevel,
  Section,
  DiagnosticAssessmentResult,
} from '../types/mathsmart';
import {
  mockCurrentUser,
  mockTeacherUser,
  mockStudents,
  mockCompetencies,
  mockLearningModules,
  mockQuestions,
  mockInteractiveActivities,
  mockDiagnosticAssessment,
  mockInterventions,
  mockGrades,
  mockSections,
  mockDefaultDiagnosticResult,
} from '../data/mockData';

export type StudentScreen =
  | 'dashboard'
  | 'diagnostic_assessment'
  | 'diagnostic_results'
  | 'learning_module'
  | 'interactive_activity'
  | 'activity_completion'
  | 'progress'
  | 'my_learning'
  | 'activities'
  | 'assessments'
  | 'profile'
  | 'login';

export type TeacherScreen =
  | 'dashboard'
  | 'students'
  | 'interventions'
  | 'assessments'
  | 'content_competencies'
  | 'content_modules'
  | 'content_activities'
  | 'content_questions'
  | 'classes'
  | 'analytics'
  | 'profile';

interface AppContextType {
  // Current user & role
  currentUser: UserProfile;
  role: UserRole;
  switchRole: (newRole: UserRole) => void;
  switchStudentProfile: (studentId: string) => void;
  isLoggedIn: boolean;
  loginStudent: (studentId: string) => void;
  logout: () => void;

  // Navigation
  studentScreen: StudentScreen;
  setStudentScreen: (screen: StudentScreen) => void;
  teacherScreen: TeacherScreen;
  setTeacherScreen: (screen: TeacherScreen) => void;

  // Selected Entities
  activeModuleId: string;
  setActiveModuleId: (id: string) => void;
  activeActivityId: string;
  setActiveActivityId: (id: string) => void;
  selectedStudentIdForTeacher: string | null;
  setSelectedStudentIdForTeacher: (id: string | null) => void;
  reviewingInterventionId: string | null;
  setReviewingInterventionId: (id: string | null) => void;

  // Data collections
  students: Student[];
  competencies: Competency[];
  modules: LearningModule[];
  questions: Question[];
  activities: InteractiveActivity[];
  diagnosticAssessment: Assessment;
  interventions: TeacherInterventionRecord[];
  grades: GradeLevel[];
  sections: Section[];
  diagnosticResult: DiagnosticAssessmentResult;

  // Actions
  recordIntervention: (
    interventionId: string,
    interventionType: TeacherInterventionRecord['recordedInterventionType'],
    teacherNotes: string
  ) => void;
  updateStudentMasteryAfterActivity: (
    studentId: string,
    competencyId: string,
    scorePercentage: number
  ) => void;
  recordDiagnosticResult: (result: DiagnosticAssessmentResult) => void;
  addQuestion: (question: Question) => void;
  addModule: (module: LearningModule) => void;
  addCompetency: (competency: Competency) => void;
  addSection: (section: Section) => void;
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;

  // Activity Completion State
  lastActivityResult: {
    score: number;
    maxScore: number;
    accuracy: number;
    prevScore: number;
    newScore: number;
    competencyName: string;
  } | null;
  setLastActivityResult: (result: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockCurrentUser);
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [studentScreen, setStudentScreen] = useState<StudentScreen>('dashboard');
  const [teacherScreen, setTeacherScreen] = useState<TeacherScreen>('dashboard');

  const [activeModuleId, setActiveModuleId] = useState<string>('mod-int-02');
  const [activeActivityId, setActiveActivityId] = useState<string>('act-int-02');
  const [selectedStudentIdForTeacher, setSelectedStudentIdForTeacher] = useState<string | null>(null);
  const [reviewingInterventionId, setReviewingInterventionId] = useState<string | null>(null);

  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [competencies, setCompetencies] = useState<Competency[]>(mockCompetencies);
  const [modules, setModules] = useState<LearningModule[]>(mockLearningModules);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [activities] = useState<InteractiveActivity[]>(mockInteractiveActivities);
  const [diagnosticAssessment] = useState<Assessment>(mockDiagnosticAssessment);
  const [interventions, setInterventions] = useState<TeacherInterventionRecord[]>(mockInterventions);
  const [grades] = useState<GradeLevel[]>(mockGrades);
  const [sections, setSections] = useState<Section[]>(mockSections);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticAssessmentResult>(mockDefaultDiagnosticResult);

  const [lastActivityResult, setLastActivityResult] = useState<{
    score: number;
    maxScore: number;
    accuracy: number;
    prevScore: number;
    newScore: number;
    competencyName: string;
  } | null>({
    score: 9,
    maxScore: 10,
    accuracy: 90,
    prevScore: 35,
    newScore: 78,
    competencyName: 'Multiplication and Division of Integers',
  });

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'TEACHER_ADMIN') {
      setCurrentUser(mockTeacherUser);
    } else {
      const student = students.find((s) => s.id === 'stu-01') || students[0];
      setCurrentUser({
        id: student.id,
        name: student.name,
        role: 'STUDENT',
        email: `${student.name.toLowerCase().replace(/\s+/g, '.')}@school.edu.ph`,
        studentId: student.studentId,
        grade: student.grade,
        section: student.section,
        avatar: student.avatar,
      });
    }
  };

  const switchStudentProfile = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setCurrentUser({
        id: student.id,
        name: student.name,
        role: 'STUDENT',
        email: `${student.name.toLowerCase().replace(/\s+/g, '.')}@school.edu.ph`,
        studentId: student.studentId,
        grade: student.grade,
        section: student.section,
        avatar: student.avatar,
      });
      setRole('STUDENT');
      setIsLoggedIn(true);
      setStudentScreen('dashboard');
    }
  };

  const loginStudent = (studentId: string) => {
    switchStudentProfile(studentId);
    setIsLoggedIn(true);
    setStudentScreen('dashboard');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setStudentScreen('login');
  };

  const recordIntervention = (
    interventionId: string,
    interventionType: TeacherInterventionRecord['recordedInterventionType'],
    teacherNotes: string
  ) => {
    const now = new Date().toISOString();
    setInterventions((prev) =>
      prev.map((item) => {
        if (item.id === interventionId) {
          return {
            ...item,
            status: 'In Progress',
            recordedInterventionType: interventionType,
            teacherNotes,
            recordedAt: now,
            recordedBy: currentUser.name,
          };
        }
        return item;
      })
    );

    // Also update student intervention status
    const targetIntervention = interventions.find((i) => i.id === interventionId);
    if (targetIntervention) {
      setStudents((prev) =>
        prev.map((stu) => {
          if (stu.id === targetIntervention.studentId) {
            return {
              ...stu,
              status: 'improving',
            };
          }
          return stu;
        })
      );
    }
  };

  const updateStudentMasteryAfterActivity = (
    studentId: string,
    competencyId: string,
    scorePercentage: number
  ) => {
    setStudents((prev) =>
      prev.map((stu) => {
        if (stu.id === studentId) {
          const compIdx = stu.competencyProgress.findIndex((c) => c.competencyId === competencyId);
          let prevScore = 35;
          let newScore = Math.min(100, Math.round(scorePercentage));

          let updatedCompProgress = [...stu.competencyProgress];
          if (compIdx >= 0) {
            prevScore = stu.competencyProgress[compIdx].currentScore;
            const newTrajectory = [
              ...stu.competencyProgress[compIdx].trajectory,
              {
                date: new Date().toISOString().split('T')[0],
                score: newScore,
                label: `Activity Attempt`,
              },
            ];
            const newStatus =
              newScore >= 80 ? 'Mastered' : newScore >= 60 ? 'Improved' : 'Learning';

            updatedCompProgress[compIdx] = {
              ...stu.competencyProgress[compIdx],
              currentScore: newScore,
              status: newStatus,
              trajectory: newTrajectory,
              attemptsCount: stu.competencyProgress[compIdx].attemptsCount + 1,
            };
          }

          const masteredCount = updatedCompProgress.filter((c) => c.status === 'Mastered').length;
          const avgOverall = Math.round(
            updatedCompProgress.reduce((acc, curr) => acc + curr.currentScore, 0) /
              Math.max(1, updatedCompProgress.length)
          );

          return {
            ...stu,
            overallMastery: avgOverall,
            competenciesMasteredCount: masteredCount,
            competencyProgress: updatedCompProgress,
          };
        }
        return stu;
      })
    );
  };

  const recordDiagnosticResult = (result: DiagnosticAssessmentResult) => {
    setDiagnosticResult(result);
    // Update active student diagnostic status
    setStudents((prev) =>
      prev.map((stu) => {
        if (stu.id === result.studentId) {
          return {
            ...stu,
            diagnosticStatus: 'completed',
            diagnosticScore: result.overallScore,
          };
        }
        return stu;
      })
    );
  };

  const addQuestion = (question: Question) => {
    setQuestions((prev) => [question, ...prev]);
  };

  const addModule = (module: LearningModule) => {
    setModules((prev) => [...prev, module]);
  };

  const addCompetency = (competency: Competency) => {
    setCompetencies((prev) => [...prev, competency]);
  };

  const addSection = (section: Section) => {
    setSections((prev) => [...prev, section]);
  };

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  const updateStudent = (updated: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        role,
        switchRole,
        switchStudentProfile,
        isLoggedIn,
        loginStudent,
        logout,
        studentScreen,
        setStudentScreen,
        teacherScreen,
        setTeacherScreen,
        activeModuleId,
        setActiveModuleId,
        activeActivityId,
        setActiveActivityId,
        selectedStudentIdForTeacher,
        setSelectedStudentIdForTeacher,
        reviewingInterventionId,
        setReviewingInterventionId,
        students,
        competencies,
        modules,
        questions,
        activities,
        diagnosticAssessment,
        interventions,
        grades,
        sections,
        diagnosticResult,
        recordIntervention,
        updateStudentMasteryAfterActivity,
        recordDiagnosticResult,
        addQuestion,
        addModule,
        addCompetency,
        addSection,
        addStudent,
        updateStudent,
        lastActivityResult,
        setLastActivityResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
