import {
  faClock,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./sessionCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActiveSessionCard({ session, onEnd }) {
  const status = session?.status;

  return (
    <div className={styles["session-card"]}>
      <div className={styles["session-card-header"]}>
        <span className={styles["session-user"]}>{session?.user}</span>

        <span
          className={styles["session-status"]}
          style={{ backgroundColor: status?.color }}
        >
          {status?.name}
        </span>
      </div>

      <div className={styles["session-device"]}>{session?.device}</div>

      <div className={styles["session-meta"]}>
        <div className={styles["session-meta-row"]}>
          <FontAwesomeIcon icon={faClock} />
          <span>{session?.startTime}</span>
          <span className={styles["dot"]} />
          <span>{session?.duration}</span>
        </div>

        <div className={styles["session-meta-row"]}>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>
            <span className={styles["session-ip"]}>{session?.ip}</span>
          </span>
        </div>
      </div>

      <div className={styles["session-actions"]}>
        <button
          type="button"
          className={styles["btn-end-session"]}
          onClick={() => onEnd?.(session)}
        >
          <FontAwesomeIcon icon={faXmark} />
          Encerrar Sessão
        </button>
      </div>
    </div>
  );
}
