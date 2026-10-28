"use client";

import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import styles from "./Button.module.scss";

// variant: "primary" | "secondary" | "outline" | "ghost"; size: "sm" | "md" | "lg".
export function Button({
  variant = "primary",
  size = "md",
  block = false,
  loading = false,
  disabled,
  type = "button",
  className,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        block && styles.block,
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <LoaderCircle className={styles.spinner} size={18} aria-hidden="true" />}
      {children}
    </button>
  );
}
