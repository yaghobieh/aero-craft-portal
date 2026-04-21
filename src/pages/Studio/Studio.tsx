import { useEffect, useMemo, useState } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import {
  Button,
  Card,
  CodeBlock,
  Flex,
  Typography,
  BearIcons,
} from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { ROUTES } from '@const/routes.const';
import { STUDIO_CANVAS_MIN_HEIGHT_PX } from '@const/numbers.const';
import { LivePreview } from '@components/LivePreview';
import { STUDIO_PRESETS, type StudioBlockPreset } from './Studio.const';
import { StudioClassPicker } from './StudioClassPicker';
import { StudioClassField } from './StudioClassField';
import { DEFAULT_STUDIO_CONFIG, StudioConfigPanel, type StudioConfigState } from './StudioConfigPanel';

type CanvasBlock = StudioBlockPreset & { instanceId: string; overrideMarkup?: string };

type ContextMenuState = { instanceId: string; x: number; y: number };

function extractRootClasses(html: string): string {
  const m = html.match(/class="([^"]*)"/);
  return m ? m[1] : '';
}

function replaceRootClasses(html: string, newClasses: string): string {
  if (/class="[^"]*"/.test(html)) {
    return html.replace(/class="[^"]*"/, `class="${newClasses}"`);
  }
  return html.replace(/^(\s*<[a-zA-Z][a-zA-Z0-9-]*)/, `$1 class="${newClasses}"`);
}

