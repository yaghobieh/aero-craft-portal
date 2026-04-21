import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  CodeBlock,
  Flex,
  Input,
  Switch,
  Typography,
} from '@forgedevstack/bear';

export interface StudioConfigState {
  prefix: string;
  separator: '-' | '_' | '.';
  mode: 'standalone' | 'apply';
  responsive: boolean;
  breakpoints: { sm: string; md: string; lg: string; xl: string };
  groups: Record<string, boolean>;
  fontDisplay: string;
  fontMono: string;
  brandPrimary: string;
  brandSecondary: string;
  brandAccent: string;
}

const DEFAULT_GROUPS: Record<string, boolean> = {
  layout: true,
  flex: true,
  grid: true,
  position: true,
  size: true,
  spacing: true,
  gap: true,
  text: true,
  font: true,
  display: true,
  overflow: true,
  cursor: true,
  transition: true,
  transform: true,
  filter: true,
  backdrop: true,
  background: true,
  outline: true,
  border: true,
  radius: true,
  shadow: true,
  effect: true,
  table: true,
  scroll: true,
  interactive: true,
  svg: true,
  a11y: true,
  zindex: true,
  opacity: true,
  color: true,
};

export const DEFAULT_STUDIO_CONFIG: StudioConfigState = {
  prefix: '',
  separator: '-',
  mode: 'standalone',
  responsive: true,
  breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
  groups: DEFAULT_GROUPS,
  fontDisplay: 'Plus Jakarta Sans',
  fontMono: 'Fira Code',
  brandPrimary: '#d70f66',
  brandSecondary: '#a324dd',
  brandAccent: '#ff8a3c',
};

function buildConfigCode(s: StudioConfigState): string {
  const activeGroups = Object.entries(s.groups).filter(([, v]) => v).map(([k]) => k);
  const allOn = activeGroups.length === Object.keys(s.groups).length;

  const parts: string[] = [];
  if (s.prefix) parts.push(`  prefix: '${s.prefix}',`);
  if (s.separator !== '-') parts.push(`  separator: '${s.separator}',`);
  if (s.mode !== 'standalone') parts.push(`  mode: '${s.mode}',`);
  if (s.responsive) parts.push('  responsive: true,');
  if (!allOn) {
    parts.push(`  groups: {\n${activeGroups.map((g) => `    ${g}: true,`).join('\n')}\n  },`);
  }

  const theme = `  theme: {
    colors: {
      brand:     '${s.brandPrimary}',
      secondary: '${s.brandSecondary}',
      accent:    '${s.brandAccent}',
    },
    fontFamily: {
      display: ['${s.fontDisplay}', 'sans-serif'],
      mono:    ['${s.fontMono}', 'monospace'],
    },
    screens: {
      sm: '${s.breakpoints.sm}',
      md: '${s.breakpoints.md}',
      lg: '${s.breakpoints.lg}',
      xl: '${s.breakpoints.xl}',
    },
  },`;
  parts.push(theme);

  const body = parts.length ? `\n${parts.join('\n')}\n` : '';

  return `import { defineConfig } from '@forgedevstack/aerocraft';

export default defineConfig({${body}});
`;
}

interface StudioConfigPanelProps {
  value: StudioConfigState;
  onChange: (next: StudioConfigState) => void;
}

