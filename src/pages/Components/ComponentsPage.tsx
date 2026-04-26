import { Flex, Typography, Button, Badge, Card, CodeBlock } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { useI18n } from '@i18n/index';
import { LivePreview } from '@components/LivePreview';
import { ComponentShortcutsGridTable } from '@components/ComponentShortcutsGridTable';
import { RECIPES } from '@const/recipes.const';
import { COMPONENTS_PAGE_RECIPE_ORDER } from '@const/componentsPageShowcase.const';
import { ROUTES } from '@const/routes.const';
import { PORTAL_PAGE, PORTAL_PAGE_LEAD, PORTAL_PREVIEW_SHELL, PORTAL_RECIPE_CARD } from '@const/portalShell.classes';
import { HERO_PREVIEW_BACKGROUND_HEX } from '@const/strings.const';

const BUILTIN_COMPONENT_SHORTCUTS = [
  'circle-button',
  'input-rounded',
];

const PORTAL_COMPONENT_SHORTCUTS = [
  'button-core',
  'button-touch-48',
  'button-primary-rounded',
  'button-outline-primary',
  'button-ghost-surface',
  'gallery-grid-auto',
];

const USE_MODEL_EXAMPLE = `import { useModel } from '@forgedevstack/aerocraft/react';

export function CtaButton() {
  const cls = useModel('button', 'primary', {
    prefix: '',
    extra: 'button-touch-48 button-primary-rounded',
  });

  return <button className={cls}>Continue</button>;
}`;

const MODEL_FUNCTION_EXAMPLE = `import { model } from '@forgedevstack/aerocraft';

const buttonClass = [
  model('button', 'primary', ''),
  'button-touch-48',
  'button-primary-rounded',
].join(' ');

const inputClass = model('input', 'rounded', '');
`;

const MODE_INPUT_EXAMPLE = `import { useModel } from '@forgedevstack/aerocraft/react';

type InputProps = {
  mode?: 'default' | 'rounded' | 'pill' | 'underline';
};

export function AppInput({ mode = 'default' }: InputProps) {
  const cls = useModel('input', mode, { prefix: '' });
  return <input className={cls} placeholder="Search..." />;
}`;

export function ComponentsPage() {
  const { t } = useI18n();
  return (
    <Flex direction="column" gap={6} className={PORTAL_PAGE}>
      <Flex direction="column" gap={3}>
        <Badge variant="info">{t.componentsPage.kicker}</Badge>
        <Typography variant="h1" weight="bold">{t.componentsPage.title}</Typography>
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
                <CodeBlock
                  code={r.markup}
                  language="html"
                  title={`${r.title} markup`}
                  showLineNumbers={false}
                  copyable
                />
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
      <Card className={PORTAL_RECIPE_CARD}>
        <Flex direction="column" gap={3}>
          <Typography variant="h5" weight="semibold">{t.componentsPage.modelTitle}</Typography>
          <Typography variant="body2" color="muted">
            {t.componentsPage.modelBody}
          </Typography>
          <Typography variant="body2" color="muted">
            Base AeroCraft component shortcuts: {BUILTIN_COMPONENT_SHORTCUTS.join(', ')}
          </Typography>
          <Typography variant="body2" color="muted">
            Portal custom shortcuts from config: {PORTAL_COMPONENT_SHORTCUTS.join(', ')}
          </Typography>
          <CodeBlock
            code={USE_MODEL_EXAMPLE}
            language="typescript"
            title={t.componentsPage.modelUseModelTitle}
            showLineNumbers={false}
            copyable
          />
          <CodeBlock
            code={MODEL_FUNCTION_EXAMPLE}
            language="typescript"
            title={t.componentsPage.modelFunctionTitle}
            showLineNumbers={false}
            copyable
          />
          <CodeBlock
            code={MODE_INPUT_EXAMPLE}
            language="typescript"
            title={t.componentsPage.modelInputModeTitle}
            showLineNumbers={false}
            copyable
          />
        </Flex>
      </Card>
    </Flex>
  );
}
