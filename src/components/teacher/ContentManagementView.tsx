import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  HelpCircle,
  Sparkles,
  FileCheck2,
  GraduationCap,
  Plus,
  Search,
  CheckCircle2,
  Trash2,
  Edit,
  Tag,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Competency, Module, Question } from '../../types/mathsmart';
import { StatusBadge } from '../common/Badge';
import { Modal } from '../common/Modal';

interface ContentManagementViewProps {
  initialTab?: 'grades_sections' | 'competencies' | 'modules' | 'questions' | 'assessments' | 'activities';
}

export const ContentManagementView: React.FC<ContentManagementViewProps> = ({
  initialTab = 'competencies',
}) => {
  const {
    grades,
    sections,
    competencies,
    modules,
    activities,
    diagnosticAssessment,
    addCompetency,
    addModule,
    setTeacherScreen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'grades_sections' | 'competencies' | 'modules' | 'questions' | 'assessments' | 'activities'
  >(initialTab);

  // Sync activeTab when initialTab prop changes from sidebar navigation
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabChange = (
    tab: 'grades_sections' | 'competencies' | 'modules' | 'questions' | 'assessments' | 'activities'
  ) => {
    setActiveTab(tab);
    // Sync with AppSidebar active highlight
    if (tab === 'competencies') setTeacherScreen('content_competencies');
    else if (tab === 'modules') setTeacherScreen('content_modules');
    else if (tab === 'activities') setTeacherScreen('content_activities');
    else if (tab === 'questions') setTeacherScreen('content_questions');
    else if (tab === 'assessments') setTeacherScreen('assessments');
    else if (tab === 'grades_sections') setTeacherScreen('classes');
  };

  // Competency creation state
  const [isAddCompOpen, setIsAddCompOpen] = useState(false);
  const [newCompName, setNewCompName] = useState('');
  const [newCompCode, setNewCompCode] = useState('');
  const [newCompDomain, setNewCompDomain] = useState('Numbers and Number Sense');
  const [newCompGrade, setNewCompGrade] = useState('Grade 7');

  // Module creation state
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [newModTitle, setNewModTitle] = useState('');
  const [newModCompId, setNewModCompId] = useState(competencies[0]?.id || '');
  const [newModObjective, setNewModObjective] = useState('');
  const [newModExplanation, setNewModExplanation] = useState('');

  const handleCreateCompetency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;

    const created: Competency = {
      id: `comp-${Date.now()}`,
      code: newCompCode.trim() || `MATH7-${Date.now().toString().slice(-4)}`,
      name: newCompName.trim(),
      domain: newCompDomain as any,
      grade: newCompGrade,
      description: `Standards for elementary math competency in ${newCompName}`,
      status: 'active',
      associatedModuleIds: [],
      assessmentQuestionCount: 5,
    };

    addCompetency(created);
    setIsAddCompOpen(false);
    setNewCompName('');
    setNewCompCode('');
  };

  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModTitle.trim()) return;

    const comp = competencies.find((c) => c.id === newModCompId) || competencies[0];

    const created: Module = {
      id: `mod-${Date.now()}`,
      competencyId: comp.id,
      competencyName: comp.name,
      title: newModTitle.trim(),
      grade: comp.grade,
      order: modules.length + 1,
      estimatedMinutes: 15,
      learningObjective: newModObjective.trim() || 'Understand core conceptual relationships.',
      shortExplanation: newModExplanation.trim() || 'Step-by-step introduction to core formulas.',
      rules: [
        {
          title: 'Foundational Principle',
          ruleFormula: 'A × B = C',
          explanation: 'Standard algorithmic execution steps.',
        },
      ],
      workedExamples: [
        {
          problem: 'Example Calculation',
          steps: ['Identify given numbers', 'Apply directional sign rule'],
          solution: 'Result validated',
        },
      ],
      associatedActivityId: 'act-int-02',
      status: 'published',
    };

    addModule(created);
    setIsAddModuleOpen(false);
    setNewModTitle('');
    setNewModObjective('');
    setNewModExplanation('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5 text-indigo-600" />
          <span>Curriculum Authoring & System Administration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Content & Curriculum Management
        </h1>
        <p className="text-sm text-slate-600">
          Maintain the competency matrix, lesson modules, interactive problem banks, and diagnostic screenings.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          id="tab-content-competencies"
          onClick={() => handleTabChange('competencies')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'competencies'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Competencies ({competencies.length})</span>
        </button>

        <button
          id="tab-content-modules"
          onClick={() => handleTabChange('modules')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'modules'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Learning Modules ({modules.length})</span>
        </button>

        <button
          id="tab-content-activities"
          onClick={() => handleTabChange('activities')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'activities'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Interactive Activities ({activities.length})</span>
        </button>

        <button
          id="tab-content-questions"
          onClick={() => handleTabChange('questions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'questions'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Question Bank (30)</span>
        </button>

        <button
          id="tab-content-assessments"
          onClick={() => handleTabChange('assessments')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'assessments'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Assessments</span>
        </button>

        <button
          id="tab-content-grades"
          onClick={() => handleTabChange('grades_sections')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'grades_sections'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Grades & Sections</span>
        </button>
      </div>

      {/* TAB 1: COMPETENCIES */}
      {activeTab === 'competencies' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Target Mathematics Competencies
            </h3>
            <button
              id="open-add-competency-modal-btn"
              onClick={() => setIsAddCompOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Competency</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competencies.map((comp) => (
              <div
                key={comp.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-indigo-600 font-bold mb-1">
                    <span>{comp.code}</span>
                    <span className="text-slate-400 font-sans">{comp.grade}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{comp.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {comp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Domain: {comp.domain}</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600">
                    {comp.associatedModuleIds?.length || 1} Module(s)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LEARNING MODULES */}
      {activeTab === 'modules' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Instructional Learning Modules
            </h3>
            <button
              id="open-add-module-modal-btn"
              onClick={() => setIsAddModuleOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Module</span>
            </button>
          </div>

          <div className="space-y-3">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      Order #{mod.order}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {mod.competencyName}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{mod.title}</h4>
                  <p className="text-xs text-slate-600 max-w-2xl">
                    {mod.learningObjective}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs">
                  <span className="text-slate-500 font-medium">
                    {mod.estimatedMinutes} mins
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    {mod.rules.length} Rule(s)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE ACTIVITIES */}
      {activeTab === 'activities' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Practice Activities & Simulation Sets
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((act) => (
              <div
                key={act.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-700 uppercase">
                    Competency: {act.competencyName}
                  </span>
                  <span className="text-xs text-slate-400 capitalize">{act.difficulty}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{act.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{act.description}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    {act.questions.length} Questions in set
                  </span>
                  <span className="text-emerald-700 font-bold">Passing: {act.passingScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QUESTION BANK */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Item Pool & Question Bank
              </h3>
              <p className="text-xs text-slate-500">
                Calibrated questions linked with pedagogical misconceptions
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100">
            {diagnosticAssessment.questions.slice(0, 10).map((q, idx) => (
              <div key={q.id} className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-indigo-600 font-bold">
                      Q{idx + 1} • {q.competencyName}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                      {q.type}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 font-mono-math">{q.text}</p>
                  <p className="text-[11px] text-slate-500">
                    Correct Answer: <strong className="text-emerald-700 font-mono-math">{q.correctAnswer}</strong>
                  </p>
                </div>

                {q.misconceptionTag && (
                  <div className="shrink-0 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                    Misconception: {q.misconceptionTag}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ASSESSMENTS */}
      {activeTab === 'assessments' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">
            Assessment Configurations
          </h3>

          <div className="p-5 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-indigo-950">{diagnosticAssessment.title}</h4>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                Active Systemwide
              </span>
            </div>
            <p className="text-xs text-indigo-800">{diagnosticAssessment.description}</p>
            <div className="flex items-center gap-4 text-xs text-indigo-600 pt-2 font-medium">
              <span>{diagnosticAssessment.questions.length} Items</span>
              <span>•</span>
              <span>{diagnosticAssessment.timeLimitMinutes} Minutes Limit</span>
              <span>•</span>
              <span>Passing: {diagnosticAssessment.passingScore}%</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: GRADES & SECTIONS */}
      {activeTab === 'grades_sections' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">Grade Levels</h3>
            <div className="space-y-2">
              {grades.map((g) => (
                <div key={g.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{g.name}</span>
                  <span className="text-slate-500 font-medium">{g.studentCount} Students</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">Class Sections</h3>
            <div className="space-y-2">
              {sections.map((s) => (
                <div key={s.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{s.name} ({s.gradeName})</div>
                    <div className="text-[11px] text-slate-400">Adviser: {s.adviser}</div>
                  </div>
                  <span className="text-slate-500 font-medium">{s.studentCount} enrolled</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD COMPETENCY */}
      {isAddCompOpen && (
        <Modal
          isOpen={isAddCompOpen}
          onClose={() => setIsAddCompOpen(false)}
          title="Add New Math Competency"
          subtitle="Define curricular competency and target elementary grade standard"
        >
          <form onSubmit={handleCreateCompetency} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Competency Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ratio and Proportion Applications"
                value={newCompName}
                onChange={(e) => setNewCompName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. MATH7-NUM-05"
                  value={newCompCode}
                  onChange={(e) => setNewCompCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Grade
                </label>
                <select
                  value={newCompGrade}
                  onChange={(e) => setNewCompGrade(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-hidden"
                >
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 5">Grade 5</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mathematical Domain
              </label>
              <select
                value={newCompDomain}
                onChange={(e) => setNewCompDomain(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-hidden"
              >
                <option value="Numbers and Number Sense">Numbers and Number Sense</option>
                <option value="Geometry">Geometry</option>
                <option value="Patterns and Algebra">Patterns and Algebra</option>
                <option value="Measurement">Measurement</option>
                <option value="Statistics and Probability">Statistics and Probability</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsAddCompOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="submit-add-competency-btn"
                type="submit"
                className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs cursor-pointer"
              >
                Save Competency
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL: ADD MODULE */}
      {isAddModuleOpen && (
        <Modal
          isOpen={isAddModuleOpen}
          onClose={() => setIsAddModuleOpen(false)}
          title="Create New Learning Module"
          subtitle="Author step-by-step instructional content and rules"
        >
          <form onSubmit={handleCreateModule} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Module Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Solving Real-World Proportion Problems"
                value={newModTitle}
                onChange={(e) => setNewModTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Competency
              </label>
              <select
                value={newModCompId}
                onChange={(e) => setNewModCompId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-hidden"
              >
                {competencies.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Learning Objective
              </label>
              <textarea
                rows={2}
                placeholder="State measurable learner objective..."
                value={newModObjective}
                onChange={(e) => setNewModObjective(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Short Explanation
              </label>
              <textarea
                rows={3}
                placeholder="Introductory text for elementary students..."
                value={newModExplanation}
                onChange={(e) => setNewModExplanation(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-indigo-600 outline-hidden"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsAddModuleOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="submit-add-module-btn"
                type="submit"
                className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs cursor-pointer"
              >
                Create Module
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
