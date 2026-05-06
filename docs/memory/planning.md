

# Planning Memory — 2026-05-03
**Contributor**: Project creator (via Ignition planning session)
**Session type**: Initial brainstorm and project definition

---

## What We're Building

We're building an AI-powered payroll agent for Venture Home Solar's inside sales department. The agent automates two core workflows that are currently done manually: weekly timesheet verification for 25 remote inside sales agents, and monthly commission/bonus calculations.

The weekly verification problem is this: all 25 agents are remote, so there's no way to visually confirm they're working during the hours they log in CoAdvantage (the payroll/HR system). The current process involves manually cross-referencing each agent's CoAdvantage clock-in/clock-out times against their call activity in Five9 and Salesforce — looking for gaps of 15+ minutes with no calls, or hours where call volume drops below 20 calls/hour. Discrepancies get flagged, sent to a team lead for review, and then the CoAdvantage time records are manually adjusted. This takes hours every week.

The monthly commission calculation involves pulling appointment data from Salesforce, determining which tier each agent falls into based on completed appointment count, calculating per-appointment and per-deal payouts, layering on whatever monthly contest bonuses are running, and producing a final commission report. Contest structures change every month and can be quite complex — daily leaderboards, team-based goals with tier requirements, average schedule gap calculations, and more. These commissions are paid the first week of the following month.

The agent will also learn each rep's normal work patterns over time — recognizing that certain agents work split shifts, take lunch at predictable times, etc. — so it can distinguish between legitimate patterns and actual discrepancies. It will provide a manager dashboard for review and send Google Chat alerts when issues are detected. It integrates into the existing Forge agent management ecosystem used by Venture Home Solar.

## Why We're Building It

The project owner currently spends at least several hours every week on payroll verification and additional time each month on commission calculations. For 25 remote agents, manually cross-referencing timesheets against call logs is tedious, error-prone, and doesn't scale. Accuracy is the #1 concern — payroll mistakes cost real money and damage trust.

If this works, the project owner gets back 3+ hours per week (conservatively), eliminates commission calculation errors, and gains visibility into agent performance patterns that don't exist today. The team leads (Ben and Joseph) also get a clearer view of their teams' actual work patterns.

Beyond time savings, this creates an audit trail for every payroll adjustment — something that doesn't exist in the current manual process. Pattern recognition over time will surface insights about agent behavior that would be impossible to detect manually across 25 people.

## Decisions Made

**Architecture approach**: Single comprehensive agent rather than separate agents for payroll, commissions, and contests. Reasoning: all the data is interconnected (payroll verification feeds into commission calculations, contest tracking needs both), and a single agent produces a cleaner audit trail.

**CoAdvantage integration**: Web automation (Puppeteer/Selenium) using the project owner's login credentials for v1. CoAdvantage (now part of ADP) likely has enterprise API access, but it requires partner program approval and potentially additional fees. Web automation is faster to implement and avoids the approval process. API integration is explicitly planned for v2.

**Call data source**: Five9 call logs are the primary source, but Salesforce also has calls logged as Tasks, providing a secondary verification source. The agent will cross-reference both to improve accuracy.

**Deployment model**: Scheduled runs — Sunday night/Monday morning for weekly payroll, first Monday of each month for commissions. Not real-time, not manually triggered.

**Rollout strategy**: Shadow mode first. The agent runs its calculations in parallel while the project owner continues doing payroll manually. Results are compared to build confidence in accuracy before the agent starts making any actual CoAdvantage changes.

**Confidence-based automation**: Once out of shadow mode, high-confidence determinations (e.g., agent with consistent patterns, clean timesheet) can auto-approve. Low-confidence cases always require human review.

**Alert delivery**: Google Chat webhooks for notifications to the project owner and team leads. Dashboard for detailed review.

**Forge integration**: The payroll agent will be managed through the existing Forge agent control plane, providing monitoring, updates, and task assignment capabilities.

**Frontend stack**: React (JSX) with Vite. Inline styles with a dark theme using Venture Home Solar design tokens. JetBrains Mono for data/numbers, Outfit for UI text.

**Team**: Solo developer.

## MVP Scope

### In Scope for v1

**Weekly Payroll Verification:**
- Pull CoAdvantage clock-in/clock-out data for all 25 agents (Sunday–Saturday work week) via web automation
- Pull Five9 call log data for the same period
- Pull Salesforce Task/Activity call data as secondary verification
- For each agent, for each day:
  - Calculate calls per hour for every hour they were clocked in
  - Flag any hour with fewer than 20 calls
  - Identify any gap of 15+ consecutive minutes with zero calls
  - Allow one 30-minute gap per 6 hours worked (break allowance)
  - Compare CoAdvantage logged hours vs. first-call-to-last-call timespan
- Generate a verification report categorizing each agent as "clean" or "flagged" with specific reasons
- Manager review dashboard showing: hours logged in CoAdvantage, CoAdvantage hours vs. first/last call times, calls per hour, unexplained long gaps
- Google Chat alerts to the project owner, Ben, and Joseph when flagged cases are detected
- Audit log for every flagged item and every adjustment

