import React, { useState } from 'react';
import {
  User,
  School,
  Award,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Settings,
  BookOpen,
  Sparkles,
  Volume2,
  Eye,
  Sliders,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentProfileView: React.FC = () => {
  const {
    currentUser,
    currentStudentData,
    students,
    switchStudentProfile,
    diagnosticResult,
    setStudentScreen,
  } = useApp();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [largeMathText, setLargeMathText] = useState(false);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  const student = currentStudentData || students[0];

  const handleSavePreferences = () => {
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 2500);
  };

  const badges = [
    {
      id: 'b1',
      name: 'Diagnostic Pioneer',
      desc: 'Completed initial ARAL elementary math screener',
      date: 'Sept 2, 2024',
      icon: '🏆',
      unlocked: true,
    },
    {
      id: 'b2',
      name: 'Integer Sign Master',
      desc: 'Accurately solved like and unlike signed operations',
      date: 'Sept 4, 2024',
      icon: '⚡',
      unlocked: true,
    },
    {
      id: 'b3',
      name: 'Curriculum Explorer',
      desc: 'Reviewed 3 worked examples and rule definitions',
      date: 'Sept 5, 2024',
      icon: '📚',
      unlocked: true,
    },
    {
      id: 'b4',
      name: 'Geometry Conqueror',
      desc: 'Achieve 80%+ mastery in angle calculations',
      date: 'In Progress',
      icon: '📐',
      unlocked: false,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
          <User className="w-3.5 h-3.5 text-indigo-600" />
          <span>Learner Academic Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Student Profile & Learning Record
        </h1>
        <p className="text-sm text-slate-600">
          Personal identification, DepEd ARAL enrollment credentials, and academic badge ledger.
        </p>
      </div>

      {/* Main Student ID Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-indigo-500/10 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                LRN: {student.studentId}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                ACTIVE LEARNER
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
              {student.name}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium pt-0.5">
              <span className="flex items-center gap-1">
                <School className="w-3.5 h-3.5 text-slate-400" />
                San Jose Elementary School
              </span>
              <span>•</span>
              <span>{student.grade} — {student.section}</span>
            </div>
          </div>
        </div>

        {/* Quick Diagnostic / Mastery Pill */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shrink-0 w-full md:w-auto">
          <div className="text-center px-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Diagnostic
            </div>
            <div className="text-2xl font-black text-amber-600 font-display">
              {diagnosticResult.overallScore}%
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-center px-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Mastery
            </div>
            <div className="text-2xl font-black text-indigo-600 font-display">
              {student.overallMastery}%
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-center px-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Growth
            </div>
            <div className="text-2xl font-black text-emerald-600 font-display">
              +{Math.max(0, student.overallMastery - diagnosticResult.overallScore)}%
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Academic Details & Test Switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Badges & Competency status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Achievement Badges */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Earned Mastery Badges</span>
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {badges.filter((b) => b.unlocked).length} of {badges.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                    b.unlocked
                      ? 'bg-amber-50/30 border-amber-200/80'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <span className="text-2xl shrink-0">{b.icon}</span>
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{b.name}</h4>
                      {b.unlocked && (
                        <span className="text-[10px] text-emerald-700 font-bold">Earned</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{b.desc}</p>
                    <div className="text-[10px] text-slate-400 pt-1 font-mono">{b.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Learning Preferences */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Learning Environment Preferences</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Audio Feedback & Tone Hints</div>
                    <div className="text-[11px] text-slate-500">Play positive reinforcement sounds on correct responses</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Eye className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Enlarged Mathematical Notation</div>
                    <div className="text-[11px] text-slate-500">Increase font scale on integer operations and formulas</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={largeMathText}
                  onChange={(e) => setLargeMathText(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex items-center justify-between pt-2">
              {showSavedFeedback && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Preferences updated successfully!
                </span>
              )}
              {!showSavedFeedback && <div />}
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Test Persona Switcher & Program Status */}
        <div className="space-y-6">
          {/* Program Status Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              ARAL Program Enrollment
            </h3>
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-1">
              <span className="text-[10px] font-bold text-indigo-700 uppercase">Target Program</span>
              <p className="font-bold text-slate-900">Accelerated Remediation & Learning</p>
              <p className="text-slate-600 text-[11px]">
                Grade 7 Mathematics Remediation Cohort 1
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Class Adviser:</span>
                <span className="font-semibold text-slate-800">Mrs. Santos</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Target Domain:</span>
                <span className="font-semibold text-slate-800">Numbers & Number Sense</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Intervention Case:</span>
                <span className="font-semibold text-amber-700">Active (Multiplication)</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Persona Switcher Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Demo Student Personas
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Switch student profiles to preview different mastery levels and intervention states:
            </p>

            <div className="space-y-2">
              {students.map((stu) => (
                <button
                  key={stu.id}
                  onClick={() => switchStudentProfile(stu.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    stu.id === student.id
                      ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={stu.avatar}
                      alt={stu.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{stu.name}</div>
                      <div className="text-[10px] text-slate-500">
                        {stu.grade} - {stu.section}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-indigo-700">
                    {stu.overallMastery}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
