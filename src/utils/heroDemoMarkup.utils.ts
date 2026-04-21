import type { Messages } from '@i18n/types';

export function buildHeroDemoMarkup(h: Messages['hero']): string {
  return `<div class="flex-col gap-4 p-5">
  <div class="flex-row-center-between gap-3">
    <div class="flex-row gap-2 items-center">
      <div class="w-9 h-9 rounded-full background-brand-gradient"></div>
      <div class="flex-col">
        <p class="text-sm font-semibold text-[#f7ecf4] m-[0]">${h.demoTitle}</p>
        <p class="text-xs text-[#a38aa1] m-[0]">${h.demoSubtitle}</p>
      </div>
    </div>
    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[rgba(249,31,125,0.14)] text-[#ff86bb]">${h.demoBadgeNew}</span>
  </div>
  <p class="text-sm leading-relaxed text-[#d0b7cd] m-[0]">
    ${h.demoBodyBefore}<code class="px-1 rounded bg-[rgba(255,255,255,0.06)] text-[#ffb6d7] font-mono text-sm">${h.demoBodyCode}</code>${h.demoBodyAfter}
  </p>
  <div class="flex-row gap-2">
    <button type="button" class="px-4 py-2 rounded-md text-sm font-semibold background-brand-gradient color-white border-0 cursor-pointer">${h.demoTryIt}</button>
    <button type="button" class="px-4 py-2 rounded-md text-sm font-semibold bg-transparent text-[#f7ecf4] border border-[rgba(255,255,255,0.14)] cursor-pointer">${h.demoDocs}</button>
  </div>
</div>`;
}
