# TODO — venture-payroll-agent

## Project Summary

AI-powered payroll verification and commission calculation agent for Venture Home Solar's inside sales team that automates timesheet validation and commission calculations.

Currently manual payroll verification for 25 remote inside sales agents requires cross-referencing CoAdvantage timesheets with Five9 call logs to catch time discrepancies, plus monthly commission calculations across multiple tier structures. This process takes hours weekly and is prone to errors. Automation would free up significant time while improving payroll accuracy and providing better visibility into agent performance patterns.


## Release Strategy
**MVP → Iterative releases**
- MVP: Weekly payroll verification by cross-referencing CoAdvantage timesheets with Five9/Salesforce call data, monthly commission calculations with tier-based structures, and manager dashboard for review and approval of flagged discrepancies.
- Success: Saves 3+ hours weekly on payroll verification, eliminates manual commission calculation errors, and provides accurate timesheet adjustments with audit trails.

---

## Data Model

### Objects
Agent (name, team assignment, work patterns), Timesheet (CoAdvantage clock in/out data), CallLog (Five9 call records with timestamps), Appointment (Salesforce activity with appointment setter, status progression), Commission (monthly calculations with tier levels), Contest (monthly variable bonus structures).

### Relationships
Agent belongs to Team (managed by Ben: MA/NH/ME/RI/CT, Joseph: NY/MD/PA/NJ). Timesheet links to Agent and CallLog for verification. Appointment links to Agent via appointment_setter field and progresses through statuses (scheduled → confirmed → completed → rescheduled). Commission calculations aggregate Agent's completed appointments and closed deals.

### Fields & API Names to Confirm
These must be confirmed before going to production. Each confirmed value should be written to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]`, updated in `.auto-memory/project_venture-payroll-agent.md`, and updated in code as a named constant.

- [ ] CoAdvantage API availability and authentication method
- [ ] Five9 API access credentials and call log data structure
- [ ] Exact Salesforce field names for appointment setter on Activity and Opportunity objects
- [ ] Google Chat webhook setup for alert notifications
- [ ] Forge integration endpoints for agent management

### Known Data Issues
Rescheduled appointments create new records - original stays with 'rescheduled (new appointment created)' status, new appointment gets created and whoever completes it gets commission credit. Agents work split shifts with expected long gaps. Break allowance is 30 minutes per 6 hours worked. Schedule gap contest measures time between appointment creation and scheduled datetime.

---

## Phase 0: Planning ✅
- [x] Brainstorm and discovery conversation
- [x] Scope and release strategy defined
- [x] Project docs generated
- [x] Planning memory file created

## Phase 1: Setup

### Tool Verification (run these first)
- [ ] Verify Node.js: `node --version` (requires v18+)
- [ ] Verify npm: `npm --version`
- [ ] Verify git: `git --version`
- [ ] Verify Docker: `docker --version`
- [ ] Verify gcloud: `gcloud --version` (install from https://cloud.google.com/sdk/docs/install if missing)

### Project Initialization
- [ ] Extract scaffold zip to `~/Downloads/venture-payroll-agent`
- [ ] `cd ~/Downloads/venture-payroll-agent && npm install`
- [ ] Copy `.env.example` → `.env.local` and fill in values
- [ ] Verify local dev server: `npm run dev`
- [ ] Initialize git: `git init && git add -A && git commit -m "initial scaffold from Ignition"`
- [ ] Create GitHub repo and push: `gh repo create venture-payroll-agent --source . --push`
- [ ] Set up `.auto-memory/` directory and `MEMORY.md` index
- [ ] Update `.auto-memory/reference_venture-payroll-agent.md` with GitHub URL

### GCP & Cloud Run
- [ ] Test Docker build: `docker build -t venture-payroll-agent . && docker run -p 8080:8080 venture-payroll-agent`
- [ ] Create GCP project: `gcloud projects create venture-payroll-agent --name="venture-payroll-agent"`
- [ ] Link billing: https://console.cloud.google.com/billing/linkedaccount?project=venture-payroll-agent
- [ ] Enable APIs: `gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com storage.googleapis.com --project venture-payroll-agent`
- [ ] Create Artifact Registry: `gcloud artifacts repositories create venture-payroll-agent --repository-format=docker --location=us-east1 --project venture-payroll-agent`
- [ ] First Cloud Run deploy: `gcloud run deploy venture-payroll-agent --source . --region us-east1 --project venture-payroll-agent --allow-unauthenticated` (use `--update-env-vars`, never `--set-env-vars`)
- [ ] Update `.auto-memory/reference_venture-payroll-agent.md` with Cloud Run URL + GCP project ID
- [ ] Write first session file: `docs/memory/YYYY-MM-DD.md`

### Salesforce Setup
- [ ] Go to Salesforce Setup → App Manager → New Connected App
- [ ] Enable OAuth settings; set callback URL to `http://localhost:5173` (dev) and your Cloud Run URL (prod)
- [ ] Add OAuth scope: `api`
- [ ] Copy the Consumer Key → goes into `SF_CLIENT_ID` in `.env.local`
- [ ] Confirm field names (see Data Model → Fields to Confirm above)
- [ ] Update SOQL queries with confirmed field names
- [ ] Test OAuth flow against sandbox, then production org
- [ ] Write confirmed field names to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]` and update `.auto-memory/project_venture-payroll-agent.md`

### CoAdvantage Setup
- [ ] Obtain API credentials for CoAdvantage
- [ ] Add to `.env.example` as placeholder + `.env.local` with real values
- [ ] Build mock data layer that mirrors the real API response shape
- [ ] Implement real API calls after mock is working
- [ ] Write confirmed endpoints and auth details to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]`

