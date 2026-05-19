// Single accessor for all data the views consume.
// Today it returns mock data. When live integrations are wired up (Sessions 3+),
// each accessor will check `useMock` and either return the mock or call the real API.
// Mock mode MUST keep working forever as a demo fallback.

import { agents } from './mock/agents.js';
import { weeklyVerification } from './mock/weeklyVerification.js';
import { monthlyCommissions } from './mock/commissions.js';
import { contestData } from './mock/contests.js';

// Toggle. Flip to `false` (and add the live fetchers) once we have real credentials.
// Recommend keeping mock-first dev with VITE_USE_MOCK=true in `.env.local` for browser dev.
export const useMock = true;

export const getAgents = async () => {
  if (useMock) return agents;
  throw new Error('Live agents source not yet implemented');
};

export const getWeeklyVerification = async () => {
  if (useMock) return weeklyVerification;
  throw new Error('Live weekly verification source not yet implemented (Sessions 4+5: CoAdvantage + Five9)');
};

export const getMonthlyCommissions = async () => {
  if (useMock) return monthlyCommissions;
  throw new Error('Live commissions source not yet implemented (Session 3: Salesforce)');
};

export const getContests = async () => {
  if (useMock) return contestData;
  throw new Error('Live contest source not yet implemented');
};

// Aggregated dashboard stats — computed from whatever the accessors return.
export const getDashboardStats = async () => {
  const wv = await getWeeklyVerification();
  const mc = await getMonthlyCommissions();
  const flaggedCount = wv.rows.filter((r) => r.status === 'flagged').length;
  const cleanCount = wv.rows.filter((r) => r.status === 'clean').length;
  const totalCommissions = mc.rows.reduce((sum, r) => sum + r.total_payout, 0);
  // Time saved: rough heuristic — 10 min per clean agent + 25 min per flagged review skipped if confidence-clean
  const timeSavedHours = ((cleanCount * 10) + (flaggedCount * 5)) / 60;
  return {
    flaggedCount,
    cleanCount,
    totalCommissions,
    timeSavedHours,
    monthLabel: mc.month.label,
  };
};