export function Studio() {
  const { t } = useI18n();
  const [blocks, setBlocks] = useState<CanvasBlock[]>([
    { ...STUDIO_PRESETS[0], instanceId: 'b0' },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>('b0');
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [studioConfig, setStudioConfig] = useState<StudioConfigState>(DEFAULT_STUDIO_CONFIG);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    if (!contextMenu) return;
    const close = (e: Event) => {
      if ((e as KeyboardEvent).key && (e as KeyboardEvent).key !== 'Escape') return;
      setContextMenu(null);
    };
    const closeOnScroll = () => setContextMenu(null);
    window.addEventListener('keydown', close);
    window.addEventListener('scroll', closeOnScroll, true);
    return () => {
      window.removeEventListener('keydown', close);
      window.removeEventListener('scroll', closeOnScroll, true);
    };
  }, [contextMenu]);

  const selected = blocks.find((b) => b.instanceId === selectedId) ?? null;
  const selectedClasses = selected ? extractRootClasses(selected.overrideMarkup ?? selected.markup) : '';
  const blockCountLabel = t.studio.blockCountTemplate.replace('{count}', String(blocks.length));

  const appendPreset = (preset: StudioBlockPreset) => {
    const instanceId = `b${Date.now()}`;
    setBlocks((prev) => [...prev, { ...preset, instanceId }]);
    setSelectedId(instanceId);
  };

  const duplicateBlock = (instanceId: string) => {
    const b = blocks.find((x) => x.instanceId === instanceId);
    if (!b) return;
    const newInstanceId = `b${Date.now()}`;
    setBlocks((prev) => {
      const idx = prev.findIndex((x) => x.instanceId === instanceId);
      const clone: CanvasBlock = {
        ...b,
        instanceId: newInstanceId,
        overrideMarkup: b.overrideMarkup,
      };
      const next = prev.slice();
      next.splice(idx + 1, 0, clone);
      return next;
    });
    setSelectedId(newInstanceId);
  };

  const removeBlock = (instanceId: string) => {
    setBlocks((prev) => prev.filter((x) => x.instanceId !== instanceId));
    if (selectedId === instanceId) setSelectedId(null);
  };

  const moveBlock = (instanceId: string, dir: -1 | 1) => {
    setBlocks((prev) => {
      const i = prev.findIndex((b) => b.instanceId === instanceId);
      if (i < 0) return prev;
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const copy = prev.slice();
      const [it] = copy.splice(i, 1);
      copy.splice(j, 0, it);
      return copy;
    });
  };

  const updateSelectedClasses = (newClasses: string) => {
    if (!selected) return;
    const base = selected.markup;
    const updated = replaceRootClasses(base, newClasses);
    setBlocks((prev) => prev.map((b) => (b.instanceId === selected.instanceId ? { ...b, overrideMarkup: updated } : b)));
  };

  const toggleClassOnBlock = (instanceId: string, className: string) => {
    setBlocks((prev) => prev.map((b) => {
      if (b.instanceId !== instanceId) return b;
      const current = extractRootClasses(b.overrideMarkup ?? b.markup).split(/\s+/).filter(Boolean);
      const has = current.includes(className);
      const next = has ? current.filter((c) => c !== className) : [...current, className];
      const updated = replaceRootClasses(b.overrideMarkup ?? b.markup, next.join(' '));
      return { ...b, overrideMarkup: updated };
    }));
  };

  const applyManyClasses = (instanceId: string, classNames: string[]) => {
    if (classNames.length === 0) return;
    setBlocks((prev) => prev.map((b) => {
      if (b.instanceId !== instanceId) return b;
      const current = extractRootClasses(b.overrideMarkup ?? b.markup).split(/\s+/).filter(Boolean);
      const merged = Array.from(new Set([...current, ...classNames]));
      const updated = replaceRootClasses(b.overrideMarkup ?? b.markup, merged.join(' '));
      return { ...b, overrideMarkup: updated };
    }));
  };

  const openContextMenu = (instanceId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(instanceId);
    setContextMenu({ instanceId, x: e.clientX, y: e.clientY });
  };

  const contextBlock = contextMenu ? blocks.find((b) => b.instanceId === contextMenu.instanceId) : null;
  const contextClasses = contextBlock
    ? extractRootClasses(contextBlock.overrideMarkup ?? contextBlock.markup).split(/\s+/).filter(Boolean)
    : [];

  const resetBlock = () => {
    if (!selected) return;
    setBlocks((prev) => prev.map((b) => (b.instanceId === selected.instanceId ? { ...b, overrideMarkup: undefined } : b)));
  };

  const clearCanvas = () => setBlocks([]);

  const openPickerForSelected = () => {
    if (!selected) return;
    setContextMenu({ instanceId: selected.instanceId, x: window.innerWidth / 2 - 180, y: 120 });
  };

  const canvasMarkup = useMemo(
    () => blocks
      .map((b) => `<div data-ac-block>${b.overrideMarkup ?? b.markup}</div>`)
      .join('\n'),
    [blocks],
  );

  const exportMarkup = useMemo(
    () => blocks.map((b) => b.overrideMarkup ?? b.markup).join('\n\n'),
    [blocks],
  );

  const exportCode = exportMarkup || t.studio.exportEmptyComment;

  return (
    <Flex direction="column" gap={4} className="ac-studio-page">
      <Flex direction="row" align="center" justify="between" className="ac-studio-toolbar">
        <Link to={ROUTES.HOME}>
          <Button variant="ghost" size="sm" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />}>
            {t.studio.back}
          </Button>
        </Link>
        <Typography variant="h4" weight="bold">{t.studio.title}</Typography>
        <Flex direction="row" gap={2}>
          <Button
            variant={showConfig ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowConfig((v) => !v)}
            leftIcon={<BearIcons.SettingsIcon size="xs" />}
          >
            {showConfig ? t.studio.configHide : t.studio.configShow}
          </Button>
          <Button variant="outline" size="sm" onClick={clearCanvas}>{t.studio.reset}</Button>
        </Flex>
      </Flex>

      <Typography variant="body2" color="muted" className="ac-studio-lead">{t.studio.lead}</Typography>

      {showConfig ? (
        <StudioConfigPanel value={studioConfig} onChange={setStudioConfig} />
      ) : null}

      <Typography variant="caption" color="muted" className="ac-studio-tip">
        {t.studio.tipClassPicker}
      </Typography>

      <div className="ac-studio-grid">
        <Card padding="md" radius="lg" className="ac-studio-palette-card">
          <Typography variant="caption" color="muted" weight="semibold" className="ac-studio-palette-heading">
            {t.studio.blocksPaletteTitle}
          </Typography>
          <Flex direction="column" gap={2} className="ac-studio-palette-list">
            {STUDIO_PRESETS.map((p) => (
              <Button
                key={p.id}
                variant="ghost"
                size="sm"
                onClick={() => appendPreset(p)}
                className="ac-studio-preset-btn"
              >
                <Flex direction="column" align="start" gap={0} className="ac-studio-preset-inner">
                  <Typography variant="body2" weight="semibold">{p.title}</Typography>
                  <Typography variant="caption" color="muted" className="ac-studio-preset-desc">{p.description}</Typography>
                </Flex>
              </Button>
            ))}
          </Flex>
        </Card>

        <Flex direction="column" gap={3} className="ac-studio-center-col">
          <Card padding="md" radius="lg" className="ac-studio-center-card">
            <Flex direction="row" align="center" justify="between" className="ac-studio-preview-head">
              <Typography variant="caption" color="muted" weight="semibold">{t.studio.preview}</Typography>
              <Typography variant="caption" color="muted">{blockCountLabel}</Typography>
            </Flex>

            <LivePreview markup={canvasMarkup} label={t.studio.canvasLabel} minHeight={STUDIO_CANVAS_MIN_HEIGHT_PX} />

            <Flex direction="column" gap={2} className="ac-studio-edit-below-preview">
              <Typography variant="caption" color="muted" weight="semibold" className="ac-studio-edit-heading">
                {t.studio.editClassesTitle}
              </Typography>
              {selected ? (
                <>
                  <Typography variant="body2" weight="semibold">{selected.title}</Typography>
                  <StudioClassField
                    value={selectedClasses}
                    onChange={updateSelectedClasses}
                    placeholder={t.studio.classInputPlaceholder}
                  />
                  <Typography variant="caption" color="muted">
                    {t.studio.classInputHelp}
                  </Typography>
                  <Flex direction="row" gap={2} className="ac-studio-edit-actions">
                    <Button variant="primary" size="sm" onClick={openPickerForSelected}>
                      {t.studio.browseAllClasses}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={resetBlock}>
                      {t.studio.resetBlock}
                    </Button>
                  </Flex>
                </>
              ) : (
                <Typography variant="caption" color="muted">
                  {t.studio.selectBlockPrompt}
                </Typography>
              )}
            </Flex>

            <Flex direction="column" gap={1} className="ac-studio-block-list">
              {blocks.map((b, idx) => {
                const isSel = b.instanceId === selectedId;
                return (
                  <Flex
                    key={b.instanceId}
                    direction="row"
                    align="center"
                    gap={2}
                    className={`ac-studio-block-row${isSel ? ' ac-studio-block-row--selected' : ''}`}
                    onClick={() => setSelectedId(b.instanceId)}
                    onContextMenu={(e) => openContextMenu(b.instanceId, e)}
                    title={t.studio.blockRowTitle}
                  >
                    <Typography variant="body2" weight={isSel ? 'semibold' : 'normal'} className="ac-studio-block-title">
                      {idx + 1}. {b.title}
                    </Typography>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); duplicateBlock(b.instanceId); }}
                      aria-label={t.studio.duplicateBlock}
                      title={t.studio.duplicateBlock}
                    >
                      {t.studio.duplicateBlock}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); setSelectedId(b.instanceId); openContextMenu(b.instanceId, e); }}
                      aria-label={t.studio.ariaOpenClassPicker}
                      title={t.studio.ariaOpenClassPicker}
                    >
                      {t.studio.addClassesShort}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); moveBlock(b.instanceId, -1); }} aria-label={t.studio.ariaMoveBlockUp}>↑</Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); moveBlock(b.instanceId, 1); }} aria-label={t.studio.ariaMoveBlockDown}>↓</Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); removeBlock(b.instanceId); }} aria-label={t.studio.ariaRemoveBlock}>✕</Button>
                  </Flex>
                );
              })}
              {blocks.length === 0 && (
                <Typography variant="caption" color="muted">{t.studio.emptyCanvasHint}</Typography>
              )}
            </Flex>
          </Card>

          <CodeBlock code={exportCode} language="html" title={t.studio.code} showLineNumbers={false} copyable />
        </Flex>

      </div>

      {contextMenu && contextBlock && (
        <StudioClassPicker
          x={contextMenu.x}
          y={contextMenu.y}
          activeClasses={contextClasses}
          title={contextBlock.title}
          relatedClasses={contextBlock.relatedClasses}
          onToggle={(cls) => toggleClassOnBlock(contextBlock.instanceId, cls)}
          onApplyAll={(list) => applyManyClasses(contextBlock.instanceId, list)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </Flex>
  );
}
