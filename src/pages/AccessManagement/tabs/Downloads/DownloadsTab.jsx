import styles from "./downloads.module.css";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import "~/styles/commonGrid.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getDownloadsWeek,
  getDownloadsHistory,
} from "~/services/AccessManagement/accessManagement.api";
import { useMediaQuery } from "@mui/material";
import TabHeader from "~/components/Tabs/TabHeader/TabHeader";
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

function weekToCsv(week) {
  const delimiter = ";";
  const headers = ["Dia", "Downloads"];

  const lines = [
    headers.map(escapeCsv).join(delimiter),
    ...(week || []).map((d) => [d.day, d.value].map(escapeCsv).join(delimiter)),
  ];

  return lines.join("\n");
}

export default function DownloadsTab() {
  const apiRef = useGridApiRef();
  const isMobile = useMediaQuery("(max-width:700px)");
  const [weekData, setWeekData] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function load() {
      const [week, history] = await Promise.all([
        getDownloadsWeek(),
        getDownloadsHistory(),
      ]);
      setWeekData(week);
      setRows(history);
    }
    load();
  }, []);

  const exportCsv = () => {
    const csv = weekToCsv(weekData);
    downloadCsv("downloads-semana-atual", csv);
  };

  const columns = useMemo(
    () => [
      { field: "user", headerName: "Usuário", flex: 1, minWidth: 180 },
      { field: "system", headerName: "Sistema", flex: 1, minWidth: 180 },
      { field: "dateTime", headerName: "Data", flex: 1, minWidth: 160 },
      {
        field: "size",
        headerName: "Tamanho",
        flex: 0.7,
        minWidth: 130,
        renderCell: (params) => {
          const text = String(params.value ?? "");
          return (
            <span className={styles["size-cell"]}>
              <FontAwesomeIcon icon={faFloppyDisk} />
              {text}
            </span>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 0.7,
        minWidth: 130,
        renderCell: (params) => {
          const s = params.value;
          if (!s) return <span>-</span>;

          return (
            <span
              className={styles["status-badge"]}
              style={{ backgroundColor: s.color }}
            >
              {s.name}
            </span>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <TabHeader title="Downloads" exportCsv={exportCsv} />
      <div className={styles["tab-content"]}>
        <div className={styles["downloads-chart-card"]}>
          <div className={styles["downloads-chart-title"]}>
            Downloads da semana (Segunda a Domingo)
          </div>

          <div className={styles["downloads-chart-scroll"]}>
            <div
              className={styles["downloads-chart-inner"]}
              style={{ width: isMobile ? 720 : "100%" }}
            >
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={weekData}>
                  <XAxis dataKey="day" tickMargin={8} />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    cursor={false}
                    formatter={(value) => [`${value}`, "Downloads"]}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--main-color)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className={styles["downloads-history-wrapper"]}>
          <div className={styles["section-title"]}>Histórico de downloads</div>

          <div className="grid-wrapper">
            <DataGrid
              apiRef={apiRef}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              rows={rows}
              columns={columns}
              rowSelection={false}
              disableRowSelectionOnClick
              disableColumnMenu
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
