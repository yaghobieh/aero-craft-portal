import { useMemo, useRef, useState } from 'react';
import { Flex, Spinner } from '@forgedevstack/bear';
import aerocraftCss from '@forgedevstack/aerocraft/styles.css?raw';
import { LIVE_PREVIEW_DEFAULT_MIN_HEIGHT_PX, LIVE_PREVIEW_TOOLTIP_OFFSET_PX } from '@const/numbers.const';
import {
  EMPTY_STRING,
  LIVE_PREVIEW_BODY_TEXT_HEX,
  LIVE_PREVIEW_DEFAULT_BACKGROUND_HEX,
  LIVE_PREVIEW_IFRAME_FALLBACK_TITLE,
  LIVE_PREVIEW_LOADER_ARIA_LABEL,
  LIVE_PREVIEW_TOOLTIP_FALLBACK_RULE,
} from '@const/strings.const';
import { LIVE_PREVIEW_BASE_CSS } from './LivePreview.const';
import type { LivePreviewProps } from './LivePreview.types';
import { buildArbitraryCss, extractClassesFromMarkup, extractPreviewSampleFromDeclarations, findRuleForClass } from './LivePreview.utils';

export function LivePreview(props: LivePreviewProps) {
  const markup = props.markup;
  const minHeight = props.minHeight ?? LIVE_PREVIEW_DEFAULT_MIN_HEIGHT_PX;
  const label = props.label;
  const background = props.background ?? LIVE_PREVIEW_DEFAULT_BACKGROUND_HEX;
  const showClasses = props.showClasses ?? true;

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [loaded, setLoaded] = useState(false);

  const allClasses = useMemo(() => extractClassesFromMarkup(markup), [markup]);
  const arbitraryCss = useMemo(() => buildArbitraryCss(allClasses), [allClasses]);

  const srcDoc = useMemo(() => {
    const bg = background;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <style>${aerocraftCss}</style>
  <style>${arbitraryCss}</style>
  <style>
    :root { color-scheme: dark; }
    ${LIVE_PREVIEW_BASE_CSS}
    html, body { background: ${bg} !important; color: ${LIVE_PREVIEW_BODY_TEXT_HEX} !important; }
  </style>
</head>
<body>${markup}</body>
</html>`;
  }, [markup, background, arbitraryCss]);

  const classes = showClasses ? allClasses : [];

  const hoveredRule = useMemo(() => {
    if (!hovered) return EMPTY_STRING;
    const staticRule = findRuleForClass(aerocraftCss, hovered);
    if (staticRule) return staticRule;
    const dynRule = findRuleForClass(arbitraryCss, hovered);
    if (dynRule) return dynRule;
    return EMPTY_STRING;
  }, [hovered, arbitraryCss]);

  const onEnterChip = (cls: string, e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHovered(cls);
    setHoverPos({ x: rect.left, y: rect.bottom + LIVE_PREVIEW_TOOLTIP_OFFSET_PX });
  };

  const onLeaveChip = () => {
    setHovered(null);
    setHoverPos(null);
  };

  const iframeTitle = label ?? LIVE_PREVIEW_IFRAME_FALLBACK_TITLE;
  const tooltipRuleText = hoveredRule || LIVE_PREVIEW_TOOLTIP_FALLBACK_RULE;
  const tooltipSample = hoveredRule ? extractPreviewSampleFromDeclarations(hoveredRule) : null;

  return (
    <div className="ac-live-preview">
      {label ? <div className="ac-live-preview__label">{label}</div> : null}
      <div className="ac-live-preview__frame" style={{ minHeight }}>
        {!loaded && (
          <div className="ac-live-preview__loader" aria-live="polite" aria-label={LIVE_PREVIEW_LOADER_ARIA_LABEL}>
            <Spinner size="md" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          title={iframeTitle}
          srcDoc={srcDoc}
          sandbox=""
          onLoad={() => setLoaded(true)}
          className="ac-live-preview__iframe"
          style={{ minHeight, opacity: loaded ? 1 : 0 }}
        />
      </div>

      {showClasses && classes.length > 0 && (
        <Flex direction="row" gap={1} className="ac-live-preview__classes">
          <span className="ac-live-preview__classes-label">Classes:</span>
          {classes.map((cls) => (
            <span
              key={cls}
              onMouseEnter={(e) => onEnterChip(cls, e)}
              onMouseLeave={onLeaveChip}
              className={`ac-live-preview__chip${hovered === cls ? ' is-hovered' : EMPTY_STRING}`}
            >
              {cls}
            </span>
          ))}
        </Flex>
      )}

      {hovered && hoverPos && (
        <div
          className="ac-live-preview__tooltip"
          style={{ left: hoverPos.x, top: hoverPos.y }}
        >
          <div className="ac-live-preview__tooltip-name">
            {tooltipSample ? (
              <span
                className="ac-live-preview__tooltip-swatch"
                style={{ background: tooltipSample }}
                aria-hidden
              />
            ) : null}
            <span>{`.${hovered}`}</span>
          </div>
          <div className="ac-live-preview__tooltip-rule">{tooltipRuleText}</div>
        </div>
      )}
    </div>
  );
}
