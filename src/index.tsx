import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.scss";
import { lookup, mergeKeyTrees, validateProps, getThemeStyles } from "./utils";
import NestedJSONGrid from "./nestedGrid";

const JSONGrid: React.FC<any> = ({
  data,
  defaultExpandDepth = 0,
  defaultExpandKeyTree = {},
  onSelect = (keyPath: any) => {},
  highlightSelected = true,
  searchText,
  theme = "default",
  customTheme = {},
}) => {
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | HTMLElement[] | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLElement)) {
        if (highlightedElement !== null) {
          if (Array.isArray(highlightedElement)) {
            highlightedElement.forEach((element) => {
              element.classList.remove(styles.highlight);
            })
          } else {
            highlightedElement.classList.remove(styles.highlight);
          }
        }
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
      defaultExpandKeyTree,
      onSelect,
      highlightSelected,
      searchText,
      theme
    });
  }, [data, defaultExpandDepth, onSelect, highlightSelected, searchText, theme]);

  const themeStyles = getThemeStyles(customTheme, theme);

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
