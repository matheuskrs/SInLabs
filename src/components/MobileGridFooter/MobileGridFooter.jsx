import { GridFooterContainer } from "@mui/x-data-grid";
import { MenuItem, Select, useMediaQuery } from "@mui/material";
import styles from "./mobileGridFooter.module.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MobileGridFooter(props) {
  const {
    paginationModel,
    setPaginationModel,
    safePage,
    lastPage,
    showingText,
  } = props;
  const isMobile = useMediaQuery("(max-width:700px)");

  const canGoBack = safePage > 0;
  const canGoNext = safePage < lastPage;

  const goBack = () => {
    if (!canGoBack) return;

    setPaginationModel((prev) => ({
      ...prev,
      page: safePage - 1,
    }));
  };

  const goNext = () => {
    if (!canGoNext) return;

    setPaginationModel((prev) => ({
      ...prev,
      page: safePage + 1,
    }));
  };

  const onArrowKeyDown = (e, action, enabled) => {
    if (!enabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <GridFooterContainer>
      <div className={styles["mobile-grid-footer"]}>
        <div className={styles["mobile-grid-footer-left"]}>
          {!isMobile && (
            <span className={styles["mobile-grid-footer-label"]}>
              Itens por página:
            </span>
          )}
          <Select
            size="small"
            value={paginationModel.pageSize}
            onChange={(e) =>
              setPaginationModel({
                page: 0,
                pageSize: Number(e.target.value),
              })
            }
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
          <span
            role={canGoBack ? "button" : undefined}
            tabIndex={canGoBack ? 0 : -1}
            onClick={canGoBack ? goBack : undefined}
            onKeyDown={(e) => onArrowKeyDown(e, goBack, canGoBack)}
            className={`${styles["mobile-grid-footer-arrow"]} ${
              !canGoBack ? styles["disabled"] : ""
            }`}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>

          <span
            role={canGoNext ? "button" : undefined}
            tabIndex={canGoNext ? 0 : -1}
            onClick={canGoNext ? goNext : undefined}
            onKeyDown={(e) => onArrowKeyDown(e, goNext, canGoNext)}
            className={`${styles["mobile-grid-footer-arrow"]} ${
              !canGoNext ? styles["disabled"] : ""
            }`}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </span>

          <div className={styles["mobile-grid-footer-right"]}>
            <span className={styles["mobile-grid-footer-text"]}>
              {showingText}
            </span>
          </div>
        </div>
      </div>
    </GridFooterContainer>
  );
}
