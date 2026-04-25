export type DocsResponsiveBreakpointsLabels = {
  name: string;
  min: string;
  example: string;
};

export type DocsResponsiveBreakpointsTableProps = {
  breakpoints: Record<string, string | undefined>;
  labels: DocsResponsiveBreakpointsLabels;
};
