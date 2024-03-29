import React, { useState, useEffect, useRef, Fragment } from "react";
import styles from "./styles.css";
import themes from "./themes";
import { classnames, lookup, matchesText, mergeKeyTrees, checkAllObjects } from "./utils";

export const JSONGrid = (props) => {
  let { data, defaultExpandDepth, defaultExpandKeyTree, searchText, theme = "default", customTheme = {} } = props;
  const [highlightedElement, setHighlightedElement] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (highlightedElement != null)
          highlightedElement.classList.remove(styles.highlight);
        setHighlightedElement(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef, highlightedElement]);

  if (data == null)
    throw new Error("JSONGrid: data prop cannot be null or undefined");
  if (typeof data !== "object")
    throw new Error("JSONGrid: data prop must be an object or an array");

  if (defaultExpandDepth != null){
    if (typeof defaultExpandDepth !== "number")
      throw new Error("JSONGrid: defaultExpandDepth prop must be a number");
    if (defaultExpandDepth < 0)
      throw new Error("JSONGrid: defaultExpandDepth prop must not be a negative number");
  } else {
    defaultExpandDepth = 0;
  }

  if (defaultExpandKeyTree != null){
    if (typeof defaultExpandKeyTree !== "object")
      throw new Error("JSONGrid: defaultExpandKeyTree prop must be an object");
    if (Array.isArray(defaultExpandKeyTree))
      throw new Error("JSONGrid: defaultExpandKeyTree prop must not be an array");
  }

  if (searchText != null){
    if (typeof searchText !== "string")
      throw new Error("JSONGrid: searchText prop must be a string");

    const searchKeyTree = lookup(data, searchText);
    defaultExpandKeyTree = mergeKeyTrees(defaultExpandKeyTree, searchKeyTree);
  }

  if (themes[theme] == null){
    throw new Error(`JSONGrid: theme prop must be one of ${Object.keys(themes).join(", ")}`);
  }

  const themeDetails = themes[theme];
  const themeStyles = {
    "--jg-bg-color": customTheme.bgColor || themeDetails.bgColor,
    "--jg-table-border-color": customTheme.tableBorderColor || themeDetails.tableBorderColor,
    "--jg-highlight-bg-color": customTheme.highlightBgColor || themeDetails.highlightBgColor,
    "--jg-cell-border-color": customTheme.cellBorderColor || themeDetails.cellBorderColor,
    "--jg-key-name-color": customTheme.keyNameColor || themeDetails.keyNameColor,
    "--jg-index-color": customTheme.indexColor || themeDetails.indexColor,
    "--jg-number-color": customTheme.numberColor || themeDetails.numberColor,
    "--jg-boolean-color": customTheme.booleanColor || themeDetails.booleanColor,
    "--jg-string-color": customTheme.stringColor || themeDetails.stringColor,
    "--jg-object-color": customTheme.objectColor || themeDetails.objectColor,
    "--jg-table-header-bg-color": customTheme.tableHeaderBgColor || themeDetails.tableHeaderBgColor,
    "--jg-table-header-color": customTheme.tableHeaderColor || themeDetails.tableHeaderColor,
    "--jg-search-highlight-bg-color": customTheme.searchHighlightBgColor || themeDetails.searchHighlightBgColor,
  };

  return (
    <div className={styles["json-grid-container"]} style={themeStyles} ref={wrapperRef}>
      <NestedJSONGrid
        level={0}
        data={data}
        highlightedElement={highlightedElement}
        setHighlightedElement={setHighlightedElement}
        defaultExpandDepth={defaultExpandDepth}
        defaultExpandKeyTree={defaultExpandKeyTree}
        searchText={searchText}
      />
    </div>
  );
};

