# MathSmart Workspace Guide

Read this file first. It is a routing index for AI agents and contributors; it is not a replacement for the project's technical specifications.

## Workspace roles

| Folder | Role | Default action |
|---|---|---|
| `MathSmart-AI-Powered-Interactice-Learning-System/` | The real, working MathSmart application. The misspelling `Interactice` is part of the actual folder name. | Make code, documentation, configuration, and test changes here. Run project commands here. |
| `ui-ux-workflow-reference/` | A Vite/React prototype showing how the system should generally look, function, and flow. It is a reference, not a final or pixel-perfect design. | Read only the files relevant to the requested screen or flow. Use them as a starting point and improve the UI/UX when implementing the working app. Do not edit this folder unless the user explicitly asks. |

There is no application at the workspace root. Do not run `npm install`, builds, or tests from `C:\Projects\NEUST`; first enter the working application folder.

## Default AI workflow

1. Identify the requested feature, screen, API area, or document.
2. Work inside `MathSmart-AI-Powered-Interactice-Learning-System/` unless explicitly told otherwise.
3. Open only the task-specific files listed below. Do not recursively read both projects.
4. If UI behavior or appearance is needed, inspect the matching file(s) in `ui-ux-workflow-reference/`; do not scan the entire reference app.
5. Check the working repository's status before editing and preserve unrelated user changes.
6. Implement using the working app's Next.js conventions, then run the smallest relevant lint, build, or test command.

## Authority and conflict resolution

Use this order when sources disagree:

1. The user's current request.
2. Existing code and configuration in the working application for current implementation behavior.
3. `docs/SOURCE_OF_TRUTH.md` for intended product rules, roles, data model, architecture, and MVP scope.
4. The relevant specialized document in `docs/`.
5. `ui-ux-workflow-reference/` for visual direction, screen flow, labels, and interaction examples only.

Do not replace the working Next.js app with the reference Vite app. Port the useful design or behavior into the working architecture. Mock values, TypeScript interfaces, navigation state, AI-provider code, and build settings in the reference are examples, not production requirements.

Three production decisions override conflicting prototype content:

- MathSmart's MVP curriculum target is **DepEd Grade 6 Mathematics**. Any Grade 7 labels, learner records, competencies, questions, modules, or analytics in this reference are mock content and must be adapted to Grade 6 before they enter the working application.
- MathSmart's production generative-AI provider is **Groq**. The working application's Groq API credential and selected model are server-side deployment values already stored in its `.env`; never copy them into client code, documentation, logs, or the reference app. Keep the deterministic grading/Groq reasoning separation, and do not substitute Gemini or another provider because a reference file mentions it.
- MathSmart has exactly **two production roles**: `student` and `teacher_admin`. The combined Teacher/Admin reference workspace maps to `teacher_admin`; do not create separate `teacher` and `admin` claims or duplicate workspaces.

The reference demonstrates the intended system functionality, general appearance, user journeys, and workflow. It does **not** limit the quality of the final interface. The working application may improve its visual hierarchy, layout, responsiveness, accessibility, usability, interactions, and consistency. Preserve the purpose and logical sequence of each workflow unless the user's request or source-of-truth requirements call for a change; improvements should make the experience clearer and better without removing required capabilities.

If the working code and the source-of-truth document differ, preserve working behavior unless the task explicitly asks to implement or reconcile the specification. Mention material conflicts before making a broad architectural change.

## Where to look by task

### Requirements and architecture

| Need | Open first | Open only if needed |
|---|---|---|
| Product rules, roles, database schema, MVP scope, or overall architecture | `MathSmart-AI-Powered-Interactice-Learning-System/docs/SOURCE_OF_TRUTH.md` | `docs/PROJECT.md` for rationale and overview |
| Exact REST endpoint, payload, auth, or status-code contract | `MathSmart-AI-Powered-Interactice-Learning-System/docs/API_ROUTES.md` | Matching backend router/model after it exists |
| User flow, sequence, data flow, or ERD | `MathSmart-AI-Powered-Interactice-Learning-System/docs/DIAGRAMS.md` | `docs/SOURCE_OF_TRUTH.md` |
| Milestones, implementation order, MVP boundary, or roadmap | `MathSmart-AI-Powered-Interactice-Learning-System/docs/IMPLEMENTATION_PLAN.md` | `docs/SOURCE_OF_TRUTH.md` |
| Setup, scripts, stack summary, or contributor workflow | `MathSmart-AI-Powered-Interactice-Learning-System/README.md` and `package.json` | Relevant config file only |

Do not read every document for every task. `SOURCE_OF_TRUTH.md` is the master specification; the other documents add task-specific detail.

### Working application code

All paths in this table are relative to `MathSmart-AI-Powered-Interactice-Learning-System/`.

