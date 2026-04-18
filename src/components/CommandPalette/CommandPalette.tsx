import { useEffect, useMemo, useState } from 'react';
import {
  Flex,
  Input,
  Modal,
  Typography,
  BearIcons,
} from '@forgedevstack/bear';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useI18n } from '../../i18n/index';
import { buildDocsSearchIndex } from '../../utils/docsSearch.utils';

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const [query, setQuery] = useState('');

  const items = useMemo(() => buildDocsSearchIndex(t), [t]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 80);
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q)
        || it.href.toLowerCase().includes(q)
        || it.group.toLowerCase().includes(q),
    ).slice(0, 80);
  }, [items, query]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const pick = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={t.commandPalette.open}
      size="md"
      showCloseButton
      closeOnBackdrop
      closeOnEscape
    >
      <Flex direction="column" gap={3}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.commandPalette.placeholder}
          autoFocus
        />
        <Typography variant="caption" color="muted">{t.commandPalette.hint}</Typography>
        <Flex direction="column" gap={1} style={{ maxHeight: 360, overflowY: 'auto' }}>
          {filtered.length === 0 && (
            <Typography variant="body2" color="muted">{t.commandPalette.empty}</Typography>
          )}
          {filtered.map((it) => (
            <button
              key={`${it.href}-${it.label}`}
              type="button"
              onClick={() => pick(it.href)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 4,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--bear-border-default)',
                background: 'var(--bear-bg-primary)',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <Flex direction="row" align="center" gap={2}>
                <BearIcons.Navigation.ChevronRightIcon size="xs" style={{ opacity: 0.45 }} />
                <Typography variant="body2" weight="semibold">{it.label}</Typography>
              </Flex>
              <Typography variant="caption" color="muted">{it.group}</Typography>
              <Typography variant="caption" style={{ fontFamily: 'monospace', opacity: 0.75 }}>
                {it.href}
              </Typography>
            </button>
          ))}
        </Flex>
      </Flex>
    </Modal>
  );
}
