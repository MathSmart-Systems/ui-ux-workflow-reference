import React, { useState } from 'react';
import {
  AlertTriangle,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  Zap,
  BookOpen,
  User,
  RotateCcw,
  Sparkles,
  HelpCircle,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InterventionItem, InterventionType } from '../../types/mathsmart';
import { StatusBadge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const TeacherInterventionDashboard: React.FC = () => {
  const {
    interventions,
    recordIntervention,
    reviewingInterventionId,
    setReviewingInterventionId,
    grades,
    sections,
    competencies,
  } = useApp();

  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCompetency, setSelectedCompetency] = useState<string>('ALL');

  // Active intervention modal state
  const activeReviewItem: InterventionItem | null =
    interventions.find((i) => i.id === reviewingInterventionId) || null;

  const [selectedInterventionType, setSelectedInterventionType] =
    useState<InterventionType>('One-on-One Remediation');
  const [teacherNotes, setTeacherNotes] = useState<string>('');
  const [isSuccessRecorded, setIsSuccessRecorded] = useState<boolean>(false);

  // Filter items
  const filteredInterventions = interventions.filter((item) => {
    const matchesSeverity =
      selectedSeverity === 'ALL' || item.severity === selectedSeverity;
    const matchesStatus =
      selectedStatus === 'ALL' || item.status === selectedStatus;
    const matchesCompetency =
      selectedCompetency === 'ALL' || item.competencyId === selectedCompetency;
    return matchesSeverity && matchesStatus && matchesCompetency;
  });

  const handleOpenReview = (item: InterventionItem) => {
    setReviewingInterventionId(item.id);
    setSelectedInterventionType(item.recordedInterventionType || 'One-on-One Remediation');
    setTeacherNotes(item.teacherNotes || '');
    setIsSuccessRecorded(false);
  };

  const handleCloseReview = () => {
    setReviewingInterventionId(null);
    setIsSuccessRecorded(false);
  };

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReviewItem) return;

    recordIntervention(
      activeReviewItem.id,
      selectedInterventionType,
      teacherNotes.trim()
    );

    setIsSuccessRecorded(true);
    setTimeout(() => {
      handleCloseReview();
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>ARAL Targeted Pedagogical Remediation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Teacher Intervention Dashboard
          </h1>
          <p className="text-sm text-slate-600">
            Systematically diagnose learning obstacles, examine cognitive misconception patterns, and record targeted remediation actions.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Filters:
          </span>
        </div>

        {/* Severity */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-500">Severity:</label>
          <select
            id="intervention-filter-severity"
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50 outline-hidden"
          >
            <option value="ALL">All Severities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-500">Status:</label>
          <select
            id="intervention-filter-status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50 outline-hidden"
          >
            <option value="ALL">All Statuses</option>
            <option value="Needs Intervention">Needs Intervention</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Competency */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-500">Competency:</label>
          <select
            id="intervention-filter-competency"
            value={selectedCompetency}
            onChange={(e) => setSelectedCompetency(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50 outline-hidden"
          >
            <option value="ALL">All Competencies</option>
            {competencies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="ml-auto text-xs text-slate-500">
          Showing <strong>{filteredInterventions.length}</strong> cases
        </div>
      </div>

      {/* Main Intervention Cases Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">Priority</th>
                <th className="py-3.5 px-6">Learner</th>
                <th className="py-3.5 px-6">Target Competency</th>
                <th className="py-3.5 px-6 text-center">Diagnostic</th>
                <th className="py-3.5 px-6 text-center">Current</th>
                <th className="py-3.5 px-6 text-center">Attempts</th>
                <th className="py-3.5 px-6 text-center">Intervention Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInterventions.map((item) => {
                const isHigh = item.severity === 'HIGH';
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/60 transition-colors ${
                      isHigh ? 'bg-rose-50/15' : ''
                    }`}
                  >
                    <td className="py-4 px-6">
                      <StatusBadge status={item.severity} size="sm" />
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 text-sm">{item.studentName}</div>
                      <div className="text-[11px] text-slate-400">{item.grade} – Section {item.section}</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800">{item.competencyName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.competencyCode}</div>
                    </td>

                    <td className="py-4 px-6 text-center font-mono-math text-slate-600 font-semibold">
                      {item.diagnosticScore}%
                    </td>

                    <td className="py-4 px-6 text-center font-mono-math font-bold text-slate-900 text-sm">
                      {item.currentScore}%
                    </td>

                    <td className="py-4 px-6 text-center font-semibold text-rose-600">
                      {item.unsuccessfulAttempts} attempts
                    </td>

                    <td className="py-4 px-6 text-center">
                      <StatusBadge status={item.status} size="sm" />
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        id={`review-intervention-${item.id}-btn`}
                        onClick={() => handleOpenReview(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED INTERVENTION REVIEW MODAL */}
      {activeReviewItem && (
        <Modal
          isOpen={Boolean(activeReviewItem)}
          onClose={handleCloseReview}
          title={`Remediation Case: ${activeReviewItem.studentName}`}
          subtitle={`${activeReviewItem.competencyName} (${activeReviewItem.competencyCode || 'MATH7-COMP'})`}
          maxWidth="4xl"
        >
          <div className="space-y-6">
            {/* Top Quick Status Row */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-slate-400 block text-[11px]">Grade & Section:</span>
                  <span className="font-bold text-slate-900">{activeReviewItem.grade} – {activeReviewItem.section}</span>
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Diagnostic Baseline:</span>
                  <span className="font-bold text-slate-900 font-mono-math">{activeReviewItem.diagnosticScore}%</span>
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Current Score:</span>
                  <span className="font-bold text-rose-700 font-mono-math">{activeReviewItem.currentScore}%</span>
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Unsuccessful Attempts:</span>
                  <span className="font-bold text-rose-700">{activeReviewItem.unsuccessfulAttempts}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={activeReviewItem.severity} size="sm" />
                <StatusBadge status={activeReviewItem.status} size="sm" />
              </div>
            </div>

            {/* AI Pedagogical Analysis Box (Groq inference ready) */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-300" />
                <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                  AI Misconception Diagnostic (Groq Inference Model)
                </h4>
              </div>

              <p className="text-xs text-indigo-50 leading-relaxed font-sans bg-white/5 p-3 rounded-xl border border-white/10">
                "{activeReviewItem.aiLearningInsight}"
              </p>
            </div>

            {/* Cognitive Patterns & Attempted Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
                <span className="font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Identified Incorrect-Answer Patterns:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                  {activeReviewItem.incorrectPatterns.map((pat, idx) => (
                    <li key={idx} className="leading-relaxed">{pat}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Modules Attempted by Learner:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                  {activeReviewItem.modulesAttempted.map((mod, idx) => (
                    <li key={idx} className="leading-relaxed">{mod}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Record Intervention Form */}
            <form onSubmit={handleRecordSubmit} className="p-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50/30 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-display">
                  Record Teacher Remediation Action
                </h4>
                <p className="text-xs text-slate-500">
                  Select the pedagogical strategy you will execute and document personalized notes
                </p>
              </div>

              {/* Intervention Type Selector Buttons */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Intervention Strategy Type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(
                    [
                      'Additional Exercise',
                      'One-on-One Remediation',
                      'Additional Module',
                      'Teacher Consultation',
                      'Other',
                    ] as InterventionType[]
                  ).map((type) => {
                    const isSelected = selectedInterventionType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        id={`select-type-${type.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => setSelectedInterventionType(type)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Teacher Notes Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Teacher Remediation Notes & Next Action:
                </label>
                <textarea
                  id="intervention-teacher-notes"
                  rows={3}
                  required
                  placeholder="e.g. Conducted 15-minute 1-on-1 session with visual integer number line manipulatives. Student demonstrated sign rule comprehension."
                  value={teacherNotes}
                  onChange={(e) => setTeacherNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:border-indigo-600 outline-hidden leading-relaxed"
                />
              </div>

              {isSuccessRecorded && (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Intervention successfully logged to student's academic history!</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseReview}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  id="record-intervention-btn"
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Record Intervention</span>
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};
