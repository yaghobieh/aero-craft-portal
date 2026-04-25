export const PRESET_DEMO_CIRCLE_BUTTON_MARKUP = `<div class="flex-row-center p-4 w-full">
  <button type="button" class="circle-button background-brand-gradient color-white" aria-label="Menu">☰</button>
</div>`;

export const PRESET_DEMO_INPUT_MARKUP = `<div class="p-4 w-full max-w-md">
  <input class="input-rounded" type="text" name="demo-email" placeholder="you@example.com" autocomplete="off" />
</div>`;

export function buildPresetDemoSelectMarkup(optionA: string, optionB: string): string {
  return `<div class="p-4 w-full max-w-md">
  <select class="input-rounded" aria-label="Demo">
    <option>${optionA}</option>
    <option>${optionB}</option>
  </select>
</div>`;
}

export function buildPresetDemoBoxMarkup(body: string): string {
  return `<div class="p-4 w-full">
  <div class="p-6 rounded-xl border border-[rgba(59,130,246,0.35)] background-[rgba(59,130,246,0.1)] color-[var(--bear-text-primary)] shadow-md transition-fast hover:shadow-2xl m-[0]">
    <p class="text-sm m-[0]">${body}</p>
  </div>
</div>`;
}