### Five9 Setup
- [ ] Obtain API credentials for Five9
- [ ] Add to `.env.example` as placeholder + `.env.local` with real values
- [ ] Build mock data layer that mirrors the real API response shape
- [ ] Implement real API calls after mock is working
- [ ] Write confirmed endpoints and auth details to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]`

### Google Chat Setup
- [ ] Obtain API credentials for Google Chat
- [ ] Add to `.env.example` as placeholder + `.env.local` with real values
- [ ] Build mock data layer that mirrors the real API response shape
- [ ] Implement real API calls after mock is working
- [ ] Write confirmed endpoints and auth details to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]`

### Google Workspace Setup
- [ ] Obtain API credentials for Google Workspace
- [ ] Add to `.env.example` as placeholder + `.env.local` with real values
- [ ] Build mock data layer that mirrors the real API response shape
- [ ] Implement real API calls after mock is working
- [ ] Write confirmed endpoints and auth details to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]`

### Forge Setup
- [ ] Obtain API credentials for Forge
- [ ] Add to `.env.example` as placeholder + `.env.local` with real values
- [ ] Build mock data layer that mirrors the real API response shape
- [ ] Implement real API calls after mock is working
- [ ] Write confirmed endpoints and auth details to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]`

## Phase 2: Prototype
- [ ] Build core UI with mock data
- [ ] Implement main views and interactions
- [ ] Verify mock mode works end-to-end
- [ ] Deploy prototype to Cloud Run for review

### What the prototype already covers:
✅ Dashboard layout with agent overview
✅ Weekly verification status tracking
✅ Monthly commission calculation display
✅ Manager review interface
✅ Alert and pattern recognition UI components


## Phase 3: Live Data
- [ ] Confirm all field names and API names — write each to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]` and update `.auto-memory/project_venture-payroll-agent.md`
- [ ] Connect CoAdvantage integration
- [ ] Connect Five9 integration
- [ ] Connect Salesforce integration
- [ ] Connect Google Chat integration
- [ ] Connect Google Workspace integration
- [ ] Connect Forge integration
- [ ] Set production env vars on Cloud Run (`--update-env-vars`, never `--set-env-vars`)
- [ ] Run with live data end-to-end
- [ ] Verify in production

## Phase 4: MVP Features
- [ ] Weekly payroll verification by cross-referencing CoAdvantage timesheets with Five9/Salesforce call data, monthly commission calculations with tier-based structures, and manager dashboard for review and approval of flagged discrepancies.

## Phase 5: MVP Deploy
- [ ] All env vars confirmed on Cloud Run
- [ ] Tested with real users in production
- [ ] Memory finalized, TODO updated
- [ ] Ship

## Phase 6+: Post-MVP
- [ ] CoAdvantage API integration, advanced pattern recognition, predictive flagging, real-time performance insights, automated contest tracking with custom rule engines.
---

## Known Challenges & Open Questions

CoAdvantage likely requires web scraping vs API integration. Pattern learning for agent work schedules needs training data over several weeks. Contest rule flexibility requires manual input each month. Commission adjustments can happen after month-end requiring delayed final calculations until first Monday.

---

## Brainstorm Notes
Building an AI payroll agent for Venture Home Solar to automate weekly timesheet verification and monthly commission calculations for 25 inside sales agents. The MVP focuses on cross-referencing CoAdvantage timesheets with Five9/Salesforce call data to flag discrepancies, calculating tier-based commissions, and providing manager dashboards for review. Key integrations include CoAdvantage (initially web scraping), Five9 API, Salesforce, and Google Chat alerts. The system will learn agent work patterns over time and handle complex commission structures with monthly contest variables. Shadow mode testing will ensure accuracy before full automation.

---

## Reference Data

Commission tiers: Tier 1 (1-19 completed): $10 per appointment + $100 per closed deal, Tier 2 (20-39): $20 per appointment + $200 per deal, Tier 3 (40+): $30 per appointment + $300 per deal. Call volume threshold: 20 calls per hour. Gap threshold: 15+ minutes with no calls. Work week: Sunday-Saturday. Team assignments by state: Ben (MA/NH/ME/RI/CT), Joseph (NY/MD/PA/NJ). Break allowance: 30 minutes per 6 hours worked.
