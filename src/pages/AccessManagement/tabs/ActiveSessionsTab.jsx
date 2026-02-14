import styles from "../accessManagement.module.css";

export default function ActiveSessionsTab() {
  return (
    <>
      <div className={styles["tab-header"]}>Sessões ativas</div>

      <div className={styles["tab-content"]}>
        <div className={styles["empty-state"]}>Em breve…</div>
      </div>
    </>
  );
}
