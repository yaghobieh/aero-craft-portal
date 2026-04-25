import { Flex } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { HERO_PREVIEW_MIN_HEIGHT_PX } from '@const/numbers.const';
import { HERO_PREVIEW_BACKGROUND_HEX } from '@const/strings.const';
import { renderHeroCode } from '@utils/renderHeroCode';
import { LivePreview } from '../LivePreview';
import type { HeroCodePreviewProps } from './HeroCodePreview.types';

export function HeroCodePreview({ codeText, markup }: HeroCodePreviewProps) {
  const { t } = useI18n();
  return (
    <div className="ac-hero-code-shell">
      <div className="ac-hero-code-inner">
        <Flex align="center" gap={2} className="ac-hero-code-chrome">
          <span className="ac-hero-code-dot ac-hero-code-dot--red" />
          <span className="ac-hero-code-dot ac-hero-code-dot--amber" />
          <span className="ac-hero-code-dot ac-hero-code-dot--green" />
          <span className="ac-hero-code-filename">{t.hero.appFileLabel}</span>
          <span className="ac-hero-code-spacer">{t.hero.chromeBrand}</span>
        </Flex>

        <pre className="ac-hero-code-pre">
          <code>{renderHeroCode(codeText)}</code>
        </pre>

        <div className="ac-hero-code-hr" />

        <div className="ac-hero-code-preview">
          <LivePreview
            markup={markup}
            label={t.hero.previewLabel}
            minHeight={HERO_PREVIEW_MIN_HEIGHT_PX}
            showClasses={false}
            background={HERO_PREVIEW_BACKGROUND_HEX}
          />
        </div>
      </div>
    </div>
  );
}
