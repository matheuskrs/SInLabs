import { createPortal } from "react-dom";
import { useState, useEffect, useRef } from "react";
import styles from "./modal.module.css";

export default function Modal({
  open,
  title,
  onClose,
  children,
  footer,
  modalClassName,
}) {
  const [closing, setClosing] = useState(false);
  const startedOnBackdrop = useRef(false);

  const handleClose = () => {
    setClosing(true);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open && !closing) return null;

  const handleAnimationEnd = () => {
    if (!closing) return;
    setClosing(false);
    onClose();
  };

  const content =
    typeof children === "function" ? children(handleClose) : children;

  const footerContent =
    typeof footer === "function" ? footer(handleClose) : footer;

  const onBackdropPointerDown = (e) => {
    startedOnBackdrop.current = e.target === e.currentTarget;
    if (startedOnBackdrop.current) handleClose();
  };

  const onBackdropPointerUp = () => {
    startedOnBackdrop.current = false;
  };

  return createPortal(
    <div
      className={`${styles["modal-backdrop"]} ${closing ? styles.closing : ""}`}
      onPointerDown={onBackdropPointerDown}
      onPointerUp={onBackdropPointerUp}
    >
      <div
        className={`${styles.modal} ${modalClassName || ""} ${closing ? styles.closing : ""}`}
        onAnimationEnd={handleAnimationEnd}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <header className={styles["modal-header"]}>
          <h2>{title}</h2>
          <button className={styles["modal-close"]} onClick={handleClose}>
            x
          </button>
        </header>

        <div className={styles["modal-body"]}>{content}</div>
        {footerContent && (
          <div className={styles["modal-footer"]}>{footerContent}</div>
        )}
      </div>
    </div>,
    document.body,
  );
}
