import { useMemo, useState } from 'react';
import { Link, useParams } from '@forgedevstack/forge-compass/react';
import {
  Badge,
  Button,
  Card,
  CodeBlock,
  Divider,
  Drawer,
  Flex,
  Typography,
  BearIcons,
} from '@forgedevstack/bear';
import { ALL_SHORTCUTS, GROUP_LABELS, GROUP_ORDER, buildClassName, resolveConfig } from '@forgedevstack/aerocraft';
import { DocGroup } from '@components/DocGroup';
import { DocGroupReference } from '@components/DocGroupReference';
import { useI18n } from '@i18n/index';
import { AEROCRAFT_VERSION } from '@const/routes.const';
import { DocsSidebar } from '@components/DocsSidebar';
import { buildDocSections } from '@utils/docsSections.utils';
import { buildPortalDemoExampleMarkup } from '@utils/docsExampleMarkup.utils';
import {
  DOC_CODE_CUSTOM_GAP,
  DOC_CODE_FLEX,
  DOC_CODE_GRID,
  DOC_CODE_RESPONSIVE,
} from '@const/docsExamples.const';
import { GUIDE_SLUGS, GUIDE_SLUG_TO_I18N, isGuideSlug } from '@const/docsGuides.const';
import { isTopicDocPath } from '@const/docsPropertyTopics.const';
import { DocShortcutsTable } from '@components/DocShortcutsTable';
import { FrameworkTabs } from '@components/FrameworkTabs';
import { formatCssPropertySlug } from '@utils/docLabel.utils';
import { buildPropertyShortcutRows } from '@utils/propertyDocShortcuts.utils';
import { CatalogPropertyPage } from '../Reference';
import { catalogHasSlug } from '@data/referenceCatalog';
import { RecipePage, RecipesHubPage } from '../Recipes';
import { getRecipe } from '@const/recipes.const';
import type { DocsSitePage } from '@i18n/types';
import { DocsAeroCraftPalette } from '@components/DocsAeroCraftPalette';
import { DOCS_CLASS_PREFIX, DOCS_CLASS_SEPARATOR, parseDocsPathParam } from '@const/docsPath.const';
import {
  DOCS_DRAWER_NAV,
  DOCS_H2_ROW,
  DOCS_INDEX_CARD,
  DOCS_INDEX_GRID,
  DOCS_LEAD_720,
  DOCS_LEAD_900,
  DOCS_NOT_FOUND,
  DOCS_NOT_FOUND_ICON,
  DOCS_PAGE_ASIDE,
  DOCS_PAGE_MAIN,
  DOCS_PAGE_MAIN_INNER,
  DOCS_PAGE_MAIN_OPEN,
  DOCS_PAGE_SHELL,
  DOCS_SECTION_ANCHOR,
} from '@const/docsPageLayout.const';
import { GROUP_ICON, REFERENCE_ROUTES, isGroupSlug } from './docsReference.registry';
import { DocsResponsiveBreakpointsTable } from '@components/DocsResponsiveBreakpointsTable';
import { DocsTaxonomyTable } from '@components/DocsTaxonomyTable';

