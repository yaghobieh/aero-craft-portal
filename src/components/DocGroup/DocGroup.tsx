import { Card, Typography, Badge, Flex, Divider, CodeBlock } from '@forgedevstack/bear';
import { buildClassName } from '@forgedevstack/aerocraft';
import type { ShortcutDefinition } from '@forgedevstack/aerocraft';
import { LivePreview } from '../LivePreview';
import { BoxModel } from '../BoxModel';

interface DocGroupProps {
  label: string;
  shortcuts: ShortcutDefinition[];
  prefix: string;
  separator: string;
  columns: { shortcut: string; cssOutput: string; description: string };
  exampleMarkup: string;
  exampleTitle: string;
  group?: string;
  showBoxModel?: boolean;
}

function renderCssOutput(css: Record<string, string>): string {
  return Object.entries(css)
    .map(([prop, val]) => `${prop}: ${val}`)
    .join('; ');
}

function buildPreviewMarkupFromShortcuts(shortcuts: ShortcutDefinition[], prefix: string, separator: string): string {
  const first4 = shortcuts.slice(0, 4);
  const tiles = first4
    .map((s) => {
      const cls = buildClassName(prefix, separator, s.name);
      return `<div data-ac-block class="p-3" style="background:rgba(37,99,235,0.12);min-width:120px;border-radius:8px"><code style="font-family:monospace;font-size:11px">.${cls}</code><div class="${cls}" style="background:rgba(37,99,235,0.22);margin-top:6px;color:#e5e7eb;padding:6px;border-radius:6px">demo</div></div>`;
    })
    .join('');
  return `<div class="flex-row gap-3" style="flex-wrap:wrap">${tiles}</div>`;
}

export function DocGroup({
  label,
  shortcuts,
  prefix,
  separator,
  columns,
  exampleMarkup,
  exampleTitle,
  group,
  showBoxModel,
}: DocGroupProps) {
  const previewMarkup = shortcuts.length > 0 ? buildPreviewMarkupFromShortcuts(shortcuts, prefix, separator) : exampleMarkup;

  return (
    <Card padding="lg" radius="lg" style={{ backgroundColor: 'var(--bear-bg-secondary)' }}>
      <Flex direction="row" align="center" gap={2} style={{ marginBottom: 16 }}>
        <Badge variant="primary">{label}</Badge>
        <Typography variant="caption" color="muted">{shortcuts.length} classes</Typography>
      </Flex>

      <Typography variant="caption" color="muted" style={{ marginBottom: 8 }}>{exampleTitle}</Typography>
      <div style={{ marginBottom: 12 }}>
        <CodeBlock code={exampleMarkup} language="html" title="HTML" showLineNumbers={false} copyable />
      </div>

      <LivePreview markup={previewMarkup} label="Live preview" minHeight={120} />

      {(showBoxModel || group === 'spacing') && (
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
          <BoxModel />
        </div>
      )}

      <Divider style={{ marginTop: 16, marginBottom: 16 }} />

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '6px 12px', borderBottom: '1px solid var(--bear-border-default)' }}>
                <Typography variant="caption" color="muted" weight="semibold">{columns.shortcut}</Typography>
              </th>
              <th style={{ textAlign: 'left', padding: '6px 12px', borderBottom: '1px solid var(--bear-border-default)' }}>
                <Typography variant="caption" color="muted" weight="semibold">{columns.cssOutput}</Typography>
              </th>
              <th style={{ textAlign: 'left', padding: '6px 12px', borderBottom: '1px solid var(--bear-border-default)' }}>
                <Typography variant="caption" color="muted" weight="semibold">{columns.description}</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {shortcuts.map((s, i) => {
              const full = buildClassName(prefix, separator, s.name);
              return (
                <tr
                  key={s.name}
                  style={{
                    background: i % 2 === 0 ? 'transparent' : 'var(--bear-bg-tertiary)',
                  }}
                >
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--bear-border-subtle)', whiteSpace: 'nowrap' }}>
                    <Typography variant="body2" color="primary" style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                      .
                      {full}
                    </Typography>
                  </td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--bear-border-subtle)', maxWidth: 320 }}>
                    <Typography variant="body2" color="secondary" style={{ fontFamily: 'monospace', fontSize: 11, wordBreak: 'break-word' }}>
                      {renderCssOutput(s.css)}
                    </Typography>
                  </td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--bear-border-subtle)' }}>
                    <Typography variant="body2">{s.description}</Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
