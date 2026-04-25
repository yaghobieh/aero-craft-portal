import { Flex, Typography, Button, Badge, Card } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { useI18n } from '@i18n/index';
import { LivePreview } from '@components/LivePreview';
import { ComponentShortcutsGridTable } from '@components/ComponentShortcutsGridTable';
import { RECIPES } from '@const/recipes.const';
import { COMPONENTS_PAGE_RECIPE_ORDER } from '@const/componentsPageShowcase.const';
import { ROUTES } from '@const/routes.const';
import { PORTAL_PAGE, PORTAL_PAGE_LEAD, PORTAL_PREVIEW_SHELL, PORTAL_RECIPE_CARD } from '@const/portalShell.classes';
import { HERO_PREVIEW_BACKGROUND_HEX } from '@const/strings.const';

export function ComponentsPage() {
  const { t } = useI18n();
  return (
    <Flex direction="column" gap={6} className={PORTAL_PAGE}>
      <Flex direction="column" gap={3}>
        <Badge variant="info">{t.componentsPage.kicker}</Badge>
        <Flex align="center" gap={2} wrap="wrap">
          <Typography variant="h1" weight="bold">{t.componentsPage.title}</Typography>
          <Badge variant="secondary">{t.componentsPage.badgePremium}</Badge>
        </Flex>
        <Typography variant="body1" color="muted" className={PORTAL_PAGE_LEAD}>
          {t.componentsPage.lead}
        </Typography>
        <Link to={ROUTES.DOCS_COMPONENT_PRESETS}>
          <Button variant="outline" size="md">{t.componentsPage.ctaDoc}</Button>
        </Link>
      </Flex>
      <Typography variant="h4" weight="semibold">{t.componentsPage.galleryTitle}</Typography>
      <Flex direction="column" gap={4}>
        {COMPONENTS_PAGE_RECIPE_ORDER.map((key) => {
          const r = RECIPES[key];
          if (!r) return null;
          return (
            <Card key={r.id} className={PORTAL_RECIPE_CARD}>
              <Flex direction="column" gap={2}>
                <Typography variant="h6" weight="semibold">{r.title}</Typography>
                <Typography variant="body2" color="muted">{r.description}</Typography>
                <div className={PORTAL_PREVIEW_SHELL}>
                  <LivePreview
                    markup={r.markup}
                    label={t.hero.previewLabel}
                    minHeight={r.minHeight}
                    showClasses
                    showGeneratedCss
                    generatedCssLabels={{
                      show: t.componentsPage.showGeneratedCss,
                      hide: t.componentsPage.hideGeneratedCss,
                      title: t.componentsPage.generatedCssTitle,
                    }}
                    background={HERO_PREVIEW_BACKGROUND_HEX}
                  />
                </div>
              </Flex>
            </Card>
          );
        })}
      </Flex>
      <Typography variant="h4" weight="semibold">{t.componentsPage.tableTitle}</Typography>
      <ComponentShortcutsGridTable
        columnLabels={{
          name: t.componentsPage.colName,
          purpose: t.componentsPage.colPurpose,
          config: t.componentsPage.colConfig,
        }}
      />
    </Flex>
  );
}
