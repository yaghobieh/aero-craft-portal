import { Card, Typography } from '@forgedevstack/bear';
import type { DocsSitePage } from '../../i18n/types';

type DocShortcutsTableProps = {
  title: string;
  exampleLabel: string;
  noteLabel: string;
  rows: DocsSitePage['shortcuts'];
};

export function DocShortcutsTable({
  title,
  exampleLabel,
  noteLabel,
  rows,
}: DocShortcutsTableProps) {
  if (rows.length === 0) return null;
  return (
    <Card padding="lg" radius="lg" style={{ backgroundColor: 'var(--bear-bg-secondary)' }}>
      <Typography variant="h5" weight="semibold" style={{ marginBottom: 16 }}>{title}</Typography>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bear-bg-tertiary)' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="caption" weight="semibold">{exampleLabel}</Typography>
              </th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="caption" weight="semibold">{noteLabel}</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={`${row.example}-${i}`} style={{ borderTop: '1px solid var(--bear-border-subtle)' }}>
                <td style={{ padding: '8px 12px', whiteSpace: 'nowrap', fontFamily: 'monospace', fontWeight: 600 }}>
                  {row.example}
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <Typography variant="body2" color="muted">{row.note}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
