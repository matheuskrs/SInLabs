import styles from "./labMapCard.module.css";

export default function LabMapCard({ lab, onClick, selected }) {
  const status = lab?.status;

  return (
    <div
      className={`${styles["labmap-card"]} ${
        selected ? styles["selected"] : ""
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className={styles["labmap-card-header"]}>
        <span className={styles["labmap-lab-name"]}>{lab?.name}</span>

        <span
          className={styles["labmap-status-dot"]}
          style={{ backgroundColor: status?.color }}
          title={status?.name}
        />
      </div>

      <div className={styles["labmap-city"]}>{lab?.city}</div>

      <div className={styles["labmap-users"]}>
        <span className={styles["active-users"]}>{lab?.activeUsers}</span>{" "}
        usuários ativos
      </div>
    </div>
  );
}
