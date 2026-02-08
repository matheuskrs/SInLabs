import {
  faDownload,
  faFileLines,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./downloadCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DownloadCard({ sys }) {
  const cover = sys.imageUrl;
  const title = sys.name || "Sistema";
  const subtitle = sys.version ? `Versão ${sys.version}` : "Disponível para download";
  const description = sys.description || "Sistema disponível para download.";
  const sizeText = sys.size || "(Não especificado)";

  const onDownload = () => {
    console.log("download", sys);
  };

  const onChangelog = () => {
    console.log("changelog", sys);
  };

  return (
    <div className={styles["download-card"]}>
      <div className={styles["download-card-cover"]}>
        <img
          src={cover}
          alt={title}
          className={styles["download-card-cover-img"]}
          loading="lazy"
        />
      </div>

      <div className={styles["download-card-body"]}>
        <h3 className={styles["download-card-title"]}>{title}</h3>
        <div className={styles["download-card-subtitle"]}>{subtitle}</div>

        <p className={styles["download-card-description"]}>{description}</p>

        <div className={styles["download-card-meta-row"]}>
          <FontAwesomeIcon
            icon={faFloppyDisk}
            className={styles["download-card-meta-icon"]}
          />
          <span className={styles["download-card-meta-text"]}>{sizeText}</span>
        </div>

        <div className={styles["download-card-actions-row"]}>
          <button
            type="button"
            className={styles["download-card-btn-download"]}
            onClick={onDownload}
          >
            <FontAwesomeIcon icon={faDownload} />
            Baixar
          </button>

          <button
            type="button"
            className={styles["download-card-btn-changelog"]}
            onClick={onChangelog}
          >
            <FontAwesomeIcon icon={faFileLines} />
          </button>
        </div>
      </div>
    </div>
  );
}
