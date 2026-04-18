import { UtilityReferencePage } from '../../../components/UtilityReference';
import { TILE_CLASS } from '../tileStyle';

export function FlexWrapPage() {
  const items = Array.from({ length: 6 })
    .map((_, i) => `  <div class="w-32 ${TILE_CLASS}">0${i + 1}</div>`)
    .join('\n');

  const wrap = `<div class="flex flex-wrap gap-3 p-4">\n${items}\n</div>`;
  const nowrap = `<div class="flex flex-nowrap gap-3 p-4 overflow-hidden">\n${items}\n</div>`;
  const wrapReverse = `<div class="flex flex-wrap-reverse gap-3 p-4">\n${items}\n</div>`;

  return (
    <UtilityReferencePage
      category="Flexbox & Grid"
      title="flex-wrap"
      description="Utilities for controlling how flex items wrap."
      quickReference={[
        { className: 'flex-nowrap', styles: 'flex-wrap: nowrap;' },
        { className: 'flex-wrap', styles: 'flex-wrap: wrap;' },
        { className: 'flex-wrap-reverse', styles: 'flex-wrap: wrap-reverse;' },
      ]}
      examples={[
        {
          id: 'nowrap',
          title: 'Don\u2019t wrap',
          description: 'Use flex-nowrap to prevent flex items from wrapping.',
          markup: nowrap,
          minHeight: 120,
        },
        {
          id: 'wrap',
          title: 'Wrap normally',
          description: 'Use flex-wrap to allow flex items to wrap onto multiple lines.',
          markup: wrap,
          minHeight: 200,
        },
        {
          id: 'wrap-reverse',
          title: 'Wrap reversed',
          description: 'Use flex-wrap-reverse to wrap items in the opposite direction.',
          markup: wrapReverse,
          minHeight: 200,
        },
      ]}
      responsive={{
        description: 'Only wrap on small screens and above.',
        code: `<div class="flex flex-nowrap sm:flex-wrap">\n  <!-- ... -->\n</div>`,
      }}
      prev={{ to: '/docs/reference/flex-direction', label: 'flex-direction' }}
      next={{ to: '/docs/reference/flex-basis', label: 'flex-basis' }}
    />
  );
}
