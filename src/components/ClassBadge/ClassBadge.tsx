import { Typography } from '@forgedevstack/bear';

interface ClassBadgeProps {
  label: string;
  variant?: 'shortcut' | 'tailwind';
}

export function ClassBadge({ label, variant = 'shortcut' }: ClassBadgeProps) {
  return (
    <Typography
      variant="caption"
      color={variant === 'shortcut' ? 'primary' : 'secondary'}
      style={{ fontFamily: 'monospace', letterSpacing: '0.02em' }}
    >
      {label}
    </Typography>
  );
}
