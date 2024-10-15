interface JSONObject {
  [key: string]: any;
}

interface Theme {
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

interface Themes {
  [key: string]: Theme;
}

type keyPathNode = string | string[] | number | number[];

interface JSONGridProps {
  data: JSONObject;
  defaultExpandDepth?: number;
  defaultExpandKeyTree?: JSONObject;
  onSelect?: (keyPath: keyPathNode[]) => void;
  highlightSelected?: boolean;
  searchText?: string;
  theme?: string;
  customTheme?: Theme;
}

interface NestedGridProps {
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
  searchText: string;
}
