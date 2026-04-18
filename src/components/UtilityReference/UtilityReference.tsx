import { Card, CodeBlock, Flex, Typography } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { LivePreview } from '../LivePreview';
import type { UtilityReferencePageProps } from './UtilityReference.types';

const TOKEN_STYLE_RE = /(<[^>]+>)/g;

function renderTokens(text: string, kind: 'class' | 'styles') {
  const parts = text.split(TOKEN_STYLE_RE);
  return parts.map((p, i) => {
    if (p.startsWith('<') && p.endsWith('>')) {
      return (
        <span key={i} style={{ color: 'var(--bear-primary-400)', fontStyle: 'italic' }}>
          {p}
        </span>
      );
    }
    return (
      <span key={i} style={{ color: kind === 'class' ? 'var(--bear-primary-300)' : 'var(--bear-text-secondary)' }}>
        {p}
      </span>
    );
  });
}

/**
 * Page template for a single utility property (e.g. `flex`, `gap`, `justify-content`).
 * Follows the structure of tailwindcss.com's per-property reference pages:
 *
 *   1. Category eyebrow + title + description
 *   2. Quick reference table (Class | Styles)
 *   3. Examples — 4-5 named sub-sections with LivePreview + CodeBlock
 *   4. Using a custom value ([…] and (…var) syntax)
 *   5. Responsive design
 *   6. "Our shortcuts" — AeroCraft-only combos that save repetition
 *   7. Previous / Next links
 */
