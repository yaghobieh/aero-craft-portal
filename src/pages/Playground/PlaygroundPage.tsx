import { useState } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Card, CodeEditor, Flex, Typography, useBear, BearIcons } from '@forgedevstack/bear';
import { LivePreview } from '@components/LivePreview';
import { ROUTES } from '@const/routes.const';
import { PLAYGROUND_DEFAULT_MARKUP } from '@const/playgroundMarkup.const';
import { useI18n } from '@i18n/index';

export function PlaygroundPage() {
  const { t } = useI18n();
  const { mode } = useBear();
  const [markup, setMarkup] = useState(PLAYGROUND_DEFAULT_MARKUP);

  return (
    <Flex direction="column" gap={4} className="ac-playground-root">
      <Flex direction="row" align="center" justify="between" className="ac-playground-head">
        <Link to={ROUTES.HOME}>
          <Button variant="ghost" size="sm" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />}>
            {t.playground.back}
          </Button>
        </Link>
        <Typography variant="h4" weight="bold">{t.playground.title}</Typography>
        <Button variant="outline" size="sm" onClick={() => setMarkup(PLAYGROUND_DEFAULT_MARKUP)}>
          {t.playground.reset}
        </Button>
      </Flex>
      <Typography variant="body2" color="muted" className="ac-playground-lead">{t.playground.lead}</Typography>
      <div className="ac-playground-grid">
        <Card padding="md" radius="lg" className="ac-playground-editor-card">
          <Typography variant="caption" weight="semibold" color="muted" className="ac-playground-panel-label">
            {t.playground.editorLabel}
          </Typography>
          <CodeEditor
            value={markup}
            onChange={setMarkup}
            language="html"
            theme={mode === 'dark' ? 'dark' : 'light'}
            minHeight={320}
            wordWrap
            className="ac-playground-code-editor"
          />
        </Card>
        <Card padding="md" radius="lg" className="ac-playground-preview-card">
          <Typography variant="caption" weight="semibold" color="muted" className="ac-playground-panel-label">
            {t.playground.previewLabel}
          </Typography>
          <LivePreview markup={markup} minHeight={320} showClasses background="#0f0716" />
        </Card>
      </div>
    </Flex>
  );
}
