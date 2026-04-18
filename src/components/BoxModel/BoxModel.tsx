import type { CSSProperties } from 'react';

type BoxModelProps = {
  position?: number | string;
  margin?: { top: number | string; right: number | string; bottom: number | string; left: number | string };
  border?: { top: number | string; right: number | string; bottom: number | string; left: number | string };
  padding?: { top: number | string; right: number | string; bottom: number | string; left: number | string };
  size?: { width: number | string; height: number | string };
};

const colors = {
  margin: '#8a5a3b',
  border: '#d6b060',
  padding: '#7aa87a',
  content: '#4dabb5',
  text: '#e2e8f0',
};

const cellStyle: CSSProperties = {
  position: 'absolute',
  color: colors.text,
  fontFamily: 'monospace',
  fontSize: 11,
  transform: 'translate(-50%, -50%)',
};

export function BoxModel({
  position = 0,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  border = { top: 0, right: 0, bottom: 0, left: 0 },
  padding = { top: 6, right: 12, bottom: 6, left: 12 },
  size = { width: 231, height: 20 },
}: BoxModelProps) {
  const layer = (bg: string, label: string, children?: React.ReactNode): CSSProperties & { label?: string } => ({
    position: 'relative',
    backgroundColor: bg,
    padding: 28,
    color: colors.text,
    fontFamily: 'monospace',
    fontSize: 11,
    borderRadius: 2,
  });

  return (
    <div
      style={{
        fontFamily: 'monospace',
        color: colors.text,
        backgroundColor: '#1b2432',
        padding: 24,
        borderRadius: 8,
        border: '1px solid var(--bear-border-default)',
        maxWidth: 520,
      }}
    >
      <div style={{ ...layer(colors.margin, 'margin'), position: 'relative' }}>
        <span style={{ ...cellStyle, top: 10, left: '50%' }}>position</span>
        <span style={{ ...cellStyle, top: 28, left: '50%' }}>{position}</span>
        <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 11, opacity: 0.75 }}>margin</span>
        <span style={{ ...cellStyle, top: 80, left: '50%' }}>{margin.top}</span>
        <span style={{ ...cellStyle, bottom: 6, left: '50%', transform: 'translate(-50%, 50%)' }}>{margin.bottom}</span>
        <span style={{ ...cellStyle, top: '50%', left: 8, transform: 'translateY(-50%)' }}>{margin.left}</span>
        <span style={{ ...cellStyle, top: '50%', right: 8, left: 'auto', transform: 'translateY(-50%)' }}>{margin.right}</span>

        <div style={{ ...layer(colors.border, 'border'), position: 'relative' }}>
          <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 11, opacity: 0.85 }}>border</span>
          <span style={{ ...cellStyle, top: 40, left: '50%' }}>{border.top}</span>
          <span style={{ ...cellStyle, bottom: 6, left: '50%', transform: 'translate(-50%, 50%)' }}>{border.bottom}</span>
          <span style={{ ...cellStyle, top: '50%', left: 8, transform: 'translateY(-50%)' }}>{border.left}</span>
          <span style={{ ...cellStyle, top: '50%', right: 8, left: 'auto', transform: 'translateY(-50%)' }}>{border.right}</span>

          <div style={{ ...layer(colors.padding, 'padding'), position: 'relative' }}>
            <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 11, opacity: 0.85 }}>padding</span>
            <span style={{ ...cellStyle, top: 22, left: '50%' }}>{padding.top}</span>
            <span style={{ ...cellStyle, bottom: 4, left: '50%', transform: 'translate(-50%, 50%)' }}>{padding.bottom}</span>
            <span style={{ ...cellStyle, top: '50%', left: 8, transform: 'translateY(-50%)' }}>{padding.left}</span>
            <span style={{ ...cellStyle, top: '50%', right: 8, left: 'auto', transform: 'translateY(-50%)' }}>{padding.right}</span>

            <div
              style={{
                backgroundColor: colors.content,
                color: '#0b1120',
                padding: '10px 14px',
                textAlign: 'center',
                borderRadius: 2,
                fontWeight: 700,
                letterSpacing: 0.2,
              }}
            >
              {size.width}×{size.height}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
