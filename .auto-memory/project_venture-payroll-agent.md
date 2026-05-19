---
name: venture-payroll-agent project context
description: Tech stack, component map, architecture decisions, current state
type: project
---

## Tech Stack

- **Frontend**: React (JSX), Vite
- **Styling**: Inline styles, dark theme with Venture Home Solar design tokens
- **Hosting**: Google Cloud Run
- **Storage**: Google Cloud Storage
- **Integrations**: CoAdvantage, Five9, Salesforce, Google Chat, Google Workspace, Forge

## Architecture Decisions

- **Data access layer**: `src/data/dataSource.js` — single accessor module with a `useMock` flag. Every view consumes data through it. Mock mode remains a permanent fallback even after live integrations land. Future Salesforce/CoAdvantage/Five9 fetches plug in behind the same function signatures. [Tier 1, 2026-05-18]
- **Design tokens**: `src/config/theme.js` — single source of truth for colors, fonts, spacing, radius. Semantic colors (`flagged`/`approved`/`pending`) enforce the project rule that flagged agents render in coral, approved in teal, pending in amber. [Tier 1, 2026-05-18]
- **Component architecture**: Generic primitives in `src/components/`, full views in `src/views/`. Views know about data shapes; components don't. [Tier 1, 2026-05-18]
- **Mock data shapes**: Mirror the planning.md data model exactly (Agent, Timesheet/DailyVerification, Appointment, CommissionCalculation, Contest). Adding a real API later swaps the source, not the shape. [Tier 1, 2026-05-18]

## Component Map

- `src/app.jsx` — top-level shell: header, status cards, tab bar, active view, contest modal
- `src/config/theme.js` — design tokens (colors, fonts, spacing, semantic mappings)
- `src/data/dataSource.js` — accessor with `useMock` flag and async getters
- `src/data/mock/agents.js` — 25 mock agents matching the planning model
- `src/data/mock/weeklyVerification.js` — weekly verification rows
- `src/data/mock/commissions.js` — monthly commissions rows (derived from raw appt/deal counts)
- `src/data/mock/contests.js` — active contests with leaders
- `src/components/StatusCard.jsx` — dashboard top cards
- `src/components/TabBar.jsx` — top navigation
- `src/components/StatusBadge.jsx` — pill badges (flagged/clean/tier)
- `src/components/DataTable.jsx` — generic configurable table
- `src/views/WeeklyVerificationView.jsx` — weekly tab
- `src/views/MonthlyCommissionsView.jsx` — monthly tab
- `src/views/ContestTrackingView.jsx` — contests tab
- `src/views/ContestConfigModal.jsx` — contest rules modal (placeholder content)

## Current State

Phase 1 setup complete (2026-05-05): repo on GitHub, deployed to Cloud Run, billing live.
Phase 2 prototype decomposition complete (2026-05-18): monolithic `src/app.jsx` decomposed into theme + data layer + 4 components + 4 views + thin app shell. Mock data layer matches planning.md shapes, ready for live integrations to swap in behind `dataSource.js`. Contest Rules modal wired up (previously dead state). Ready for Session 3 (Salesforce Connected App + OAuth) or Phase 2b (deploy decomposed prototype to Cloud Run).
