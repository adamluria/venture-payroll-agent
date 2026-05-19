// Dashboard-top status card. Shows an icon, a label, a value, and an optional caption.
// `color` is a semantic color name from theme (e.g., 'flagged', 'approved', 'pending').

import { theme } from '../config/theme.js';

export default function StatusCard({ icon, label, value, caption, color = 'text' }) {
  const valueColor = theme.colors[color] ?? theme.colors.text;

  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.xl,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.md,
          marginBottom: theme.spacing.sm,
        }}
      >
        {icon}
        <span style={{ fontSize: 16, fontWeight: 500 }}>{label}</span>
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: valueColor,
          fontFamily: theme.fonts.mono,
        }}
      >
        {value}
      </div>
      {caption && <div style={{ fontSize: 14, color: theme.colors.muted }}>{caption}</div>}
    </div>
  );
}
