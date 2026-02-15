import styles from "./loginHistory.module.css";
import { useEffect, useMemo, useState } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import "~/styles/commonGrid.css";
import { getLoginHistory } from "~/services/AccessManagement/accessManagement.api";
import TabHeader from "~/components/Tabs/TabHeader/TabHeader";
export default function LoginHistoryTab() {
  const apiRef = useGridApiRef();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getLoginHistory();
      setRows(data);
    }
    loadData();
  }, []);

  const columns = useMemo(
    () => [
      { field: "user", headerName: "Usuário", flex: 1, minWidth: 200 },
      { field: "date", headerName: "Data", flex: 0.6, minWidth: 120 },
      { field: "time", headerName: "Hora", flex: 0.6, minWidth: 110 },
      { field: "ip", headerName: "IP", flex: 0.8, minWidth: 140 },
      { field: "device", headerName: "Dispositivo", flex: 1, minWidth: 220 },
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

  const exportCsv = () => {
    apiRef.current.exportDataAsCsv({
      fileName: "historico-login",
      utf8WithBom: true,
      delimiter: ";",
    });
  };

  return (
    <>
      <TabHeader title="Histórico de login" exportCsv={exportCsv} />
      <div className={styles["tab-content"]}>
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
    </>
  );
}