**Monthly Commission Calculation:**
- Pull all Salesforce appointments with "completed" status
- Identify the appointment setter from the field on the Activity object (and cross-reference with the Opportunity object field)
- Count completed appointments per agent for the month
- Determine commission tier per agent:
  - Tier 1 (1–19 completed): $10/appointment + $100/closed-won deal
  - Tier 2 (20–39 completed): $20/appointment + $200/closed-won deal
  - Tier 3 (40+ completed): $30/appointment + $300/closed-won deal
- Pull closed-won Opportunities tied to each appointment setter
- Calculate total commission per agent
- Generate commission report ready for payroll entry
- Run on first Monday of the following month to allow for weekend revisions

**Contest Tracking:**
- Interface for inputting monthly contest rules at the start of each month
- Support for multiple simultaneous contests
- Track and calculate contest bonuses based on configured rules
- Contest types to support in v1:
  - Daily leaderboard (e.g., $20 to whoever sets the most appointments that day)
  - Team goal bonus with tier requirement (e.g., $500 to everyone on a team that hits goal, if setter is in Tier 2 or 3)
  - Metric-based monthly winner (e.g., shortest average schedule gap gets $500)

**Shadow Mode:**
- Agent runs full calculations but does NOT make any CoAdvantage changes
- Outputs comparison-ready reports so the project owner can validate against manual calculations
- Shadow mode is the default on launch; manual switch to live mode

**Manager Dashboard:**
- Weekly verification tab with agent-by-agent breakdown
- Monthly commissions tab with tier and payout details
- Contest tracking tab with leaderboards
- Status cards showing flagged count, clean count, time saved, commission totals

**Alerts:**
- Google Chat notifications for weekly flagged agents
- Google Chat notifications for commission reports ready for review

### Explicitly Out of Scope for v1

- CoAdvantage API integration (v2)
- Automatic CoAdvantage adjustments (requires shadow mode validation first; will be phased in for high-confidence cases)
- Advanced pattern learning / anomaly detection (basic gap detection is in; ML-based pattern recognition is v2)
- Predictive flagging ("these agents are likely to have issues this week")
- Performance trend analytics and insights
- Real-time monitoring during the workday
- Integration with any system beyond CoAdvantage, Five9, Salesforce, Google Chat, and Google Workspace
- Multi-department support (inside sales only)

## Data Model

### Agent
- `id` (internal)
- `name` (string) — full name matching across CoAdvantage, Salesforce, and Five9
- `team` (enum: "Ben" | "Joseph") — derived from state territory assignment
- `states` (array of strings) — states this agent covers, determines team assignment
- `coadvantage_id` (string) — identifier in CoAdvantage system (TBD — need to confirm)
- `salesforce_user_id` (string) — Salesforce User ID
- `five9_agent_id` (string) — Five9 agent identifier (TBD — need to confirm)
- `work_patterns` (JSON) — learned patterns over time (e.g., typical break times, split shift schedules)
- `is_active` (boolean)

### TimesheetRecord
- `id` (internal)
- `agent_id` (FK → Agent)
- `date` (date)
- `clock_in` (datetime)
- `clock_out` (datetime)
- `logged_hours` (decimal) — from CoAdvantage
- `verified_hours` (decimal) — calculated by agent
- `status` (enum: "clean" | "flagged" | "adjusted" | "pending_review")
- `flags` (JSON array) — list of specific issues found
- `reviewer` (string) — who approved/rejected
- `review_notes` (text)
- `adjustment_amount` (decimal) — hours added or removed
- `source` (enum: "coadvantage")
- `created_at`, `updated_at`

### CallLog
- `id` (internal)
- `agent_id` (FK → Agent)
- `timestamp` (datetime)
- `duration_seconds` (integer)
- `source` (enum: "five9" | "salesforce")
- `call_type` (string) — inbound/outbound if available
- `date` (date) — denormalized for query performance

### DailyVerification
- `id` (internal)
- `agent_id` (FK → Agent)
- `date` (date)
- `total_logged_hours` (decimal)
- `first_call_time` (datetime)
- `last_call_time` (datetime)
- `call_span_hours` (decimal) — last call minus first call
- `total_calls` (integer)
- `calls_per_hour` (decimal)
- `gaps` (JSON array) — each gap: `{start, end, duration_minutes, is_allowed_break: bool}`
- `hours_below_threshold` (JSON array) — hours where calls < 20
- `break_allowance_used` (boolean)
- `status` (enum: "clean" | "flagged")
- `confidence_score` (decimal 0-1)

