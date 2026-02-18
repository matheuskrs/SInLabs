import styles from "./labsMap.module.css";
import { use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getLabsMap } from "~/services/AccessManagement/accessManagement.api";
import TabHeader from "~/components/Tabs/TabHeader/TabHeader";
import LabMapCard from "../../../../components/LabMapCard/LabMapCard";
const labsPromise = getLabsMap();
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

export default function LabsMapTab() {
  const labs = use(labsPromise);
  const exportCsv = () => {
    const csv = labsToCsv(labs);
    downloadCsv("mapa-laboratorios", csv);
  };

  const hasLabs = (labs || []).length > 0;

  return (
    <>
      <TabHeader title="Mapa de laboratórios" exportCsv={exportCsv} />
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
