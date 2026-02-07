import { Outlet } from "react-router-dom";
import Sidebar from "~/components/Sidebar/Sidebar";
import styles from './associationsLayout.module.css';

export default function AssociationsLayout() {
  return (
    <div className={styles["associations-container"]}>
      <Sidebar activePage={"associations"}/>
      <main className={styles["associations-main"]}>
        <Outlet />
      </main>
    </div>
  );
}