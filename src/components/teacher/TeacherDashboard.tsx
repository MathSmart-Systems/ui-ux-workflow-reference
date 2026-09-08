import React from 'react';
import {
  Users,
  AlertTriangle,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileCheck2,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';

export const TeacherDashboard: React.FC = () => {
  const {
    students,
    interventions,
    setTeacherScreen,
    setSelectedStudentIdForTeacher,
    setReviewingInterventionId,
  } = useApp();

  const totalStudents = students.length;
  const needingIntervention = students.filter((s) => s.status === 'needs_intervention').length;
  const doingWell = students.filter((s) => s.status === 'mastered' || s.overallMastery >= 75).length;
  const currentlyLearning = totalStudents - needingIntervention - doingWell;
  const avgClassMastery = Math.round(
    students.reduce((acc, curr) => acc + curr.overallMastery, 0) / Math.max(1, totalStudents)
  );

  const handleViewStudentDetail = (studentId: string) => {
    setSelectedStudentIdForTeacher(studentId);
    setTeacherScreen('students');
  };

  const handleReviewIntervention = (interventionId: string) => {
    setReviewingInterventionId(interventionId);
    setTeacherScreen('interventions');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>ARAL Mathematics Class Monitoring Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Grade 7 Mathematics Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Real-time competency tracking, automated gap detection, and teacher-led intervention workflow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="view-all-interventions-btn"
            onClick={() => setTeacherScreen('interventions')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Review Interventions ({needingIntervention})</span>
          </button>
        </div>
      </div>

      {/* Class Level KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total Students</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            {totalStudents}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Grade 7 (Rizal & Bonifacio)</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-rose-200/80 bg-rose-50/20 shadow-xs">
          <div className="flex items-center justify-between text-rose-600">
            <span className="text-xs font-bold">Needs Intervention</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-700 font-display mt-2">
            {needingIntervention}
          </div>
          <span className="text-[11px] text-rose-600 font-medium mt-1 block">Action required</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Currently Learning</span>
            <BookOpen className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            {currentlyLearning}
          </div>
          <span className="text-[11px] text-sky-600 font-medium mt-1 block">Active progression</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Doing Well</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-display mt-2">
            {doingWell}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">≥75% Mastery</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Average Mastery</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950 font-display mt-2">
            {avgClassMastery}%
          </div>
          <span className="text-[11px] text-indigo-600 font-medium mt-1 block">+6% this semester</span>
        </div>
      </div>

      {/* Primary Section: Students Requiring Attention (As specifically requested in prompt) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-rose-100 text-rose-700">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Students Requiring Attention
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Learners flagged by repeated unsuccessful activity attempts or incomplete mastery cycles
            </p>
          </div>

          <button
            id="open-intervention-dashboard-btn"
            onClick={() => setTeacherScreen('interventions')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Open Dedicated Intervention Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Juan Dela Cruz */}
          <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/30 flex flex-col justify-between space-y-4 hover:border-rose-300 transition-all">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Juan Dela Cruz"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Juan Dela Cruz</h3>
                    <p className="text-[11px] text-slate-500">Grade 7 – Rizal (STU-2026-001)</p>
                  </div>
                </div>
                <StatusBadge status="HIGH" size="sm" />
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-rose-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Problem Competency:</span>
                  <span className="font-bold text-rose-700">Geometry Fundamentals</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Current Mastery:</span>
                  <span className="font-bold text-slate-900">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Attempt History:</span>
                  <span className="font-bold text-rose-600">3 unsuccessful activity attempts</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                id="view-juan-student-btn"
                onClick={() => handleViewStudentDetail('stu-01')}
                className="flex-1 py-2 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                View Student
              </button>
              <button
                id="review-juan-intervention-btn"
                onClick={() => handleReviewIntervention('intv-001')}
                className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Record Intervention
              </button>
            </div>
          </div>

          {/* Card 2: Maria Reyes */}
          <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/30 flex flex-col justify-between space-y-4 hover:border-rose-300 transition-all">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
                    alt="Maria Reyes"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Maria Reyes</h3>
                    <p className="text-[11px] text-slate-500">Grade 7 – Rizal (STU-2026-002)</p>
                  </div>
                </div>
                <StatusBadge status="HIGH" size="sm" />
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-rose-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Problem Competency:</span>
                  <span className="font-bold text-rose-700">Operations with Fractions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Current Mastery:</span>
                  <span className="font-bold text-slate-900">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Attempt History:</span>
                  <span className="font-bold text-rose-600">2 modules completed without mastery</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                id="view-maria-student-btn"
                onClick={() => handleViewStudentDetail('stu-02')}
                className="flex-1 py-2 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                View Student
              </button>
              <button
                id="review-maria-intervention-btn"
                onClick={() => handleReviewIntervention('intv-002')}
                className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Record Intervention
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Class Competency Performance & Recent Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Competency Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Class Competency Performance Overview
              </h3>
              <p className="text-xs text-slate-500">Average mastery across all Grade 7 sections</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">
                  Integer Addition & Subtraction (MATH7-INT-01)
                </span>
                <span className="font-bold text-emerald-700">88% Mastery</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">
                  Multiplication and Division of Integers (MATH7-INT-02)
                </span>
                <span className="font-bold text-sky-700">74% Mastery</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '74%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">
                  Operations with Fractions (MATH7-NUM-03)
                </span>
                <span className="font-bold text-amber-700">62% Developing</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '62%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">
                  Geometry Fundamentals (MATH7-GEO-01)
                </span>
                <span className="font-bold text-rose-700">51% Needs Support</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '51%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Diagnostic Submissions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">
            Recent Assessments
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Pedro Santos</p>
                <p className="text-[11px] text-slate-500">Unit 1 Integer Reassessment</p>
              </div>
              <span className="font-bold text-emerald-700 font-mono-math">95%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Angela Cruz</p>
                <p className="text-[11px] text-slate-500">Diagnostic Assessment</p>
              </div>
              <span className="font-bold text-indigo-700 font-mono-math">71%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Juan Dela Cruz</p>
                <p className="text-[11px] text-slate-500">Diagnostic Assessment</p>
              </div>
              <span className="font-bold text-slate-700 font-mono-math">63%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
