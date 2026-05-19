// Weekly verification view — per-agent week summary cross-referenced against call data.
// Data comes in as { week, rows } from getWeeklyVerification().

import { theme } from '../config/theme.js';
import DataTable from '../components/DataTable.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

export default function WeeklyVerificationView({ data }) {
  if (!data) return null;

  const columns = [
    { key: 'name', label: 'Agent', align: 'left', fontWeight: 500 },
    { key: 'team', label: 'Team', align: 'left', color: 'muted' },
    {
      key: 'logged_hours',
      label: 'Logged Hours',
      align: 'right',
      mono: true,
      format: (v) => v.toFixed(1),
    },
    {
      key: 'verified_hours',
      label: 'Verified Hours',
      align: 'right',
      mono: true,
      format: (v) => v.toFixed(1),
    },
    {
      key: 'calls_per_hour',
      label: 'Calls/Hour',
      align: 'right',
      mono: true,
      render: (row) => (
        <span
          style={{
            color:
              row.calls_per_hour < 20 ? theme.colors.flagged : theme.colors.text,
            fontFamily: theme.fonts.mono,
          }}
        >
          {row.calls_per_hour.toFixed(1)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      align: 'left',
      render: (row) =>
        row.status === 'flagged' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            <StatusBadge variant="flagged">FLAGGED</StatusBadge>
            {row.issue && (
              <span style={{ color: theme.colors.muted, fontSize: 12 }}>{row.issue}</span>
            )}
          </div>
        ) : (
          <StatusBadge variant="clean">CLEAN</StatusBadge>
        ),
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
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{data.week.label}</h3>
        <p style={{ margin: '4px 0 0 0', color: theme.colors.muted, fontSize: 14 }}>
          Cross-referenced with Five9 call logs
        </p>
      </div>
      <DataTable columns={columns} rows={data.rows} rowKey="agent_id" />
    </div>
  );
}
