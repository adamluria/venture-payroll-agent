// Contest tracking view — cards for each active contest with current standings.
// Data comes in as { month, contests } from getContests().

import { theme } from '../config/theme.js';

const cardColorForType = {
  daily_leader: theme.colors.pending,
  team_goal: theme.colors.approved,
  metric_winner: theme.colors.pending,
};

function ContestCard({ contest }) {
  const headerColor = cardColorForType[contest.contest_type] ?? theme.colors.accent;
  const winner = contest.leader?.winner;
  const qualifiedCount = contest.leader?.qualified_count;

  return (
    <div
      style={{
        backgroundColor: theme.colors.bg,
        borderRadius: theme.radius.md,
        padding: theme.spacing.lg,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      <h4 style={{ margin: `0 0 ${theme.spacing.md}px 0`, fontSize: 16, color: headerColor }}>
        {contest.name} (${contest.prize_amount})
      </h4>
      <div style={{ fontSize: 13, color: theme.colors.muted, marginBottom: theme.spacing.sm }}>
        {contest.description}
      </div>
      <div style={{ fontSize: 13, color: theme.colors.muted, marginBottom: theme.spacing.sm }}>
        {contest.leader?.label}
      </div>
      {winner && (
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          {winner.agent_name}
          {contest.leader?.metric_label && (
            <span style={{ fontSize: 13, fontWeight: 400, color: theme.colors.muted, marginLeft: 8 }}>
              · {contest.leader.metric_label}
            </span>
          )}
        </div>
      )}
      {qualifiedCount !== undefined && (
        <div style={{ fontSize: 18, fontWeight: 600, color: theme.colors.approved }}>
          {qualifiedCount} agent{qualifiedCount === 1 ? '' : 's'} qualified
        </div>
      )}
    </div>
  );
}

export default function ContestTrackingView({ data }) {
  if (!data) return null;

  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        border: `1px solid ${theme.colors.border}`,
        padding: theme.spacing.xl,
      }}
    >
      <h3 style={{ margin: `0 0 ${theme.spacing.lg}px 0`, fontSize: 18, fontWeight: 600 }}>
        {data.month.label}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: theme.spacing.xl,
        }}
      >
        {data.contests.map((c) => (
          <ContestCard key={c.id} contest={c} />
        ))}
      </div>
    </div>
  );
}
