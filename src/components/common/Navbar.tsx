import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  LogOut,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileSidebar,
  isMobileSidebarOpen = false,
}) => {
  const {
    currentUser,
    role,
    switchRole,
    students,
    switchStudentProfile,
    isLoggedIn,
    logout,
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isStudentPickerOpen, setIsStudentPickerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {isLoggedIn && onToggleMobileSidebar && (
              <button
                id="mobile-sidebar-toggle-btn"
                onClick={onToggleMobileSidebar}
                aria-label="Toggle navigation menu"
                className="p-2 text-slate-600 hover:text-slate-900 md:hidden rounded-lg hover:bg-slate-100"
              >
                {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-sm shadow-indigo-200">
                <Compass className="w-6 h-6 text-indigo-100" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 font-display">
                    Math<span className="text-indigo-600">Smart</span>
                  </span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                    ARAL Math
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block leading-none">
                  Interactive Elementary Mathematics Learning
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Role Switcher & User Profile */}
          <div className="flex items-center gap-3">
            {/* Quick Role Switcher Pill */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80">
              <button
                id="role-switch-student-btn"
                onClick={() => switchRole('STUDENT')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role === 'STUDENT'
                    ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                id="role-switch-teacher-btn"
                onClick={() => switchRole('TEACHER_ADMIN')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role === 'TEACHER_ADMIN'
                    ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Teacher / Admin</span>
              </button>
            </div>

            {/* If in Student view, Quick Demo Persona Switcher */}
            {role === 'STUDENT' && (
              <div className="relative hidden md:block">
                <button
                  id="student-persona-picker-btn"
                  onClick={() => setIsStudentPickerOpen(!isStudentPickerOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
                >
                  <span className="text-slate-500">Student:</span>
                  <span className="font-semibold text-slate-900">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isStudentPickerOpen && (
                  <div
                    id="student-picker-dropdown"
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-100"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Demo Student Profile
                    </div>
                    {students.map((stu) => (
                      <button
                        key={stu.id}
                        id={`switch-to-${stu.id}-btn`}
                        onClick={() => {
                          switchStudentProfile(stu.id);
                          setIsStudentPickerOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs hover:bg-slate-50 transition-colors ${
                          stu.id === currentUser.id ? 'bg-indigo-50/70 text-indigo-900 font-semibold' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={stu.avatar}
                            alt={stu.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div>
                            <div>{stu.name}</div>
                            <div className="text-[10px] text-slate-500">
                              {stu.grade} - {stu.section} ({stu.overallMastery}% Mastery)
                            </div>
                          </div>
                        </div>
                        {stu.id === currentUser.id && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* User Profile dropdown */}
            <div className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <span className="text-xs font-semibold text-slate-800 hidden sm:block max-w-[120px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isProfileMenuOpen && (
                <div
                  id="profile-dropdown-menu"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100"
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                      {role === 'STUDENT' ? `Student (${currentUser.studentId})` : 'Teacher & Administrator'}
                    </span>
                  </div>

                  <div className="px-1 py-1">
                    <button
                      id="logout-btn"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out / Switch Account</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
