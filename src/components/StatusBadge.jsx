// Pill-shaped status indicator. Enforces the project rule:
//   flagged → coral, approved/clean → teal, pending → amber, tier badges via tierColor.

import { theme, statusColor, tierColor } from '../config/theme.js';

export default function StatusBadge({ variant, tier, children }) {
  let bg = theme.colors.dim;

  if (variant === 'tier' && tier) {
    bg = tierColor[tier] ?? theme.colors.dim;
  } else if (variant && statusColor[variant]) {
    bg = statusColor[variant];
  }

  return (
    <span
      style={{
        backgroundColor: bg,
        color: theme.colors.bg,
        padding: '4px 8px',
        borderRadius: theme.radius.sm,
        fontSize: 12,
        fontWeight: 600,
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
