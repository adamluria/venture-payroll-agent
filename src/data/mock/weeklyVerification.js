// Mock weekly verification data — one row per agent for the current work week.
// Shape mirrors a per-agent aggregation of the planning.md DailyVerification model.
// Status enum: 'clean' | 'flagged'. Flags array describes specific issues found.

import { agents } from './agents.js';

const week = {
  start: '2026-05-10',
  end:   '2026-05-16',
  label: 'Week of May 10–16, 2026',
};

// Per-agent weekly summary. Each row is the result of cross-referencing
// CoAdvantage clock-in/out vs. Five9 + Salesforce call activity.
const rows = [
  // Ben's team
  { agent_id: 'agent-001', logged_hours: 40.0, verified_hours: 38.5, calls_per_hour: 18.2, total_calls: 750, status: 'flagged', flags: ['45min gap unusual on Wednesday afternoon', 'Calls/hr below 20 threshold'] },
  { agent_id: 'agent-002', logged_hours: 40.0, verified_hours: 35.0, calls_per_hour: 16.8, total_calls: 588, status: 'flagged', flags: ['No calls logged Thu 2–4pm', 'Calls/hr below 20 threshold all week'] },
  { agent_id: 'agent-003', logged_hours: 40.0, verified_hours: 40.0, calls_per_hour: 21.7, total_calls: 868, status: 'clean', flags: [] },
  { agent_id: 'agent-004', logged_hours: 40.0, verified_hours: 40.0, calls_per_hour: 23.1, total_calls: 924, status: 'clean', flags: [] },
  { agent_id: 'agent-005', logged_hours: 38.0, verified_hours: 38.0, calls_per_hour: 20.4, total_calls: 775, status: 'clean', flags: [] },
  { agent_id: 'agent-006', logged_hours: 32.0, verified_hours: 32.0, calls_per_hour: 22.6, total_calls: 723, status: 'clean', flags: [] },
  { agent_id: 'agent-007', logged_hours: 40.0, verified_hours: 36.5, calls_per_hour: 17.5, total_calls: 638, status: 'flagged', flags: ['3.5h unexplained gap Friday morning'] },
  { agent_id: 'agent-008', logged_hours: 40.0, verified_hours: 40.0, calls_per_hour: 24.8, total_calls: 992, status: 'clean', flags: [] },
  { agent_id: 'agent-009', logged_hours: 36.0, verified_hours: 36.0, calls_per_hour: 19.2, total_calls: 691, status: 'flagged', flags: ['Calls/hr just under threshold — split shift pattern likely'] },
  { agent_id: 'agent-010', logged_hours: 40.0, verified_hours: 40.0, calls_per_hour: 22.5, total_calls: 900, status: 'clean', flags: [] },
  { agent_id: 'agent-011', logged_hours: 40.0, verified_hours: 39.0, calls_per_hour: 21.0, total_calls: 819, status: 'clean', flags: [] },
  { agent_id: 'agent-012', logged_hours: 35.0, verified_hours: 35.0, calls_per_hour: 23.4, total_calls: 819, status: 'clean', flags: [] },
  { agent_id: 'agent-013', logged_hours: 40.0, verified_hours: 38.0, calls_per_hour: 20.1, total_calls: 763, status: 'clean', flags: [] },

  // Joseph's team
  { agent_id: 'agent-014', logged_hours: 32.0, verified_hours: 32.0, calls_per_hour: 22.1, total_calls: 707, status: 'clean', flags: [] },
  { agent_id: 'agent-015', logged_hours: 36.0, verified_hours: 36.0, calls_per_hour: 24.3, total_calls: 874, status: 'clean', flags: [] },
  { agent_id: 'agent-016', logged_hours: 38.0, verified_hours: 37.0, calls_per_hour: 15.2, total_calls: 562, status: 'flagged', flags: ['Only 12 calls/hour Friday', 'Long gap 11:30am–1:00pm Wed'] },
  { agent_id: 'agent-017', logged_hours: 35.0, verified_hours: 35.0, calls_per_hour: 20.8, total_calls: 728, status: 'clean', flags: [] },
  { agent_id: 'agent-018', logged_hours: 40.0, verified_hours: 40.0, calls_per_hour: 21.5, total_calls: 860, status: 'clean', flags: [] },
  { agent_id: 'agent-019', logged_hours: 40.0, verified_hours: 33.5, calls_per_hour: 14.7, total_calls: 492, status: 'flagged', flags: ['Multiple 30+ min gaps', 'Calls/hr 26% under threshold'] },
  { agent_id: 'agent-020', logged_hours: 38.0, verified_hours: 38.0, calls_per_hour: 25.1, total_calls: 954, status: 'clean', flags: [] },
  { agent_id: 'agent-021', logged_hours: 40.0, verified_hours: 40.0, calls_per_hour: 22.9, total_calls: 916, status: 'clean', flags: [] },
  { agent_id: 'agent-022', logged_hours: 36.0, verified_hours: 36.0, calls_per_hour: 20.7, total_calls: 745, status: 'clean', flags: [] },
  { agent_id: 'agent-023', logged_hours: 40.0, verified_hours: 37.5, calls_per_hour: 18.9, total_calls: 709, status: 'flagged', flags: ['1.5h gap Mon afternoon (no break allowance left)'] },
  { agent_id: 'agent-024', logged_hours: 32.0, verified_hours: 32.0, calls_per_hour: 21.3, total_calls: 682, status: 'clean', flags: [] },
  { agent_id: 'agent-025', logged_hours: 40.0, verified_hours: 40.0, calls_per_hour: 23.6, total_calls: 944, status: 'clean', flags: [] },
];

// Hydrate the agent name + team onto each row so views don't need to join manually.
const weeklyData = rows.map((row) => {
  const agent = agents.find((a) => a.id === row.agent_id);
  return {
    ...row,
    name: agent?.name ?? '(unknown)',
    team: agent?.team ?? '(unknown)',
    // Convenience: primary issue summary for table display
    issue: row.flags[0] ?? null,
  };
});

export const weeklyVerification = {
  week,
  rows: weeklyData,
};
