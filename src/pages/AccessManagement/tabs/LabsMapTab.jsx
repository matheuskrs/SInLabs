import styles from "../accessManagement.module.css";

export default function LabsMapTab() {
  return (
    <>
      <div className={styles["tab-header"]}>Mapa de Laboratórios</div>

      <div className={styles["tab-content"]}>
        <div className={styles["empty-state"]}>Em breve…</div>
      </div>
    </>
  );
}
