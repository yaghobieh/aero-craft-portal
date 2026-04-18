import { useState } from 'react';
import { CodeBlock, Card, Flex, Typography, Badge } from '@forgedevstack/bear';
import { FRAMEWORKS } from './FrameworkTabs.const';

/**
 * Shows one Getting Started recipe per framework.
 * Each tab renders install + code blocks for that stack.
 */
export function FrameworkTabs() {
  const [active, setActive] = useState(FRAMEWORKS[0]?.id ?? '');
  const current = FRAMEWORKS.find((f) => f.id === active) ?? FRAMEWORKS[0];
  if (!current) return null;

  return (
    <Flex direction="column" gap={4}>
      <Flex direction="row" gap={2} style={{ flexWrap: 'wrap' }} role="tablist" aria-label="Framework">
        {FRAMEWORKS.map((fw) => {
          const isActive = fw.id === active;
          return (
            <button
              key={fw.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(fw.id)}
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                border: `1px solid ${isActive ? 'var(--bear-primary-600)' : 'var(--bear-border-default)'}`,
                backgroundColor: isActive ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                color: isActive ? 'var(--bear-primary-600)' : 'var(--bear-text-primary)',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
              }}
            >
              {fw.label}
            </button>
          );
        })}
      </Flex>

      <Card padding="lg" radius="lg" style={{ backgroundColor: 'var(--bear-bg-secondary)' }}>
        <Flex direction="column" gap={3}>
          <Flex direction="row" align="center" gap={2} style={{ flexWrap: 'wrap' }}>
            <Typography variant="h5" weight="bold">{current.label}</Typography>
            <Badge variant="primary">install</Badge>
            <Typography variant="caption" style={{ fontFamily: 'monospace' }}>{current.install}</Typography>
          </Flex>
          {current.note && (
            <Typography variant="body2" color="muted">{current.note}</Typography>
          )}
          <Flex direction="column" gap={3}>
            {current.blocks.map((b, idx) => (
              <CodeBlock
                key={`${current.id}-${idx}-${b.title}`}
                code={b.code}
                language={b.language}
                title={b.title}
                copyable
                showLineNumbers={false}
              />
            ))}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
