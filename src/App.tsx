import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { AppSidebar } from './components/common/AppSidebar';
import { AIArchitectureBanner } from './components/common/AIArchitectureBanner';

// Student screens
import { StudentDashboard } from './components/student/StudentDashboard';
import { DiagnosticAssessmentView } from './components/student/DiagnosticAssessmentView';
import { DiagnosticResultsView } from './components/student/DiagnosticResultsView';
import { LearningModuleView } from './components/student/LearningModuleView';
import { InteractiveActivityView } from './components/student/InteractiveActivityView';
import { ActivityCompletionView } from './components/student/ActivityCompletionView';
import { StudentProgressView } from './components/student/StudentProgressView';
import { MyLearningView } from './components/student/MyLearningView';
import { StudentLoginView } from './components/student/StudentLoginView';
import { StudentActivitiesView } from './components/student/StudentActivitiesView';
import { StudentAssessmentsView } from './components/student/StudentAssessmentsView';
import { StudentProfileView } from './components/student/StudentProfileView';

// Teacher screens
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { StudentManagementView } from './components/teacher/StudentManagementView';
import { TeacherInterventionDashboard } from './components/teacher/TeacherInterventionDashboard';
import { ContentManagementView } from './components/teacher/ContentManagementView';
import { TeacherAnalyticsView } from './components/teacher/TeacherAnalyticsView';
import { TeacherSettingsView } from './components/teacher/TeacherSettingsView';

const MainAppContent: React.FC = () => {
  const { role, studentScreen, teacherScreen } = useApp();

  // 1. Dedicated Student Login Screen
  if (role === 'STUDENT' && studentScreen === 'login') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
        <AIArchitectureBanner />
        <StudentLoginView />
        <footer className="py-4 text-center text-xs text-slate-400">
          MathSmart AI Learning Platform • Designed for Elementary Mathematics ARAL Program
        </footer>
      </div>
    );
  }

  // 2. Focused Diagnostic Assessment Screen (Clean, distraction-free)
  if (role === 'STUDENT' && studentScreen === 'diagnostic_assessment') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
        <AIArchitectureBanner />
        <DiagnosticAssessmentView />
        <footer className="py-4 text-center text-xs text-slate-400">
          MathSmart Diagnostic Screening • Keep a pencil and scratch paper handy
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Groq Decoupling Banner */}
      <AIArchitectureBanner />

      {/* Main Top Header */}
      <Navbar />

      {/* Body Layout: Sidebar + Dynamic Main Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <AppSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {/* STUDENT ROLE SCREENS */}
          {role === 'STUDENT' && (
            <>
              {studentScreen === 'dashboard' && <StudentDashboard />}
              {studentScreen === 'my_learning' && <MyLearningView />}
              {studentScreen === 'learning_module' && <LearningModuleView />}
              {studentScreen === 'activities' && <StudentActivitiesView />}
              {studentScreen === 'interactive_activity' && <InteractiveActivityView />}
              {studentScreen === 'activity_completion' && <ActivityCompletionView />}
              {studentScreen === 'assessments' && <StudentAssessmentsView />}
              {studentScreen === 'diagnostic_results' && <DiagnosticResultsView />}
              {studentScreen === 'progress' && <StudentProgressView />}
              {studentScreen === 'profile' && <StudentProfileView />}
            </>
          )}

          {/* TEACHER / ADMIN ROLE SCREENS */}
          {role === 'TEACHER_ADMIN' && (
            <>
              {teacherScreen === 'dashboard' && <TeacherDashboard />}
              {teacherScreen === 'students' && <StudentManagementView />}
              {teacherScreen === 'interventions' && <TeacherInterventionDashboard />}
              {(teacherScreen === 'content_management' || teacherScreen === 'content_competencies') && (
                <ContentManagementView initialTab="competencies" />
              )}
              {teacherScreen === 'content_modules' && (
                <ContentManagementView initialTab="modules" />
              )}
              {teacherScreen === 'content_activities' && (
                <ContentManagementView initialTab="activities" />
              )}
              {teacherScreen === 'content_questions' && (
                <ContentManagementView initialTab="questions" />
              )}
              {teacherScreen === 'assessments' && (
                <ContentManagementView initialTab="assessments" />
              )}
              {teacherScreen === 'classes' && (
                <ContentManagementView initialTab="grades_sections" />
              )}
              {teacherScreen === 'analytics' && <TeacherAnalyticsView />}
              {teacherScreen === 'profile' && <TeacherSettingsView />}
            </>
          )}
        </main>
      </div>

      {/* System Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MathSmart — AI-Powered Interactive Learning System for Enhancing Elementary Mathematics</span>
          <span className="font-mono text-[11px] text-slate-400">Production AI: Groq (Decoupled Interface)</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
