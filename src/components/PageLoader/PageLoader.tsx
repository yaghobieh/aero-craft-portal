import { Flex, Spinner } from '@forgedevstack/bear';

export function PageLoader() {
  return (
    <Flex direction="column" align="center" justify="center" className="ac-page-loader">
      <Spinner size="lg" />
    </Flex>
  );
}