export function DocsPage() {
  const { t } = useI18n();
  const params = useParams<Record<string, string>>();
  const docPath = parseDocsPathParam(params['*']);
  const [docsNavOpen, setDocsNavOpen] = useState(false);

  const breakpoints = useMemo(() => resolveConfig({}).breakpoints, []);
  const totalCount = useMemo(
    () => GROUP_ORDER.reduce((acc, g) => acc + Object.keys(ALL_SHORTCUTS[g] ?? {}).length, 0),
    [],
  );

  const activePath = docPath === undefined ? 'index' : docPath;

  const subsectionList = useMemo(() => {
    if (!docPath || docPath.includes('/')) return [];
    if (!isGroupSlug(docPath)) return [];
    return buildDocSections(docPath);
  }, [docPath]);

  const renderResponsive = () => (
    <Flex direction="column" gap={3}>
      <Typography variant="h4" weight="bold">{t.docs.responsiveTitle}</Typography>
      <Typography variant="body2" color="muted">{t.docs.responsiveBody}</Typography>
      <DocsResponsiveBreakpointsTable
        breakpoints={breakpoints}
        labels={{ name: t.docs.bpName, min: t.docs.bpMin, example: t.docs.bpExample }}
      />
      <Typography variant="caption" color="muted">{t.docs.responsiveNote}</Typography>
    </Flex>
  );

  const renderCustomValues = () => (
    <Flex direction="column" gap={3}>
      <Typography variant="h4" weight="bold">{t.docs.customValuesTitle}</Typography>
      <Typography variant="body2" color="muted">{t.docs.customValuesBody}</Typography>
      <CodeBlock code={DOC_CODE_CUSTOM_GAP} language="typescript" title="aerocraft.config.ts" showLineNumbers={false} copyable />
    </Flex>
  );

  const renderTaxonomy = () => (
    <Flex direction="column" gap={3}>
      <Typography variant="h4" weight="bold">{t.docs.taxonomyTitle}</Typography>
      <Typography variant="body2" color="muted" className={DOCS_LEAD_720}>{t.docs.taxonomyLead}</Typography>
      <DocsTaxonomyTable
        rows={t.docs.taxonomy}
        columnArea={t.docs.taxonomyColumnArea}
        columnNote={t.docs.taxonomyColumnNote}
      />
    </Flex>
  );

  const renderGuide = (guideSlug: typeof GUIDE_SLUGS[number]) => {
    const content = t.docs.guides[GUIDE_SLUG_TO_I18N[guideSlug]];
    return (
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Typography variant="h2" weight="bold">{content.title}</Typography>
          <Typography variant="body1" color="muted" className={DOCS_LEAD_720}>{content.lead}</Typography>
        </Flex>
        <CodeBlock code={content.code} language="markdown" showLineNumbers={false} copyable />
        {content.paragraphs.map((p, i) => (
          <Typography key={i} variant="body2" color="muted" className={DOCS_LEAD_720}>{p}</Typography>
        ))}
        <DocShortcutsTable
          title={t.docsProperty.shortcutsCaption}
          exampleLabel={t.docsProperty.exampleCol}
          noteLabel={t.docsProperty.noteCol}
          rows={[
            { example: 'flex-col gap-[12px]', note: t.docsProperty.rowArbitrary },
            { example: 'md:flex-row', note: t.docsProperty.rowResponsive },
          ]}
        />
      </Flex>
    );
  };

  const renderStaticSitePage = (page: DocsSitePage) => (
    <Flex direction="column" gap={5}>
      <Flex direction="column" gap={2}>
        <Typography variant="h2" weight="bold">{page.title}</Typography>
        <Typography variant="body1" color="muted" className={DOCS_LEAD_900}>{page.lead}</Typography>
      </Flex>
      {page.sections.map((s, i) => (
        <Flex key={`sec-${i}`} direction="column" gap={2}>
          <Typography variant="h4" weight="semibold">{s.title}</Typography>
          <Typography variant="body2" color="muted" className={DOCS_LEAD_900}>{s.body}</Typography>
        </Flex>
      ))}
      {page.codeBlocks?.map((cb, i) => (
        <CodeBlock
          key={`cb-${i}`}
          code={cb.code}
          language={cb.language}
          title={cb.title}
          showLineNumbers={false}
          copyable
        />
      ))}
      <DocShortcutsTable
        title={t.docsProperty.shortcutsCaption}
        exampleLabel={t.docsProperty.exampleCol}
        noteLabel={t.docsProperty.noteCol}
        rows={page.shortcuts}
      />
    </Flex>
  );

  const renderTopicPropertyPage = (fullPath: string) => {
    const property = fullPath.split('/').pop() ?? fullPath;
    const title = formatCssPropertySlug(property);
    const rows = buildPropertyShortcutRows(property, t);
    return (
      <Flex direction="column" gap={4}>
        <Typography variant="h2" weight="bold">{title}</Typography>
        <Typography variant="body1" color="muted" className={DOCS_LEAD_900}>{t.docsProperty.lead}</Typography>
        <DocShortcutsTable
          title={t.docsProperty.shortcutsCaption}
          exampleLabel={t.docsProperty.exampleCol}
          noteLabel={t.docsProperty.noteCol}
          rows={rows}
        />
      </Flex>
    );
  };

  const renderGroupDoc = (group: (typeof GROUP_ORDER)[number]) => {
    const sections = buildDocSections(group);
    const example =
      group === 'flex' ? DOC_CODE_FLEX
        : group === 'grid' ? DOC_CODE_GRID
          : DOC_CODE_RESPONSIVE;

    return (
      <Flex direction="column" gap={6}>
        <Flex direction="column" gap={2}>
          <div className={DOCS_H2_ROW}>
            <Typography variant="h2" weight="bold">{t.docs.groups[group as keyof typeof t.docs.groups] ?? GROUP_LABELS[group]}</Typography>
            <Badge variant="primary">v{AEROCRAFT_VERSION}</Badge>
            <Badge variant="secondary">{Object.keys(ALL_SHORTCUTS[group] ?? {}).length} classes</Badge>
          </div>
          <Typography variant="body1" color="muted" className={DOCS_LEAD_720}>{t.docs.subtitle}</Typography>
        </Flex>

        <DocGroupReference
          group={group}
          regularTitle={t.docs.regularCssTitle}
          arbitraryTitle={t.docs.arbitraryClassesTitle}
          arbitraryLead={t.docs.arbitraryExplainer}
        />

        <Flex direction="column" gap={2}>
          <Typography variant="h4" weight="bold">{t.docs.exampleTitle}</Typography>
          <CodeBlock code={example} language="html" title="HTML" showLineNumbers={false} copyable />
        </Flex>

        {renderResponsive()}

        {(group === 'gap' || group === 'spacing') && renderCustomValues()}

        <Divider />

        {sections.map((sec) => {
          const title = t.docs.subsections[sec.id as keyof typeof t.docs.subsections] ?? sec.id;
          return (
            <Flex
              key={sec.id}
              id={`ac-section-${sec.id}`}
              direction="column"
              gap={3}
              className={DOCS_SECTION_ANCHOR}
            >
              <Typography variant="h4" weight="semibold">{title}</Typography>
              <DocGroup
                label={title}
                shortcuts={sec.shortcuts}
                prefix={DOCS_CLASS_PREFIX}
                separator={DOCS_CLASS_SEPARATOR}
                columns={t.docs.columns}
                exampleMarkup={buildPortalDemoExampleMarkup(sec)}
                exampleTitle={t.docs.exampleMarkup}
                group={group}
              />
            </Flex>
          );
        })}
        <DocShortcutsTable
          title={t.docsProperty.shortcutsCaption}
          exampleLabel={t.docsProperty.exampleCol}
          noteLabel={t.docsProperty.noteCol}
          rows={[
            { example: 'h-[15px] w-[50%]', note: t.docsProperty.rowArbitrary },
            { example: 'gap-[1px]', note: t.docsProperty.rowArbitrary },
            { example: 'color-[#007FFF]', note: t.docsProperty.rowColor },
          ]}
        />
      </Flex>
    );
  };

  const renderIndex = () => (
    <Flex direction="column" gap={8}>
      <Flex direction="column" gap={2}>
        <div className={DOCS_H2_ROW}>
          <Typography variant="h2" weight="bold">{t.docs.title}</Typography>
          <Badge variant="primary">v{AEROCRAFT_VERSION}</Badge>
          <Badge variant="secondary">{totalCount} classes</Badge>
        </div>
        <Typography variant="body1" color="muted" className={DOCS_LEAD_720}>{t.docs.subtitle}</Typography>
      </Flex>

      {renderTaxonomy()}

      <div className={DOCS_INDEX_GRID}>
        {GROUP_ORDER.map((g) => (
          <Link key={g} to={`/docs/${g}`}>
            <Card padding="lg" radius="lg" className={DOCS_INDEX_CARD}>
              <Flex direction="column" gap={2}>
                <Flex direction="row" align="center" gap={2}>
                  {GROUP_ICON[g]}
                  <Typography variant="h6" weight="bold">{t.docs.groups[g as keyof typeof t.docs.groups]}</Typography>
                </Flex>
                <Typography variant="caption" color="muted">
                  {Object.keys(ALL_SHORTCUTS[g] ?? {}).length}
                  {' '}
                  classes
                </Typography>
              </Flex>
            </Card>
          </Link>
        ))}
      </div>
    </Flex>
  );

  const renderFrameworksPage = (sitePage: DocsSitePage) => (
    <Flex direction="column" gap={5}>
      <Flex direction="column" gap={2}>
        <Typography variant="h2" weight="bold">{sitePage.title}</Typography>
        <Typography variant="body1" color="muted" className={DOCS_LEAD_900}>{sitePage.lead}</Typography>
      </Flex>
      <FrameworkTabs />
    </Flex>
  );

  const mainContent = () => {
    if (docPath === undefined) return renderIndex();
    if (docPath === 'recipes') return <RecipesHubPage />;
    if (docPath.startsWith('recipes/')) {
      const slug = docPath.slice('recipes/'.length);
      if (getRecipe(slug)) return <RecipePage slug={slug} />;
    }
    const refRoute = REFERENCE_ROUTES[docPath];
    if (refRoute) return refRoute();
    if (docPath.startsWith('reference/')) {
      const slug = docPath.slice('reference/'.length);
      if (catalogHasSlug(slug)) return <CatalogPropertyPage slug={slug} />;
    }
    const sitePage = t.docsSite[docPath];
    if (sitePage && docPath === 'getting-started/frameworks') return renderFrameworksPage(sitePage);
    if (sitePage && docPath === 'core-concepts/colors') {
      return (
        <Flex direction="column" gap={6}>
          {renderStaticSitePage(sitePage)}
          <DocsAeroCraftPalette />
        </Flex>
      );
    }
    if (sitePage) return renderStaticSitePage(sitePage);
    if (isGuideSlug(docPath)) return renderGuide(docPath);
    if (isGroupSlug(docPath)) return renderGroupDoc(docPath);
    if (isTopicDocPath(docPath)) return renderTopicPropertyPage(docPath);
    return (
      <Flex direction="column" align="center" gap={4} className={DOCS_NOT_FOUND}>
        <BearIcons.FileTextIcon size="lg" className={DOCS_NOT_FOUND_ICON} />
        <Typography variant="h4" weight="bold">{t.docs.notFound}</Typography>
        <Link to="/docs">
          <Button variant="primary" size="sm">{t.docs.backToOverview}</Button>
        </Link>
      </Flex>
    );
  };

  return (
    <>
      <div className={DOCS_PAGE_SHELL}>
        <aside className={`${DOCS_PAGE_ASIDE} docs-nav-aside-desktop`}>
          <DocsSidebar
            activePath={activePath}
            subsectionList={subsectionList}
            onNavigate={() => {}}
          />
        </aside>

        <div className={DOCS_PAGE_MAIN}>
          <div className={`${DOCS_PAGE_MAIN_OPEN} docs-nav-open-mobile`}>
            <Button variant="outline" size="sm" onClick={() => setDocsNavOpen(true)}>
              <Flex align="center" gap={2}>
                <BearIcons.BookOpenIcon size="xs" />
                {t.docs.browseDocs}
              </Flex>
            </Button>
          </div>
          <main className={DOCS_PAGE_MAIN_INNER}>{mainContent()}</main>
        </div>
      </div>

      <Drawer isOpen={docsNavOpen} onClose={() => setDocsNavOpen(false)} side="left" size="sm">
        <div className={DOCS_DRAWER_NAV}>
          <DocsSidebar
            activePath={activePath}
            subsectionList={subsectionList}
            onNavigate={() => setDocsNavOpen(false)}
          />
        </div>
      </Drawer>
    </>
  );
}
