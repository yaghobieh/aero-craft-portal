import { useEffect } from 'react';
import { useRoute } from '@forgedevstack/forge-compass/react';
import { resolveSeoForPath, toAbsoluteUrl } from '@const/seo.const';
import { setDocumentTitleFromSeo } from '@utils/seoDom.utils';

export function Seo() {
  const route = useRoute();

  useEffect(() => {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    const { title, description } = resolveSeoForPath(pathname);
    const url = toAbsoluteUrl(pathname);
    setDocumentTitleFromSeo(title, description, url);
  }, [route]);

  return null;
}
