import React, { useState, useEffect, useRef, Fragment } from "react";
import styles from "./styles.css";
import classnames from "classnames";
import menuIcon from "./menuIcon.svg";

export const JSONGrid = (props) => {
  const { data } = props;
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
  return (
    <div className={styles["json-grid-container"]} ref={wrapperRef}>
      <NestedJSONGrid
        level={0}
        data={data}
        highlightedElement={highlightedElement}
        setHighlightedElement={setHighlightedElement}
      />
    </div>
  );
};

const NestedJSONGrid = (props) => {
  const { level, data, dataKey, highlightedElement, setHighlightedElement } =
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

  const checkAllObjects = (data) => {
    let allObjects = false;
    let keys;
    if (Array.isArray(data)) {
      allObjects = true;
      keys = new Set();
      for (let i = 0; i < data.length; i++) {
        if (typeof data[i] !== "object" || Array.isArray(data[i])) {
          allObjects = false;
          break;
        }
        Object.keys(data[i]).forEach((k) => keys.add(k));
      }
      keys = Array.from(keys);
      if (allObjects) {
        for (let i = 0; i < data.length; i++) {
          data[i] = keys.reduce((obj, key) => {
            obj[key] = data[i][key] !== undefined ? data[i][key] : "-";
            return obj;
          }, {});
        }
      }
    }
    return { allObjects, keys };
  };

  const renderValue = (key, value, level) => {
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
          className={styles[typeof value]}
          dangerouslySetInnerHTML={{ __html: value }}
        />
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
                  <img
                    className={styles.glyphicon}
                    src={menuIcon}
                    clickable="true"
                  />
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
                    {k.replace(/_/g, " ")}
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
                  {k.replace(/_/g, " ")}
                </td>
              )}
              {allObjects
                ? Object.entries(data[k]).map(([kk, v]) =>
                    renderValue(kk, v, level)
                  )
                : renderValue(k, data[k], level)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (level !== 0) {
    const [open, setOpen] = useState(false);

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
