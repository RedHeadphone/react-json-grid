import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.css";
import classnames from "classnames";
import menuIcon from "./menuIcon.svg";

export const JSONGrid = (props) => {
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

  return (
    <div className={styles["json-grid-container"]} ref={wrapperRef}>
      <NestedJSONGrid
        level={0}
        {...props}
        highlightedElement={highlightedElement}
        setHighlightedElement={setHighlightedElement}
      />
    </div>
  );
};

const NestedJSONGrid = (props) => {
  const {
    level,
    data,
    dataKey,
    highlightedElement,
    setHighlightedElement
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
    let nextHighlightElement = e.currentTarget;
    if (e.currentTarget.hasAttribute("rowhighlight"))
      nextHighlightElement = e.currentTarget.parentElement;
    nextHighlightElement.classList.add(styles.highlight);
    setHighlightedElement(nextHighlightElement);
  };

  const renderValue = (key, value) => {
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

  const renderTable = () => {
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
          data[i] = keys.reduce(
            (obj, key) => {
              obj[key] = (data[i][key] !== undefined) ? data[i][key] : "-";
              return obj;
            },
            {}
          );
        };
      }
    }

    return (
      <table className={styles["json-grid-table"]}>
        {allObjects && (<thead>
          <tr>
            <th className={classnames(styles.obj, styles.order)} type="table">
              <div className={classnames(styles.glyphicon)}>
                <img src={menuIcon} />
              </div>
            </th>
            {keys.map((k) => (
              <th
                className={classnames(styles.obj, styles.order, styles.name)}
                key={k}
              >
                {k.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>)}
        <tbody>
          {Object.keys(data).map((k) => (
            <tr key={k}>
              {Array.isArray(data) ? (
                <td className={classnames(styles.obj, styles.order, styles.index)}
                  onClick={highlight}
                  clickable="true"
                  rowhighlight="true"
                >{parseInt(k) + 1}</td>
              ) : (
                <td
                  className={classnames(styles.obj, styles.key, styles.name)}
                  onClick={highlight}
                  clickable="true"
                >
                  {k.replace(/_/g, " ")}
                </td>
              )}
              {allObjects ? Object.entries(data[k]).map(([kk, v]) => renderValue(kk, v))
                : renderValue(k, data[k])}
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
        {open && renderTable()}
      </div>
    );
  }

  return renderTable();
};
