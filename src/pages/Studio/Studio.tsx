import { useEffect, useMemo, useState } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import {
  Button,
  Card,
  CodeBlock,
  Flex,
  Typography,
  BearIcons,
  Input,
} from '@forgedevstack/bear';
import { useI18n } from '../../i18n/index';
import { ROUTES } from '../../constants/routes.const';
import { AC_ACCENT } from '../../constants/theme.const';
import { LivePreview } from '../../components/LivePreview';
import { STUDIO_PRESETS, type StudioBlockPreset } from './Studio.const';
import { StudioClassPicker } from './StudioClassPicker';

type CanvasBlock = StudioBlockPreset & { instanceId: string; overrideMarkup?: string };

type ContextMenuState = { instanceId: string; x: number; y: number };

/**
 * Pulls the class list from the first opening tag in a block's markup.
 */
function extractRootClasses(html: string): string {
  const m = html.match(/class="([^"]*)"/);
  return m ? m[1] : '';
}

/**
 * Writes a new class list into the first opening tag of a block's markup,
 * inserting a class attribute if one isn't already present.
 */
function replaceRootClasses(html: string, newClasses: string): string {
  if (/class="[^"]*"/.test(html)) {
    return html.replace(/class="[^"]*"/, `class="${newClasses}"`);
  }
  return html.replace(/^(\s*<[a-zA-Z][a-zA-Z0-9-]*)/, `$1 class="${newClasses}"`);
}

/**
 * Studio page: drag-style canvas where users compose blocks and live-edit
 * their AeroCraft class list. Right-click on any block opens the full class
 * picker with every known AeroCraft utility.
 */
