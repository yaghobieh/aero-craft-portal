import { HERO_DEMO_BUTTON_CLASSES } from '@const/heroDemo.const';

export function buildHeroCodeSample(buttonLabel: string): string {
  return `<button type="button" class="${HERO_DEMO_BUTTON_CLASSES}">
  ${buttonLabel}
</button>`;
}

export function buildHeroPreviewMarkup(buttonLabel: string): string {
  return `<div class="flex-row-center p-4 w-full">
  <button type="button" class="${HERO_DEMO_BUTTON_CLASSES}">${buttonLabel}</button>
</div>`;
}
