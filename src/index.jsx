import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.scss";
import themes from "./themes";
import { lookup, mergeKeyTrees, validateProps, getThemeStyles } from "./utils";
import NestedJSONGrid from "./nestedGrid.jsx";

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
        if (highlightedElement !== null) highlightedElement.classList.remove(styles.highlight);
        setHighlightedElement(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [highlightedElement]);

  useEffect(() => {
    validateProps({
      data,
      defaultExpandDepth,
      onSelect,
      highlightSelected,
      searchText,
      theme,
      themes,
    });
  }, [data, defaultExpandDepth, onSelect, highlightSelected, searchText, theme, themes]);

  const themeStyles = getThemeStyles(customTheme, theme, themes);

  const mergedKeyTree = searchText
    ? mergeKeyTrees(defaultExpandKeyTree, lookup(data, searchText))
    : defaultExpandKeyTree;

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
