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
import { DocGroup } from '../../components/DocGroup';
import { DocGroupReference } from '../../components/DocGroupReference';
import { useI18n } from '../../i18n/index';
import { AEROCRAFT_VERSION } from '../../constants/routes.const';
import { DocsSidebar } from '../../components/DocsSidebar';
import { DOCS_SIDEBAR_WIDTH_PX, TOPBAR_HEIGHT_PX } from '../../constants/numbers.const';
import { buildDocSections } from '../../utils/docsSections.utils';
import { buildPortalDemoExampleMarkup } from '../../utils/docsExampleMarkup.utils';
import {
  DOC_CODE_CUSTOM_GAP,
  DOC_CODE_FLEX,
  DOC_CODE_GRID,
  DOC_CODE_RESPONSIVE,
} from '../../constants/docsExamples.const';
import { GUIDE_SLUGS, GUIDE_SLUG_TO_I18N, isGuideSlug } from '../../constants/docsGuides.const';
import { isTopicDocPath } from '../../constants/docsPropertyTopics.const';
import { DocShortcutsTable } from '../../components/DocShortcutsTable';
import { FrameworkTabs } from '../../components/FrameworkTabs';
import {
  AlignContentPage,
  AlignItemsPage,
  AlignSelfPage,
  FlexBasisPage,
  FlexDirectionPage,
  FlexGrowPage,
  FlexPage,
  FlexShrinkPage,
  FlexWrapPage,
  GapPage,
  GridAutoColumnsPage,
  GridAutoFlowPage,
  GridAutoRowsPage,
  GridColumnPage,
  GridRowPage,
  GridTemplateColumnsPage,
  GridTemplateRowsPage,
  HeightPage,
  JustifyContentPage,
  JustifyItemsPage,
  JustifySelfPage,
  MaxHeightPage,
  MaxWidthPage,
  MinHeightPage,
  MinWidthPage,
  OrderPage,
  PlaceContentPage,
  PlaceItemsPage,
  PlaceSelfPage,
  ReferenceHubPage,
  SizePage,
  WidthPage,
} from '../Reference';
import type { DocsSitePage } from '../../i18n/types';

const REFERENCE_ROUTES: Record<string, () => JSX.Element> = {
  reference: () => <ReferenceHubPage />,
  'reference/flex': () => <FlexPage />,
  'reference/flex-direction': () => <FlexDirectionPage />,
  'reference/flex-wrap': () => <FlexWrapPage />,
  'reference/flex-basis': () => <FlexBasisPage />,
  'reference/flex-grow': () => <FlexGrowPage />,
  'reference/flex-shrink': () => <FlexShrinkPage />,
  'reference/order': () => <OrderPage />,
  'reference/justify-content': () => <JustifyContentPage />,
  'reference/align-items': () => <AlignItemsPage />,
  'reference/align-self': () => <AlignSelfPage />,
  'reference/align-content': () => <AlignContentPage />,
  'reference/gap': () => <GapPage />,
  'reference/grid-template-columns': () => <GridTemplateColumnsPage />,
  'reference/grid-column': () => <GridColumnPage />,
  'reference/grid-template-rows': () => <GridTemplateRowsPage />,
  'reference/grid-row': () => <GridRowPage />,
  'reference/grid-auto-flow': () => <GridAutoFlowPage />,
  'reference/grid-auto-columns': () => <GridAutoColumnsPage />,
  'reference/grid-auto-rows': () => <GridAutoRowsPage />,
  'reference/justify-items': () => <JustifyItemsPage />,
  'reference/justify-self': () => <JustifySelfPage />,
  'reference/place-content': () => <PlaceContentPage />,
  'reference/place-items': () => <PlaceItemsPage />,
  'reference/place-self': () => <PlaceSelfPage />,
  'reference/width': () => <WidthPage />,
  'reference/min-width': () => <MinWidthPage />,
  'reference/max-width': () => <MaxWidthPage />,
  'reference/height': () => <HeightPage />,
  'reference/min-height': () => <MinHeightPage />,
  'reference/max-height': () => <MaxHeightPage />,
  'reference/size': () => <SizePage />,
};
import { formatCssPropertySlug } from '../../utils/docLabel.utils';
import { buildPropertyShortcutRows } from '../../utils/propertyDocShortcuts.utils';

