export interface FrameworkCodeBlock {
  title: string;
  language: string;
  code: string;
}

export interface FrameworkEntry {
  id: string;
  label: string;
  install: string;
  entryImport: string;
  blocks: FrameworkCodeBlock[];
  note?: string;
}
