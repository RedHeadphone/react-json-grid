import React, { useState, Fragment } from "react";
import styles from "./styles.css";
import { classnames, matchesText, checkAllObjects } from "./utils";

const NestedJSONGrid = (props) => {
  const {
    level,
    keyPath,
    data,
    dataKey,
    highlightedElement,
    highlightSelected,
    onSelect,
    setHighlightedElement,
    defaultExpandDepth,
    defaultExpandKeyTree,
    searchText,
  } = props;

  const highlight = (e) => {
    if (
      (e.target !== e.currentTarget && e.target.hasAttribute("clickable")) ||
      (e.target.parentElement !== e.currentTarget &&
        e.target.parentElement.hasAttribute("clickable"))
    )
      return;
    if (highlightedElement != null)
      highlightedElement.classList.remove(styles.highlight);
    let nextKeyPath = [];
    let nextHighlightElement = e.currentTarget;
    if (e.currentTarget.hasAttribute("rowhighlight")){
      nextHighlightElement = e.currentTarget.parentElement;
      const rowIndex = Array.prototype.indexOf.call(
        nextHighlightElement.parentElement.children,
        nextHighlightElement
      )
      nextKeyPath = [rowIndex];
    }
    else if (e.currentTarget.hasAttribute("colhighlight")) {
      const colIndex = Array.prototype.indexOf.call(
        e.currentTarget.parentElement.children,
        e.currentTarget
      );
      nextHighlightElement =
        e.currentTarget.parentElement.parentElement.previousElementSibling
          .children[colIndex];
      nextKeyPath = [[keys[colIndex-1]]];
    }
    else {
      const rowIndex = Array.prototype.indexOf.call(
        nextHighlightElement.parentElement.parentElement.children,
        nextHighlightElement.parentElement
      )
      const colIndex = Array.prototype.indexOf.call(
        nextHighlightElement.parentElement.children,
        nextHighlightElement
      )
      if (allObjects){
        nextKeyPath = [rowIndex, keys[colIndex-1]];
      }
      else {
        const key = Object.keys(data)[rowIndex];
        if (colIndex === 0) {
          nextKeyPath = [[key]];
        } else {
          nextKeyPath = [key];
        }
      }
    }
    if (highlightSelected) 
      nextHighlightElement.classList.add(styles.highlight);
    setHighlightedElement(nextHighlightElement);
    onSelect(keyPath.concat(nextKeyPath));
  };

  const renderValue = (key, value, level, keyTree, nextKeyPath) => {
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
            keyPath={keyPath.concat(nextKeyPath)}
            dataKey={key}
            data={value}
            highlightedElement={highlightedElement}
            highlightSelected={highlightSelected}
            onSelect={onSelect}
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
          className={classnames(
            styles[typeof value],
            matchesText(value, searchText) && styles["search-highlight"]
          )}
        >
          {String(value)}
        </span>
      </td>
    );
  };

  const renderTable = (data, level, allObjects, keys) => {
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
                  <svg
                    className={styles.glyphicon}
                    clickable="true"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                    />
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
                    <span
                      className={
                        matchesText(k, searchText)
                          ? styles["search-highlight"]
                          : undefined
                      }
                    >
                      {k.replace(/_/g, " ")}
                    </span>
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
                  <span
                    className={
                      matchesText(k, searchText)
                        ? styles["search-highlight"]
                        : undefined
                    }
                  >
                    {k.replace(/_/g, " ")}
                  </span>
                </td>
              )}
              {allObjects
                ? Object.entries(data[k]).map(([kk, v]) =>
                    renderValue(
                      kk,
                      v,
                      level,
                      defaultExpandKeyTree && defaultExpandKeyTree[k],
                      [parseInt(k),kk]
                    )
                  )
                : renderValue(k, data[k], level, defaultExpandKeyTree, [k])}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const { allObjects, keys } = checkAllObjects(data);

  if (level !== 0) {
    const [open, setOpen] = useState(
      level <= defaultExpandDepth || defaultExpandKeyTree
    );

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
        {open && renderTable(data, level, allObjects, keys)}
      </div>
    );
  }

  return renderTable(data, level, allObjects, keys);
};

export default NestedJSONGrid;
