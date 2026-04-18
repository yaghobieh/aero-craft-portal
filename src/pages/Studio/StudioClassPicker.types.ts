export interface StudioClassPickerProps {
  x: number;
  y: number;
  activeClasses: string[];
  onToggle: (className: string) => void;
  onApplyAll: (classNames: string[]) => void;
  onClose: () => void;
  title?: string;
  relatedClasses?: string[];
}
