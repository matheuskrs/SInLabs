import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "~/providers/Toast/useToast";
import { useMediaQuery } from "@mui/material";
import styles from "./toast.module.css";

const EXIT_MS = 300;
const SWIPE_DISMISS_PX = 70;
const SWIPE_VELOCITY = 0.35;

export default function Toast({ id, title, message, type, duration = 3000 }) {
  const { removeToast } = useToast();
  const isMobile = useMediaQuery("(max-width:700px)");
  const [leaving, setLeaving] = useState(false);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [swipeDismissing, setSwipeDismissing] = useState(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const velRef = useRef(0);

  const close = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => removeToast(id), EXIT_MS);
  }, [id, removeToast, leaving]);

  useEffect(() => {
    if (swipeDismissing) return;
    const timer = setTimeout(close, duration);
    return () => clearTimeout(timer);
  }, [duration, close, swipeDismissing]);

  const onPointerDown = (e) => {
    if (!isMobile || leaving) return;

    setDragging(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTRef.current = performance.now();
    velRef.current = 0;

    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging || leaving) return;

    const x = e.clientX;
    const now = performance.now();
    const delta = x - startXRef.current;

    const dt = now - lastTRef.current;
    if (dt > 0) {
      velRef.current = (x - lastXRef.current) / dt;
      lastXRef.current = x;
      lastTRef.current = now;
    }

    setDx(delta);
  };

  const onPointerUp = () => {
    if (!dragging || leaving) return;

    const absDx = Math.abs(dx);
    const absVel = Math.abs(velRef.current);
    const shouldDismiss = absDx > SWIPE_DISMISS_PX || absVel > SWIPE_VELOCITY;

    setDragging(false);

    if (shouldDismiss) {
      setSwipeDismissing(true);
      setDx(dx > 0 ? 500 : -500);
      setTimeout(() => removeToast(id), EXIT_MS);
    } else {
      setDx(0);
    }
  };

  const showLeavingClass = leaving && !swipeDismissing;

  return (
    <div
      className={[
        styles.toast,
        dragging || swipeDismissing ? styles.dragging : "",
        styles[`toast-${type}`],
        showLeavingClass ? styles.leaving : "",
      ].join(" ")}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        transform: `translateX(${dx}px)`,
        transition: dragging ? "none" : "transform 180ms ease",
        touchAction: "pan-y",
      }}
    >
      {title && <strong>{title}</strong>}
      <span className={styles["toast-message"]}>{message}</span>

      <button
        onClick={() => {
          setSwipeDismissing(false);
          close();
        }}
        aria-label="Fechar"
      >
        x
      </button>
    </div>
  );
}
