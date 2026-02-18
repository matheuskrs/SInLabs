import styles from "./labMapCard.module.css";

export default function LabMapCard({ lab }) {
  const status = lab?.status;

  return (
    <div className={styles["labmap-card"]}>
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
