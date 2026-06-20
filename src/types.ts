export type keyPathNode = string | string[] | number | number[];

export interface JSONObject {
  [key: string]: any;
}

export interface Theme {
  bgColor?: string;
  borderColor?: string;
  selectHighlightBgColor?: string;
  cellBorderColor?: string;
  keyColor?: string;
  indexColor?: string;
  numberColor?: string;
  booleanColor?: string;
  stringColor?: string;
  objectColor?: string;
  tableHeaderBgColor?: string;
  tableIconColor?: string;
  searchHighlightBgColor?: string;
}

export interface Themes {
  [key: string]: Theme;
}

export interface JSONGridProps {
  data: JSONObject;
  defaultExpandDepth?: number;
  defaultExpandKeyTree?: JSONObject;
  onSelect?: (keyPath: keyPathNode[]) => void;
  onBlur?: () => void;
  highlightSelected?: boolean;
  searchText?: string | null;
  theme?: string;
  customTheme?: Theme;
}

export interface NestedGridProps {
  level: number;
  keyPath: keyPathNode[];
  dataKey?: string;
  data: JSONObject;
  highlightedElement: HTMLElement | null;
  highlightSelected: boolean;
  onSelect: (keyPath: keyPathNode[]) => void;
  setHighlightedElement: (element: HTMLElement | null) => void;
  defaultExpandDepth: number;
  defaultExpandKeyTree: JSONObject;
  searchText: string | null;
}
