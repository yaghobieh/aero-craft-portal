import { useMemo, useState } from 'react';
import { Button, Flex, Input, Typography } from '@forgedevstack/bear';
import type { StudioClassPickerProps } from './StudioClassPicker.types';
import {
  CLASS_GROUPS,
  PICKER_MAX_HEIGHT,
  PICKER_MAX_PER_GROUP,
  PICKER_WIDTH,
} from './StudioClassPicker.const';

/**
 * Floating popover that lists every AeroCraft class grouped by category with a
 * filter input. Clicking a chip toggles that class on the selected studio block.
 */
export function StudioClassPicker({
  x,
  y,
  activeClasses,
  onToggle,
  onApplyAll,
  onClose,
  title,
  relatedClasses,
}: StudioClassPickerProps) {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    if (!normalizedQuery) return CLASS_GROUPS;
    return CLASS_GROUPS
      .map((g) => ({
        ...g,
        classes: g.classes.filter((c) => c.toLowerCase().includes(normalizedQuery)),
      }))
      .filter((g) => g.classes.length > 0);
  }, [normalizedQuery]);

  const activeSet = useMemo(() => new Set(activeClasses), [activeClasses]);

  const clampedLeft = Math.min(x, Math.max(12, window.innerWidth - PICKER_WIDTH - 12));
  const clampedTop = Math.min(y, Math.max(12, window.innerHeight - PICKER_MAX_HEIGHT - 12));

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        position: 'fixed',
        left: clampedLeft,
        top: clampedTop,
        zIndex: 2500,
        width: PICKER_WIDTH,
        maxHeight: PICKER_MAX_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bear-bg-primary)',
        border: '1px solid var(--bear-primary-600)',
        borderRadius: 10,
        boxShadow: '0 18px 48px rgba(0,0,0,0.45)',
        overflow: 'hidden',
      }}
    >
      <Flex direction="column" gap={2} style={{ padding: 10, borderBottom: '1px solid var(--bear-border-subtle)' }}>
        <Flex direction="row" align="center" justify="between" gap={2}>
          <Typography variant="caption" weight="semibold" style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10 }}>
            All classes{title ? ` — ${title}` : ''}
          </Typography>
          <Button size="sm" variant="ghost" onClick={onClose} aria-label="close picker">✕</Button>
        </Flex>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter (e.g. flex, justify, left-5, rounded)"
          autoFocus
        />
        {relatedClasses && relatedClasses.length > 0 && (
          <Flex direction="row" align="center" justify="between" gap={2}>
            <Typography variant="caption" color="muted">
              Suggested for this block
            </Typography>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onApplyAll(relatedClasses)}
            >
              Apply all
            </Button>
          </Flex>
        )}
      </Flex>

      <div style={{ padding: 8, overflowY: 'auto' }}>
        {filteredGroups.length === 0 && (
          <Typography variant="caption" color="muted" style={{ display: 'block', padding: 8 }}>
            No classes match &ldquo;{query}&rdquo;.
          </Typography>
        )}
        {filteredGroups.map((g) => {
          const visible = g.classes.slice(0, PICKER_MAX_PER_GROUP);
          const hidden = g.classes.length - visible.length;
          return (
            <div key={g.group} style={{ marginBottom: 10 }}>
              <Typography
                variant="caption"
                weight="semibold"
                style={{
                  display: 'block',
                  marginBottom: 6,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontSize: 10,
                  color: 'var(--bear-text-muted)',
                }}
              >
                {g.label} ({g.classes.length})
              </Typography>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {visible.map((cls) => {
                  const active = activeSet.has(cls);
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => onToggle(cls)}
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 999,
                        cursor: 'pointer',
                        border: `1px solid ${active ? 'var(--bear-primary-600)' : 'var(--bear-border-default)'}`,
                        backgroundColor: active ? 'rgba(37,99,235,0.16)' : 'transparent',
                        color: active ? 'var(--bear-primary-600)' : 'var(--bear-text-primary)',
                      }}
                    >
                      {cls}
                    </button>
                  );
                })}
                {hidden > 0 && (
                  <Typography variant="caption" color="muted" style={{ alignSelf: 'center' }}>
                    +{hidden} more — refine your search
                  </Typography>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
