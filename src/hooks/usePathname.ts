import { useEffect, useState } from 'react';
import { useRoute } from '@forgedevstack/forge-compass/react';

export function usePathname(): string {
  const route = useRoute();
  const [pathname, setPathname] = useState(
    () => (typeof document !== 'undefined' ? document.location.pathname : '/'),
  );
  useEffect(() => {
    setPathname(typeof document !== 'undefined' ? document.location.pathname : '/');
  }, [route]);
  return pathname;
}
