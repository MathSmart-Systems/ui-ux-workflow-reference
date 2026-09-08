import React, { useState } from 'react';
import {
  Settings,
  User,
  School,
  Cpu,
  Bell,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherSettingsView: React.FC = () => {
  const { currentUser } = useApp();

  const [teacherName, setTeacherName] = useState(currentUser.name || 'Maria Santos');
  const [schoolName, setSchoolName] = useState('San Jose Elementary School');
  const [selectedGroqModel, setSelectedGroqModel] = useState('llama-3.3-70b-versatile');
  const [passingThreshold, setPassingThreshold] = useState(75);
  const [autoInterventionAttempts, setAutoInterventionAttempts] = useState(2);
  const [enableDailyAlerts, setEnableDailyAlerts] = useState(true);
  const [enableGroqMisconception, setEnableGroqMisconception] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5 text-slate-600" />
          <span>System Administration & Teacher Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Platform Settings & Configuration
        </h1>
        <p className="text-sm text-slate-600">
          Configure DepEd ARAL intervention thresholds, teacher profile data, and the Groq decoupled AI engine.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Configuration saved successfully! All classroom thresholds updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Teacher & Institution Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600" />
            <span>Teacher Profile & School Credentials</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teacher Full Name
              </label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Institutional Role
              </label>
              <input
                type="text"
                disabled
                value="Mathematics Department Head & ARAL Coordinator"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                School Name
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                DepEd Division
              </label>
              <input
                type="text"
                disabled
                value="Region IV-A • Division of Rizal"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Section 2: ARAL Remediation Rules */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>DepEd ARAL Intervention Thresholds</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">Competency Mastery Passing Line</span>
                <span className="font-mono font-bold text-indigo-600">{passingThreshold}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="90"
                value={passingThreshold}
                onChange={(e) => setPassingThreshold(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Students scoring below this threshold are marked as requiring intervention or developing.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">Auto-Flag Intervention Trigger</span>
                <span className="font-mono font-bold text-rose-600">
                  {autoInterventionAttempts} Unsuccessful Attempts
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={autoInterventionAttempts}
                onChange={(e) => setAutoInterventionAttempts(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Number of failed problem submissions before a student is escalated to the Teacher Intervention Desk.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: AI Engine & Groq Decoupling Architecture */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span>AI Engine Architecture (Groq LPU™ Decoupled)</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              CONNECTED
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            MathSmart uses a provider-agnostic AI layer. Deterministic grading (math rule validation, score calculation) runs directly in the client/server core, while generative misconception diagnosis is dispatched to high-throughput Groq models.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Active Groq Inference Model
              </label>
              <select
                value={selectedGroqModel}
                onChange={(e) => setSelectedGroqModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
              >
                <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Recommended)</option>
                <option value="llama-3.1-8b-instant">llama-3.1-8b-instant (Ultra Low Latency)</option>
                <option value="mixtral-8x7b-32768">mixtral-8x7b-32768 (Mathematical Chain-of-Thought)</option>
                <option value="gemma2-9b-it">gemma2-9b-it (Google Instruction-Tuned)</option>
              </select>
            </div>

            <div className="flex flex-col justify-center bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Inference Status:</span>
                <span className="font-semibold text-emerald-700 font-mono">142ms Avg Latency</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-slate-500">Decoupled Adapter:</span>
                <span className="font-mono text-slate-700">GroqAIServiceImpl</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900">
                  AI Cognitive Misconception Detection
                </div>
                <div className="text-[11px] text-slate-500">
                  Automatically parse wrong answer patterns and diagnose mathematical mental models
                </div>
              </div>
              <input
                type="checkbox"
                checked={enableGroqMisconception}
                onChange={(e) => setEnableGroqMisconception(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Section 4: Notifications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            <span>Alerts & Notifications</span>
          </h3>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-900">
                Daily Intervention Priority Digest
              </div>
              <div className="text-[11px] text-slate-500">
                Flag learners who exceeded max unsuccessful attempts within the last 24 hours
              </div>
            </div>
            <input
              type="checkbox"
              checked={enableDailyAlerts}
              onChange={(e) => setEnableDailyAlerts(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
            />
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            id="save-teacher-settings-btn"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};
