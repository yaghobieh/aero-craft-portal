import { useMemo, useRef, useState } from 'react';
import { Input } from '@forgedevstack/bear';
import { ALL_CLASS_NAMES } from './StudioClassPicker.const';

type StudioClassFieldProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  id?: string;
};

const MAX_SUGGESTIONS = 40;

function lastToken(src: string): { before: string; word: string } {
  const t = src.trimEnd();
  const lastSpace = t.lastIndexOf(' ');
  if (lastSpace === -1) {
    return { before: '', word: t };
  }
  return { before: `${t.slice(0, lastSpace)} `, word: t.slice(lastSpace + 1) };
}

export function StudioClassField(props: StudioClassFieldProps) {
  const { value, onChange, placeholder, id } = props;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const { word } = useMemo(() => lastToken(value), [value]);

  const suggestions = useMemo(() => {
    const q = word.trim().toLowerCase();
    if (!q) return ALL_CLASS_NAMES.slice(0, MAX_SUGGESTIONS);
    const hit = ALL_CLASS_NAMES.filter((c) => c.toLowerCase().startsWith(q));
    return hit.slice(0, MAX_SUGGESTIONS);
  }, [word]);

  const applySuggestion = (cls: string) => {
    const { before, word: w } = lastToken(value);
    const next = `${before}${cls}`.trim();
    onChange(next.endsWith(' ') ? next : `${next} `);
    setOpen(false);
    setActive(0);
  };

  return (
    <div ref={rootRef} className="ac-studio-class-field">
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (rootRef.current?.contains(e.relatedTarget as Node)) return;
          setOpen(false);
        }}
        onKeyDown={(e) => {
          if (!open || suggestions.length === 0) return;
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((i) => Math.min(suggestions.length - 1, i + 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((i) => Math.max(0, i - 1));
          } else if (e.key === 'Enter' && suggestions[active]) {
            e.preventDefault();
            applySuggestion(suggestions[active]);
          } else if (e.key === 'Escape') {
            setOpen(false);
          }
        }}
        autoComplete="off"
      />
      {open && suggestions.length > 0 ? (
        <ul className="ac-studio-class-field__list" role="listbox">
          {suggestions.map((cls, idx) => (
            <li key={cls}>
              <button
                type="button"
                className={`ac-studio-class-field__opt${idx === active ? ' is-active' : ''}`}
                onMouseDown={(ev) => {
                  ev.preventDefault();
                  applySuggestion(cls);
                }}
              >
                {cls}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
