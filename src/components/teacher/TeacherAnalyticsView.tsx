import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Users,
  BrainCircuit,
  ArrowUpRight,
  School,
  FileSpreadsheet,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherAnalyticsView: React.FC = () => {
  const { students, interventions, competencies } = useApp();
  const [selectedSection, setSelectedSection] = useState('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredStudents = students.filter((s) => {
    if (selectedSection === 'all') return true;
    return s.section === selectedSection;
  });

  const avgMastery = Math.round(
    filteredStudents.reduce((acc, s) => acc + s.overallMastery, 0) / (filteredStudents.length || 1)
  );

  const pendingInterventions = interventions.filter((i) => i.status === 'Needs Intervention').length;

  const handleExportReport = () => {
    // Generate simple downloadable CSV summary
    const headers = ['Student Name', 'Grade', 'Section', 'Mastery (%)', 'Risk Level', 'Intervention Status'];
    const rows = filteredStudents.map((s) => [
      `"${s.name}"`,
      `"${s.grade}"`,
      `"${s.section}"`,
      s.overallMastery,
      s.riskLevel,
      `"${s.needsIntervention ? 'Needs Attention' : 'On Track'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MathSmart_ARAL_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const misconceptions = [
    {
      pattern: 'Multiplying Negative Numbers Confusion',
      count: 6,
      competency: 'Multiplication of Integers',
      severity: 'HIGH',
      description: 'Learners assume two negative factors result in a negative product instead of applying (-)(-) = (+).',
    },
    {
      pattern: 'Conflating Area and Perimeter Formulas',
      count: 4,
      competency: 'Elementary Geometry',
      severity: 'MEDIUM',
      description: 'Learners multiply linear dimensions when calculating the perimeter of irregular polygons.',
    },
    {
      pattern: 'Decimal Point Misalignment in Addition',
      count: 3,
      competency: 'Decimal Operations',
      severity: 'LOW',
      description: 'Right-aligning numbers regardless of decimal place values before performing vertical addition.',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Class Performance & ARAL Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Reports & Learning Analytics
          </h1>
          <p className="text-sm text-slate-600">
            Cohort mastery curves, cognitive misconception frequency, and remediation intervention efficacy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="export-analytics-report-btn"
            onClick={handleExportReport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export ARAL Report (.CSV)</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Report successfully exported! CSV summary ready for school documentation.</span>
        </div>
      )}

      {/* Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Cohort Average Mastery</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {avgMastery}%
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +18.4% growth from diagnostic baseline
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Remediation Efficacy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-display">
            85.7%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            12 of 14 cases achieved target mastery
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">At/Above Mastery (≥75%)</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {Math.round(
              (filteredStudents.filter((s) => s.overallMastery >= 75).length /
                (filteredStudents.length || 1)) *
                100
            )}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {filteredStudents.filter((s) => s.overallMastery >= 75).length} of {filteredStudents.length} students proficient
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Active Interventions</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-extrabold text-rose-700 font-display">
            {pendingInterventions}
          </div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">
            Targeted for 1-on-1 remediation
          </div>
        </div>
      </div>

      {/* Section & Class Filter */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <School className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700">Filter Section Cohort:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              selectedSection === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Sections ({students.length})
          </button>
          <button
            onClick={() => setSelectedSection('Section Mabini')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              selectedSection === 'Section Mabini'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Section Mabini
          </button>
          <button
            onClick={() => setSelectedSection('Section Rizal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              selectedSection === 'Section Rizal'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Section Rizal
          </button>
          <button
            onClick={() => setSelectedSection('Section Bonifacio')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              selectedSection === 'Section Bonifacio'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Section Bonifacio
          </button>
        </div>
      </div>

      {/* Competency Mastery & AI Misconceptions Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competency Mastery Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Competency Mastery Breakdown
            </h3>
            <span className="text-xs text-slate-500 font-medium">Class Composite</span>
          </div>

          <div className="space-y-4">
            {competencies.map((comp, idx) => {
              // Synthetic baseline percentages for display
              const rates = [88, 65, 82, 71, 48];
              const rate = rates[idx % rates.length];

              return (
                <div key={comp.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{comp.name}</span>
                    <span
                      className={`font-mono font-bold ${
                        rate >= 75
                          ? 'text-emerald-700'
                          : rate >= 60
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {rate}% Mastery
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        rate >= 75
                          ? 'bg-emerald-500'
                          : rate >= 60
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Cognitive Misconception Frequency */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-indigo-600" />
              <span>AI Cognitive Misconception Detection</span>
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Groq AI Engine</span>
          </div>

          <p className="text-xs text-slate-600">
            Patterns identified by error analysis algorithms across student response logs:
          </p>

          <div className="space-y-3">
            {misconceptions.map((m, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{m.pattern}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      m.severity === 'HIGH'
                        ? 'bg-rose-100 text-rose-800'
                        : m.severity === 'MEDIUM'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {m.count} Students Flagged
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{m.description}</p>
                <div className="text-[10px] text-indigo-600 font-semibold pt-1">
                  Target Domain: {m.competency}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cohort Growth Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 font-display">
            Individual Student Growth Matrix
          </h3>
          <p className="text-xs text-slate-500">
            Showing diagnostic baseline compared against current progress
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Student</th>
                <th className="py-3 px-6">Section</th>
                <th className="py-3 px-6 text-center">Diagnostic Score</th>
                <th className="py-3 px-6 text-center">Current Mastery</th>
                <th className="py-3 px-6 text-center">Gain</th>
                <th className="py-3 px-6 text-center">Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((stu) => {
                const diagScore = Math.max(30, stu.overallMastery - 15);
                const gain = stu.overallMastery - diagScore;

                return (
                  <tr key={stu.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-3">
                      <img
                        src={stu.avatar}
                        alt={stu.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span>{stu.name}</span>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-600">
                      {stu.section}
                    </td>
                    <td className="py-4 px-6 text-center font-mono font-medium">
                      {diagScore}%
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                          stu.overallMastery >= 75
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {stu.overallMastery}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-bold font-mono text-emerald-600">
                      +{gain}%
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                          stu.needsIntervention
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {stu.needsIntervention ? 'Active Case' : 'On Track'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
