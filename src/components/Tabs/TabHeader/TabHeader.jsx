import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@mui/material";
import styles from "./tabHeader.module.css";

export default function TabHeader({ title, exportCsv }) {
  const isMobile = useMediaQuery("(max-width:700px)");

  return (
    <div className={styles["tab-header"]}>
      <span>{title}</span>

      {typeof exportCsv === "function" && (
        <button
          type="button"
          className={styles["btn-export"]}
          onClick={exportCsv}
        >
          <FontAwesomeIcon icon={faDownload} />
          {!isMobile && "Exportar CSV"}
        </button>
      )}
    </div>
  );
}