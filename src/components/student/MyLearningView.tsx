import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';

export const MyLearningView: React.FC = () => {
  const {
    modules,
    competencies,
    setStudentScreen,
    setActiveModuleId,
    setActiveActivityId,
  } = useApp();

  const handleLaunchModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setStudentScreen('learning_module');
  };

  const handleLaunchActivity = (activityId: string) => {
    setActiveActivityId(activityId);
    setStudentScreen('interactive_activity');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>Curriculum Map</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          My Learning Curriculum & Modules
        </h1>
        <p className="text-sm text-slate-600">
          Work through lessons, inspect fundamental rules, and complete interactive practice sets.
        </p>
      </div>

      {/* Module List */}
      <div className="space-y-4">
        {modules.map((mod, idx) => {
          const isCurrent = mod.id === 'mod-int-02';
          const isCompleted = mod.id === 'mod-int-01';

          return (
            <div
              key={mod.id}
              className={`bg-white rounded-2xl p-6 border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs ${
                isCurrent
                  ? 'border-indigo-400 ring-2 ring-indigo-500/20 bg-indigo-50/20'
                  : 'border-slate-200/80'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-700'
                      : isCurrent
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      {mod.competencyName}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                        ACTIVE INSTRUCTION
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        COMPLETED
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {mod.learningObjective}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {mod.estimatedMinutes} mins
                    </span>
                    <span>•</span>
                    <span>{mod.rules.length} Core Rules</span>
                    <span>•</span>
                    <span>{mod.workedExamples.length} Worked Examples</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                <button
                  id={`open-module-${mod.id}-btn`}
                  onClick={() => handleLaunchModule(mod.id)}
                  className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Review Lesson' : 'Open Lesson'}</span>
                </button>

                {mod.associatedActivityId && (
                  <button
                    id={`open-activity-${mod.associatedActivityId}-btn`}
                    onClick={() => handleLaunchActivity(mod.associatedActivityId!)}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Practice</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
