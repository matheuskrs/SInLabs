import styles from "../accessManagement.module.css";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Select, MenuItem } from "@mui/material";

import { getActiveSessions } from "~/services/AccessManagement/accessManagement.api";
import { useConfirm } from "~/components/ConfirmationDialog/UseConfirm";
import { useToast } from "~/providers/Toast/useToast";
import { useGlobalLoading } from "~/providers/GlobalLoading/GlobalLoadingContext";
import ActiveSessionCard from "~/components/ActiveSessionsCard/ActiveSessionCard";
import { useMediaQuery } from "@mui/material";

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

function sessionsToCsv(sessions) {
  const delimiter = ";";
  const headers = ["Usuário", "Status", "Dispositivo", "Hora", "Duração", "IP"];

  const lines = [
    headers.map(escapeCsv).join(delimiter),
    ...(sessions || []).map((s) =>
      [s.user, s.status?.name, s.device, s.startTime, s.duration, s.ip]
        .map(escapeCsv)
        .join(delimiter),
    ),
  ];

  return lines.join("\n");
}

export default function ActiveSessionsTab() {
  const [sessions, setSessions] = useState([]);
  const { confirm, ConfirmDialog } = useConfirm();
  const toast = useToast();
  const { showLoading, hideLoading } = useGlobalLoading();

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function load() {
      const data = await getActiveSessions();
      setSessions(data);
    }
    load();
  }, []);

  const totalItems = sessions.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;

  const pagedSessions = useMemo(() => {
    return sessions.slice(startIndex, startIndex + pageSize);
  }, [sessions, startIndex, pageSize]);

  const showingFrom = totalItems === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + pagedSessions.length, totalItems);
  const showingText = `Mostrando ${showingFrom} a ${showingTo} de ${totalItems} sessões`;

  const exportCsv = () => {
    const csv = sessionsToCsv(sessions);
    downloadCsv("sessoes-ativas", csv);
  };

  const onEndSession = async () => {
    const ok = await confirm({
      title: "Atenção",
      message: `Tem certeza que deseja desligar a sessão do usuário?`,
    });
    if (!ok) return;

    showLoading("Encerrando sessão");
    await sleep(1000);
    hideLoading();
    toast.success("Sucesso", "Sessão finalizada!");
  };

  const canPrev = safePage > 1;
  const canNext = safePage < totalPages;
  const isMobile = useMediaQuery("(max-width:700px)");
  return (
    <>
      <div className={styles["tab-header"]}>
        <span>Sessões ativas</span>

        <button
          type="button"
          className={styles["btn-export"]}
          onClick={exportCsv}
        >
          <FontAwesomeIcon icon={faDownload} />
          {!isMobile && "Exportar CSV"}
        </button>
      </div>

      <div className={styles["tab-content"]}>
        {totalItems === 0 ? (
          <div className={styles["empty-state"]}>Nenhuma sessão ativa.</div>
        ) : (
          <>
            <div className={styles["sessions-list"]}>
              {pagedSessions.map((s) => (
                <ActiveSessionCard
                  key={s.id}
                  session={s}
                  onEnd={onEndSession}
                />
              ))}
            </div>

            <div className={styles["pagination-wrapper"]}>
              <div className={styles["pagination-left"]}>
                {!isMobile && "Itens por página:"}
                <Select
                  size="small"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(e.target.value);
                    setPage(1);
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
                <button
                  type="button"
                  className={styles["pagination-btn"]}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!canPrev}
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  className={styles["pagination-btn"]}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={!canNext}
                >
                  {">"}
                </button>
              </div>

              {showingText && (
                <span className={styles["pagination-text"]}>{showingText}</span>
              )}
            </div>
          </>
        )}
      </div>

      {ConfirmDialog}
    </>
  );
}
