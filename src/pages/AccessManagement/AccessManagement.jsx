import styles from "./accessManagement.module.css";
import { useMemo, useState, useEffect } from "react";
import Header from "~/components/Header/Header";
import accessManagementImg from "~/assets/AccessManagement/accessManagementImg.png";
import Tabs from "~/components/Tabs/Tabs";
import { useGlobalLoading } from "~/providers/GlobalLoading/GlobalLoadingContext";

import LoginHistoryTab from "./tabs/LoginHistory/LoginHistoryTab";
import ActiveSessionsTab from "./tabs/ActiveSessions/ActiveSessionsTab";
import DownloadsTab from "./tabs/Downloads/DownloadsTab";
import LabsMapTab from "./tabs/LabsMap/LabsMapTab";

export default function AccessManagement() {
  const [activeTab, setActiveTab] = useState("login-history");
  const { hideLoading } = useGlobalLoading();

  const tabs = useMemo(
    () => [
      { key: "login-history", label: "Histórico de login" },
      { key: "active-sessions", label: "Sessões ativas" },
      { key: "downloads", label: "Downloads" },
      { key: "labs-map", label: "Mapa de Laboratórios" },
    ],
    [],
  );

  useEffect(() => {
    hideLoading();
  }, [hideLoading]);

  return (
    <div>
      <Header
        img={accessManagementImg}
        title="Gestão de acessos"
        subtitle="Monitore e gerencie os acessos ao sistema"
      />

      <div className={styles["content-wrapper"]}>
        <Tabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />

        {activeTab === "login-history" && <LoginHistoryTab />}
        {activeTab === "active-sessions" && <ActiveSessionsTab />}
        {activeTab === "downloads" && <DownloadsTab />}
        {activeTab === "labs-map" && <LabsMapTab />}
      </div>
    </div>
  );
}
