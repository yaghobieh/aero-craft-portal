import { GROUP_ORDER } from '@forgedevstack/aerocraft';

export type DocsGroupReference = {
  regularCss: string;
  arbitraryClasses: string;
};

const DEFAULT: DocsGroupReference = {
  regularCss: `/* Plain CSS — works next to AeroCraft utilities */
.box {
  padding: 1rem;
}`,
  arbitraryClasses: `p-[1rem]
pt-[12px]
pr-[0.5rem]
pb-[1.5rem]
pl-[8px]
ps-[1rem]
pe-[1.25rem]
mx-[auto]
my-[12px]
ms-[8px]
me-[8px]
h-[1px]
h-[100dvh]
w-[min(100%,64rem)]`,
};

const MAP: Partial<Record<(typeof GROUP_ORDER)[number], DocsGroupReference>> = {
  flex: {
    regularCss: `/* Regular flex layout */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}`,
    arbitraryClasses: `flex-row
flex-col
flex-col-center
flex-row-center
justify-between
items-center
flex-wrap
gap-[1px]
gap-[12px]
basis-[200px]
flex-[1_1_auto]
order-[2]
flex-shrink-0`,
  },
  grid: {
    regularCss: `/* Regular grid */
.layout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  align-items: start;
}`,
    arbitraryClasses: `grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
grid-rows-[200px_minmax(0,1fr)]
gap-[1rem]
col-span-[1_/-1]
row-span-2`,
  },
  position: {
    regularCss: `/* Positioning */
.panel {
  position: absolute;
  inset: 0;
  top: 1rem;
  right: 0;
  z-index: 10;
}`,
    arbitraryClasses: `top-[1rem]
right-[0]
bottom-[12px]
left-[50%]
inset-[0]
z-[100]`,
  },
  size: {
    regularCss: `/* Width and height */
.frame {
  width: 100%;
  max-width: 480px;
  height: 100dvh;
  min-height: 0;
}`,
    arbitraryClasses: `w-full
w-[100%]
h-[48px]
h-[1px]
h-[100dvh]
min-h-[0]
max-w-[min(100%,1200px)]
w-[24px]
h-[24px]`,
  },
  spacing: {
    regularCss: `/* Padding and margin */
.card {
  padding: 16px;
  padding-top: 8px;
  margin-inline: auto;
  margin-block: 12px;
}`,
    arbitraryClasses: `p-4
p-[18px]
px-[12px]
py-[8px]
pt-[12px]
pr-[1rem]
pb-[6px]
pl-[4px]
ps-[1rem]
pe-[1rem]
m-[auto]
mx-[auto]
my-[12px]
ms-[8px]
me-[8px]`,
  },
  gap: {
    regularCss: `/* Gap */
.split {
  display: flex;
  gap: 12px;
  row-gap: 8px;
  column-gap: 1rem;
}`,
    arbitraryClasses: `gap-4
gap-[1px]
gap-[12px]
gap-x-[1rem]
gap-y-[8px]`,
  },
  text: {
    regularCss: `/* Typography */
.title {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
  color: #0f172a;
}`,
    arbitraryClasses: `text-[#0f172a]
text-[1.125rem]
font-[600]
font-[600,ui-sans-serif,system-ui]
leading-[1.5]
tracking-[0.02em]`,
  },
  display: {
    regularCss: `/* Display */
.block-flow {
  display: block;
}
.inline-flex-flow {
  display: inline-flex;
}`,
    arbitraryClasses: `hidden
block
inline-block
flex-row
grid`,
  },
  overflow: {
    regularCss: `/* Overflow */
.scroll-area {
  overflow: auto;
  overflow-x: hidden;
}`,
    arbitraryClasses: `overflow-hidden
overflow-auto
overflow-x-[hidden]
overflow-y-[scroll]`,
  },
  cursor: {
    regularCss: `/* Cursor */
.clickable {
  cursor: pointer;
}`,
    arbitraryClasses: `cursor-pointer
cursor-[grab]
cursor-[not-allowed]`,
  },
  transition: {
    regularCss: `/* Transitions */
.motion {
  transition: transform 200ms ease, opacity 200ms ease;
}`,
    arbitraryClasses: `transition-slow
duration-[300ms]
ease-[cubic-bezier(0.4,0,0.2,1)]`,
  },
  interactive: {
    regularCss: `/* Interaction */
.no-select {
  user-select: none;
  pointer-events: none;
}`,
    arbitraryClasses: `pointer-events-none
select-none
opacity-[0.85]`,
  },
};

export function getDocsGroupReference(group: string): DocsGroupReference {
  const hit = MAP[group as keyof typeof MAP];
  return hit ?? DEFAULT;
}
