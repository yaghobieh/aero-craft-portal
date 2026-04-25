import type { SeoLinkRel } from '@/types/seoDom.types';
import {
  SEO_META_KEY_DESCRIPTION,
  SEO_META_OG_DESC,
  SEO_META_OG_IMAGE,
  SEO_META_OG_SITE,
  SEO_META_OG_TITLE,
  SEO_META_OG_TYPE,
  SEO_META_OG_URL,
  SEO_META_TW_CARD,
  SEO_META_TW_DESC,
  SEO_META_TW_IMAGE,
  SEO_META_TW_SITE,
  SEO_META_TW_TITLE,
} from '@const/seoMetaKeys.const';
import { SEO_OG_IMAGE, SEO_SITE_NAME, SEO_TWITTER_HANDLE } from '@const/seo.const';

type MetaNameKey =
  | typeof SEO_META_KEY_DESCRIPTION
  | typeof SEO_META_TW_CARD
  | typeof SEO_META_TW_TITLE
  | typeof SEO_META_TW_DESC
  | typeof SEO_META_TW_IMAGE
  | typeof SEO_META_TW_SITE;

type MetaPropertyKey =
  | typeof SEO_META_OG_TITLE
  | typeof SEO_META_OG_DESC
  | typeof SEO_META_OG_URL
  | typeof SEO_META_OG_TYPE
  | typeof SEO_META_OG_IMAGE
  | typeof SEO_META_OG_SITE;

export function setDocumentMetaName(key: MetaNameKey, value: string) {
  setMeta('name', key, value);
}

export function setDocumentMetaProperty(key: MetaPropertyKey, value: string) {
  setMeta('property', key, value);
}

export function setDocumentTitleFromSeo(
  title: string,
  description: string,
  absolutePageUrl: string,
) {
  const url = absolutePageUrl;
  document.title = title;
  setDocumentMetaName(SEO_META_KEY_DESCRIPTION, description);
  setDocumentMetaProperty(SEO_META_OG_TITLE, title);
  setDocumentMetaProperty(SEO_META_OG_DESC, description);
  setDocumentMetaProperty(SEO_META_OG_URL, url);
  setDocumentMetaProperty(SEO_META_OG_TYPE, 'website');
  setDocumentMetaProperty(SEO_META_OG_IMAGE, SEO_OG_IMAGE);
  setDocumentMetaProperty(SEO_META_OG_SITE, SEO_SITE_NAME);
  setDocumentMetaName(SEO_META_TW_CARD, 'summary_large_image');
  setDocumentMetaName(SEO_META_TW_TITLE, title);
  setDocumentMetaName(SEO_META_TW_DESC, description);
  setDocumentMetaName(SEO_META_TW_SITE, SEO_TWITTER_HANDLE);
  setDocumentMetaName(SEO_META_TW_IMAGE, SEO_OG_IMAGE);
  setLinkHref('canonical', url);
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  const sel = attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.head.querySelector(sel) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setLinkHref(rel: SeoLinkRel, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}
