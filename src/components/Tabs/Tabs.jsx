import "./tabs.css";

export default function Tabs({ tabs, activeKey, onChange }) {
  return (
    <div className={"tabs-container"}>
      <div className={"tabs-list"}>
        {tabs.map((t) => {
          const active = t.key === activeKey;

          return (
            <button
              key={t.key}
              type="button"
              className={`${"tab-item"} ${active ? ["tab-active"] : ""}`}
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