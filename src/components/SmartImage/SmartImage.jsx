import { useState } from "react";
import styles from "./smartImage.module.css";

export default function SmartImage({
  src,
  alt = "",
  className,
  wrapperClassName,
  skeletonClassName,
  fallbackClassName,
  fallbackSrc,
  loading = "lazy",
  decoding = "async",
  ...props
}) {
  const [status, setStatus] = useState("loading");

  const showSkeleton = status === "loading";
  const showImg = status !== "error";
  const showFallback = status === "error";

  return (
    <div
      className={`${styles["smart-image-wrapper"]} ${wrapperClassName ?? ""}`}
    >
      {showSkeleton && (
        <div
          className={`${styles["smart-image-skeleton"]} ${
            skeletonClassName ?? ""
          }`}
        />
      )}

      {showImg && (
        <img
          key={src || "no-src"}
          src={src}
          alt={alt}
          className={`${styles["smart-image-img"]} ${className ?? ""}`}
          loading={loading}
          decoding={decoding}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          style={{
            opacity: status === "loaded" ? 1 : 0,
            transition: "opacity 180ms ease",
          }}
          {...props}
        />
      )}

      {showFallback &&
        (fallbackSrc ? (
          <img
            src={fallbackSrc}
            alt={alt}
            className={`${styles["smart-image-fallback-img"]} ${
              fallbackClassName ?? ""
            }`}
            loading="lazy"
            decoding="async"
            {...props}
          />
        ) : (
          <div
            className={`${styles["smart-image-fallback"]} ${
              fallbackClassName ?? ""
            }`}
          />
        ))}
    </div>
  );
}
