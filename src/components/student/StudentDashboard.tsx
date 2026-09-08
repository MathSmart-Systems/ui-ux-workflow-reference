import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileCheck2,
  PlayCircle,
  HelpCircle,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    students,
    setStudentScreen,
    setActiveModuleId,
    setActiveActivityId,
  } = useApp();

  const currentStudent =
    students.find((s) => s.id === currentUser.id) || students[0];

  const handleContinueLearning = () => {
    setActiveModuleId('mod-int-02');
    setStudentScreen('learning_module');
  };

  const handleStartDiagnostic = () => {
    setStudentScreen('diagnostic_assessment');
  };

  const handleViewResults = () => {
    setStudentScreen('diagnostic_results');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>ARAL Targeted Mathematics Learning</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Welcome back, {currentStudent.name.split(' ')[0]}!
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            You are currently working on your Grade 7 mathematics competencies. Your targeted learning path is adjusted to your individual strengths and learning gaps.
          </p>
        </div>

        {/* Quick Diagnostic Card */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 w-full md:w-auto min-w-[240px]">
          <div className="text-xs text-slate-500 font-medium">Diagnostic Assessment</div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-bold text-slate-900">
              {currentStudent.diagnosticStatus === 'completed'
                ? `Completed (${currentStudent.diagnosticScore}%)`
                : 'Pending'}
            </span>
            <span className="inline-flex items-center text-xs text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Active
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              id="view-diagnostic-results-btn"
              onClick={handleViewResults}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 underline cursor-pointer"
            >
              View Gap Analysis
            </button>
            <span className="text-slate-300">|</span>
            <button
              id="retake-diagnostic-btn"
              onClick={handleStartDiagnostic}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Reassess
            </button>
          </div>
        </div>
      </div>

      {/* Primary Action Card: Continue Learning */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/30 text-indigo-200 text-xs font-medium backdrop-blur-xs border border-indigo-400/30">
            <span>Recommended Competency</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
            Multiplication and Division of Integers
          </h2>

          <p className="text-indigo-100 text-sm leading-relaxed">
            Master the rules of signs for multiplying and dividing signed integers. Understand why two negative factors yield a positive product.
          </p>

          {/* Competency Progress Indicator */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-medium text-indigo-200 mb-1.5">
              <span>Current Mastery Progress</span>
              <span className="font-bold text-white">65%</span>
            </div>
            <div className="h-2.5 w-full bg-indigo-950/60 rounded-full overflow-hidden p-0.5 border border-indigo-400/20">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-300 rounded-full transition-all duration-500"
                style={{ width: '65%' }}
              />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="continue-learning-btn"
              onClick={handleContinueLearning}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-900 font-bold text-sm shadow-sm hover:bg-indigo-50 transition-all cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 text-indigo-600" />
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4 text-indigo-600 ml-1" />
            </button>

            <button
              id="quick-activity-btn"
              onClick={() => {
                setActiveActivityId('act-int-02');
                setStudentScreen('interactive_activity');
              }}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-600/60 text-white font-medium text-sm hover:bg-indigo-600/90 transition-colors border border-indigo-400/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Jump to Interactive Practice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Learning Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Overall Progress</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-display">
              {currentStudent.overallMastery}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">+12% this week</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Weighted competency mastery</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Competencies Mastered</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-display">
              {currentStudent.competenciesMasteredCount}
            </span>
            <span className="text-xs text-slate-500">of {currentStudent.totalCompetenciesCount}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">2 developing competencies</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Modules Completed</span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-display">
              {currentStudent.modulesCompletedCount}
            </span>
            <span className="text-xs text-slate-500">of {currentStudent.totalModulesCount}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Next: Operations with Decimals</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Diagnostic Status</span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-display">
              {currentStudent.diagnosticScore}%
            </span>
            <span className="text-xs text-emerald-700 font-semibold">Gaps Analyzed</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Completed on Aug 10, 2026</p>
        </div>
      </div>

      {/* Two Column Layout: My Learning Journey & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: My Learning Journey (Step Roadmap) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">My Learning Journey</h3>
              <p className="text-xs text-slate-500">
                Personalized sequential pathway based on your diagnostic results
              </p>
            </div>
            <button
              id="view-full-learning-path-btn"
              onClick={() => setStudentScreen('my_learning')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              View Full Curriculum
            </button>
          </div>

          <div className="space-y-3">
            {/* Step 1: Diagnostic */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Diagnostic Assessment</h4>
                  <p className="text-[11px] text-slate-500">Initial mathematical proficiency screening</p>
                </div>
              </div>
              <StatusBadge status="Mastered" size="sm" />
            </div>

            {/* Step 2: Integer Addition */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Integer Addition & Subtraction</h4>
                  <p className="text-[11px] text-slate-500">Diagnostic: 90% • Current: 95%</p>
                </div>
              </div>
              <StatusBadge status="Mastered" size="sm" />
            </div>

            {/* Step 3: Integer Multiplication (CURRENT) */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-50/60 border-2 border-indigo-500/40 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs animate-pulse">
                  ●
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-indigo-950">Multiplication and Division of Integers</h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                      CURRENT
                    </span>
                  </div>
                  <p className="text-[11px] text-indigo-700">Diagnostic: 35% • Current: 65%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status="Learning" size="sm" />
                <button
                  id="journey-continue-module-btn"
                  onClick={handleContinueLearning}
                  className="px-2.5 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  Resume
                </button>
              </div>
            </div>

            {/* Step 4: Decimals (RECOMMENDED) */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                  ○
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Operations with Decimals</h4>
                  <p className="text-[11px] text-slate-500">Identified gap: 45% diagnostic score</p>
                </div>
              </div>
              <StatusBadge status="Recommended" size="sm" />
            </div>

            {/* Step 5: Geometry (UPCOMING) */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/60 border border-slate-200/50">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
                  ○
                </div>
                <div>
                  <h4 className="text-xs font-medium text-slate-700">Geometry Fundamentals</h4>
                  <p className="text-[11px] text-slate-400">Angle relationships and polygon classification</p>
                </div>
              </div>
              <StatusBadge status="Upcoming" size="sm" />
            </div>
          </div>
        </div>

        {/* Right Col: Recent Activity & Teacher Notes */}
        <div className="space-y-4">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 font-display mb-3">Recent Activity</h3>
            <div className="space-y-3 text-xs">
              <div className="pb-3 border-b border-slate-100 flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">
                    Completed Practice Activity
                  </p>
                  <p className="text-[11px] text-slate-500">Integer Sign Rules: Score 9/10 (90%)</p>
                  <span className="text-[10px] text-slate-400">Yesterday at 3:45 PM</span>
                </div>
              </div>

              <div className="pb-3 border-b border-slate-100 flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Studied Lesson Module</p>
                  <p className="text-[11px] text-slate-500">Multiplication and Division of Integers</p>
                  <span className="text-[10px] text-slate-400">2 days ago</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Diagnostic Assessment Completed</p>
                  <p className="text-[11px] text-slate-500">Identified 3 targeted learning paths</p>
                  <span className="text-[10px] text-slate-400">Aug 10, 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Guidance / Support Note */}
          <div className="bg-sky-50/60 rounded-xl p-4 border border-sky-200/70">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
              <HelpCircle className="w-4 h-4 text-sky-600" />
              <span>Teacher Guidance</span>
            </div>
            <p className="text-xs text-sky-800 mt-1.5 leading-relaxed">
              "Great progress on negative numbers, Juan! Remember to double-check whether two numbers have identical or opposite signs before finalizing your answers."
            </p>
            <p className="text-[10px] font-semibold text-sky-700 mt-2">
              — Ms. Maria Santos (Adviser)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
