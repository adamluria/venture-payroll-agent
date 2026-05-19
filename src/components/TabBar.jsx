// Horizontal tab bar. Highlights the active tab and emits onChange(id) on click.

import { theme } from '../config/theme.js';

export default function TabBar({ tabs, activeId, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: `1px solid ${theme.colors.border}`,
        marginBottom: theme.spacing.xl,
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              padding: '12px 20px',
              color: isActive ? theme.colors.accent : theme.colors.muted,
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer',
              borderBottom: isActive
                ? `2px solid ${theme.colors.accent}`
                : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm,
            }}
          >
            {Icon && <Icon size={16} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