const NestedJSONGrid = (props) => {
  const { level, data, dataKey, highlightedElement, setHighlightedElement, defaultExpandDepth, defaultExpandKeyTree, searchText } =
    props;

  const highlight = (e) => {
    if (
      (e.target !== e.currentTarget && e.target.hasAttribute("clickable")) ||
      (e.target.parentElement !== e.currentTarget &&
        e.target.parentElement.hasAttribute("clickable"))
    )
      return;
    if (highlightedElement != null)
      highlightedElement.classList.remove(styles.highlight);
    let nextHighlightElement = e.currentTarget;
    if (e.currentTarget.hasAttribute("rowhighlight"))
      nextHighlightElement = e.currentTarget.parentElement;
    else if (e.currentTarget.hasAttribute("colhighlight")) {
      const colIndex = Array.prototype.indexOf.call(
        e.currentTarget.parentElement.children,
        e.currentTarget
      );
      nextHighlightElement =
        e.currentTarget.parentElement.parentElement.previousElementSibling
          .children[colIndex];
    }
    nextHighlightElement.classList.add(styles.highlight);
    setHighlightedElement(nextHighlightElement);
  };

  const renderValue = (key, value, level, keyTree) => {
    if (value && typeof value === "object")
      return (
        <td
          className={classnames(styles.obj, styles.value)}
          onClick={highlight}
          clickable="true"
          key={key}
        >
          <NestedJSONGrid
            level={level + 1}
            dataKey={key}
            data={value}
            highlightedElement={highlightedElement}
            setHighlightedElement={setHighlightedElement}
            defaultExpandDepth={defaultExpandDepth}
            defaultExpandKeyTree={keyTree && keyTree[key]}
            searchText={searchText}
          />
        </td>
      );
    return (
      <td
        className={classnames(styles.obj, styles.value)}
        onClick={highlight}
        clickable="true"
        key={key}
      >
        <span
          className={classnames(styles[typeof value],matchesText(value,searchText) && styles["search-highlight"])}
        >{value.toString()}</span>
      </td>
    );
  };

  const renderTable = (data, level) => {
    const { allObjects, keys } = checkAllObjects(data);

    return (
      <table className={styles["json-grid-table"]}>
        {allObjects && (
          <Fragment>
            <colgroup>
              <col></col>
              {keys.map((k) => (
                <col key={k}></col>
              ))}
            </colgroup>
            <thead>
              <tr>
                <th
                  className={classnames(styles.obj, styles.order)}
                  clickable="true"
                >
                  <svg className={styles.glyphicon} clickable="true" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path fill="currentColor"
                      d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                  </svg>
                </th>
                {keys.map((k) => (
                  <th
                    className={classnames(
                      styles.obj,
                      styles.order,
                      styles.name
                    )}
                    key={k}
                    onClick={highlight}
                    clickable="true"
                    colhighlight="true"
                  >
                    <span className={matchesText(k,searchText) ? styles["search-highlight"] : undefined}>{k.replace(/_/g, " ")}</span>
                  </th>
                ))}
              </tr>
            </thead>
          </Fragment>
        )}
        <tbody>
          {Object.keys(data).map((k) => (
            <tr key={k}>
              {Array.isArray(data) ? (
                <td
                  className={classnames(styles.obj, styles.order, styles.index)}
                  onClick={highlight}
                  clickable="true"
                  rowhighlight="true"
                >
                  {parseInt(k) + 1}
                </td>
              ) : (
                <td
                  className={classnames(styles.obj, styles.key, styles.name)}
                  onClick={highlight}
                  clickable="true"
                >
                  <span className={matchesText(k,searchText) ? styles["search-highlight"] : undefined}>{k.replace(/_/g, " ")}</span>
                </td>
              )}
              {allObjects
                ? Object.entries(data[k]).map(([kk, v]) =>
                    renderValue(kk, v, level, defaultExpandKeyTree && defaultExpandKeyTree[k])
                  )
                : renderValue(k, data[k], level, defaultExpandKeyTree)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (level !== 0) {
    const [open, setOpen] = useState(level<=defaultExpandDepth || defaultExpandKeyTree);

    return (
      <div className={styles.box}>
        <span
          className={styles.plusminus}
          onClick={() => setOpen(!open)}
          clickable="true"
        >
          {open ? "[-]" : "[+]"}
        </span>
        <span className={styles.title}>
          {dataKey}&nbsp;{Array.isArray(data) ? `[${data.length}]` : "{}"}
        </span>
        {open && renderTable(data, level)}
      </div>
    );
  }

  return renderTable(data, level);
};
