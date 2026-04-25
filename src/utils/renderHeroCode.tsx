import { HERO_CODE_TOKEN_RE } from '@const/heroCodeSyntax.const';
import type { ReactNode } from 'react';

export function renderHeroCode(code: string): ReactNode {
  const parts = code.split(HERO_CODE_TOKEN_RE).filter(Boolean);
  return parts.map((p, i) => heroCodeSpan(p, i));
}

function heroCodeSpan(p: string, i: number) {
  if (/<\/?\w+/.test(p)) return <span key={i} className="ac-hero-syntax-tag">{p}</span>;
  if (p === '/>' || p === '/' || p === '>') return <span key={i} className="ac-hero-syntax-tag">{p}</span>;
  if (p === 'class=' || p === 'className=') return <span key={i} className="ac-hero-syntax-attr">{p}</span>;
  if (/^"[\s\S]*"$/.test(p)) return <span key={i} className="ac-hero-syntax-string">{p}</span>;
  if (/^\/\/ /.test(p)) return <span key={i} className="ac-hero-syntax-comment">{p}</span>;
  if (/^[a-z]+-[a-z0-9-/\[\]#:.]+/.test(p)) {
    return <span key={i} className="ac-hero-syntax-class">{p}</span>;
  }
  return <span key={i}>{p}</span>;
}
