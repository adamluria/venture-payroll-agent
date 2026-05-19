// Contest configuration modal — placeholder UI for entering monthly contest rules.
// The Contest Rules button in the header opens this. Real form is a v2 deliverable;
// for now it shows current month's contests as read-only with a placeholder for new rules.

import { theme } from '../config/theme.js';

export default function ContestConfigModal({ isOpen, onClose, contests = [] }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: theme.spacing.xl,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          border: `1px solid ${theme.colors.border}`,
          padding: theme.spacing.xxl,
          maxWidth: 560,
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: theme.spacing.lg,
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>Contest Rules</h2>
            <p style={{ margin: '4px 0 0 0', color: theme.colors.muted, fontSize: 14 }}>
              Configure monthly contests for the inside sales team
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              color: theme.colors.muted,
              padding: '6px 12px',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>

        <div style={{ marginBottom: theme.spacing.lg }}>
          <h3 style={{ margin: 0, fontSize: 14, color: theme.colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Active Contests
          </h3>
          {contests.length === 0 ? (
            <p style={{ color: theme.colors.muted, fontSize: 14 }}>No active contests this month.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: `${theme.spacing.md}px 0 0 0` }}>
              {contests.map((c) => (
                <li
                  key={c.id}
                  style={{
                    padding: theme.spacing.md,
                    borderBottom: `1px solid ${theme.colors.border}`,
                    fontSize: 14,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>
                    {c.name} <span style={{ color: theme.colors.muted, fontWeight: 400 }}>· ${c.prize_amount}</span>
                  </div>
                  <div style={{ color: theme.colors.muted, fontSize: 13 }}>{c.description}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          style={{
            backgroundColor: theme.colors.bg,
            borderRadius: theme.radius.md,
            padding: theme.spacing.lg,
            border: `1px dashed ${theme.colors.border}`,
            color: theme.colors.muted,
            fontSize: 14,
          }}
        >
          <strong style={{ color: theme.colors.text }}>Coming soon:</strong> Form for adding new
          contests, editing prize amounts, and setting eligibility rules (daily leader · team goal ·
          metric winner · custom).
        </div>
      </div>
    </div>
  );
}
