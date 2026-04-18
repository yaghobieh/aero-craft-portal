export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface PropsTableProps {
  title?: string;
  rows: PropRow[];
  showDefault?: boolean;
}
