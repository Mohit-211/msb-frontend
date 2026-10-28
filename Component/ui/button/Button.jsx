"use client";

import React from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import styles from "./Button.module.scss";

// variant: "primary" | "secondary" | "outline" | "ghost"; size: "sm" | "md" | "lg".
export const Button = React.forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      block = false,
      loading = false,
      disabled,
      type = "button",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
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
        {loading && <Loader2 className={styles.spinner} size={18} aria-hidden="true" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
