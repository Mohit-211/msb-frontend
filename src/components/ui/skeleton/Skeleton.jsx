"use client";

import clsx from "clsx";
import styles from "./Skeleton.module.scss";

// A shimmering placeholder block. width and height take any CSS length.
export function Skeleton({ width, height, className, style, ...props }) {
  return (
    <span aria-hidden="true" className={clsx(styles.skeleton, className)} style={{ width, height, ...style }} {...props} />
  );
}

// Placeholder lines for text that is still loading; `label` is read to screen readers.
export function SkeletonText({ lines = 3, label = "Loading", className }) {
  return (
    <span role="status" className={clsx(styles.text, className)}>
      <span className={styles.visuallyHidden}>{label}</span>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton key={index} className={styles.line} />
      ))}
    </span>
  );
}
