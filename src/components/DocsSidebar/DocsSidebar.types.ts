import type { DocSection } from '@utils/docsSections.utils';

export type DocsSidebarProps = {
  activePath: string;
  subsectionList: DocSection[];
  onNavigate: () => void;
};
