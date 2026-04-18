import { Card, Typography } from '@forgedevstack/bear';
import type { PropsTableProps } from './PropsTable.types';

/**
 * Documents a set of utility classes or React props in a uniform table.
 * Inspired by Bear portal's PropsTable but restyled for the AeroCraft dark surface.
 */
export function PropsTable({ title, rows, showDefault = true }: PropsTableProps) {
  return (
    <Card padding="lg" radius="lg" style={{ backgroundColor: 'var(--bear-bg-secondary)', marginBottom: 24 }}>
      {title && (
        <Typography variant="h5" weight="semibold" style={{ marginBottom: 12 }}>
          {title}
        </Typography>
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bear-bg-tertiary)' }}>
              <th style={th}>Class / Prop</th>
              <th style={th}>Type / CSS</th>
              {showDefault && <th style={th}>Default</th>}
              <th style={th}>Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr
                key={r.name}
                style={{
                  backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  borderTop: '1px solid var(--bear-border-default)',
                }}
              >
                <td style={tdMono}>{r.name}</td>
                <td style={tdMono}>
                  <code style={codeStyle}>{r.type}</code>
                </td>
                {showDefault && <td style={tdMuted}>{r.default ?? '—'}</td>}
                <td style={tdMuted}>{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

const th: React.CSSProperties = {
  padding: '10px 14px',
  fontWeight: 600,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: 'var(--bear-text-secondary)',
};

const tdMono: React.CSSProperties = {
  padding: '10px 14px',
  fontFamily: 'Fira Code, ui-monospace, monospace',
  color: 'var(--bear-primary-500)',
  verticalAlign: 'top',
};

const tdMuted: React.CSSProperties = {
  padding: '10px 14px',
  color: 'var(--bear-text-secondary)',
  verticalAlign: 'top',
  fontSize: 13,
};

const codeStyle: React.CSSProperties = {
  padding: '1px 6px',
  borderRadius: 4,
  backgroundColor: 'rgba(255,255,255,0.05)',
  color: 'var(--bear-text-primary)',
  fontSize: 12,
};
