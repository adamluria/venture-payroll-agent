// Mock monthly commission data — one row per agent for the most recent closed month.
// Shape mirrors the planning.md CommissionCalculation model.
// Tier 1 (1–19 completed): $10/appt + $100/deal | Tier 2 (20–39): $20/$200 | Tier 3 (40+): $30/$300

import { agents } from './agents.js';

const month = {
  yyyymm: '2026-04',
  label: 'April 2026 Commissions',
};

// Tier resolution per the confirmed business rules
const tierOf = (completed) => {
  if (completed >= 40) return 3;
  if (completed >= 20) return 2;
  return 1;
};

const apptRateOf = (tier) => ({ 1: 10, 2: 20, 3: 30 }[tier]);
const dealRateOf = (tier) => ({ 1: 100, 2: 200, 3: 300 }[tier]);

// Raw per-agent month performance (completed appointments + closed-won deals + contest bonuses earned).
const raw = [
  // Ben's team
  { agent_id: 'agent-001', completed_appointments: 15, closed_won_deals: 2, contest_bonuses: [] },
  { agent_id: 'agent-002', completed_appointments: 19, closed_won_deals: 1, contest_bonuses: [] },
  { agent_id: 'agent-003', completed_appointments: 42, closed_won_deals: 7, contest_bonuses: [{ contest_name: 'Team Goal Bonus', amount: 500 }] },
  { agent_id: 'agent-004', completed_appointments: 31, closed_won_deals: 6, contest_bonuses: [{ contest_name: 'Daily Leader', amount: 200 }] },
  { agent_id: 'agent-005', completed_appointments: 24, closed_won_deals: 4, contest_bonuses: [] },
  { agent_id: 'agent-006', completed_appointments: 28, closed_won_deals: 5, contest_bonuses: [{ contest_name: 'Daily Leader', amount: 80 }] },
  { agent_id: 'agent-007', completed_appointments: 22, closed_won_deals: 3, contest_bonuses: [] },
  { agent_id: 'agent-008', completed_appointments: 38, closed_won_deals: 8, contest_bonuses: [{ contest_name: 'Team Goal Bonus', amount: 500 }] },
  { agent_id: 'agent-009', completed_appointments: 17, closed_won_deals: 2, contest_bonuses: [] },
  { agent_id: 'agent-010', completed_appointments: 29, closed_won_deals: 4, contest_bonuses: [] },
  { agent_id: 'agent-011', completed_appointments: 33, closed_won_deals: 5, contest_bonuses: [{ contest_name: 'Daily Leader', amount: 60 }] },
  { agent_id: 'agent-012', completed_appointments: 26, closed_won_deals: 4, contest_bonuses: [] },
  { agent_id: 'agent-013', completed_appointments: 35, closed_won_deals: 6, contest_bonuses: [{ contest_name: 'Team Goal Bonus', amount: 500 }] },

  // Joseph's team
  { agent_id: 'agent-014', completed_appointments: 23, closed_won_deals: 4, contest_bonuses: [{ contest_name: 'Shortest Schedule Gap', amount: 500 }] },
  { agent_id: 'agent-015', completed_appointments: 18, closed_won_deals: 3, contest_bonuses: [] },
  { agent_id: 'agent-016', completed_appointments: 27, closed_won_deals: 3, contest_bonuses: [{ contest_name: 'Daily Leader', amount: 100 }] },
  { agent_id: 'agent-017', completed_appointments: 27, closed_won_deals: 5, contest_bonuses: [] },
  { agent_id: 'agent-018', completed_appointments: 41, closed_won_deals: 8, contest_bonuses: [{ contest_name: 'Team Goal Bonus', amount: 500 }, { contest_name: 'Daily Leader', amount: 140 }] },
  { agent_id: 'agent-019', completed_appointments: 20, closed_won_deals: 3, contest_bonuses: [] },
  { agent_id: 'agent-020', completed_appointments: 37, closed_won_deals: 7, contest_bonuses: [{ contest_name: 'Daily Leader', amount: 180 }] },
  { agent_id: 'agent-021', completed_appointments: 32, closed_won_deals: 5, contest_bonuses: [] },
  { agent_id: 'agent-022', completed_appointments: 21, closed_won_deals: 3, contest_bonuses: [] },
  { agent_id: 'agent-023', completed_appointments: 30, closed_won_deals: 5, contest_bonuses: [{ contest_name: 'Team Goal Bonus', amount: 500 }] },
  { agent_id: 'agent-024', completed_appointments: 16, closed_won_deals: 2, contest_bonuses: [] },
  { agent_id: 'agent-025', completed_appointments: 36, closed_won_deals: 6, contest_bonuses: [{ contest_name: 'Daily Leader', amount: 120 }] },
];

// Project raw data into the full CommissionCalculation shape
const commissions = raw.map((r) => {
  const agent = agents.find((a) => a.id === r.agent_id);
  const tier = tierOf(r.completed_appointments);
  const appointment_payout_rate = apptRateOf(tier);
  const deal_payout_rate = dealRateOf(tier);
  const appointment_commission = r.completed_appointments * appointment_payout_rate;
  const deal_commission = r.closed_won_deals * deal_payout_rate;
  const base_commission = appointment_commission + deal_commission;
  const total_contest_bonus = r.contest_bonuses.reduce((sum, b) => sum + b.amount, 0);
  const total_payout = base_commission + total_contest_bonus;

  return {
    id: `commission-${r.agent_id}-${month.yyyymm}`,
    agent_id: r.agent_id,
    name: agent?.name ?? '(unknown)',
    team: agent?.team ?? '(unknown)',
    month: month.yyyymm,
    completed_appointments: r.completed_appointments,
    tier,
    appointment_payout_rate,
    appointment_commission,
    closed_won_deals: r.closed_won_deals,
    deal_payout_rate,
    deal_commission,
    base_commission,
    contest_bonuses: r.contest_bonuses,
    total_contest_bonus,
    total_payout,
    status: 'draft',
  };
});

export const monthlyCommissions = {
  month,
  rows: commissions,
};
