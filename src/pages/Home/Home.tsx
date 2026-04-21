import { Flex } from '@forgedevstack/bear';
import { HeroSection } from '@components/HeroSection';
import { HomeExamples } from './HomeExamples';
import { HomeCompare } from './sections/HomeCompare';
import { HomeCategories } from './sections/HomeCategories';
import { HomeShortcuts } from './sections/HomeShortcuts';
import { HomePalette } from './sections/HomePalette';
import { HomeInstallCta } from './sections/HomeInstallCta';

export function Home() {
  return (
    <Flex direction="column" gap={12} className="ac-home-root">
      <HeroSection />
      <HomeCompare />
      <HomeCategories />
      <HomeShortcuts />
      <HomeExamples />
      <HomePalette />
      <HomeInstallCta />
    </Flex>
  );
}
