// Top-level shell for venture-payroll-agent.
// Composes: header → status cards → tab bar → active view → contest config modal.
// All data comes from src/data/dataSource.js so mock vs. live is a single toggle.

import { useEffect, useState } from 'react';
import {
  Bell,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
} from 'lucide-react';

import { theme } from './config/theme.js';
import {
  getWeeklyVerification,
  getMonthlyCommissions,
  getContests,
  getDashboardStats,
} from './data/dataSource.js';

import StatusCard from './components/StatusCard.jsx';
import TabBar from './components/TabBar.jsx';

import WeeklyVerificationView from './views/WeeklyVerificationView.jsx';
import MonthlyCommissionsView from './views/MonthlyCommissionsView.jsx';
import ContestTrackingView from './views/ContestTrackingView.jsx';
import ContestConfigModal from './views/ContestConfigModal.jsx';

const TABS = [
  { id: 'weekly',   label: 'Weekly Verification', icon: Clock },
  { id: 'monthly',  label: 'Monthly Commissions', icon: DollarSign },
  { id: 'contests', label: 'Contest Tracking',    icon: TrendingUp },
];

const usdK = (n) => `$${(n / 1000).toFixed(1)}k`;

function App() {
  const [selectedTab, setSelectedTab] = useState('weekly');
  const [showContestConfig, setShowContestConfig] = useState(false);

  const [weekly, setWeekly] = useState(null);
  const [commissions, setCommissions] = useState(null);
  const [contests, setContests] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      getWeeklyVerification(),
      getMonthlyCommissions(),
      getContests(),
      getDashboardStats(),
    ])
      .then(([w, m, c, s]) => {
        if (cancelled) return;
        setWeekly(w);
        setCommissions(m);
        setContests(c);
        setStats(s);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.bg,
        fontFamily: theme.fonts.body,
        color: theme.colors.text,
        padding: theme.spacing.xl,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.xxl,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600 }}>Payroll Agent</h1>
          <p style={{ margin: '4px 0 0 0', color: theme.colors.muted, fontSize: 16 }}>
            Automated payroll verification &amp; commission tracking
          </p>
        </div>
        <div style={{ display: 'flex', gap: theme.spacing.md, alignItems: 'center' }}>
          <button
            onClick={() => setShowContestConfig(true)}
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              padding: '8px 12px',
              color: theme.colors.text,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs + 2,
            }}
          >
            <Settings size={16} />
            Contest Rules
          </button>
          <div
            style={{
              position: 'relative',
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              padding: theme.spacing.sm,
              cursor: 'pointer',
            }}
            title="Notifications"
          >
            <Bell size={20} color={theme.colors.accent} />
            <div
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 8,
                height: 8,
                backgroundColor: theme.colors.flagged,
                borderRadius: '50%',
              }}
            />
          </div>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div
          style={{
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.flagged}`,
            color: theme.colors.flagged,
            padding: theme.spacing.md,
            borderRadius: theme.radius.md,
            marginBottom: theme.spacing.lg,
            fontSize: 14,
          }}
        >
          Couldn't load data: {error}
        </div>
      )}

      {/* Status Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: theme.spacing.xl,
          marginBottom: theme.spacing.xxl,
        }}
      >
        <StatusCard
          icon={<AlertTriangle size={20} color={theme.colors.flagged} />}
          label="Flagged for Review"
          value={stats ? stats.flaggedCount : '—'}
          caption="agents need attention"
          color="flagged"
        />
        <StatusCard
          icon={<CheckCircle size={20} color={theme.colors.approved} />}
          label="Clean Timesheets"
          value={stats ? stats.cleanCount : '—'}
          caption="agents verified"
          color="approved"
        />
        <StatusCard
          icon={<Clock size={20} color={theme.colors.pending} />}
          label="Time Saved"
          value={stats ? `${stats.timeSavedHours.toFixed(1)}h` : '—'}
          caption="this week"
          color="pending"
        />
        <StatusCard
          icon={<DollarSign size={20} color={theme.colors.approved} />}
          label="Monthly Commissions"
          value={stats ? usdK(stats.totalCommissions) : '—'}
          caption={stats ? `calculated for ${stats.monthLabel.replace(' Commissions', '')}` : ''}
          color="approved"
        />
      </div>

      {/* Tabs */}
      <TabBar tabs={TABS} activeId={selectedTab} onChange={setSelectedTab} />

      {/* Active view */}
      {selectedTab === 'weekly'   && <WeeklyVerificationView data={weekly} />}
      {selectedTab === 'monthly'  && <MonthlyCommissionsView data={commissions} />}
      {selectedTab === 'contests' && <ContestTrackingView data={contests} />}

      <ContestConfigModal
        isOpen={showContestConfig}
        onClose={() => setShowContestConfig(false)}
        contests={contests?.contests ?? []}
      />
    </div>
  );
}

export default App;
