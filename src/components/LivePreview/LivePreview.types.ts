export type LivePreviewGeneratedCssLabels = {
  title: string;
  show: string;
  hide: string;
};

export type LivePreviewProps = {
  markup: string;
  minHeight?: number;
  label?: string;
  background?: string;
  showClasses?: boolean;
  showGeneratedCss?: boolean;
  generatedCssLabels?: LivePreviewGeneratedCssLabels;
};
