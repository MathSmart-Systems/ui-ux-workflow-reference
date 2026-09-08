import React, { useState } from 'react';
import {
  TrendingUp,
  BookOpen,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  FileCheck2,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';

export const StudentProgressView: React.FC = () => {
  const { students, currentUser } = useApp();

  const currentStudent =
    students.find((s) => s.id === currentUser.id) || students[0];

  const [activeHistoryTab, setActiveHistoryTab] = useState<'assessments' | 'modules' | 'activities'>('assessments');

  // Hardcoded or computed competency rows conforming to prompt table
  const competencyRows = [
    {
      name: 'Integer Addition & Subtraction',
      code: 'MATH7-INT-01',
      diagnostic: 90,
      current: 95,
      status: 'Mastered',
      change: '+5%',
    },
    {
      name: 'Integer Multiplication and Division',
      code: 'MATH7-INT-02',
      diagnostic: 35,
      current: 82,
      status: 'Improved',
      change: '+47%',
    },
    {
      name: 'Operations with Fractions',
      code: 'MATH7-NUM-03',
      diagnostic: 90,
      current: 92,
      status: 'Mastered',
      change: '+2%',
    },
    {
      name: 'Operations with Decimals',
      code: 'MATH7-NUM-04',
      diagnostic: 45,
      current: 65,
      status: 'Developing',
      change: '+20%',
    },
    {
      name: 'Geometry Fundamentals',
      code: 'MATH7-GEO-01',
      diagnostic: 40,
      current: 45,
      status: 'Needs Support',
      change: '+5%',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          My Mathematics Competency Progress
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Detailed record of your diagnostic screening baseline, targeted growth trajectory, and mastery certifications.
        </p>
      </div>

      {/* Top 3 Metric Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Overall Progress
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              72%
            </span>
            <span className="text-xs font-bold text-emerald-600">+18% this month</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: '72%' }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Modules Completed
            </span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              8 / 12
            </span>
            <span className="text-xs text-slate-500 font-medium">67% completed</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-sky-500 rounded-full" style={{ width: '67%' }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Competencies Mastered
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              7 / 10
            </span>
            <span className="text-xs text-emerald-700 font-semibold">Ready for Grade 8</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '70%' }} />
          </div>
        </div>
      </div>

      {/* Main Competency Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Competency Mastery Data
            </h2>
            <p className="text-xs text-slate-500">
              Comparing diagnostic baseline against real-time mastery after targeted interventions
            </p>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Standard: Grade 7 Mathematics (ARAL Curriculum)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">Competency</th>
                <th className="py-3.5 px-6 text-center">Diagnostic</th>
                <th className="py-3.5 px-6 text-center">Current</th>
                <th className="py-3.5 px-6 text-center">Growth</th>
                <th className="py-3.5 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {competencyRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{row.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{row.code}</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="font-mono-math font-semibold text-slate-600 text-sm bg-slate-100 px-2.5 py-1 rounded-lg">
                      {row.diagnostic}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="font-mono-math font-bold text-indigo-900 text-sm bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      {row.current}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center text-xs font-bold text-emerald-600">
                      {row.change}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <StatusBadge status={row.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trajectory Timeline & Activity History Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Learning History & Audit Trail
            </h2>
            <p className="text-xs text-slate-500">
              Review individual attempts across assessments, learning modules, and activities
            </p>
          </div>

          <div className="flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              id="tab-history-assessments-btn"
              onClick={() => setActiveHistoryTab('assessments')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeHistoryTab === 'assessments'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Assessments (2)
            </button>
            <button
              id="tab-history-modules-btn"
              onClick={() => setActiveHistoryTab('modules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeHistoryTab === 'modules'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modules (8)
            </button>
            <button
              id="tab-history-activities-btn"
              onClick={() => setActiveHistoryTab('activities')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeHistoryTab === 'activities'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Activities (14)
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        {activeHistoryTab === 'assessments' && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-5 h-5 text-indigo-600" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Grade 7 Diagnostic Baseline Assessment
                  </h4>
                  <p className="text-[11px] text-slate-500">30 Questions • Scored: 63%</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Aug 10, 2026</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Unit 1 Integer Mastery Reassessment
                  </h4>
                  <p className="text-[11px] text-slate-500">10 Questions • Scored: 82%</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Aug 25, 2026</span>
            </div>
          </div>
        )}

        {activeHistoryTab === 'modules' && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-sky-600" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Multiplication and Division of Integers
                  </h4>
                  <p className="text-[11px] text-slate-500">Completed 3 rules & 2 worked examples</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Yesterday</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Integer Addition & Subtraction Directional Models
                  </h4>
                  <p className="text-[11px] text-slate-500">Mastered foundational rules</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Aug 15, 2026</span>
            </div>
          </div>
        )}

        {activeHistoryTab === 'activities' && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Interactive Practice: Integer Sign Rules in Action
                  </h4>
                  <p className="text-[11px] text-slate-500">Score: 9/10 (90% Accuracy) • 50 Points</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Today</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
