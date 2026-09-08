import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  FileCheck2,
  TrendingUp,
  User,
  Users,
  AlertTriangle,
  FolderTree,
  BookOpen,
  HelpCircle,
  School,
  BarChart3,
  Settings,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useApp, StudentScreen, TeacherScreen } from '../../context/AppContext';

interface AppSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isMobileOpen = false, onCloseMobile }) => {
  const {
    role,
    studentScreen,
    setStudentScreen,
    teacherScreen,
    setTeacherScreen,
    interventions,
  } = useApp();

  const pendingInterventionsCount = interventions.filter((i) => i.status === 'Needs Intervention').length;

  const handleStudentNav = (screen: StudentScreen) => {
    setStudentScreen(screen);
    if (onCloseMobile) onCloseMobile();
  };

  const handleTeacherNav = (screen: TeacherScreen) => {
    setTeacherScreen(screen);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed md:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between py-4 px-3 overflow-y-auto transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Role Header Subtitle */}
          <div className="px-3 py-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {role === 'STUDENT' ? 'Student Workspace' : 'Teacher & Administrator'}
            </div>
            <div className="text-xs font-medium text-slate-700 mt-0.5">
              {role === 'STUDENT' ? 'Grade 7 Learning Path' : 'Curriculum & Interventions'}
            </div>
          </div>

          {/* STUDENT NAVIGATION */}
          {role === 'STUDENT' && (
            <nav className="space-y-1">
              <button
                id="nav-student-dashboard"
                onClick={() => handleStudentNav('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  studentScreen === 'dashboard'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>

              <button
                id="nav-student-my-learning"
                onClick={() => handleStudentNav('my_learning')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  studentScreen === 'my_learning' || studentScreen === 'learning_module'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4" />
                  <span>My Learning</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100/60 text-indigo-700">
                  Targeted
                </span>
              </button>

              <button
                id="nav-student-activities"
                onClick={() => handleStudentNav('activities')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  studentScreen === 'activities' || studentScreen === 'interactive_activity' || studentScreen === 'activity_completion'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Activities</span>
                </div>
              </button>

              <button
                id="nav-student-assessments"
                onClick={() => handleStudentNav('assessments')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  studentScreen === 'assessments' || studentScreen === 'diagnostic_assessment' || studentScreen === 'diagnostic_results'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>Assessments</span>
                </div>
              </button>

              <button
                id="nav-student-progress"
                onClick={() => handleStudentNav('progress')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  studentScreen === 'progress'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                  <span>Progress</span>
                </div>
              </button>

              <button
                id="nav-student-profile"
                onClick={() => handleStudentNav('profile')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  studentScreen === 'profile'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </div>
              </button>
            </nav>
          )}

          {/* TEACHER / ADMIN NAVIGATION */}
          {role === 'TEACHER_ADMIN' && (
            <nav className="space-y-1">
              <button
                id="nav-teacher-dashboard"
                onClick={() => handleTeacherNav('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'dashboard'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>

              <button
                id="nav-teacher-students"
                onClick={() => handleTeacherNav('students')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'students'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Students</span>
                </div>
              </button>

              <button
                id="nav-teacher-interventions"
                onClick={() => handleTeacherNav('interventions')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'interventions'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Interventions</span>
                </div>
                {pendingInterventionsCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                    {pendingInterventionsCount}
                  </span>
                )}
              </button>

              <button
                id="nav-teacher-assessments"
                onClick={() => handleTeacherNav('assessments')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'assessments'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Assessments</span>
                </div>
              </button>

              {/* Learning Content Group */}
              <div className="pt-2 pb-1">
                <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Learning Content
                </div>
              </div>

              <button
                id="nav-content-competencies"
                onClick={() => handleTeacherNav('content_competencies')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'content_competencies'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderTree className="w-4 h-4 text-indigo-500" />
                  <span>Competencies</span>
                </div>
              </button>

              <button
                id="nav-content-modules"
                onClick={() => handleTeacherNav('content_modules')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'content_modules'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-sky-500" />
                  <span>Learning Modules</span>
                </div>
              </button>

              <button
                id="nav-content-activities"
                onClick={() => handleTeacherNav('content_activities')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'content_activities'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Activities</span>
                </div>
              </button>

              <button
                id="nav-content-questions"
                onClick={() => handleTeacherNav('content_questions')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'content_questions'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-purple-500" />
                  <span>Question Bank</span>
                </div>
              </button>

              {/* Class Management Group */}
              <div className="pt-2 pb-1">
                <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Class Administration
                </div>
              </div>

              <button
                id="nav-classes"
                onClick={() => handleTeacherNav('classes')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'classes'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <School className="w-4 h-4 text-teal-600" />
                  <span>Grades & Sections</span>
                </div>
              </button>

              <button
                id="nav-analytics"
                onClick={() => handleTeacherNav('analytics')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'analytics'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>Reports / Analytics</span>
                </div>
              </button>

              <button
                id="nav-teacher-settings"
                onClick={() => handleTeacherNav('profile')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  teacherScreen === 'profile'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Settings</span>
                </div>
              </button>
            </nav>
          )}
        </div>

        {/* Bottom Educational Cycle Mini-Widget */}
        <div className="mt-auto p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>ARAL Math Cycle</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-tight">
            Diagnose → Targeted Modules → Practice → Mastery → Reassess
          </p>
        </div>
      </aside>
    </>
  );
};
