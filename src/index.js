import React, {useState, useEffect, useRef} from "react";
import styles from "./styles.css";
import classnames from "classnames";

export const JSONGrid = (props) => {
  const [highlightedElement, setHighlightedElement] = useState(null);
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (highlightedElement!=null) highlightedElement.classList.remove(styles.highlight);
        setHighlightedElement(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef, highlightedElement]);

  return <div ref={wrapperRef}>
    <NestedJSONGrid level={0} {...props} highlightedElement={highlightedElement} setHighlightedElement={setHighlightedElement}/>
    </div>;
};

const NestedJSONGrid = (props) => {
  const { level, data, dataKey, wrapperClassName, tableClassName, highlightedElement, setHighlightedElement } = props;

  const highlight = (e) => {
    if (highlightedElement!=null) {
      highlightedElement.classList.remove(styles.highlight);
    }
    e.currentTarget.classList.add(styles.highlight);
    setHighlightedElement(e.currentTarget);
  };

  if (level!=0){
    return <div className={styles.box}>
      <span className={styles.plusminus}>[+]</span>
      <span className={styles.title}>{dataKey}&nbsp;[{data.length}]</span>
    </div>
  }

  return (
    <div className={wrapperClassName}>
      <table className={tableClassName}>
        <tbody>
          {Object.keys(data).map((k) => (
            <tr key={k}>
              {!Array.isArray(data) && (
                <td
                  className={classnames(
                    styles.obj,
                    styles.key,
                    styles.name
                  )} onClick={highlight}
                >
                  {k.replace(/_/g, " ")}
                </td>
              )}
              {(() => {
                if (data[k] && typeof data[k] === "object") {
                  return (
                    <td className={classnames(styles.obj, styles.value)} onClick={highlight}>
                      <NestedJSONGrid level={level+1} dataKey={k} data={data[k]} tableClassName={tableClassName} />
                    </td>
                  );
                }
                return (
                  <td className={classnames(styles.obj, styles.value)} onClick={highlight}>
                    <span className={styles[typeof(data[k])]} dangerouslySetInnerHTML={{ __html: data[k] }} />
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
