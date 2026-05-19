// Monthly commissions view — per-agent monthly summary with tier, base commission, contests, total.
// Data comes in as { month, rows } from getMonthlyCommissions().

import { theme } from '../config/theme.js';
import DataTable from '../components/DataTable.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

const usd = (n) => `$${n.toLocaleString()}`;

export default function MonthlyCommissionsView({ data }) {
  if (!data) return null;

  const columns = [
    { key: 'name', label: 'Agent', align: 'left', fontWeight: 500 },
    { key: 'completed_appointments', label: 'Appointments', align: 'right', mono: true },
    {
      key: 'tier',
      label: 'Tier',
      align: 'center',
      render: (row) => <StatusBadge variant="tier" tier={row.tier}>TIER {row.tier}</StatusBadge>,
    },
    { key: 'closed_won_deals', label: 'Deals', align: 'right', mono: true },
    {
      key: 'base_commission',
      label: 'Base Commission',
      align: 'right',
      mono: true,
      format: usd,
    },
    {
      key: 'total_contest_bonus',
      label: 'Contest Bonus',
      align: 'right',
      mono: true,
      render: (row) => (
        <span
          style={{
            fontFamily: theme.fonts.mono,
            color: row.total_contest_bonus > 0 ? theme.colors.approved : theme.colors.muted,
          }}
        >
          {usd(row.total_contest_bonus)}
        </span>
      ),
    },
    {
      key: 'total_payout',
      label: 'Total',
      align: 'right',
      mono: true,
      color: 'approved',
      fontWeight: 600,
      format: usd,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        border: `1px solid ${theme.colors.border}`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: theme.spacing.xl,
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{data.month.label}</h3>
        <p style={{ margin: '4px 0 0 0', color: theme.colors.muted, fontSize: 14 }}>
          Tier 1: $10/$100 &middot; Tier 2: $20/$200 &middot; Tier 3: $30/$300
        </p>
      </div>
      <DataTable columns={columns} rows={data.rows} rowKey="id" />
    </div>
  );
}
