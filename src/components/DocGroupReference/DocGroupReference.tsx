import { Card, CodeBlock, Flex, Typography } from '@forgedevstack/bear';
import { getDocsGroupReference } from '../../constants/docsGroupReference.const';

type DocGroupReferenceProps = {
  group: string;
  regularTitle: string;
  arbitraryTitle: string;
  arbitraryLead: string;
};

export function DocGroupReference({
  group,
  regularTitle,
  arbitraryTitle,
  arbitraryLead,
}: DocGroupReferenceProps) {
  const ref = getDocsGroupReference(group);
  return (
    <Card padding="lg" radius="lg" style={{ border: '1px solid var(--bear-border-default)' }}>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Typography variant="h5" weight="semibold">{regularTitle}</Typography>
          <CodeBlock code={ref.regularCss} language="css" title="CSS" showLineNumbers={false} copyable />
        </Flex>
        <Flex direction="column" gap={2}>
          <Typography variant="h5" weight="semibold">{arbitraryTitle}</Typography>
          <Typography variant="body2" color="muted">{arbitraryLead}</Typography>
          <CodeBlock code={ref.arbitraryClasses} language="markdown" title="Classes" showLineNumbers={false} copyable />
        </Flex>
      </Flex>
    </Card>
  );
}
