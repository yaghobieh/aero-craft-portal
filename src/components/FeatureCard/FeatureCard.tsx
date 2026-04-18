import { Card, Typography, Flex } from '@forgedevstack/bear';

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
}

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <Card padding="lg" radius="lg">
      <Flex direction="column" gap={3}>
        <Typography variant="h3" style={{ fontSize: 28 }}>{icon}</Typography>
        <Typography variant="h6" weight="semibold">{title}</Typography>
        <Typography variant="body2" color="muted">{desc}</Typography>
      </Flex>
    </Card>
  );
}
