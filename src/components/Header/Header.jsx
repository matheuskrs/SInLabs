import styles from "./header.module.css";
import { useMediaQuery } from "@mui/material";
export default function Header({ img, title, subtitle, alt = "", children }) {
  const isMobile = useMediaQuery("(max-width:700px)");
  return (
    <div className={styles["header-wrapper"]}>
      {!isMobile && img && (
        <div className={styles["header-img-wrapper"]}>
          <img src={img} alt={alt || title} />
        </div>
      )}
      <div className={styles["header-content-wrapper"]}>
        <h1 className={styles["header-title"]}>{title}</h1>
        <p className={styles["header-subtitle"]}>
          {subtitle}
        </p>
        {children}
      </div>
    </div>
  );
}
