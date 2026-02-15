import styles from "../accessManagement.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getLabsMap } from "~/services/AccessManagement/accessManagement.api";

function downloadCsv(filename, csvText) {
  const blob = new Blob(["\ufeff" + csvText], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

function escapeCsv(value) {
  const str = String(value ?? "");
  if (/[;"\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function labsToCsv(labs) {
  const delimiter = ";";
  const headers = ["Laboratório", "Cidade", "Status", "Usuários ativos"];

  const lines = [
    headers.map(escapeCsv).join(delimiter),
    ...(labs || []).map((l) =>
      [l.name, l.city, l.status?.name, l.activeUsers]
        .map(escapeCsv)
        .join(delimiter),
    ),
  ];

  return lines.join("\n");
}

function LabMapCard({ lab }) {
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
        <span className={styles["active-users"]}>{lab?.activeUsers}</span> usuários ativos
      </div>
    </div>
  );
}

export default function LabsMapTab() {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getLabsMap();
      setLabs(data);
    }
    load();
  }, []);

  const exportCsv = () => {
    const csv = labsToCsv(labs);
    downloadCsv("mapa-laboratorios", csv);
  };

  const hasLabs = (labs || []).length > 0;

  return (
    <>
      <div className={styles["tab-header"]}>
        <span>Mapa de laboratórios</span>

        <button
          type="button"
          className={styles["btn-export"]}
          onClick={exportCsv}
        >
          <FontAwesomeIcon icon={faDownload} />
          Exportar CSV
        </button>
      </div>

      <div className={styles["tab-content"]}>
        <div className={styles["map-preview"]}>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={styles["map-icon"]}
          />

          <div className={styles["map-title"]}>
            Mapa interativo de laboratórios
          </div>
          <div className={styles["map-subtitle"]}>
            Visualização geográfica dos laboratórios
          </div>
        </div>

        {hasLabs ? (
          <div className={styles["labmap-list"]}>
            {labs.map((lab) => (
              <LabMapCard key={lab.id} lab={lab} />
            ))}
          </div>
        ) : (
          <div className={styles["empty-state"]}>
            Nenhum laboratório encontrado.
          </div>
        )}
      </div>
    </>
  );
}
