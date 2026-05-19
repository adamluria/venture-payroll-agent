# venture-payroll-agent — User Guide

> AI-powered payroll verification and commission calculation agent for Venture Home Solar's inside sales team that automates timesheet validation and commission calculations.

This is the user-facing guide for **venture-payroll-agent**. It documents every feature in the product — what it does, how to use it, and anything important to know about it. When the project is finished, this file is intended to be publishable as-is: paste it into a help center, a README, an onboarding doc, or share it directly with users.

---

## 🤖 For AI Tools Maintaining This File

**This file is NOT optional documentation.** Keeping it current is part of shipping a feature. Before marking any feature "done":

1. **Add a new entry** under _Features_ using the template below
2. **Update the Table of Contents** with a link to the new section
3. **Remove or update** any entry that is being replaced or deprecated
4. **Commit the USER_GUIDE update** in the same commit as the feature itself — not as a separate follow-up

### When to add or update an entry

Add a new entry when:
- A new feature ships that a user can see, click, or interact with
- A new workflow is introduced (sign up, import data, export report, etc.)
- A new setting, preference, or configuration option becomes available
- A new integration is wired up that the user can enable or configure

Update an existing entry when:
- The UI for a feature changes in a way that affects how users interact with it
- Behavior changes (new rules, new defaults, new limits)
- A known limitation is fixed — remove the caveat
- A new limitation is discovered — add a caveat

Remove an entry when:
- A feature is deprecated or removed from the product
- A feature is merged into another feature (consolidate into the surviving entry)

### Writing style for entries

- **Write for the user, not for yourself.** "Click _Export_ to download your data as CSV." Not: "The export handler is wired to the download endpoint."
- **Use present tense and active voice.** "The dashboard shows..." not "The dashboard will show..."
- **Name UI elements exactly as they appear.** If the button says "Export Data", use that label — don't call it "the export option".
- **Keep it concise.** Two to four short paragraphs per feature is usually enough. Link to more detail if needed.
- **No implementation details.** Users don't need to know which API you're calling or what component renders the view. Save that for `PROJECT_INSTRUCTIONS.md` and `docs/memory/`.
- **Screenshots are welcome** — drop them into `docs/screenshots/` and link them inline.

### Entry template (copy this for each new feature)

```markdown
### [Feature Name]

**What it does:** One or two sentences describing the purpose of the feature in user terms.

**How to use it:**
1. Step-by-step instructions a user can follow
2. Name buttons and fields exactly as they appear in the UI
3. Note any prerequisites (e.g. "you must be signed in", "your account must have admin access")

**Good to know:**
- Any limitations, edge cases, or gotchas a user should be aware of
- Keyboard shortcuts or power-user tips
- Known issues, if any, with a link to the tracking item

**Added:** YYYY-MM-DD · **Last updated:** YYYY-MM-DD
```

### When the project is "done"

Before shipping the product publicly, a final pass on this file should:
1. Remove this entire "For AI Tools" section (everything between the 🤖 header and the _Getting Started_ section below)
2. Rewrite the intro at the top to speak directly to the end user
3. Verify every feature entry is accurate and well-written
4. Add screenshots for any feature that benefits from visual reference
5. Publish

