import { useMemo, useRef, useState } from 'react';
import { Flex } from '@forgedevstack/bear';
import { renderArbitraryStandaloneRule, resolveConfig } from '@forgedevstack/aerocraft';
import aerocraftCss from '@forgedevstack/aerocraft/styles.css?raw';
import { extractClassesFromMarkup, findRuleForClass } from './LivePreview.utils';

const ARBITRARY_CONFIG = resolveConfig({ prefix: '', separator: '-', mode: 'standalone', responsive: false });

/**
 * Builds CSS for arbitrary-value classes (e.g. `gap-[5px]`, `text-[#f00]`) found in markup.
 * The pre-built AeroCraft stylesheet only contains enumerated shortcuts, so arbitrary
 * classes must be expanded at render time.
 */
function buildArbitraryCss(classes: string[]): string {
  const out: string[] = [];
  for (const cls of classes) {
    if (!/\[[^\]]*\]|\{\{[^}]+\}\}/.test(cls)) continue;
    const rule = renderArbitraryStandaloneRule(ARBITRARY_CONFIG, cls);
    if (rule) out.push(rule);
  }
  return out.join('\n');
}

interface LivePreviewProps {
  markup: string;
  minHeight?: number;
  label?: string;
  background?: string;
  showClasses?: boolean;
}

const PREVIEW_BASE_CSS = `
  html, body { margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    color: inherit;
    padding: 16px;
    min-height: 100%;
    box-sizing: border-box;
  }
  [data-ac-block] { outline: 1px dashed rgba(37,99,235,0.35); border-radius: 8px; }
`;

/**
 * Renders arbitrary HTML markup inside a sandboxed iframe with AeroCraft utilities applied.
 * Optionally lists every class in the preview; hover any class to see its computed CSS.
 */
export function LivePreview({
  markup,
  minHeight = 140,
  label,
  background,
  showClasses = true,
}: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  const allClasses = useMemo(() => extractClassesFromMarkup(markup), [markup]);
  const arbitraryCss = useMemo(() => buildArbitraryCss(allClasses), [allClasses]);

  const srcDoc = useMemo(() => {
    const bg = background ?? '#140c1c';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <style>${aerocraftCss}</style>
  <style>${arbitraryCss}</style>
  <style>
    :root { color-scheme: dark; }
    ${PREVIEW_BASE_CSS}
    html, body { background: ${bg} !important; color: #f4e9f0 !important; }
  </style>
</head>
<body>${markup}</body>
</html>`;
  }, [markup, background, arbitraryCss]);

  const classes = showClasses ? allClasses : [];

  const hoveredRule = useMemo(() => {
    if (!hovered) return '';
    const staticRule = findRuleForClass(aerocraftCss, hovered);
    if (staticRule) return staticRule;
    const dynRule = findRuleForClass(arbitraryCss, hovered);
    if (dynRule) return dynRule;
    return '';
  }, [hovered, arbitraryCss]);

  const onEnterChip = (cls: string, e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHovered(cls);
    setHoverPos({ x: rect.left, y: rect.bottom + 6 });
  };

  const onLeaveChip = () => {
    setHovered(null);
    setHoverPos(null);
  };

  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid #2e1f3a',
        borderRadius: 10,
        backgroundColor: '#140c1c',
        padding: '12px',
        colorScheme: 'dark',
      }}
    >
      {label && (
        <div
          style={{
            display: 'block',
            marginBottom: 6,
            paddingLeft: 12,
            fontSize: 12,
            color: '#7c8aa6',
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </div>
      )}
      <iframe
        ref={iframeRef}
        title={label ?? 'Live preview'}
        srcDoc={srcDoc}
        sandbox=""
        style={{
          width: '100%',
          minHeight,
          border: 0,
          borderRadius: 8,
          backgroundColor: 'transparent',
          display: 'block',
        }}
      />

      {showClasses && classes.length > 0 && (
        <Flex
          direction="row"
          gap={1}
          style={{
            flexWrap: 'wrap',
            padding: '10px 12px 4px 12px',
            borderTop: '1px dashed rgba(255,255,255,0.08)',
            marginTop: 10,
          }}
        >
          <span
            style={{
              alignSelf: 'center',
              marginRight: 6,
              fontSize: 11,
              color: '#7c8aa6',
            }}
          >
            Classes:
          </span>
          {classes.map((cls) => (
            <span
              key={cls}
              onMouseEnter={(e) => onEnterChip(cls, e)}
              onMouseLeave={onLeaveChip}
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                padding: '2px 8px',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 999,
                cursor: 'help',
                backgroundColor: hovered === cls ? 'rgba(236,72,153,0.18)' : 'rgba(255,255,255,0.04)',
                color: hovered === cls ? '#f9a8d4' : '#e6ecf7',
              }}
            >
              {cls}
            </span>
          ))}
        </Flex>
      )}

      {hovered && hoverPos && (
        <div
          style={{
            position: 'fixed',
            left: hoverPos.x,
            top: hoverPos.y,
            zIndex: 2000,
            maxWidth: 380,
            padding: '10px 12px',
            backgroundColor: '#140c1c',
            border: '1px solid #ec4899',
            borderRadius: 8,
            boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            fontFamily: 'monospace',
            fontSize: 11,
            color: '#e6ecf7',
            whiteSpace: 'pre-wrap',
            pointerEvents: 'none',
          }}
        >
          <div style={{ color: '#f9a8d4', marginBottom: 4 }}>{`.${hovered}`}</div>
          <div style={{ opacity: 0.92 }}>{hoveredRule || '/* inline or non-AeroCraft class */'}</div>
        </div>
      )}
    </div>
  );
}
