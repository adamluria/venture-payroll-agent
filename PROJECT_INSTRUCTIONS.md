# Project: venture-payroll-agent

## What This Is

AI-powered payroll verification and commission calculation agent for Venture Home Solar's inside sales team that automates timesheet validation and commission calculations.

Currently manual payroll verification for 25 remote inside sales agents requires cross-referencing CoAdvantage timesheets with Five9 call logs to catch time discrepancies, plus monthly commission calculations across multiple tier structures. This process takes hours weekly and is prone to errors. Automation would free up significant time while improving payroll accuracy and providing better visibility into agent performance patterns.


## Repo Setup

- **Local project directory**: `~/Downloads/venture-payroll-agent` (extracted from scaffold zip or cloned from GitHub)
- **GitHub repo**: `[your-gh-org]/venture-payroll-agent`
- **Cloud Run service**: `venture-payroll-agent`
- **GCP project ID**: `venture-payroll-agent`
- **Branch strategy**: `main` is production. Work on feature branches (`feature/[name]`) and merge via PR.

When asked to make changes, commit to the current working branch with clear commit messages. Push to GitHub when asked to "push" or "ship it."

## Tech Stack

- **Frontend**: React (JSX), Vite
- **Styling**: Inline styles, dark theme with Venture Home Solar design tokens
- **Data Sources**: CoAdvantage (web scraping), Five9 API, Salesforce API, Google Chat webhooks
- **Integrations**: CoAdvantage, Five9, Salesforce, Google Chat, Google Workspace, Forge


## Hosting & Deployment

- **Runtime**: Google Cloud Run (containerized, port 8080)
- **Static/File Storage**: Google Cloud Storage
- **Container Registry**: Google Artifact Registry
- **Region**: us-east1

### Key deployment rules:
- Cloud Run URL format: `https://venture-payroll-agent-HASH-ue.a.run.app`
- Environment variables are set via Cloud Run service configuration — never baked into the container
- `.env.local` is for local dev only — never deployed, never committed
- For server-side API calls, use the Cloud Run service URL as the base, not localhost
- Always test Docker builds locally before deploying: `docker build -t venture-payroll-agent . && docker run -p 8080:8080 venture-payroll-agent`

### Deployment Commands
All commands run from the repo root (`~/Downloads/venture-payroll-agent`).

```bash
# Verify required tools first
which node && which npm && which git && which docker && which gcloud
# If any are missing, install before proceeding

# First-time GCP setup (run once)
gcloud auth login
gcloud config set project venture-payroll-agent
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com storage.googleapis.com

# Create Artifact Registry repo (once)
gcloud artifacts repositories create venture-payroll-agent --repository-format=docker --location=us-east1

# Build and deploy
gcloud builds submit --tag us-east1-docker.pkg.dev/venture-payroll-agent/venture-payroll-agent/venture-payroll-agent:latest .
gcloud run deploy venture-payroll-agent \
  --image us-east1-docker.pkg.dev/venture-payroll-agent/venture-payroll-agent/venture-payroll-agent:latest \
  --region us-east1 --platform managed --allow-unauthenticated

# Update environment variables
gcloud run services update venture-payroll-agent --region us-east1 \
  --update-env-vars="KEY=value,KEY2=value2"
```

## Project Structure