---

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
  - [Dashboard Status Cards](#dashboard-status-cards)
  - [Weekly Verification Tab](#weekly-verification-tab)
  - [Monthly Commissions Tab](#monthly-commissions-tab)
  - [Contest Tracking Tab](#contest-tracking-tab)
  - [Contest Rules Modal](#contest-rules-modal)
- [FAQ](#faq)
- [Support](#support)

---

## Getting Started

To open the Payroll Agent dashboard, navigate to the Cloud Run service URL in your browser. The dashboard loads on the **Weekly Verification** tab by default and pulls data from CoAdvantage, Five9, and Salesforce (or mock data in demo mode). No login is required in the current preview.

The interface has three tabs across the top: **Weekly Verification**, **Monthly Commissions**, and **Contest Tracking**. The Bell icon in the header surfaces unread notifications; the **Contest Rules** button opens the contest configuration modal.

---

## Features

### Dashboard Status Cards

**What it does:** Four at-a-glance cards across the top of the dashboard summarize the current state of payroll: flagged agents needing review, agents with clean timesheets, hours saved by automation this week, and total monthly commissions calculated.

**How to use it:**
1. Open the dashboard — the status cards render automatically
2. Counts come from the current week (verification) and most recent closed month (commissions)
3. Each card uses semantic colors: coral for flagged, teal for clean/approved, amber for time saved

**Good to know:**
- Numbers refresh on every page load (no auto-refresh yet)
- "Time saved" is a heuristic based on agents that don't need manual review

**Added:** 2026-05-05 · **Last updated:** 2026-05-05

### Weekly Verification Tab

**What it does:** Shows a per-agent breakdown of the current work week (Sun–Sat) with logged hours from CoAdvantage, verified hours after cross-referencing call data from Five9 and Salesforce, calls per hour, and a clean/flagged status.

**How to use it:**
1. Click the **Weekly Verification** tab in the header
2. Review the table — flagged agents are highlighted with a coral **FLAGGED** badge plus the specific reason (e.g., "45min gap unusual on Wednesday afternoon")
3. Clean timesheets get a teal **CLEAN** badge

**Good to know:**
- Flag thresholds: fewer than 20 calls/hour, or any 15+ minute gap that exceeds the break allowance (30 min per 6 hours worked)
- The table is sortable by clicking the column header (coming soon)
- Verified hours can differ from logged hours when call activity doesn't match the clocked time

**Added:** 2026-05-05 · **Last updated:** 2026-05-05

### Monthly Commissions Tab

**What it does:** Calculates monthly commission per agent based on completed appointments and closed-won deals, applies the correct tier rates, layers in active contest bonuses, and shows the total payout.

**How to use it:**
1. Click the **Monthly Commissions** tab
2. Each row shows the agent, completed appointments, tier badge, deals, base commission, contest bonus, and total
3. Tier colors: Tier 1 = coral (lowest), Tier 2 = amber, Tier 3 = teal (highest)

**Good to know:**
- Commission tiers: Tier 1 (1–19 appointments) = $10/appt + $100/deal; Tier 2 (20–39) = $20/$200; Tier 3 (40+) = $30/$300
- Closed-won deals are pulled from Salesforce Opportunities tied to each appointment setter
- Commissions calculate the first Monday of the following month so weekend adjustments are captured

**Added:** 2026-05-05 · **Last updated:** 2026-05-05

### Contest Tracking Tab

**What it does:** Shows current standings for each active monthly contest — Daily Leader, Team Goal Bonus, Shortest Schedule Gap — with the current leader or number of qualified agents.

**How to use it:**
1. Click the **Contest Tracking** tab
2. Each contest renders as a card with the prize, eligibility rule, and current leader

**Good to know:**
- Contest types supported in v1: daily leader, team goal with tier requirement, single-metric monthly winner
- Schedule gap is measured as time between appointment creation and scheduled datetime in Salesforce

**Added:** 2026-05-05 · **Last updated:** 2026-05-05

### Contest Rules Modal

**What it does:** Opens a panel showing the active contests for the current month. In future versions this will allow editing prize amounts, eligibility rules, and adding new contests directly from the dashboard.

**How to use it:**
1. Click the **Contest Rules** button in the header (gear icon)
2. The modal lists every active contest for the month with its prize amount and description
3. Click **Close** or click outside the modal to dismiss

**Good to know:**
- Currently read-only — contest rules are defined in mock data for the preview release
- Editable contest configuration is on the roadmap (TODO Phase 4+)

**Added:** 2026-05-05 · **Last updated:** 2026-05-05

---

## FAQ

_Add common questions as they come up from real users._

---

## Support

_Replace with real support channels when the product has them._

- Email: [support@example.com]
- Docs: [link to full documentation]
- Issues: [link to issue tracker]

---

_This guide is maintained alongside the codebase. Last revised: 2026-05-06._
