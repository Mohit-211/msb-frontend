"use client";

import { useSyncExternalStore } from "react";
import clsx from "clsx";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";
import { dismiss, getToasts, subscribe } from "./toast";
import styles from "./Toast.module.scss";

const ICONS = { success: CircleCheck, error: CircleX, warning: TriangleAlert, info: Info };
const NO_TOASTS = [];

export function Toaster() {
  const toasts = useSyncExternalStore(subscribe, getToasts, () => NO_TOASTS);

  return (
    <ToastPrimitive.Provider swipeDirection="up" label="Notification">
      {toasts.map(({ id, variant, message, duration, open }) => {
        const Icon = ICONS[variant];
        return (
          <ToastPrimitive.Root
            key={id}
            open={open}
            duration={duration}
            type={variant === "error" ? "foreground" : "background"}
            onOpenChange={(isOpen) => {
              if (!isOpen) dismiss(id);
            }}
            className={clsx(styles.toast, styles[variant])}
          >
            <Icon className={styles.icon} size={20} aria-hidden="true" />
            <ToastPrimitive.Description className={styles.message}>{message}</ToastPrimitive.Description>
            <ToastPrimitive.Close className={styles.close} aria-label="Dismiss">
              <X size={16} aria-hidden="true" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        );
      })}
      <ToastPrimitive.Viewport className={styles.viewport} />
    </ToastPrimitive.Provider>
  );
}
