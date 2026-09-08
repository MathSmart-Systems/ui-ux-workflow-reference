import React, { useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  TrendingUp,
  Award,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const ActivityCompletionView: React.FC = () => {
  const {
    lastActivityResult,
    setStudentScreen,
    setActiveActivityId,
    setActiveModuleId,
  } = useApp();

  useEffect(() => {
    // Fire festive celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const result = lastActivityResult || {
    score: 9,
    maxScore: 10,
    accuracy: 90,
    prevScore: 35,
    newScore: 78,
    competencyName: 'Multiplication and Division of Integers',
  };

  const handleContinueLearning = () => {
    // Check next recommended step
    setStudentScreen('dashboard');
  };

  const handlePracticeAgain = () => {
    setActiveActivityId('act-int-02');
    setStudentScreen('interactive_activity');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 text-center space-y-8 pb-16">
      {/* Trophy Badge */}
      <div className="relative inline-block">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-900 flex items-center justify-center mx-auto shadow-lg shadow-amber-200/50">
          <Award className="w-12 h-12 text-amber-800" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
          Activity Completed
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Great work!
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          You demonstrated solid understanding of signed multiplication rules and solved the procedural challenges.
        </p>
      </div>

      {/* Performance Score Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Activity Score
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display mt-1">
            {result.score} / {result.maxScore}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            Passed threshold
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Accuracy Rate
          </span>
          <div className="text-3xl sm:text-4xl font-black text-indigo-600 font-display mt-1">
            {result.accuracy}%
          </div>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            Strong precision
          </span>
        </div>
      </div>

      {/* Competency Mastery Growth Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white text-left shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-indigo-200">
            Competency Mastery Growth
          </span>
          <span className="text-xs font-bold text-teal-300 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +{(result.newScore - result.prevScore)}% Gain
          </span>
        </div>

        <h3 className="text-lg font-bold text-white font-display">
          {result.competencyName}
        </h3>

        {/* Before vs After Visualization */}
        <div className="bg-black/20 p-4 rounded-xl border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-indigo-300">Previous Baseline</div>
            <div className="text-xl font-bold font-mono-math text-slate-300">
              {result.prevScore}%
            </div>
          </div>

          <div className="text-indigo-400 font-bold text-lg">→</div>

          <div className="text-right">
            <div className="text-[11px] text-emerald-300 font-semibold">New Mastery Level</div>
            <div className="text-2xl font-black font-mono-math text-emerald-300">
              {result.newScore}%
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-indigo-950 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: `${result.newScore}%` }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button
          id="completion-practice-again-btn"
          onClick={handlePracticeAgain}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Practice Again</span>
        </button>

        <button
          id="completion-continue-learning-btn"
          onClick={handleContinueLearning}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
        >
          <span>Continue Learning</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
