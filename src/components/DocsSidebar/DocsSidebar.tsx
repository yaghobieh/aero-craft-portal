import type { ReactNode, CSSProperties } from 'react';
import { Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { ALL_SHORTCUTS, GROUP_LABELS, GROUP_ORDER } from '@forgedevstack/aerocraft';
import { useI18n } from '../../i18n/index';
import { GUIDE_SLUGS, GUIDE_SLUG_TO_I18N } from '../../constants/docsGuides.const';
import { DOCS_NAV_TREE } from '../../constants/docsNavTree.const';
import type { DocSection } from '../../utils/docsSections.utils';
import { docNavLabel } from '../../utils/docLabel.utils';

const GROUP_ICON: Record<string, ReactNode> = {
  flex: <BearIcons.GridViewIcon size="xs" />,
  grid: <BearIcons.GridIcon size="xs" />,
  position: <BearIcons.MapPinIcon size="xs" />,
  size: <BearIcons.MaximizeIcon size="xs" />,
  spacing: <BearIcons.BoxIcon size="xs" />,
  gap: <BearIcons.HoneycombIcon size="xs" />,
  text: <BearIcons.TextFieldsIcon size="xs" />,
  display: <BearIcons.LayersIcon size="xs" />,
  overflow: <BearIcons.UnfoldMoreIcon size="xs" />,
  cursor: <BearIcons.MouseIcon size="xs" />,
  transition: <BearIcons.ZapIcon size="xs" />,
  interactive: <BearIcons.DragHandleIcon size="xs" />,
};

type DocsSidebarProps = {
  activePath: string;
  subsectionList: DocSection[];
  onNavigate: () => void;
};

const itemBaseStyle = (active: boolean, extra?: CSSProperties): CSSProperties => ({
  justifyContent: 'flex-start',
  width: '100%',
  borderLeft: `3px solid ${active ? 'var(--bear-primary-600)' : 'transparent'}`,
  borderRadius: 6,
  paddingLeft: 8,
  color: active ? 'var(--bear-primary-600)' : 'var(--bear-text-primary)',
  fontWeight: active ? 600 : 400,
  backgroundColor: active ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
  ...extra,
});

export function DocsSidebar({ activePath, subsectionList, onNavigate }: DocsSidebarProps) {
  const { t } = useI18n();

  const navBtn = (path: string, label: string, icon?: ReactNode) => {
    const active = activePath === path;
    const showCount = (GROUP_ORDER as readonly string[]).includes(path);
    return (
      <Link key={path} to={`/docs/${path}`} onClick={onNavigate}>
        <Button variant="ghost" size="sm" style={itemBaseStyle(active)}>
          <Flex align="center" gap={2} style={{ width: '100%', textAlign: 'left' }}>
            {icon}
            <span style={{ flex: 1 }}>{label}</span>
            {showCount && (
              <Typography variant="caption" color="muted">
                {Object.keys(ALL_SHORTCUTS[path] ?? {}).length}
              </Typography>
            )}
          </Flex>
        </Button>
      </Link>
    );
  };

  const topicLeaf = (path: string) => {
    const active = activePath === path;
    const label = docNavLabel(t, path);
    return (
      <Link key={path} to={`/docs/${path}`} onClick={onNavigate}>
        <Button variant="ghost" size="sm" style={itemBaseStyle(active, { fontSize: 12 })}>
          {label}
        </Button>
      </Link>
    );
  };

  const sectionLabel = (children: ReactNode) => (
    <Typography
      variant="caption"
      color="muted"
      style={{
        paddingLeft: 8,
        paddingTop: 12,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontSize: 10,
      }}
    >
      {children}
    </Typography>
  );

  return (
    <Flex direction="column" gap={1} style={{ width: '100%' }}>
      <Link to="/docs" onClick={onNavigate}>
        <Button variant="ghost" size="sm" style={itemBaseStyle(activePath === 'index')}>
          <Flex align="center" gap={2}>
            <BearIcons.BookOpenIcon size="xs" />
            {t.docs.overview}
          </Flex>
        </Button>
      </Link>

      {sectionLabel(t.docsNav['getting-started'])}
      <Link to="/docs/getting-started" onClick={onNavigate}>
        <Button variant="ghost" size="sm" style={itemBaseStyle(activePath === 'getting-started')}>
          {t.docsNav['getting-started']}
        </Button>
      </Link>
      {DOCS_NAV_TREE[0]?.children?.map((n) => (n.path ? topicLeaf(n.path) : null))}

      {sectionLabel(t.docsNav['core-concepts'])}
      <Link to="/docs/core-concepts" onClick={onNavigate}>
        <Button variant="ghost" size="sm" style={itemBaseStyle(activePath === 'core-concepts')}>
          {t.docsNav['core-concepts']}
        </Button>
      </Link>
      {DOCS_NAV_TREE[1]?.children?.map((n) => (n.path ? topicLeaf(n.path) : null))}

      {sectionLabel(t.docs.guidesLabel)}
      {GUIDE_SLUGS.map((guideSlug) => {
        const active = activePath === guideSlug;
        return (
          <Link key={guideSlug} to={`/docs/${guideSlug}`} onClick={onNavigate}>
            <Button variant="ghost" size="sm" style={itemBaseStyle(active)}>
              <Flex align="center" gap={2}>
                <BearIcons.ArticleIcon size="xs" />
                {t.docs.guides[GUIDE_SLUG_TO_I18N[guideSlug]].title}
              </Flex>
            </Button>
          </Link>
        );
      })}

      {sectionLabel(t.docs.referenceLabel)}
      {GROUP_ORDER.map((g) => (
        <Flex key={g} direction="column" gap={0}>
          {navBtn(g, t.docs.groups[g as keyof typeof t.docs.groups] ?? GROUP_LABELS[g], GROUP_ICON[g] ?? <BearIcons.BoxIcon size="xs" />)}
          {activePath === g && subsectionList.length > 0 && (
            <Flex direction="column" gap={0} style={{ paddingLeft: 20, marginTop: 2, marginBottom: 4 }}>
              {subsectionList.map((sec) => {
                const title = t.docs.subsections[sec.id as keyof typeof t.docs.subsections] ?? sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#ac-section-${sec.id}`}
                    onClick={onNavigate}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{
                        justifyContent: 'flex-start',
                        width: '100%',
                        fontSize: 12,
                        color: 'var(--bear-text-muted)',
                      }}
                    >
                      {title}
                    </Button>
                  </a>
                );
              })}
            </Flex>
          )}
        </Flex>
      ))}

      {DOCS_NAV_TREE.slice(2).map((section) => (
        <Flex key={section.id} direction="column" gap={0}>
          {sectionLabel(docNavLabel(t, section.id))}
          {section.children?.map((n) => (n.path ? topicLeaf(n.path) : null))}
        </Flex>
      ))}
    </Flex>
  );
}
