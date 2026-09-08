import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Award,
  AlertCircle,
  HelpCircle,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';

export const DiagnosticResultsView: React.FC = () => {
  const {
    diagnosticResult,
    setStudentScreen,
    setActiveModuleId,
    students,
    currentUser,
  } = useApp();

  const currentStudent =
    students.find((s) => s.id === currentUser.id) || students[0];

  const handleStartRecommendedLesson = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setStudentScreen('learning_module');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header Banner: Emphasizing Growth & Improvement */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Diagnostic Assessment Complete</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Great effort, {currentStudent.name.split(' ')[0]}! Here is your diagnostic profile.
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            This screening establishes your mathematical baseline. Every identified gap is simply an opportunity to build mastery with targeted lessons.
          </p>
        </div>

        {/* Overall Score Badge */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/80 p-6 rounded-2xl border border-indigo-200 text-center min-w-[200px] shadow-xs">
          <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block">
            Overall Score
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 font-display mt-1">
            {diagnosticResult.overallScore}%
          </div>
          <span className="text-xs text-indigo-700 font-medium block mt-1">
            Grade 7 Baseline
          </span>
        </div>
      </div>

      {/* Section 1: Competency-Level Results */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Competency-Level Performance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown of individual mathematical standards assessed during the screening
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>≥80% Mastered</span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-400 ml-2" />
            <span>&lt;60% Targeted for Support</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {diagnosticResult.competencyResults.map((comp) => {
            const isMastered = comp.status === 'Mastered';
            return (
              <div
                key={comp.competencyId}
                className={`p-5 rounded-xl border transition-all ${
                  isMastered
                    ? 'bg-emerald-50/40 border-emerald-200/70'
                    : 'bg-rose-50/30 border-rose-200/70'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{comp.competencyName}</h3>
                    <div className="mt-1">
                      <StatusBadge status={comp.status} size="sm" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-2xl font-extrabold font-display ${
                        isMastered ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {comp.score}%
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isMastered ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-2">
                  {isMastered
                    ? 'Strong foundational mastery demonstrated.'
                    : 'Targeted learning module recommended to strengthen core concepts.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Recommended Learning Path */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>ARAL Targeted Intervention Plan</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display mt-1">
              Your Recommended Learning Path
            </h2>
            <p className="text-xs text-slate-500">
              Follow this step-by-step sequence to eliminate mathematical gaps and build confidence
            </p>
          </div>

          <button
            id="start-first-recommended-lesson-btn"
            onClick={() =>
              handleStartRecommendedLesson(
                diagnosticResult.recommendedLearningPath[0]?.moduleId || 'mod-int-02'
              )
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <span>Start Recommended Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {diagnosticResult.recommendedLearningPath.map((item, idx) => (
            <div
              key={item.competencyId}
              className={`p-5 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                idx === 0
                  ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-500/20'
                  : 'bg-slate-50/60 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    idx === 0
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.priority}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                    {idx === 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                        HIGHEST PRIORITY
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              </div>

              <button
                id={`start-lesson-path-${idx + 1}-btn`}
                onClick={() => handleStartRecommendedLesson(item.moduleId)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  idx === 0
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Begin Module</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
