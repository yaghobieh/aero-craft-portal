import { Link } from '@forgedevstack/forge-compass/react';
import { Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { UtilityReferencePage } from '@components/UtilityReference';
import { buildPropsFromCatalog } from '@data/referenceCatalog';

interface CatalogPropertyPageProps {
  slug: string;
}

export function CatalogPropertyPage({ slug }: CatalogPropertyPageProps) {
  const props = buildPropsFromCatalog(slug);

  if (!props) {
    return (
      <Flex direction="column" align="center" gap={4} style={{ padding: '48px 0', textAlign: 'center' }}>
        <BearIcons.FileTextIcon size="lg" style={{ opacity: 0.35 }} />
        <Typography variant="h4" weight="bold">
          {slug}
          {' '}
          — not found
        </Typography>
        <Typography variant="body2" color="muted">This utility does not have a catalog entry yet.</Typography>
        <Link to="/docs/reference">
          <Button variant="primary" size="sm">Back to reference</Button>
        </Link>
      </Flex>
    );
  }

  return <UtilityReferencePage {...props} />;
}
