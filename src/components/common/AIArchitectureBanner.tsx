import React, { useState } from 'react';
import { Cpu, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, Zap } from 'lucide-react';

export const AIArchitectureBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      id="ai-architecture-banner"
      className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-slate-200 border-b border-slate-700/60 text-xs px-4 py-2.5 shadow-sm transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Groq AI Engine Ready
          </span>
          <span className="text-slate-300 font-medium">
            Decoupled Architecture:
          </span>
          <span className="text-slate-400">
            Deterministic grading & math rules are separated from Groq misconception analysis.
          </span>
        </div>

        <button
          id="toggle-ai-arch-details-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium cursor-pointer transition-colors"
        >
          <span>{isExpanded ? 'Hide Architecture Spec' : 'View AI Service Spec'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
            <div className="flex items-center gap-1.5 font-semibold text-white mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              1. Deterministic Grading Core
            </div>
            <p className="text-slate-300 leading-relaxed">
              Correct/incorrect evaluation, scores, attempt counts, and competency mastery percentages are strictly calculated via deterministic arithmetic rules—never by LLM hallucinations.
            </p>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
            <div className="flex items-center gap-1.5 font-semibold text-white mb-1.5">
              <Cpu className="w-4 h-4 text-amber-400" />
              2. Provider-Agnostic AIService
            </div>
            <p className="text-slate-300 leading-relaxed">
              Clean abstraction layer (`IAIService`) with methods for pattern diagnosis, misconception analysis, student encouragement, and teacher intervention recommendations.
            </p>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
            <div className="flex items-center gap-1.5 font-semibold text-white mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              3. Secure Server-Side Groq Target
            </div>
            <p className="text-slate-300 leading-relaxed">
              No client-side keys. The production system routes through `/api/ai/*` to Groq (Llama 3 70B/8B) for ultra-low latency sub-second pedagogical feedback.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
