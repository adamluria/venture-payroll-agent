// Design tokens for venture-payroll-agent.
// Single source of truth — every component imports from here.
// Semantic colors enforce the project rule: flagged in coral, approved in teal, pending in amber.

export const theme = {
  colors: {
    bg: '#0A0D10',
    surface: '#11151A',
    border: '#1E2530',
    text: '#E8EDF3',
    muted: '#8B95A3',
    dim: '#4A5568',

    // Semantic — use these for state-driven styling
    flagged: '#F87171',   // coral — flagged agents / errors
    approved: '#2DD4A8',  // teal — approved / clean / success metrics
    pending: '#F0A830',   // amber — actions / pending / accent

    // Direct aliases (kept for readability in specific contexts)
    accent: '#F0A830',
    green: '#2DD4A8',
    red: '#F87171',
  },
  fonts: {
    body: "'Outfit', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radius: {
    sm: 4,
    md: 6,
    lg: 8,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 30,
  },
};

// Status → semantic color mapping. Centralized so badges and tables agree.
export const statusColor = {
  flagged: theme.colors.flagged,
  clean: theme.colors.approved,
  approved: theme.colors.approved,
  pending_review: theme.colors.pending,
  adjusted: theme.colors.pending,
};

// Tier → color mapping for commission tier badges.
export const tierColor = {
  1: theme.colors.flagged,  // Tier 1 = lowest — coral to draw attention
  2: theme.colors.pending,  // Tier 2 = mid — amber
  3: theme.colors.approved, // Tier 3 = top — teal
};
