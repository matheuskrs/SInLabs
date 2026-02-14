import styles from "./accessManagement.module.css";
import { useMemo, useState } from "react";
import Header from "~/components/Header/Header";
import accessManagementImg from "~/assets/AccessManagement/accessManagementImg.png";
import Tabs from "~/components/Tabs/Tabs";

import LoginHistoryTab from "./tabs/LoginHistoryTab";
import ActiveSessionsTab from "./tabs/ActiveSessionsTab";
import DownloadsTab from "./tabs/DownloadsTab";
import LabsMapTab from "./tabs/LabsMapTab";

export default function AccessManagement() {
  const [activeTab, setActiveTab] = useState("login-history");

  const tabs = useMemo(
    () => [
      { key: "login-history", label: "Histórico de login" },
      { key: "active-sessions", label: "Sessões ativas" },
      { key: "downloads", label: "Downloads" },
      { key: "labs-map", label: "Mapa de Laboratórios" },
    ],
    [],
  );

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
