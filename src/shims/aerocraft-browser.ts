export { ALL_SHORTCUTS } from '../../../aerocraft/src/constants/shortcuts.const';
export { GROUP_LABELS, GROUP_ORDER } from '../../../aerocraft/src/constants/groups.const';
export { DEFAULT_THEME_COLORS } from '../../../aerocraft/src/constants/defaultThemeColors.const';
export { resolveConfig, buildClassName } from '../../../aerocraft/src/core/parser';
export { renderArbitraryStandaloneRule, extractArbitraryCandidatesFromSource } from '../../../aerocraft/src/core/arbitrary';
export { listResolvedUtilityNames } from '../../../aerocraft/src/core/listResolvedUtilities';
export type {
  AeroCraftConfig,
  AeroCraftMode,
  AeroCraftSeparator,
  AeroCraftGroupsConfig,
  AeroCraftShortcutEntry,
  AeroCraftResolvedConfig,
} from '../../../aerocraft/src/types/config.types';

export function defineConfig(config: import('../../../aerocraft/src/types/config.types').AeroCraftConfig): import('../../../aerocraft/src/types/config.types').AeroCraftConfig {
  return config;
}

