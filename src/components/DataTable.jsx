// Generic data table. Columns describe how each cell renders.
//
// Column shape:
//   { key, label, align?, mono?, color?, format?, render? }
//     key:    field on row OR identifier (only required if no render fn)
//     label:  header text
//     align:  'left' | 'right' | 'center' (default 'left')
//     mono:   render value in mono font (for numbers)
//     color:  semantic theme color for the cell ('flagged', 'approved', 'muted', etc.)
//     format: (value, row) => display string (default: value as-is)
//     render: (row) => JSX  (overrides format/key entirely)
//
// rowKey: field on each row to use as React key (e.g. 'agent_id', 'id').

import { theme } from '../config/theme.js';

export default function DataTable({ columns, rows, rowKey = 'id', emptyState = 'No data' }) {
  if (!rows || rows.length === 0) {
    return (
      <div
        style={{
          padding: theme.spacing.xl,
          color: theme.colors.muted,
          textAlign: 'center',
          fontSize: 14,
        }}
      >
        {emptyState}
      </div>
    );
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: theme.colors.bg }}>
            {columns.map((col) => (
              <th
                key={col.key ?? col.label}
                style={{
                  padding: '12px 20px',
                  textAlign: col.align ?? 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: theme.colors.muted,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]} style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
              {columns.map((col) => {
                let content;
                if (col.render) {
                  content = col.render(row);
                } else {
                  const value = row[col.key];
                  content = col.format ? col.format(value, row) : value;
                }

                const cellColor = col.color ? theme.colors[col.color] ?? theme.colors.text : theme.colors.text;

                return (
                  <td
                    key={col.key ?? col.label}
                    style={{
                      padding: '16px 20px',
                      fontSize: 14,
                      textAlign: col.align ?? 'left',
                      fontFamily: col.mono ? theme.fonts.mono : theme.fonts.body,
                      color: cellColor,
                      fontWeight: col.fontWeight ?? 'normal',
                    }}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
