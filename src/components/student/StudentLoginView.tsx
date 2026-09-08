import React, { useState } from 'react';
import {
  Compass,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentLoginView: React.FC = () => {
  const { students, loginStudent, switchRole } = useApp();
  const [studentIdInput, setStudentIdInput] = useState('STU-2026-001');
  const [passwordInput, setPasswordInput] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = students.find((s) => s.studentId === studentIdInput) || students[0];
    loginStudent(found.id);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
        {/* Brand & Math Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
            <Compass className="w-8 h-8 text-indigo-100" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Math<span className="text-indigo-600">Smart</span>
          </h1>

          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            AI-Powered Interactive Learning System for Enhancing Elementary Mathematics
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Username or Student ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="student-id-login-input"
                type="text"
                value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)}
                placeholder="e.g. STU-2026-001"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden text-xs text-slate-900 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="student-password-login-input"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-hidden text-xs text-slate-900 bg-slate-50/50"
              />
            </div>
          </div>

          <button
            id="student-sign-in-btn"
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer mt-2"
          >
            <span>Sign In to MathSmart</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Sign-In Selectors */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            Quick 1-Click Demo Profiles
          </div>

          <div className="grid grid-cols-1 gap-2">
            {students.slice(0, 3).map((stu) => (
              <button
                key={stu.id}
                id={`demo-login-${stu.id}-btn`}
                type="button"
                onClick={() => loginStudent(stu.id)}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={stu.avatar}
                    alt={stu.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{stu.name}</div>
                    <div className="text-[10px] text-slate-500">
                      {stu.grade} - {stu.section} • {stu.overallMastery}% Mastery
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                  Login Student
                </span>
              </button>
            ))}

            <button
              id="demo-login-teacher-btn"
              type="button"
              onClick={() => switchRole('TEACHER_ADMIN')}
              className="mt-2 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Switch to Teacher / Admin View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
