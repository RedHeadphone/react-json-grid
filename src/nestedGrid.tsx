import React, { useState, Fragment } from "react";
import styles from "./styles.scss";
import { classnames, matchesText, checkAllObjects } from "./utils";

const NestedJSONGrid = (props: NestedGridProps) => {
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

  const highlight = (event: React.MouseEvent) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;
    if (
      (target !== currentTarget && target.hasAttribute("data-clickable")) ||
      (target.parentElement !== currentTarget && target.parentElement?.hasAttribute("data-clickable"))
    )
      return;

    let nextKeyPath: keyPathNode[] = [];
    let nextHighlightElement: HTMLElement | null = currentTarget;

    if (highlightedElement != null) highlightedElement.classList.remove(styles.highlight);
    if (currentTarget.hasAttribute("data-rowhighlight")) {
      nextHighlightElement = currentTarget.parentElement;
      const rowIndex = Array.prototype.indexOf.call(
        nextHighlightElement?.parentElement?.children,
        nextHighlightElement
      );
      nextKeyPath = [(isArray && !allObjects ? [rowIndex] : rowIndex)];
    } else if (currentTarget.hasAttribute("data-colhighlight")) {
      const colIndex = Array.prototype.indexOf.call(currentTarget.parentElement?.children, currentTarget);
      nextHighlightElement = currentTarget.parentElement?.parentElement?.previousElementSibling?.children[
        colIndex
      ] as HTMLElement | null;
      nextKeyPath = [[keys[colIndex - 1]]];
    } else {
      const rowIndex = Array.prototype.indexOf.call(
        nextHighlightElement?.parentElement?.parentElement?.children,
        nextHighlightElement.parentElement
      );
      const colIndex = Array.prototype.indexOf.call(
        nextHighlightElement?.parentElement?.children,
        nextHighlightElement
      );
      if (allObjects) {
        nextKeyPath = [rowIndex, keys[colIndex - 1]];
      } else {
        const key = keys[rowIndex];
        if (colIndex === 0) {
          nextKeyPath = [[key]];
        } else {
          nextKeyPath = [(isArray ? parseInt(key) : key)];
        }
      }
    }
    if (highlightSelected) nextHighlightElement?.classList.add(styles.highlight);
    setHighlightedElement(nextHighlightElement);
    onSelect(keyPath.concat(nextKeyPath));
  };

  const renderValue = (key: string, value: any, level: number, keyTree: JSONObject, nextKeyPath: keyPathNode[]) => {
    if (value && typeof value === "object")
      return (
        <td className={classnames(styles.obj, styles.value)} onClick={highlight} data-clickable="true" key={key}>
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
      <td className={classnames(styles.obj, styles.value)} onClick={highlight} data-clickable="true" key={key}>
        <span
          className={classnames(styles[typeof value], matchesText(value, searchText) && styles["search-highlight"])}
        >
          {String(value)}
        </span>
      </td>
    );
  };

  const renderTable = (data: JSONObject, level: number, allObjects: boolean, keys: string[]) => {
    return (
      <table className={styles["json-grid-table"]}>
        {allObjects && (
          <Fragment>
            <colgroup>
              <col></col>
              {keys.map((key: string) => (
                <col key={key}></col>
              ))}
            </colgroup>
            <thead>
              <tr>
                <th className={classnames(styles.obj, styles.order)} data-clickable="true">
                  <svg
                    className={styles.glyphicon}
                    data-clickable="true"
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
                {keys.map((key: string) => (
                  <th
                    className={classnames(styles.obj, styles.order, styles.name)}
                    key={key}
                    onClick={highlight}
                    data-clickable="true"
                    data-colhighlight="true"
                  >
                    <span className={matchesText(key, searchText) ? styles["search-highlight"] : undefined}>{key}</span>
                  </th>
                ))}
              </tr>
            </thead>
          </Fragment>
        )}
        <tbody>
          {Object.keys(data).map((key) => (
            <tr key={key}>
              {Array.isArray(data) ? (
                <td
                  className={classnames(styles.obj, styles.order, styles.index)}
                  onClick={highlight}
                  data-clickable="true"
                  data-rowhighlight="true"
                >
                  {parseInt(key) + 1}
                </td>
              ) : (
                <td
                  className={classnames(styles.obj, styles.key, styles.name)}
                  onClick={highlight}
                  data-clickable="true"
                >
                  <span className={matchesText(key, searchText) ? styles["search-highlight"] : undefined}>{key}</span>
                </td>
              )}
              {allObjects
                ? keys.map((nestedKey: string) =>
                    renderValue(
                      nestedKey,
                      data[key][nestedKey],
                      level,
                      defaultExpandKeyTree && defaultExpandKeyTree[key],
                      [parseInt(key), nestedKey]
                    )
                  )
                : renderValue(key, data[key], level, defaultExpandKeyTree, [key])}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const { allObjects, keys, isArray } = checkAllObjects(data);

  if (level !== 0) {
    const [open, setOpen] = useState<boolean>(Boolean(level <= defaultExpandDepth || defaultExpandKeyTree));

    return (
      <div className={styles.box}>
        <span className={styles.plusminus} onClick={() => setOpen(!open)} data-clickable="true">
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
