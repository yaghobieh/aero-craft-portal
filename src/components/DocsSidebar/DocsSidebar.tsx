import type { ReactNode } from 'react';
import { Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { useI18n } from '@i18n/index';
import { GUIDE_SLUGS, GUIDE_SLUG_TO_I18N } from '@const/docsGuides.const';
import { DOCS_NAV_TREE } from '@const/docsNavTree.const';
import { PORTAL_CATEGORIES } from '@const/portalCategories.const';
import { docNavLabel } from '@utils/docLabel.utils';
import { DOCS_SIDEBAR_CATEGORY_ICON } from './DocsSidebar.icons';
import type { DocsSidebarProps } from './DocsSidebar.types';

export function DocsSidebar({ activePath, subsectionList: _subsectionList, onNavigate }: DocsSidebarProps) {
  const { t } = useI18n();

  const categoryHeader = (label: string, icon?: ReactNode, count?: number) => (
    <Flex align="center" gap={2} className="ac-docs-nav-category-row">
      {icon}
      <Typography variant="caption" weight="semibold" className="ac-docs-nav-category-title">{label}</Typography>
      {count !== undefined && (
        <Typography variant="caption" color="muted">{count}</Typography>
      )}
    </Flex>
  );

  const topicLeaf = (path: string) => {
    const active = activePath === path;
    const label = docNavLabel(t, path);
    return (
      <Link key={path} to={`/docs/${path}`} onClick={onNavigate}>
        <Button
          variant="ghost"
          size="sm"
          className={`ac-docs-nav-item ac-docs-nav-item--leaf${active ? ' ac-docs-nav-item--active' : ''}`}
        >
          {label}
        </Button>
      </Link>
    );
  };

  const sectionLabel = (children: ReactNode) => (
    <Typography variant="caption" color="muted" className="ac-docs-nav-section-label">
      {children}
    </Typography>
  );

  return (
    <Flex direction="column" gap={1} className="ac-docs-nav-root">
      <Link to="/docs" onClick={onNavigate}>
        <Button
          variant="ghost"
          size="sm"
          className={`ac-docs-nav-item${activePath === 'index' ? ' ac-docs-nav-item--active' : ''}`}
        >
          <Flex align="center" gap={2}>
            <BearIcons.BookOpenIcon size="xs" />
            {t.docs.overview}
          </Flex>
        </Button>
      </Link>

      {sectionLabel(t.docsNav['getting-started'])}
      <Link to="/docs/getting-started" onClick={onNavigate}>
        <Button
          variant="ghost"
          size="sm"
          className={`ac-docs-nav-item${activePath === 'getting-started' ? ' ac-docs-nav-item--active' : ''}`}
        >
          {t.docsNav['getting-started']}
        </Button>
      </Link>
      {DOCS_NAV_TREE[0]?.children?.map((n) => (n.path ? topicLeaf(n.path) : null))}

      {sectionLabel(t.docsNav['core-concepts'])}
      <Link to="/docs/core-concepts" onClick={onNavigate}>
        <Button
          variant="ghost"
          size="sm"
          className={`ac-docs-nav-item${activePath === 'core-concepts' ? ' ac-docs-nav-item--active' : ''}`}
        >
          {t.docsNav['core-concepts']}
        </Button>
      </Link>
      {DOCS_NAV_TREE[1]?.children?.map((n) => (n.path ? topicLeaf(n.path) : null))}

      {sectionLabel(t.docs.guidesLabel)}
      {GUIDE_SLUGS.map((guideSlug) => {
        const active = activePath === guideSlug;
        return (
          <Link key={guideSlug} to={`/docs/${guideSlug}`} onClick={onNavigate}>
            <Button
              variant="ghost"
              size="sm"
              className={`ac-docs-nav-item${active ? ' ac-docs-nav-item--active' : ''}`}
            >
              <Flex align="center" gap={2}>
                <BearIcons.ArticleIcon size="xs" />
                {t.docs.guides[GUIDE_SLUG_TO_I18N[guideSlug]].title}
              </Flex>
            </Button>
          </Link>
        );
      })}

      {sectionLabel(t.docs.referenceLabel)}
      <Link to="/docs/reference" onClick={onNavigate}>
        <Button
          variant="ghost"
          size="sm"
          className={`ac-docs-nav-item${activePath === 'reference' ? ' ac-docs-nav-item--active' : ''}`}
        >
          <Flex align="center" gap={2}>
            <BearIcons.BookOpenIcon size="xs" />
            {t.docsNav.reference}
          </Flex>
        </Button>
      </Link>

      {PORTAL_CATEGORIES.map((cat) => (
        <Flex key={cat.id} direction="column" gap={0}>
          {categoryHeader(
            t.docsNav[`reference/cat/${cat.id}`] ?? cat.label,
            DOCS_SIDEBAR_CATEGORY_ICON[cat.id],
            cat.properties.length,
          )}
          {cat.properties.map((prop) => topicLeaf(`reference/${prop}`))}
        </Flex>
      ))}
    </Flex>
  );
}
