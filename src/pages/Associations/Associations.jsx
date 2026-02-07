import styles from "./associations.module.css";
import { useMediaQuery } from "@mui/material";
import associationImg from "~/assets/Associations/associationImg.png";
export default function Associations() {
  const isMobile = useMediaQuery("(max-width:700px)");
  return (
    <div>
      <div className={styles["header-wrapper"]}>
        {!isMobile && (
          <div className={styles["header-img-wrapper"]}>
            <img src={associationImg} />
          </div>
        )}
        <div className={styles["header-content-wrapper"]}>
          <h1 className={styles["associations-title"]}>Associação</h1>
          <p className={styles["associations-subtitle"]}>
            Associe usuários a perfis, laboratórios e sistemas
          </p>
        </div>
      </div>
    </div>
  );
}
