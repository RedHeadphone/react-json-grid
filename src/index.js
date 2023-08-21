import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.css";
import classnames from "classnames";

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
    setHighlightedElement,
  } = props;

  const highlight = (e) => {
    if (
      (e.target !== e.currentTarget && e.target.hasAttribute("clickable")) ||
      (e.target.parentElement !== e.currentTarget &&
        e.target.parentElement.hasAttribute("clickable"))
    )
      return;
    if (highlightedElement != null) {
      highlightedElement.classList.remove(styles.highlight);
    }
    let nextHighlightElement = e.currentTarget;
    if (e.currentTarget.hasAttribute("rowhighlight")) {
      nextHighlightElement = e.currentTarget.parentElement;
    }
    nextHighlightElement.classList.add(styles.highlight);
    setHighlightedElement(nextHighlightElement);
  };

  const renderTable = () => {
    return (
        <table className={styles["json-grid-table"]}>
          <tbody>
            {Object.keys(data).map((k) => (
              <tr key={k}>
                {Array.isArray(data) ? (
                  <td className={classnames(styles.obj,styles.order,styles.index)} 
                    onClick={highlight}
                    clickable="true"
                    rowhighlight="true"
                  >{parseInt(k)+1}</td>
                ) : (
                  <td
                    className={classnames(styles.obj, styles.key, styles.name)}
                    onClick={highlight}
                    clickable="true"
                  >
                    {k.replace(/_/g, " ")}
                  </td>
                )}
                {(() => {
                  if (data[k] && typeof data[k] === "object") {
                    return (
                      <td
                        className={classnames(styles.obj, styles.value)}
                        onClick={highlight}
                        clickable="true"
                      >
                        <NestedJSONGrid
                          level={level + 1}
                          dataKey={k}
                          data={data[k]}
                          highlightedElement={highlightedElement}
                          setHighlightedElement={setHighlightedElement}
                        />
                      </td>
                    );
                  }
                  return (
                    <td
                      className={classnames(styles.obj, styles.value)}
                      onClick={highlight}
                      clickable="true"
                    >
                      <span
                        className={styles[typeof data[k]]}
                        dangerouslySetInnerHTML={{ __html: data[k] }}
                      />
                    </td>
                  );
                })()}
              </tr>
            ))}
          </tbody>
        </table>
    );
  };

  if (level != 0) {
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
