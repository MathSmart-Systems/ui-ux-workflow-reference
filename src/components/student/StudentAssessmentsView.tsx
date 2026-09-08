import React from 'react';
import {
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  ArrowRight,
  Clock,
  Calendar,
  Award,
  Sparkles,
  BarChart2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentAssessmentsView: React.FC = () => {
  const {
    diagnosticAssessment,
    diagnosticResult,
    setStudentScreen,
    currentStudentData,
  } = useApp();

  const handleRetakeDiagnostic = () => {
    setStudentScreen('diagnostic_assessment');
  };

  const handleViewAnalysis = () => {
    setStudentScreen('diagnostic_results');
  };

  const assessmentsList = [
    {
      id: 'as-01',
      title: 'ARAL Diagnostic Screener: Elementary Mathematics',
      type: 'Diagnostic Baseline',
      status: 'Completed',
      score: diagnosticResult.overallScore,
      totalQuestions: diagnosticAssessment.questions.length,
      dateCompleted: 'Sept 2, 2024',
      durationMinutes: 24,
      needsAttention: diagnosticResult.overallScore < 75,
      isPrimary: true,
    },
    {
      id: 'as-02',
      title: 'Formative Check 1: Integer Addition & Subtraction',
      type: 'Formative Quiz',
      status: 'Completed',
      score: 90,
      totalQuestions: 10,
      dateCompleted: 'Sept 4, 2024',
      durationMinutes: 15,
      needsAttention: false,
      isPrimary: false,
    },
    {
      id: 'as-03',
      title: 'Formative Check 2: Integer Multiplication & Division',
      type: 'Formative Quiz',
      status: 'Needs Retake',
      score: 35,
      totalQuestions: 10,
      dateCompleted: 'Sept 5, 2024',
      durationMinutes: 18,
      needsAttention: true,
      isPrimary: false,
    },
    {
      id: 'as-04',
      title: 'Formative Check 3: Fractions & Decimals Review',
      type: 'Formative Quiz',
      status: 'Completed',
      score: 78,
      totalQuestions: 12,
      dateCompleted: 'Sept 6, 2024',
      durationMinutes: 20,
      needsAttention: false,
      isPrimary: false,
    },
    {
      id: 'as-05',
      title: 'Upcoming Post-Intervention Summative Test',
      type: 'Summative Milestone',
      status: 'Scheduled',
      score: null,
      totalQuestions: 25,
      dateCompleted: 'Sept 20, 2024',
      durationMinutes: 45,
      needsAttention: false,
      isPrimary: false,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
          <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Evaluation & Diagnostic Screening</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Mathematics Assessments
        </h1>
        <p className="text-sm text-slate-600">
          Track baseline diagnostic evaluations, formative competency checkpoints, and mastery post-tests.
        </p>
      </div>

      {/* Primary Diagnostic Screener Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
                OFFICIAL ARAL DIAGNOSTIC
              </span>
              <span className="text-xs text-slate-500 font-medium">
                DepEd National Learning Camp / ARAL Framework
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              {diagnosticAssessment.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {diagnosticAssessment.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {diagnosticAssessment.timeLimitMinutes} Mins Allocated
              </span>
              <span>•</span>
              <span>{diagnosticAssessment.questions.length} Calibrated Items</span>
              <span>•</span>
              <span className="text-indigo-700 font-bold">Standard Passing: {diagnosticAssessment.passingScore}%</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl flex flex-col items-center justify-center min-w-[220px] shrink-0 text-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Your Diagnostic Score
            </div>
            <div
              className={`text-4xl sm:text-5xl font-extrabold font-display ${
                diagnosticResult.overallScore >= 75
                  ? 'text-emerald-600'
                  : 'text-amber-600'
              }`}
            >
              {diagnosticResult.overallScore}%
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              {diagnosticResult.overallScore >= 75
                ? 'Proficient Baseline'
                : 'Targeted Remediation Needed'}
            </div>

            <div className="flex flex-col gap-2 w-full mt-4">
              <button
                id="view-diagnostic-gap-analysis-btn"
                onClick={handleViewAnalysis}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>View Gap Analysis</span>
              </button>

              <button
                id="retake-diagnostic-screener-btn"
                onClick={handleRetakeDiagnostic}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Retake Screener</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Identified Competencies Diagnostic Summary */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <span>Competency Diagnostic Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagnosticResult.competencyResults.map((item) => (
            <div
              key={item.competencyId}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                item.score < 50
                  ? 'bg-rose-50/50 border-rose-200'
                  : item.score < 75
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-emerald-50/50 border-emerald-200'
              }`}
            >
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700 truncate max-w-[160px]">
                    {item.competencyName}
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      item.score < 50
                        ? 'text-rose-700'
                        : item.score < 75
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }`}
                  >
                    {item.score}%
                  </span>
                </div>

                <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-slate-200">
                  <div
                    className={`h-full rounded-full ${
                      item.score < 50
                        ? 'bg-rose-500'
                        : item.score < 75
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>

              <div className="text-[11px] flex items-center justify-between">
                <span className="text-slate-500">{item.status}</span>
                {item.score < 50 && (
                  <span className="text-rose-700 font-bold">Intervention Active</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Assessment Records & History
            </h3>
            <p className="text-xs text-slate-500">
              Complete historical record of screening evaluations and practice quizzes
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Assessment Title</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6 text-center">Items</th>
                <th className="py-3 px-6 text-center">Score</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assessmentsList.map((as) => (
                <tr key={as.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {as.title}
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    {as.type}
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">
                    {as.dateCompleted}
                  </td>
                  <td className="py-4 px-6 text-center font-medium">
                    {as.totalQuestions}
                  </td>
                  <td className="py-4 px-6 text-center font-bold">
                    {as.score !== null ? (
                      <span
                        className={`font-mono text-xs px-2 py-0.5 rounded ${
                          as.score >= 75
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {as.score}%
                      </span>
                    ) : (
                      <span className="text-slate-400 font-normal">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                        as.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : as.status === 'Needs Retake'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {as.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {as.isPrimary ? (
                      <button
                        onClick={handleViewAnalysis}
                        className="text-xs text-indigo-600 font-bold hover:text-indigo-800 cursor-pointer"
                      >
                        View Report
                      </button>
                    ) : (
                      <button
                        onClick={() => setStudentScreen('my_learning')}
                        className="text-xs text-slate-600 font-semibold hover:text-slate-900 cursor-pointer"
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
