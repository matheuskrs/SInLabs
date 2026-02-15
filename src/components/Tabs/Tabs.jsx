import "./tabs.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Tabs({ tabs, activeKey, onChange }) {
  const listRef = useRef(null);
  const btnRefs = useRef({});
  const activeKeyRef = useRef(activeKey);

  const [indicator, setIndicator] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    activeKeyRef.current = activeKey;
  }, [activeKey]);

  const setBtnRef = (key) => (el) => {
    if (el) btnRefs.current[key] = el;
  };

  useLayoutEffect(() => {
    const listEl = listRef.current;
    const btnEl = btnRefs.current[activeKey];
    if (!listEl || !btnEl) return;

    const listRect = listEl.getBoundingClientRect();
    const btnRect = btnEl.getBoundingClientRect();

    const next = {
      left: btnRect.left - listRect.left,
      top: btnRect.top - listRect.top,
      width: btnRect.width,
      height: btnRect.height,
    };

    setIndicator((prev) =>
      prev.left === next.left &&
      prev.top === next.top &&
      prev.width === next.width &&
      prev.height === next.height
        ? prev
        : next,
    );
  }, [activeKey, tabs.length]);

  useEffect(() => {
    const update = () => {
      const listEl = listRef.current;
      const btnEl = btnRefs.current[activeKeyRef.current];
      if (!listEl || !btnEl) return;

      const listRect = listEl.getBoundingClientRect();
      const btnRect = btnEl.getBoundingClientRect();

      const next = {
        left: btnRect.left - listRect.left,
        top: btnRect.top - listRect.top,
        width: btnRect.width,
        height: btnRect.height,
      };

      setIndicator((prev) =>
        prev.left === next.left &&
        prev.top === next.top &&
        prev.width === next.width &&
        prev.height === next.height
          ? prev
          : next,
      );
    };

    window.addEventListener("resize", update);
    const t = setTimeout(update, 0);

    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(t);
    };
  }, [tabs.length]);

  return (
    <div className="tabs-container">
      <div className="tabs-list" ref={listRef}>
        <div
          className="tab-indicator"
          style={{
            transform: `translate(${indicator.left}px, ${indicator.top}px)`,
            width: indicator.width,
            height: indicator.height,
          }}
          aria-hidden="true"
        />

        {tabs.map((t) => {
          const active = t.key === activeKey;

          return (
            <button
              key={t.key}
              ref={setBtnRef(t.key)}
              type="button"
              className={`tab-item ${active ? "tab-active" : ""}`}
              onClick={() => onChange(t.key)}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