export function StudioConfigPanel({ value, onChange }: StudioConfigPanelProps) {
  const [tab, setTab] = useState<'basics' | 'groups' | 'theme'>('basics');

  const code = useMemo(() => buildConfigCode(value), [value]);

  const set = <K extends keyof StudioConfigState>(key: K, v: StudioConfigState[K]) =>
    onChange({ ...value, [key]: v });

  const setGroup = (g: string, v: boolean) =>
    onChange({ ...value, groups: { ...value.groups, [g]: v } });

  const setBp = (k: keyof StudioConfigState['breakpoints'], v: string) =>
    onChange({ ...value, breakpoints: { ...value.breakpoints, [k]: v } });

  const reset = () => onChange(DEFAULT_STUDIO_CONFIG);

  return (
    <Card padding="md" radius="lg" className="ac-studio-config">
      <Flex direction="row" align="center" justify="between" className="ac-studio-config-head">
        <Typography variant="caption" color="muted" weight="semibold" className="ac-studio-config-title">
          aerocraft.config.ts
        </Typography>
        <Flex direction="row" gap={1}>
          <Button variant={tab === 'basics' ? 'primary' : 'ghost'} size="sm" onClick={() => setTab('basics')}>Basics</Button>
          <Button variant={tab === 'groups' ? 'primary' : 'ghost'} size="sm" onClick={() => setTab('groups')}>Groups</Button>
          <Button variant={tab === 'theme' ? 'primary' : 'ghost'} size="sm" onClick={() => setTab('theme')}>Theme</Button>
          <Button variant="ghost" size="sm" onClick={reset}>Reset</Button>
        </Flex>
      </Flex>

      {tab === 'basics' && (
        <Flex direction="column" gap={3} className="ac-studio-config-body">
          <Flex direction="row" gap={3} className="ac-studio-config-row">
            <Flex direction="column" gap={1} className="ac-studio-config-field">
              <Typography variant="caption" color="muted">Prefix</Typography>
              <Input value={value.prefix} onChange={(e) => set('prefix', e.target.value)} placeholder="ac-" />
            </Flex>
            <Flex direction="column" gap={1} className="ac-studio-config-field">
              <Typography variant="caption" color="muted">Separator</Typography>
              <Flex direction="row" gap={1}>
                {(['-', '_', '.'] as const).map((s) => (
                  <Button key={s} variant={value.separator === s ? 'primary' : 'outline'} size="sm" onClick={() => set('separator', s)}>{s}</Button>
                ))}
              </Flex>
            </Flex>
          </Flex>

          <Flex direction="row" gap={3} className="ac-studio-config-row">
            <Flex direction="column" gap={1} className="ac-studio-config-field">
              <Typography variant="caption" color="muted">Mode</Typography>
              <Flex direction="row" gap={1}>
                {(['standalone', 'apply'] as const).map((m) => (
                  <Button key={m} variant={value.mode === m ? 'primary' : 'outline'} size="sm" onClick={() => set('mode', m)}>{m}</Button>
                ))}
              </Flex>
            </Flex>
            <Flex direction="column" gap={1} className="ac-studio-config-field">
              <Typography variant="caption" color="muted">Responsive variants</Typography>
              <Switch checked={value.responsive} onCheckedChange={(v) => set('responsive', v)} />
            </Flex>
          </Flex>

          <Flex direction="column" gap={2}>
            <Typography variant="caption" color="muted" weight="semibold">Breakpoints</Typography>
            <div className="ac-studio-config-bp-grid">
              {(Object.keys(value.breakpoints) as Array<keyof StudioConfigState['breakpoints']>).map((k) => (
                <Flex key={k} direction="column" gap={1}>
                  <Typography variant="caption" color="muted">{k}</Typography>
                  <Input value={value.breakpoints[k]} onChange={(e) => setBp(k, e.target.value)} />
                </Flex>
              ))}
            </div>
          </Flex>
        </Flex>
      )}

      {tab === 'groups' && (
        <div className="ac-studio-config-groups">
          {Object.keys(DEFAULT_GROUPS).map((g) => (
            <label key={g} className="ac-studio-config-group-chip">
              <Switch checked={value.groups[g] ?? false} onCheckedChange={(v) => setGroup(g, v)} />
              <span>{g}</span>
            </label>
          ))}
        </div>
      )}

      {tab === 'theme' && (
        <Flex direction="column" gap={3} className="ac-studio-config-body">
          <Flex direction="row" gap={3} className="ac-studio-config-row">
            <Flex direction="column" gap={1} className="ac-studio-config-field">
              <Typography variant="caption" color="muted">Display font</Typography>
              <Input value={value.fontDisplay} onChange={(e) => set('fontDisplay', e.target.value)} />
            </Flex>
            <Flex direction="column" gap={1} className="ac-studio-config-field">
              <Typography variant="caption" color="muted">Mono font</Typography>
              <Input value={value.fontMono} onChange={(e) => set('fontMono', e.target.value)} />
            </Flex>
          </Flex>

          <div className="ac-studio-config-colors">
            <ColorField label="Primary" value={value.brandPrimary} onChange={(v) => set('brandPrimary', v)} />
            <ColorField label="Secondary" value={value.brandSecondary} onChange={(v) => set('brandSecondary', v)} />
            <ColorField label="Accent" value={value.brandAccent} onChange={(v) => set('brandAccent', v)} />
          </div>
        </Flex>
      )}

      <div className="ac-studio-config-code">
        <CodeBlock code={code} language="typescript" title="aerocraft.config.ts" showLineNumbers={false} copyable />
      </div>
    </Card>
  );
}

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <Flex direction="column" gap={1} className="ac-studio-config-color-field">
      <Typography variant="caption" color="muted">{label}</Typography>
      <Flex direction="row" gap={2} align="center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ac-studio-config-color-picker"
          aria-label={`${label} color`}
        />
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      </Flex>
    </Flex>
  );
}