### Appointment
- `id` (internal)
- `salesforce_activity_id` (string) — Salesforce Activity record ID
- `appointment_setter_id` (FK → Agent)
- `appointment_setter_name` (string) — raw field value from Salesforce
- `status` (enum: "scheduled" | "confirmed" | "completed" | "rescheduled")
- `created_datetime` (datetime) — when appointment was created (for schedule gap calc)
- `scheduled_datetime` (datetime) — when appointment is scheduled for
- `completed_datetime` (datetime)
- `associated_opportunity_id` (string) — Salesforce Opportunity ID
- `opportunity_stage` (string) — e.g., "Closed Won"
- `month` (string, "YYYY-MM") — denormalized for commission aggregation

### CommissionCalculation
- `id` (internal)
- `agent_id` (FK → Agent)
- `month` (string, "YYYY-MM")
- `completed_appointments` (integer)
- `tier` (integer: 1, 2, or 3)
- `appointment_payout_rate` (decimal) — $10, $20, or $30
- `appointment_commission` (decimal)
- `closed_won_deals` (integer)
- `deal_payout_rate` (decimal) — $100, $200, or $300
- `deal_commission` (decimal)
- `base_commission` (decimal) — appointment_commission + deal_commission
- `contest_bonuses` (JSON array) — each bonus: `{contest_name, amount, reason}`
- `total_contest_bonus` (decimal)
- `total_payout` (decimal) — base_commission + total_contest_bonus
- `status` (enum: "draft" | "reviewed" | "approved" | "paid")
- `calculated_at` (datetime)

### Contest
- `id` (internal)
- `month` (string, "YYYY-MM")
- `name` (string)
- `description` (text)
- `rules` (JSON) — structured contest rules
- `contest_type` (enum: "daily_leader" | "team_goal" | "metric_winner" | "custom")
- `prize_amount` (decimal)
- `is_active` (boolean)
- `created_at`

### ContestResult
- `id` (internal)
- `contest_id` (FK → Contest)
- `agent_id` (FK → Agent)
- `date` (date, nullable — for daily contests)
- `metric_value` (decimal) — the value being measured
- `is_winner` (boolean)
- `bonus_amount` (decimal)

### AuditLog
- `id` (internal)
- `action` (string) — e.g., "timesheet_flagged", "hours_adjusted", "commission_calculated"
- `entity_type` (string)
- `entity_id` (string)
- `agent_id` (FK → Agent, nullable)
- `details` (JSON)
- `performed_by` (string) — "system" or reviewer name
- `timestamp` (datetime)

**Key relationships:**
- Agent → TimesheetRecord (one-to-many, daily records)
- Agent → CallLog (one-to-many)
- Agent → DailyVerification (one-to-many)
- Agent → Appointment (one-to-many, via appointment_setter)
- Agent → CommissionCalculation (one per month)
- Contest → ContestResult (one-to-many)
- Agent → ContestResult (one-to-many)

**Team assignment mapping (confirmed):**
- Ben manages: MA, NH, ME, RI, CT
- Joseph manages: NY, MD, PA, NJ

## Fields & API Names to Confirm

These must be verified against the actual systems before going to production:

### Salesforce
- [ ] Exact API field name for "Appointment Setter" on the Activity (Event/Task) object — is it a custom field like `Appointment_Setter__c`? Lookup field or text?
- [ ] Exact API field name for "Appointment Setter" on the Opportunity object — same field name or different?
- [ ] Activity object type — is the appointment an Event, Task, or custom object?
- [ ] Status field values on the Activity — confirm exact strings: "Scheduled", "Confirmed", "Completed", "Rescheduled (New Appointment Created)"
- [ ] How is "Closed Won" represented on Opportunity — `StageName = 'Closed Won'`?
- [ ] How are call log Tasks structured — what fields contain call timestamp, duration, etc.?
- [ ] Is there a "Created Date" datetime field on Activities that represents when the appointment was created (for schedule gap calculation)?
- [ ] How are agents represented in Salesforce — User records? What field links a Salesforce user to the appointment setter field value?
- [ ] What state field on the Appointment/Opportunity determines team assignment — lead state? opportunity territory?

### CoAdvantage
- [ ] Login URL and authentication flow (MFA? SSO?)
- [ ] Page structure for viewing/editing timesheets — which pages to navigate, what selectors to use
- [ ] How agents are identified in CoAdvantage — employee ID, name format
- [ ] Timesheet data format — how clock-in/clock-out times are displayed
- [ ] How to make timesheet adjustments — edit existing entries? Create adjustment records?
- [ ] Any rate limiting or session timeout behavior

### Five9
- [ ] API endpoint for call logs — REST API? Reporting API?
- [ ] Authentication method — API key? OAuth? Session token?
- [ ] Call log data fields — agent identifier, timestamp, duration, call type
- [ ] How agents are identified in Five9 — agent ID format, name format
- [ ] Rate limits and data retention period
- [ ] Can we pull historical data for shadow mode validation?

### Google Chat
- [ ] Webhook URL for the relevant Google Chat space(s)
- [ ] Are there separate spaces for the project owner, Ben, and Joseph, or one shared space?
- [ ] Message formatting capabilities — cards? Buttons? Links?