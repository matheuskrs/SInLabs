import styles from "../accessManagement.module.css";

export default function DownloadsTab() {
  return (
    <>
      <div className={styles["tab-header"]}>Downloads</div>

      <div className={styles["tab-content"]}>
        <div className={styles["empty-state"]}>Em breve…</div>
      </div>
    </>
  );
}
