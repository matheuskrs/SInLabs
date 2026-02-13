import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GlobalLoadingOverlay from "./GlobalLoadingOverlay";
import { GlobalLoadingContext } from "./GlobalLoadingContext";

export function GlobalLoadingProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  const countRef = useRef(0);
  const baseTextRef = useRef("");
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const lastStepRef = useRef(-1);

  const DOT_MS = 250;

  const stopAnim = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastStepRef.current = -1;
  }, []);

  const startAnim = useCallback(() => {
    stopAnim();
    startRef.current = performance.now();

    const tick = (now) => {
      if (!baseTextRef.current) return;

      const elapsed = now - startRef.current;
      const step = Math.max(0, Math.floor(elapsed / DOT_MS) % 4);

      if (step !== lastStepRef.current) {
        lastStepRef.current = step;
        setText(baseTextRef.current + ".".repeat(step));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [stopAnim]);

  const showLoading = useCallback(
    (loadingText = "") => {
      countRef.current++;
      setVisible(true);

      if (!loadingText) return;
      if (baseTextRef.current === loadingText && rafRef.current) return;

      baseTextRef.current = loadingText;
      setText(loadingText);
      startAnim();
    },
    [startAnim],
  );

  const hideLoading = useCallback(() => {
    if (countRef.current === 0) return;
    countRef.current--;
    if (countRef.current > 0) return;

    setVisible(false);
    stopAnim();
  }, [stopAnim]);

  useEffect(() => stopAnim, [stopAnim]);

  const value = useMemo(
    () => ({ showLoading, hideLoading }),
    [showLoading, hideLoading],
  );

  return (
    <GlobalLoadingContext.Provider value={value}>
      {children}
      <GlobalLoadingOverlay visible={visible} text={text} />
    </GlobalLoadingContext.Provider>
  );
}
