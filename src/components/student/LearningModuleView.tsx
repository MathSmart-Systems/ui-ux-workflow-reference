import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  ArrowLeft,
  Calculator,
  Compass,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LearningModuleView: React.FC = () => {
  const {
    activeModuleId,
    modules,
    setActiveActivityId,
    setStudentScreen,
  } = useApp();

  const currentModule =
    modules.find((m) => m.id === activeModuleId) || modules[0];

  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  const handleTryActivity = () => {
    setActiveActivityId(currentModule.associatedActivityId || 'act-int-02');
    setStudentScreen('interactive_activity');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Breadcrumb / Return Bar */}
      <div className="flex items-center justify-between">
        <button
          id="module-back-to-dashboard-btn"
          onClick={() => setStudentScreen('dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-medium text-slate-400">
          Module {currentModule.order} of {modules.length} • {currentModule.estimatedMinutes} mins study time
        </span>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>Competency Module: {currentModule.competencyName}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          {currentModule.title}
        </h1>

        {/* Learning Objective Callout */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 space-y-1">
          <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
            <Compass className="w-4 h-4 text-indigo-600" />
            Learning Objective:
          </span>
          <p className="leading-relaxed text-slate-600">
            {currentModule.learningObjective}
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed pt-1">
          {currentModule.shortExplanation}
        </p>
      </div>

      {/* Important Rules Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Core Mathematical Rules
          </h2>
          <p className="text-xs text-slate-500">
            Keep these fundamental sign rules in mind for every calculation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {currentModule.rules.map((rule, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/80 flex flex-col justify-between hover:border-indigo-300 transition-all"
            >
              <div>
                <span className="text-[11px] font-bold text-indigo-700 block mb-1">
                  {rule.title}
                </span>

                {rule.ruleFormula && (
                  <div className="my-2 p-2.5 rounded-lg bg-indigo-900 text-white font-mono-math text-xs font-bold text-center shadow-xs">
                    {rule.ruleFormula}
                  </div>
                )}

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {rule.explanation}
                </p>
              </div>

              {rule.visualExample && (
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">
                    Example:
                  </span>
                  <span className="font-mono-math font-bold text-indigo-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {rule.visualExample}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Visual Mathematical Example / Concept Visualization */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
            Visual Understanding: The Sign Matrix
          </span>
          <span className="text-xs text-indigo-200/80 font-mono-math">
            (-a) × (-b) = +(ab)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-white/10 border border-white/15">
            <div className="font-mono-math font-bold text-base text-emerald-300">(+) × (+)</div>
            <div className="font-bold text-white mt-1">= POSITIVE (+)</div>
            <div className="text-[10px] text-indigo-200 mt-1 font-mono-math">3 × 4 = 12</div>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/15">
            <div className="font-mono-math font-bold text-base text-rose-300">(+) × (-)</div>
            <div className="font-bold text-white mt-1">= NEGATIVE (-)</div>
            <div className="text-[10px] text-indigo-200 mt-1 font-mono-math">3 × (-4) = -12</div>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/15">
            <div className="font-mono-math font-bold text-base text-rose-300">(-) × (+)</div>
            <div className="font-bold text-white mt-1">= NEGATIVE (-)</div>
            <div className="text-[10px] text-indigo-200 mt-1 font-mono-math">(-3) × 4 = -12</div>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/30 border-2 border-amber-400/50 shadow-xs">
            <div className="font-mono-math font-bold text-base text-amber-300">(-) × (-)</div>
            <div className="font-bold text-amber-200 mt-1">= POSITIVE (+)</div>
            <div className="text-[10px] text-white mt-1 font-mono-math font-bold">(-3) × (-4) = +12</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-indigo-100 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Mental Model:</strong> A negative sign means "reverse direction." Multiplying by a second negative reverses direction a second time, pointing you back in the positive direction!
          </p>
        </div>
      </div>

      {/* Step-by-Step Worked Examples */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Worked Step-by-Step Examples
          </h2>
          <p className="text-xs text-slate-500">
            Study how each calculation is broken down into easy, verifiable steps
          </p>
        </div>

        <div className="space-y-6">
          {currentModule.workedExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Example {idx + 1}
                </span>
                <span className="font-mono-math font-bold text-slate-900 text-sm">
                  {ex.problem}
                </span>
              </div>

              <div className="space-y-2.5">
                {ex.steps.map((step, stepIdx) => (
                  <div key={stepIdx} className="flex items-start gap-3 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {stepIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Final Solution:</span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-mono-math font-bold text-sm">
                    {ex.solution}
                  </span>
                </div>

                {ex.tip && (
                  <p className="text-[11px] text-indigo-700 italic">
                    💡 {ex.tip}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Navigation & Call-to-Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          id="module-prev-btn"
          onClick={() => setStudentScreen('dashboard')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Lesson</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            id="try-interactive-activity-btn"
            onClick={handleTryActivity}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Try an Activity</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