export function Studio() {
  const { t } = useI18n();
  const [blocks, setBlocks] = useState<CanvasBlock[]>([
    { ...STUDIO_PRESETS[0], instanceId: 'b0' },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>('b0');
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

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

  const appendPreset = (preset: StudioBlockPreset) => {
    const instanceId = `b${Date.now()}`;
    setBlocks((prev) => [...prev, { ...preset, instanceId }]);
    setSelectedId(instanceId);
  };

  const removeBlock = (instanceId: string) => {
    setBlocks((prev) => prev.filter((b) => b.instanceId !== instanceId));
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

  return (
    <Flex direction="column" gap={4} style={{ width: '100%', maxWidth: '100%' }}>
      <Flex direction="row" align="center" justify="between" style={{ flexWrap: 'wrap', gap: 12 }}>
        <Link to={ROUTES.HOME}>
          <Button variant="ghost" size="sm" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />}>
            {t.studio.back}
          </Button>
        </Link>
        <Typography variant="h4" weight="bold">{t.studio.title}</Typography>
        <Flex direction="row" gap={2}>
          <Button variant="outline" size="sm" onClick={clearCanvas}>{t.studio.reset}</Button>
        </Flex>
      </Flex>

      <Typography variant="body2" color="muted" style={{ maxWidth: 720 }}>{t.studio.lead}</Typography>
      <Typography variant="caption" color="muted" style={{ maxWidth: 720 }}>
        Tip: right-click any block in the canvas list to open the full class picker (search across every AeroCraft utility: flex, justify-center, absolute, left-5, rounded-lg, shadow, opacity-50 …).
      </Typography>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 260px) minmax(0, 1fr) minmax(260px, 320px)',
          gap: 16,
          alignItems: 'start',
        }}
        className="ac-studio-grid"
      >
        <Card padding="md" radius="lg" style={{ border: '1px solid var(--bear-border-default)', maxHeight: 'min(80vh, 720px)', overflowY: 'auto' }}>
          <Typography variant="caption" color="muted" weight="semibold" style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10 }}>
            Blocks
          </Typography>
          <Flex direction="column" gap={2} style={{ marginTop: 8 }}>
            {STUDIO_PRESETS.map((p) => (
              <Button
                key={p.id}
                variant="ghost"
                size="sm"
                onClick={() => appendPreset(p)}
                style={{
                  justifyContent: 'flex-start',
                  width: '100%',
                  borderLeft: '3px solid transparent',
                  padding: '10px 10px',
                  borderRadius: 6,
                }}
              >
                <Flex direction="column" align="start" gap={0} style={{ width: '100%' }}>
                  <Typography variant="body2" weight="semibold">{p.title}</Typography>
                  <Typography variant="caption" color="muted" style={{ fontSize: 11 }}>{p.description}</Typography>
                </Flex>
              </Button>
            ))}
          </Flex>
        </Card>

        <Flex direction="column" gap={3} style={{ minWidth: 0 }}>
          <Card padding="md" radius="lg" style={{ border: '1px solid var(--bear-border-default)' }}>
            <Flex direction="row" align="center" justify="between" style={{ marginBottom: 10 }}>
              <Typography variant="caption" color="muted" weight="semibold">{t.studio.preview}</Typography>
              <Typography variant="caption" color="muted">{blocks.length} block(s)</Typography>
            </Flex>

            <LivePreview markup={canvasMarkup} label="Canvas" minHeight={420} />

            <Flex direction="column" gap={1} style={{ marginTop: 12 }}>
              {blocks.map((b, idx) => {
                const isSel = b.instanceId === selectedId;
                return (
                  <Flex
                    key={b.instanceId}
                    direction="row"
                    align="center"
                    gap={2}
                    style={{
                      padding: '6px 10px',
                      border: `1px solid ${isSel ? AC_ACCENT : 'var(--bear-border-subtle)'}`,
                      borderLeft: `3px solid ${isSel ? AC_ACCENT : 'transparent'}`,
                      borderRadius: 6,
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedId(b.instanceId)}
                    onContextMenu={(e) => openContextMenu(b.instanceId, e)}
                    title="Right-click for all classes"
                  >
                    <Typography variant="body2" weight={isSel ? 'semibold' : 'normal'} style={{ flex: 1 }}>
                      {idx + 1}. {b.title}
                    </Typography>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); setSelectedId(b.instanceId); openContextMenu(b.instanceId, e); }}
                      aria-label="classes"
                      title="Open class picker"
                    >
                      +cls
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); moveBlock(b.instanceId, -1); }} aria-label="up">↑</Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); moveBlock(b.instanceId, 1); }} aria-label="down">↓</Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); removeBlock(b.instanceId); }} aria-label="delete">✕</Button>
                  </Flex>
                );
              })}
              {blocks.length === 0 && (
                <Typography variant="caption" color="muted">Click a block on the left to add it to the canvas.</Typography>
              )}
            </Flex>
          </Card>

          <CodeBlock code={exportMarkup || '<!-- canvas empty -->'} language="html" title={t.studio.code} showLineNumbers={false} copyable />
        </Flex>

        <Card padding="md" radius="lg" style={{ border: '1px solid var(--bear-border-default)', position: 'sticky', top: 16 }}>
          <Typography variant="caption" color="muted" weight="semibold" style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10 }}>
            Edit classes
          </Typography>
          {selected ? (
            <Flex direction="column" gap={2} style={{ marginTop: 10 }}>
              <Typography variant="body2" weight="semibold">{selected.title}</Typography>
              <Input
                value={selectedClasses}
                onChange={(e) => updateSelectedClasses(e.target.value)}
                placeholder="flex justify-center p-6 rounded-lg"
              />
              <Typography variant="caption" color="muted">
                Edit the class list of the block&apos;s root element. Any AeroCraft class works (flex, absolute, left-5, rounded-xl, shadow-lg…).
              </Typography>
              <Button variant="primary" size="sm" onClick={openPickerForSelected} style={{ justifyContent: 'center' }}>
                Browse all classes
              </Button>
              <Button variant="ghost" size="sm" onClick={resetBlock} style={{ justifyContent: 'flex-start' }}>
                Reset block
              </Button>
            </Flex>
          ) : (
            <Typography variant="caption" color="muted" style={{ display: 'block', marginTop: 8 }}>
              Select a block in the canvas to edit its classes.
            </Typography>
          )}
        </Card>
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

      <style>
        {`
          @media (max-width: 1100px) {
            .ac-studio-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </Flex>
  );
}