const GROUP_ICON: Record<string, React.ReactNode> = {
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

function isGroupSlug(s: string | undefined): s is typeof GROUP_ORDER[number] {
  return !!s && (GROUP_ORDER as readonly string[]).includes(s);
}

export function DocsPage() {
  const { t } = useI18n();
  const params = useParams<Record<string, string>>();
  const raw = params['*'] ?? '';
  const docPath = raw.replace(/^\/+|\/+$/g, '') || undefined;
  const prefix = '';
  const separator = '-';
  const [docsNavOpen, setDocsNavOpen] = useState(false);

  const breakpoints = useMemo(() => resolveConfig({}).breakpoints, []);
  const totalCount = useMemo(
    () => GROUP_ORDER.reduce((acc, g) => acc + Object.keys(ALL_SHORTCUTS[g] ?? {}).length, 0),
    [],
  );

  const activePath = docPath === undefined ? 'index' : docPath;

  const scrollAnchorOffset = TOPBAR_HEIGHT_PX + 120;

  const subsectionList = useMemo(() => {
    if (!docPath || docPath.includes('/')) return [];
    if (!isGroupSlug(docPath)) return [];
    return buildDocSections(docPath);
  }, [docPath]);

  const renderResponsive = () => (
    <Flex direction="column" gap={3}>
      <Typography variant="h4" weight="bold">{t.docs.responsiveTitle}</Typography>
      <Typography variant="body2" color="muted">{t.docs.responsiveBody}</Typography>
      <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid var(--bear-border-default)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bear-bg-tertiary)' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="caption" weight="semibold">{t.docs.bpName}</Typography>
              </th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="caption" weight="semibold">{t.docs.bpMin}</Typography>
              </th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="caption" weight="semibold">{t.docs.bpExample}</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {(Object.entries(breakpoints) as [string, string][]).map(([name, min]) => (
              <tr key={name} style={{ borderTop: '1px solid var(--bear-border-subtle)' }}>
                <td style={{ padding: '8px 12px' }}>
                  <Typography variant="body2" style={{ fontFamily: 'monospace' }}>{name}</Typography>
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <Typography variant="body2">{min}</Typography>
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <Typography variant="body2" style={{ fontFamily: 'monospace', fontSize: 12 }}>
                    {name}
                    :
                    {buildClassName(prefix, separator, 'flex-row')}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <Typography variant="body2" color="muted" style={{ maxWidth: 720 }}>{t.docs.taxonomyLead}</Typography>
      <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid var(--bear-border-default)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bear-bg-tertiary)' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="caption" weight="semibold">{t.docs.taxonomyColumnArea}</Typography>
              </th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>
                <Typography variant="caption" weight="semibold">{t.docs.taxonomyColumnNote}</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {t.docs.taxonomy.map((row) => (
              <tr key={row.area} style={{ borderTop: '1px solid var(--bear-border-subtle)' }}>
                <td style={{ padding: '8px 12px', verticalAlign: 'top' }}>
                  <Typography variant="body2">{row.area}</Typography>
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <Typography variant="body2" color="muted">{row.note}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Flex>
  );

  const renderGuide = (guideSlug: typeof GUIDE_SLUGS[number]) => {
    const content = t.docs.guides[GUIDE_SLUG_TO_I18N[guideSlug]];
    return (
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Typography variant="h2" weight="bold">{content.title}</Typography>
          <Typography variant="body1" color="muted" style={{ maxWidth: 720 }}>{content.lead}</Typography>
        </Flex>
        <CodeBlock code={content.code} language="markdown" showLineNumbers={false} copyable />
        {content.paragraphs.map((p, i) => (
          <Typography key={i} variant="body2" color="muted" style={{ maxWidth: 720 }}>{p}</Typography>
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
        <Typography variant="body1" color="muted" style={{ maxWidth: 900 }}>{page.lead}</Typography>
      </Flex>
      {page.sections.map((s, i) => (
        <Flex key={`sec-${i}`} direction="column" gap={2}>
          <Typography variant="h4" weight="semibold">{s.title}</Typography>
          <Typography variant="body2" color="muted" style={{ maxWidth: 900 }}>{s.body}</Typography>
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
        <Typography variant="body1" color="muted" style={{ maxWidth: 900 }}>{t.docsProperty.lead}</Typography>
        <DocShortcutsTable
          title={t.docsProperty.shortcutsCaption}
          exampleLabel={t.docsProperty.exampleCol}
          noteLabel={t.docsProperty.noteCol}
          rows={rows}
        />
      </Flex>
    );
  };

  const renderGroupDoc = (group: typeof GROUP_ORDER[number]) => {
    const sections = buildDocSections(group);
    const example =
      group === 'flex' ? DOC_CODE_FLEX
        : group === 'grid' ? DOC_CODE_GRID
          : DOC_CODE_RESPONSIVE;

    return (
      <Flex direction="column" gap={6}>
        <Flex direction="column" gap={2}>
          <Flex direction="row" align="center" gap={3} style={{ flexWrap: 'wrap' }}>
            <Typography variant="h2" weight="bold">{t.docs.groups[group as keyof typeof t.docs.groups] ?? GROUP_LABELS[group]}</Typography>
            <Badge variant="primary">v{AEROCRAFT_VERSION}</Badge>
            <Badge variant="secondary">{Object.keys(ALL_SHORTCUTS[group] ?? {}).length} classes</Badge>
          </Flex>
          <Typography variant="body1" color="muted" style={{ maxWidth: 720 }}>{t.docs.subtitle}</Typography>
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
              style={{ scrollMarginTop: scrollAnchorOffset }}
            >
              <Typography variant="h4" weight="semibold">{title}</Typography>
              <DocGroup
                label={title}
                shortcuts={sec.shortcuts}
                prefix={prefix}
                separator={separator}
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
            { example: 'text-[#007FFF]', note: t.docsProperty.rowColor },
          ]}
        />
      </Flex>
    );
  };

  const renderIndex = () => (
    <Flex direction="column" gap={8}>
      <Flex direction="column" gap={2}>
        <Flex direction="row" align="center" gap={3} style={{ flexWrap: 'wrap' }}>
          <Typography variant="h2" weight="bold">{t.docs.title}</Typography>
          <Badge variant="primary">v{AEROCRAFT_VERSION}</Badge>
          <Badge variant="secondary">{totalCount} classes</Badge>
        </Flex>
        <Typography variant="body1" color="muted" style={{ maxWidth: 720 }}>{t.docs.subtitle}</Typography>
      </Flex>

      {renderTaxonomy()}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {GROUP_ORDER.map((g) => (
          <Link key={g} to={`/docs/${g}`}>
            <Card
              padding="lg"
              radius="lg"
              style={{
                cursor: 'pointer',
                height: '100%',
                backgroundColor: 'var(--bear-bg-secondary)',
                border: '1px solid var(--bear-border-default)',
              }}
            >
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
        <Typography variant="body1" color="muted" style={{ maxWidth: 900 }}>{sitePage.lead}</Typography>
      </Flex>
      <FrameworkTabs />
    </Flex>
  );

  const mainContent = () => {
    if (docPath === undefined) return renderIndex();
    const refRoute = REFERENCE_ROUTES[docPath];
    if (refRoute) return refRoute();
    const sitePage = t.docsSite[docPath];
    if (sitePage && docPath === 'getting-started/frameworks') return renderFrameworksPage(sitePage);
    if (sitePage) return renderStaticSitePage(sitePage);
    if (isGuideSlug(docPath)) return renderGuide(docPath);
    if (isGroupSlug(docPath)) return renderGroupDoc(docPath);
    if (isTopicDocPath(docPath)) return renderTopicPropertyPage(docPath);
    return (
      <Flex direction="column" align="center" gap={4} style={{ padding: '48px 0', textAlign: 'center' }}>
        <BearIcons.FileTextIcon size="lg" style={{ opacity: 0.35 }} />
        <Typography variant="h4" weight="bold">{t.docs.notFound}</Typography>
        <Link to="/docs">
          <Button variant="primary" size="sm">{t.docs.backToOverview}</Button>
        </Link>
      </Flex>
    );
  };

  return (
    <>
      <Flex direction="row" align="start" gap={0} style={{ width: '100%', minHeight: 0 }}>
        <aside
          className="docs-nav-aside-desktop"
          style={{
            width: DOCS_SIDEBAR_WIDTH_PX,
            flexShrink: 0,
            position: 'sticky',
            top: TOPBAR_HEIGHT_PX,
            alignSelf: 'flex-start',
            maxHeight: `calc(100vh - ${TOPBAR_HEIGHT_PX}px)`,
            overflowY: 'auto',
            borderRight: '1px solid var(--bear-border-default)',
            padding: '16px 12px',
            backgroundColor: 'var(--bear-bg-secondary)',
          }}
        >
          <DocsSidebar
            activePath={activePath}
            subsectionList={subsectionList}
            onNavigate={() => {}}
          />
        </aside>

        <div style={{ flex: 1, minWidth: 0, padding: '8px 16px 32px' }}>
          <div className="docs-nav-open-mobile" style={{ marginBottom: 12 }}>
            <Button variant="outline" size="sm" onClick={() => setDocsNavOpen(true)}>
              <Flex align="center" gap={2}>
                <BearIcons.BookOpenIcon size="xs" />
                {t.docs.browseDocs}
              </Flex>
            </Button>
          </div>
          <main style={{ width: '100%', maxWidth: '100%' }}>{mainContent()}</main>
        </div>
      </Flex>

      <Drawer isOpen={docsNavOpen} onClose={() => setDocsNavOpen(false)} side="left" size="sm">
        <div style={{ padding: 16 }}>
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