```
venture-payroll-agent/
├── .auto-memory/
│   ├── MEMORY.md                  # Canonical index — read first every session
│   ├── reference_venture-payroll-agent.md       # Infra: GCP project, Cloud Run URL, env vars
│   └── project_venture-payroll-agent.md         # Tech stack, components, architecture decisions
├── src/
│   ├── main.jsx
│   ├── app.jsx
│   ├── components/                 # React (JSX), Vite components (.jsx)
│   ├── views/
│   ├── data/
│   ├── auth/
│   └── utils/
├── docs/
│   └── memory/
│       └── planning.md            # Bootstrap planning artifact from Ignition
├── PROJECT_INSTRUCTIONS.md
├── AGENTS.md
├── TODO.md
├── STARTER_PROMPTS.md
├── USER_GUIDE.md                  # Living user-facing reference — updated as features ship
├── Dockerfile
├── .dockerignore
├── .gcloudignore
├── .env.example
├── .env.local                     # Local dev only — git-ignored
├── .gitignore
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

## Current State

✅ Dashboard layout with agent overview
✅ Weekly verification status tracking
✅ Monthly commission calculation display
✅ Manager review interface
✅ Alert and pattern recognition UI components

## Design

- **Theme**: Professional dashboard with data-focused layout, amber accents for actions, teal for positive metrics, coral for flagged items
- **Fonts**: JetBrains Mono for data/numbers, Outfit for UI text

- **Visual rules**: Flagged agents highlighted in coral, approved items in teal, pending reviews in amber

## Data Model

### Objects
Agent (name, team assignment, work patterns), Timesheet (CoAdvantage clock in/out data), CallLog (Five9 call records with timestamps), Appointment (Salesforce activity with appointment setter, status progression), Commission (monthly calculations with tier levels), Contest (monthly variable bonus structures).

### Relationships
Agent belongs to Team (managed by Ben: MA/NH/ME/RI/CT, Joseph: NY/MD/PA/NJ). Timesheet links to Agent and CallLog for verification. Appointment links to Agent via appointment_setter field and progresses through statuses (scheduled → confirmed → completed → rescheduled). Commission calculations aggregate Agent's completed appointments and closed deals.

### Fields to Confirm Before Going Live
- [ ] CoAdvantage API availability and authentication method
- [ ] Five9 API access credentials and call log data structure
- [ ] Exact Salesforce field names for appointment setter on Activity and Opportunity objects
- [ ] Google Chat webhook setup for alert notifications
- [ ] Forge integration endpoints for agent management

### Known Data Issues
Rescheduled appointments create new records - original stays with 'rescheduled (new appointment created)' status, new appointment gets created and whoever completes it gets commission credit. Agents work split shifts with expected long gaps. Break allowance is 30 minutes per 6 hours worked. Schedule gap contest measures time between appointment creation and scheduled datetime.

## Architecture Notes

Phase 1: Web automation for CoAdvantage access using Puppeteer/Selenium with existing login credentials. Phase 2: Migrate to APIs where available (Five9, Salesforce). Agent runs on scheduled cycles (Sunday nights for weekly, first Monday of month for commissions). Integrates with existing Forge agent management system for monitoring and updates.


## Multi-User Collaboration

These docs are **AI-agnostic** — they work with Claude, GPT, Gemini, Copilot, or any LLM.
- **Team**: solo


## How to Work in This Project

1. **Read in this order every session**: `.auto-memory/MEMORY.md` (follow its links) → `AGENTS.md` → `docs/memory/` (newest first) → `TODO.md` → this file → `USER_GUIDE.md` (to see the current feature surface area from the user's perspective). The project spec is distributed across these files — no single file has the complete picture. Give a brief status summary before starting work.

2. **Follow AGENTS.md.** It defines agent roles, the memory system (tiers, auto-memory, golden snapshots), and session lifecycle. Read it and follow it.

3. **Keep mock data working at all times.** Every feature must be testable with mock/demo data before live data is wired up. The mock mode should always work.

4. **Field names and API names are placeholders until confirmed.** Keep them as configurable constants. When a field name is confirmed, update the constant, write it to today's session file in `docs/memory/` as `[Tier 1]`, and update `.auto-memory/project_venture-payroll-agent.md`.

5. **Design rules are not suggestions.** Flagged agents highlighted in coral, approved items in teal, pending reviews in amber

6. **Ambiguous or multi-step work goes through the PM agent first.** When a feature is described in business terms, scope it before building: data source needed, API calls required, UI components to build, which agents are involved, and what goes in TODO.md as follow-up. See AGENTS.md → Fast Path for when to skip PM.

7. **Write to memory incrementally.** The moment a field name is confirmed, a decision is made, or a bug is fixed — write it to today's session file in `docs/memory/YYYY-MM-DD.md`. If it's a Tier 1 fact (infra, architecture, confirmed field name, deployment state), also update the relevant `.auto-memory/` file. See AGENTS.md → Memory System for the full rules.

8. **Commit often in small chunks.** After each logical unit of work (a component, a data integration, a view), commit with a descriptive message.

9. **Memory files and TODO.md are committed to GitHub.** They are project artifacts, not ephemeral notes. Every session should end with a commit and push that includes updated memory and TODO files.

10. **Keep USER_GUIDE.md current as features ship.** `USER_GUIDE.md` is the living, user-facing reference for this product. Every time a user-facing feature ships or changes, add or update an entry in the **same commit** as the feature — name, what it does (user terms), how to use it (step-by-step), and anything important to know. When the project is done, this file is publishable as-is. See AGENTS.md → "User Guide Maintenance" for the full rules and entry template.

11. **End every session the same way.** Finalize today's session file in `docs/memory/`. If any Tier 1 context changed, update the relevant `.auto-memory/` files. If any user-facing feature shipped or changed, update `USER_GUIDE.md`. Update TODO.md, commit everything, push to GitHub, confirm what was shipped. (Ultra-fast-path fixes can bundle into the next real commit — see AGENTS.md.)

12. **Cloud Run deploys**: test locally in Docker first. `docker build -t venture-payroll-agent . && docker run -p 8080:8080 venture-payroll-agent`

13. **Environment variables**: `.env.local` for local dev. Set production vars via `gcloud run services update --update-env-vars` (never `--set-env-vars` — it wipes all existing vars). Never commit secrets.

## Reference Data

Commission tiers: Tier 1 (1-19 completed): $10 per appointment + $100 per closed deal, Tier 2 (20-39): $20 per appointment + $200 per deal, Tier 3 (40+): $30 per appointment + $300 per deal. Call volume threshold: 20 calls per hour. Gap threshold: 15+ minutes with no calls. Work week: Sunday-Saturday. Team assignments by state: Ben (MA/NH/ME/RI/CT), Joseph (NY/MD/PA/NJ). Break allowance: 30 minutes per 6 hours worked.
