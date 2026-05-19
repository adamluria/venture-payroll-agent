// Mock contest data — active contests for the current month.
// Shape mirrors the planning.md Contest + ContestResult model.

import { monthlyCommissions } from './commissions.js';

const month = {
  yyyymm: '2026-04',
  label: 'April 2026 Contests',
};

// Helper: pick the agent with the highest contest bonus for a given contest name
const findTopWinner = (contestName) => {
  let top = null;
  for (const c of monthlyCommissions.rows) {
    const bonus = c.contest_bonuses.find((b) => b.contest_name === contestName);
    if (bonus && (!top || bonus.amount > top.bonus_amount)) {
      top = { agent_name: c.name, bonus_amount: bonus.amount, metric: c };
    }
  }
  return top;
};

// Count how many agents qualified for a given contest
const countQualified = (contestName) =>
  monthlyCommissions.rows.filter((c) =>
    c.contest_bonuses.some((b) => b.contest_name === contestName)
  ).length;

const contests = [
  {
    id: 'contest-2026-04-daily-leader',
    month: month.yyyymm,
    name: 'Daily Leader',
    description: '$20 to whoever sets the most appointments that day',
    contest_type: 'daily_leader',
    prize_amount: 20,
    is_active: true,
    leader: {
      label: 'Top earner (cumulative across days)',
      winner: findTopWinner('Daily Leader'),
    },
  },
  {
    id: 'contest-2026-04-team-goal',
    month: month.yyyymm,
    name: 'Team Goal Bonus',
    description: '$500 to every Tier 2+ agent on a team that hits 150 completed appointments',
    contest_type: 'team_goal',
    prize_amount: 500,
    is_active: true,
    leader: {
      label: 'Qualified agents this month',
      qualified_count: countQualified('Team Goal Bonus'),
    },
  },
  {
    id: 'contest-2026-04-schedule-gap',
    month: month.yyyymm,
    name: 'Shortest Schedule Gap',
    description: '$500 to the agent with the shortest average gap between appointment creation and scheduled time',
    contest_type: 'metric_winner',
    prize_amount: 500,
    is_active: true,
    leader: {
      label: 'Current leader',
      winner: findTopWinner('Shortest Schedule Gap'),
      metric_label: 'Avg 2.1 days from creation to scheduled',
    },
  },
];

export const contestData = {
  month,
  contests,
};
