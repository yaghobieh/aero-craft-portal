import type { CSSProperties, ReactNode } from 'react';

type GradientTextAcProps = {
  children: ReactNode;
  colors: string[];
  style?: CSSProperties;
  className?: string;
};

export function GradientTextAc({ children, colors, style, className }: GradientTextAcProps) {
  const gradient = `linear-gradient(105deg, ${colors.join(', ')})`;
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        background: gradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