| Task | Primary location |
|---|---|
| Dependencies and npm commands | `package.json` |
| Next.js runtime configuration | `next.config.mjs` |
| Import aliases | `jsconfig.json` (`@/*` maps to `src/*`) |
| shadcn/ui setup | `components.json` |
| Root layout and metadata | `src/app/layout.jsx` |
| Landing page | `src/app/page.jsx` |
| Global Tailwind theme and CSS variables | `src/app/globals.css` |
| Authentication screens | `src/app/(auth)/login/`, `src/app/(auth)/register/` |
| Student routes and layout | `src/app/(student)/student/`; feature code belongs in `src/modules/student/` |
| Teacher/Administrator routes and layout | `src/app/(teacher-admin)/teacher/`; feature code belongs in `src/modules/teacher-admin/` |
| shadcn-based UI primitives | `src/components/ui/` |
| Shared feature code and navigation | `src/modules/shared/` |
| Feature components, charts, forms, hooks, services, and schemas | The owning directory under `src/modules/student/` or `src/modules/teacher-admin/` |
| Infrastructure clients and framework helpers | `src/lib/` |
| Helpers and styling | Keep feature helpers in their owning module; global styles belong in `src/app/globals.css` or `src/styles/` |
| Static assets | `public/images/`, `public/fonts/`, `src/resources/` |
| FastAPI startup and configuration | `backend/app/` |
| Backend routes, schemas, services, repositories, and domain tests | The owning directory under `backend/modules/` |
| Shared Supabase and Groq infrastructure | `backend/modules/shared/` |
| Cross-module and end-to-end tests | `tests/integration/`, `tests/e2e/student/`, `tests/e2e/teacher-admin/` |

Route-group folders such as `(student)` organize code but do not appear in public URLs. Dynamic route folders such as `[moduleId]` and `[activityId]` represent URL parameters.

The approved module-first structure is implemented: thin routes live under `src/app/`, Student features under `src/modules/student/`, and the combined workspace under `src/modules/teacher-admin/`. Read `src/modules/README.md` before adding feature code and keep cross-module imports on documented public surfaces.

### UI/UX reference

All paths in this table are relative to `ui-ux-workflow-reference/`. Read only the matching row for the task.

| Need | Reference file(s) |
|---|---|
| Screen composition and which view is displayed | `src/App.tsx` |
| Role switching, navigation flow, and prototype state/actions | `src/context/AppContext.tsx` |
| Shared domain shapes used by the prototype | `src/types/mathsmart.ts` |
| Example competencies, modules, questions, students, results, and interventions | `src/data/mockData.ts` |
| Prototype-wide colors and base styling | `src/index.css` |
| Header, sidebar, modal, badge, or AI banner | `src/components/common/Navbar.tsx`, `src/components/common/AppSidebar.tsx`, `src/components/common/Modal.tsx`, `src/components/common/Badge.tsx`, or `src/components/common/AIArchitectureBanner.tsx` respectively |
| Student dashboard | `src/components/student/StudentDashboard.tsx` |
| Student login/profile | `src/components/student/StudentLoginView.tsx`, `src/components/student/StudentProfileView.tsx` |
| Diagnostic flow | `src/components/student/DiagnosticAssessmentView.tsx`, `src/components/student/DiagnosticResultsView.tsx` |
| Learning modules | `src/components/student/MyLearningView.tsx`, `src/components/student/LearningModuleView.tsx` |
| Activities | `src/components/student/StudentActivitiesView.tsx`, `src/components/student/InteractiveActivityView.tsx`, `src/components/student/ActivityCompletionView.tsx` |
| Assessments and progress | `src/components/student/StudentAssessmentsView.tsx`, `src/components/student/StudentProgressView.tsx` |
| Teacher overview | `src/components/teacher/TeacherDashboard.tsx` |
| Student/class management | `src/components/teacher/StudentManagementView.tsx` |
| Intervention workflow | `src/components/teacher/TeacherInterventionDashboard.tsx` |
| Content, competency, module, activity, or assessment management | `src/components/teacher/ContentManagementView.tsx` |
| Teacher analytics/settings | `src/components/teacher/TeacherAnalyticsView.tsx`, `src/components/teacher/TeacherSettingsView.tsx` |
| Prototype AI service boundary | `src/services/aiService.ts` |

The reference is TypeScript/Vite while the working frontend currently uses JavaScript/JSX with the Next.js App Router. Adapt patterns; do not blindly copy imports, routing, global state, environment variables, or package configuration.

## Current implementation snapshot

Last verified: 2026-09-08.

- Implemented working frontend files include the root landing page, root layout, global styles, and the `button`, `badge`, `card`, and `input` UI primitives.
- The approved Student and Teacher/Administrator route groups and feature-module boundaries are scaffolded; most feature folders currently contain only `.gitkeep` placeholders.
- The backend modules and integration/end-to-end test boundaries are scaffolded, but implementation files are not present yet.
- The reference app contains substantially more complete mock screens and workflows than the working app.

Do not assume that a folder means a feature is implemented. Check the exact target directory for non-placeholder files. As implementation progresses, prefer newly added working code over this dated snapshot and update this section when its status materially changes.

## Paths to skip by default

Do not scan or read these unless the task specifically requires them:

- `.git/`, `node_modules/`, `.next/`, `dist/`, `build/`, coverage output, caches, and generated files.
- `package-lock.json` or `bun.lock` unless resolving dependencies or lockfile changes.
- Binary images, fonts, and icons unless working on visual assets.
- The whole `ui-ux-workflow-reference/` tree when only one screen is relevant.
- Every file in `docs/` when one indexed document answers the question.

Never open, print, copy, or commit `.env` or `.env.local`. Use `.env.example` only to learn non-secret variable names. The user has confirmed that the working application's existing `.env` contains the Groq API credential and selected model; treat that fact as authoritative without exposing their values. If implementation requires an undocumented variable name, ask for the name rather than reading or printing the secret-bearing file.

## Verification commands

Run commands from `MathSmart-AI-Powered-Interactice-Learning-System/`:

- `npm run lint` for frontend linting.
- `npm run build` for a production Next.js build.
- Run targeted tests from `tests/frontend/` or `tests/backend/` once test tooling exists.

Use targeted filename or text searches inside the relevant directory before expanding the search scope. If a new top-level subsystem, authoritative document, or major route group is added, update this guide so future agents can continue to avoid full-workspace scans.
