import themes from "./themes";

function isObject(obj: any) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
}

export function classnames(...args: string[]) {
  return args.filter(Boolean).join(" ");
}

export function lookup(obj: any, searchText: string) {
  const keyTree: JSONObject = {};
  let matchesInKey = false;

  if (typeof obj !== "object") return null;

  for (const key in obj) {
    if (!Array.isArray(obj) && matchesText(key, searchText)) {
      matchesInKey = true;
    }

    if (typeof obj[key] === "object") {
      const nestedKeyTree = lookup(obj[key], searchText);
      if (nestedKeyTree != null) {
        keyTree[key] = nestedKeyTree;
      }
    } else {
      if (matchesText(obj[key], searchText)) {
        keyTree[key] = true;
      }
    }
  }

  if (Object.keys(keyTree).length !== 0) return keyTree;
  else if (matchesInKey) return true;
  else return null;
}

export function matchesText(obj: any, searchText: string) {
  if (searchText == null) return false;
  return String(obj).toLowerCase().includes(searchText.toLowerCase());
}

export function mergeKeyTrees(keyTree1: JSONObject | any, keyTree2: JSONObject | any) {
  if (keyTree1 == null) return keyTree2;
  if (keyTree2 == null) return keyTree1;
  if (keyTree1 === true) return keyTree2;
  if (keyTree2 === true) return keyTree1;

  const mergedKeyTree: JSONObject = {};
  for (const key in keyTree1) {
    mergedKeyTree[key] = mergeKeyTrees(keyTree1[key], keyTree2[key]);
  }
  for (const key in keyTree2) {
    if (!mergedKeyTree.hasOwnProperty(key)) {
      mergedKeyTree[key] = keyTree2[key];
    }
  }
  return mergedKeyTree;
}

export function checkAllObjects(data: JSONObject | any | any[]) {
  let allObjects = false;
  let keys: Array<string> = [];
  if (Array.isArray(data)) {
    allObjects = data.length > 0;
    let keysSet: Set<string> = new Set();
    for (let i = 0; i < data.length; i++) {
      if (!isObject(data[i])) {
        allObjects = false;
        break;
      }
      Object.keys(data[i]).forEach((k) => keysSet.add(k));
    }
    keys = Array.from(keysSet);
    if (allObjects) {
      for (let i = 0; i < data.length; i++) {
        data[i] = keys.reduce((obj: JSONObject, key) => {
          obj[key] = data[i][key];
          return obj;
        }, {});
      }
    }
  } else if (isObject(data)) {
    keys = Object.keys(data);
  }
  return { allObjects, keys };
}

export function validateProps({
  data,
  defaultExpandDepth,
  defaultExpandKeyTree,
  onSelect,
  highlightSelected,
  searchText,
  theme,
}: JSONGridProps) {
  if (!data) {
    throw new Error("JSONGrid: data prop cannot be null or undefined");
  }
  if (!Array.isArray(data) && typeof data !== "object") {
    throw new Error("JSONGrid: data prop must be an object or an array");
  }
  if (defaultExpandDepth && defaultExpandDepth < 0) {
    throw new Error("JSONGrid: defaultExpandDepth prop must not be a negative number");
  }
  if (onSelect && typeof onSelect !== "function") {
    throw new Error("JSONGrid: onSelect prop must be a function");
  }
  if (highlightSelected && typeof highlightSelected !== "boolean") {
    throw new Error("JSONGrid: highlightSelected prop must be a boolean");
  }
  if (searchText && typeof searchText !== "string") {
    throw new Error("JSONGrid: searchText prop must be a string");
  }
  if (theme && !themes[theme]) {
    throw new Error(`JSONGrid: theme prop must be one of ${Object.keys(themes).join(", ")}`);
  }
}

export function getThemeStyles(customTheme: Theme, theme: string): Record<string, string> {
  const themeDetails = themes[theme];

  return {
    "--jg-bg-color": customTheme.bgColor || themeDetails.bgColor!,
    "--jg-border-color": customTheme.borderColor || themeDetails.borderColor!,
    "--jg-cell-border-color": customTheme.cellBorderColor || themeDetails.cellBorderColor!,
    "--jg-key-color": customTheme.keyColor || themeDetails.keyColor!,
    "--jg-index-color": customTheme.indexColor || themeDetails.indexColor!,
    "--jg-number-color": customTheme.numberColor || themeDetails.numberColor!,
    "--jg-boolean-color": customTheme.booleanColor || themeDetails.booleanColor!,
    "--jg-string-color": customTheme.stringColor || themeDetails.stringColor!,
    "--jg-object-color": customTheme.objectColor || themeDetails.objectColor!,
    "--jg-table-header-bg-color": customTheme.tableHeaderBgColor || themeDetails.tableHeaderBgColor!,
    "--jg-table-icon-color": customTheme.tableIconColor || themeDetails.tableIconColor!,
    "--jg-select-highlight-bg-color": customTheme.selectHighlightBgColor || themeDetails.selectHighlightBgColor!,
    "--jg-search-highlight-bg-color": customTheme.searchHighlightBgColor || themeDetails.searchHighlightBgColor!,
  };
}
