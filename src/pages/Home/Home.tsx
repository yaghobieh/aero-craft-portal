import { Flex } from '@forgedevstack/bear';
import { HeroSection } from '@components/HeroSection';
import { HomeExamples } from './HomeExamples';
import { HomeCompare } from './sections/HomeCompare';
import { HomeVsTailwind } from './sections/HomeVsTailwind';
import { HomeRecipeShowcase } from './sections/HomeRecipeShowcase';
import { HomeCategories } from './sections/HomeCategories';
import { HomeShortcuts } from './sections/HomeShortcuts';
import { HomePalette } from './sections/HomePalette';
import { HomeInstallCta } from './sections/HomeInstallCta';
import { HomeComponentPresets } from './sections/HomeComponentPresets';

export function Home() {
  return (
    <Flex direction="column" gap={12} className="ac-home-root">
      <HeroSection />
      <HomeVsTailwind />
      <HomeCompare />
      <HomeRecipeShowcase />
      <HomeCategories />
      <HomeShortcuts />
      <HomeExamples />
      <HomeComponentPresets />
      <HomePalette />
      <HomeInstallCta />
    </Flex>
  );
}