export function UtilityReferencePage(props: UtilityReferencePageProps) {
  const {
    category,
    title,
    description,
    quickReference,
    examples,
    customValue,
    responsive,
    shortcuts,
    shortcutsNote,
    prev,
    next,
  } = props;

  return (
    <Flex direction="column" gap={6} style={{ paddingBottom: 48 }}>
      <Flex direction="column" gap={2}>
        <Typography
          variant="caption"
          weight="semibold"
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--bear-text-muted)',
            fontSize: 12,
          }}
        >
          {category}
        </Typography>
        <Typography variant="h1" weight="bold" style={{ fontSize: 44, lineHeight: 1.05 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="muted" style={{ maxWidth: 820, fontSize: 16 }}>
          {description}
        </Typography>
      </Flex>

      <Card padding="none" radius="lg" style={{ backgroundColor: 'var(--bear-bg-secondary)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={thCell}>Class</th>
                <th style={thCell}>Styles</th>
              </tr>
            </thead>
            <tbody>
              {quickReference.map((r, i) => (
                <tr key={r.className + i} style={{ borderTop: '1px solid var(--bear-border-default)' }}>
                  <td style={tdMonoCell}>{renderTokens(r.className, 'class')}</td>
                  <td style={tdMonoCell}>{renderTokens(r.styles, 'styles')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Typography variant="h2" weight="bold" style={{ marginTop: 24 }}>
        Examples
      </Typography>

      {examples.map((ex) => (
        <Flex key={ex.id} id={`ex-${ex.id}`} direction="column" gap={3} style={{ scrollMarginTop: 96 }}>
          <Typography variant="h4" weight="semibold">
            {ex.title}
          </Typography>
          {ex.description && (
            <Typography variant="body2" color="muted" style={{ maxWidth: 820 }}>
              {ex.description}
            </Typography>
          )}
          <LivePreview
            markup={ex.markup}
            label="Live preview"
            minHeight={ex.minHeight ?? 140}
            showClasses
          />
          <CodeBlock
            code={ex.code ?? ex.markup}
            language="html"
            showLineNumbers={false}
            copyable
          />
        </Flex>
      ))}

      {customValue && (
        <Flex direction="column" gap={3}>
          <Typography variant="h3" weight="bold" style={{ marginTop: 16 }}>
            Using a custom value
          </Typography>
          {customValue.description && (
            <Typography variant="body2" color="muted" style={{ maxWidth: 820 }}>
              {customValue.description}
            </Typography>
          )}
          <CodeBlock code={customValue.bracketCode} language="html" showLineNumbers={false} copyable />
          {customValue.parenCode && (
            <>
              {customValue.parenDescription && (
                <Typography variant="body2" color="muted" style={{ maxWidth: 820 }}>
                  {customValue.parenDescription}
                </Typography>
              )}
              <CodeBlock code={customValue.parenCode} language="html" showLineNumbers={false} copyable />
            </>
          )}
        </Flex>
      )}

      {responsive && (
        <Flex direction="column" gap={3}>
          <Typography variant="h3" weight="bold" style={{ marginTop: 16 }}>
            Responsive design
          </Typography>
          {responsive.description && (
            <Typography variant="body2" color="muted" style={{ maxWidth: 820 }}>
              {responsive.description}
            </Typography>
          )}
          <CodeBlock code={responsive.code} language="html" showLineNumbers={false} copyable />
        </Flex>
      )}

      {shortcuts && shortcuts.length > 0 && (
        <Flex direction="column" gap={3}>
          <Flex direction="row" align="center" gap={2} style={{ flexWrap: 'wrap', marginTop: 16 }}>
            <Typography variant="h3" weight="bold">
              Our shortcuts
            </Typography>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: 999,
                background: 'linear-gradient(90deg, #ec4899, #c026d3)',
                color: '#1a0b1f',
              }}
            >
              AeroCraft only
            </span>
          </Flex>
          {shortcutsNote && (
            <Typography variant="body2" color="muted" style={{ maxWidth: 820 }}>
              {shortcutsNote}
            </Typography>
          )}
          <Card padding="none" radius="lg" style={{ backgroundColor: 'var(--bear-bg-secondary)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={thCell}>Shortcut</th>
                    <th style={thCell}>Styles</th>
                    <th style={thCell}>Why it exists</th>
                  </tr>
                </thead>
                <tbody>
                  {shortcuts.map((s, i) => (
                    <tr key={s.name + i} style={{ borderTop: '1px solid var(--bear-border-default)' }}>
                      <td style={tdMonoCell}>{renderTokens(s.name, 'class')}</td>
                      <td style={tdMonoCell}>{renderTokens(s.styles, 'styles')}</td>
                      <td style={tdMutedCell}>{s.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Flex>
      )}

      {(prev || next) && (
        <>
          <hr style={{ marginTop: 24, border: 0, borderTop: '1px solid var(--bear-border-default)' }} />
          <Flex direction="row" align="center" justify="between" style={{ gap: 12, flexWrap: 'wrap' }}>
            <div>
              {prev && (
                <Link to={prev.to}>
                  <span style={navLinkStyle}>
                    <span style={{ color: 'var(--bear-text-muted)' }}>← Previous</span>
                    <br />
                    <span style={{ color: 'var(--bear-text-primary)', fontWeight: 600 }}>{prev.label}</span>
                  </span>
                </Link>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              {next && (
                <Link to={next.to}>
                  <span style={navLinkStyle}>
                    <span style={{ color: 'var(--bear-text-muted)' }}>Next →</span>
                    <br />
                    <span style={{ color: 'var(--bear-text-primary)', fontWeight: 600 }}>{next.label}</span>
                  </span>
                </Link>
              )}
            </div>
          </Flex>
        </>
      )}
    </Flex>
  );
}

const thCell: React.CSSProperties = {
  padding: '12px 18px',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--bear-text-secondary)',
  textAlign: 'left',
  backgroundColor: 'rgba(255,255,255,0.02)',
  borderBottom: '1px solid var(--bear-border-default)',
};

const tdMonoCell: React.CSSProperties = {
  padding: '12px 18px',
  fontFamily: 'Fira Code, ui-monospace, monospace',
  fontSize: 13,
  verticalAlign: 'top',
};

const tdMutedCell: React.CSSProperties = {
  padding: '12px 18px',
  fontSize: 13,
  color: 'var(--bear-text-secondary)',
  verticalAlign: 'top',
};

const navLinkStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid var(--bear-border-default)',
  textDecoration: 'none',
  fontSize: 13,
  backgroundColor: 'var(--bear-bg-secondary)',
};
