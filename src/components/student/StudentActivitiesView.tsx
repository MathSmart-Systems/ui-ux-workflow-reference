import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Award,
  Zap,
  Filter,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentActivitiesView: React.FC = () => {
  const {
    activities,
    modules,
    setActiveActivityId,
    setActiveModuleId,
    setStudentScreen,
    currentStudentData,
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'integers' | 'geometry' | 'fractions'>('all');

  // Interactive Integer Sign Sandbox state
  const [factorA, setFactorA] = useState<number>(-4);
  const [factorB, setFactorB] = useState<number>(-7);
  const [operation, setOperation] = useState<'multiply' | 'divide'>('multiply');

  const filteredActivities = activities.filter((act) => {
    if (selectedFilter === 'integers') return act.competencyName.toLowerCase().includes('integer');
    if (selectedFilter === 'geometry') return act.competencyName.toLowerCase().includes('geometry');
    if (selectedFilter === 'fractions') return act.competencyName.toLowerCase().includes('fraction');
    return true;
  });

  const handleStartActivity = (activityId: string) => {
    setActiveActivityId(activityId);
    setStudentScreen('interactive_activity');
  };

  const handleReviewLesson = (moduleId?: string) => {
    if (moduleId) {
      setActiveModuleId(moduleId);
    } else if (modules[0]) {
      setActiveModuleId(modules[0].id);
    }
    setStudentScreen('learning_module');
  };

  const calcResult = operation === 'multiply' ? factorA * factorB : factorB !== 0 ? (factorA / factorB).toFixed(2) : 'Undefined';
  const aNegative = factorA < 0;
  const bNegative = factorB < 0;
  const sameSign = (aNegative && bNegative) || (!aNegative && !bNegative);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Interactive Practice Laboratory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          MathSmart Practice Activities
        </h1>
        <p className="text-sm text-slate-600">
          Reinforce conceptual rules with instant step-by-step feedback and AI-guided misconception detection.
        </p>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Available Activities</div>
            <div className="text-lg font-extrabold text-slate-900 font-display">
              {activities.length} Guided Sets
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Competency Target</div>
            <div className="text-lg font-extrabold text-slate-900 font-display">
              Grade 7 ARAL Focus
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Active Learner</div>
            <div className="text-lg font-extrabold text-slate-900 font-display">
              {currentStudentData?.name || 'Juan Dela Cruz'}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          id="filter-all-btn"
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            selectedFilter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Activities ({activities.length})
        </button>
        <button
          id="filter-integers-btn"
          onClick={() => setSelectedFilter('integers')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            selectedFilter === 'integers'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Integers & Operations
        </button>
        <button
          id="filter-geometry-btn"
          onClick={() => setSelectedFilter('geometry')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            selectedFilter === 'geometry'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Geometry Foundations
        </button>
        <button
          id="filter-fractions-btn"
          onClick={() => setSelectedFilter('fractions')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            selectedFilter === 'fractions'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Fractions & Decimals
        </button>
      </div>

      {/* Activity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredActivities.map((act, index) => {
          const isHighPriority = act.id === 'act-int-02';
          const relatedMod = modules.find((m) => m.id === act.moduleId);

          return (
            <div
              key={act.id}
              className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between shadow-xs ${
                isHighPriority
                  ? 'border-indigo-400 ring-2 ring-indigo-500/20'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    {act.competencyName}
                  </span>
                  {isHighPriority && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase tracking-wide">
                      Recommended
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {act.estimatedMinutes} mins
                  </span>
                  <span>•</span>
                  <span className="font-medium">{act.questions.length} Questions</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-700">{act.points} Mastery XP</span>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  id={`start-activity-${act.id}-btn`}
                  onClick={() => handleStartActivity(act.id)}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isHighPriority
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Practice Set</span>
                </button>

                {relatedMod && (
                  <button
                    id={`review-lesson-${act.id}-btn`}
                    onClick={() => handleReviewLesson(relatedMod.id)}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold cursor-pointer"
                    title="Review lesson explanation before starting"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Interactive Sign Sandbox */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-2">
              <Calculator className="w-3.5 h-3.5 text-indigo-300" />
              <span>Interactive Sign Rule Sandbox</span>
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              Instant Integer Operation Explorer
            </h3>
            <p className="text-xs text-indigo-200/80 mt-1 max-w-xl">
              Test signed multiplication and division. Watch how opposite signs result in negative products, and like signs result in positive products.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => setOperation('multiply')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                operation === 'multiply' ? 'bg-indigo-500 text-white' : 'text-indigo-200 hover:text-white'
              }`}
            >
              Multiplication (×)
            </button>
            <button
              onClick={() => setOperation('divide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                operation === 'divide' ? 'bg-indigo-500 text-white' : 'text-indigo-200 hover:text-white'
              }`}
            >
              Division (÷)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Factor A Control */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs text-indigo-200">
              <span>First Term:</span>
              <span className="font-mono font-bold">{factorA}</span>
            </div>
            <input
              type="range"
              min="-15"
              max="15"
              value={factorA}
              onChange={(e) => setFactorA(Number(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-indigo-300/60 font-mono">
              <span>-15</span>
              <span>0</span>
              <span>+15</span>
            </div>
          </div>

          {/* Operator Display */}
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-3xl font-extrabold text-indigo-300 font-mono">
              {operation === 'multiply' ? '×' : '÷'}
            </span>
            <span className="text-[11px] text-indigo-300/80 mt-1 font-medium">
              {sameSign ? 'Like Signs → Positive Result' : 'Opposite Signs → Negative Result'}
            </span>
          </div>

          {/* Factor B Control */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs text-indigo-200">
              <span>Second Term:</span>
              <span className="font-mono font-bold">{factorB}</span>
            </div>
            <input
              type="range"
              min="-15"
              max="15"
              value={factorB}
              onChange={(e) => setFactorB(Number(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-indigo-300/60 font-mono">
              <span>-15</span>
              <span>0</span>
              <span>+15</span>
            </div>
          </div>
        </div>

        {/* Calculation Result & Rule explanation */}
        <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-xs text-indigo-200">Formula:</div>
            <div className="font-mono text-xl sm:text-2xl font-black text-amber-300">
              ({factorA}) {operation === 'multiply' ? '×' : '÷'} ({factorB}) = {calcResult}
            </div>
          </div>

          <div className="text-xs text-indigo-100 bg-indigo-500/30 px-3.5 py-1.5 rounded-xl border border-indigo-400/20 font-medium">
            Rule Applied:{' '}
            <strong className="text-white font-mono">
              {aNegative && bNegative
                ? '(-) × (-) = +'
                : aNegative || bNegative
                ? '(-) × (+) = -'
                : '(+) × (+) = +'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
