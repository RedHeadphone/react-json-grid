import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.css";
import themes from "./themes";
import { lookup, mergeKeyTrees } from "./utils";
import NestedJSONGrid from "./nestedGrid";

const JSONGrid = ({
  data,
  defaultExpandDepth = 0,
  defaultExpandKeyTree = {},
  onSelect = (keyPath) => {},
  highlightSelected = true,
  searchText,
  theme = "default",
  customTheme = {},
}) => {
  const [highlightedElement, setHighlightedElement] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (highlightedElement !== null)
          highlightedElement.classList.remove(styles.highlight);
        setHighlightedElement(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [highlightedElement]);

  if (!data) {
    throw new Error("JSONGrid: data prop cannot be null or undefined");
  }

  if (!Array.isArray(data) && typeof data !== "object") {
    throw new Error("JSONGrid: data prop must be an object or an array");
  }

  if (defaultExpandDepth < 0) {
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

  if (!themes[theme]) {
    throw new Error(`JSONGrid: theme prop must be one of ${Object.keys(themes).join(", ")}`);
  }

  const themeDetails = themes[theme];
  const themeStyles = {
    "--jg-bg-color": customTheme.bgColor || themeDetails.bgColor,
    "--jg-table-border-color":
      customTheme.tableBorderColor || themeDetails.tableBorderColor,
    "--jg-highlight-bg-color":
      customTheme.highlightBgColor || themeDetails.highlightBgColor,
    "--jg-cell-border-color":
      customTheme.cellBorderColor || themeDetails.cellBorderColor,
    "--jg-key-name-color":
      customTheme.keyNameColor || themeDetails.keyNameColor,
    "--jg-index-color": customTheme.indexColor || themeDetails.indexColor,
    "--jg-number-color": customTheme.numberColor || themeDetails.numberColor,
    "--jg-boolean-color": customTheme.booleanColor || themeDetails.booleanColor,
    "--jg-string-color": customTheme.stringColor || themeDetails.stringColor,
    "--jg-object-color": customTheme.objectColor || themeDetails.objectColor,
    "--jg-table-header-bg-color":
      customTheme.tableHeaderBgColor || themeDetails.tableHeaderBgColor,
    "--jg-table-header-color":
      customTheme.tableHeaderColor || themeDetails.tableHeaderColor,
    "--jg-search-highlight-bg-color":
      customTheme.searchHighlightBgColor || themeDetails.searchHighlightBgColor,
  };

  const mergedKeyTree = searchText ? mergeKeyTrees(defaultExpandKeyTree, lookup(data, searchText)) : defaultExpandKeyTree;

  return (
    <div className={styles["json-grid-container"]} style={themeStyles} ref={wrapperRef}>
      <NestedJSONGrid
        level={0}
        keyPath={[]}
        data={data}
        highlightedElement={highlightedElement}
        highlightSelected={highlightSelected}
        onSelect={onSelect}
        setHighlightedElement={setHighlightedElement}
        defaultExpandDepth={defaultExpandDepth}
        defaultExpandKeyTree={mergedKeyTree}
        searchText={searchText}
      />
    </div>
  );
};

export default JSONGrid;
