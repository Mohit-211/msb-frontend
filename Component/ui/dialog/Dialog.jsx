"use client";

import React from "react";
import clsx from "clsx";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import styles from "./Dialog.module.scss";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

// side: "center" (a modal) or "right" (a sheet). size applies to "center": "sm" | "md" | "lg".
// Every dialog needs a title for screen readers; hideTitle keeps it out of sight.
export const DialogContent = React.forwardRef(
  ({ title, description, hideTitle = false, side = "center", size = "md", className, children, ...props }, ref) => {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.overlay} />
        <DialogPrimitive.Content
          ref={ref}
          className={clsx(styles.content, styles[side], side === "center" && styles[size], className)}
          {...(description ? {} : { "aria-describedby": undefined })}
          {...props}
        >
          <div className={clsx(styles.header, hideTitle && styles.visuallyHidden)}>
            <DialogPrimitive.Title className={styles.title}>{title}</DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className={styles.description}>{description}</DialogPrimitive.Description>
            )}
          </div>
          {children}
          <DialogPrimitive.Close className={styles.close} aria-label="Close">
            <X size={18} aria-hidden="true" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);
DialogContent.displayName = "DialogContent";

export function DialogFooter({ className, ...props }) {
  return <div className={clsx(styles.footer, className)} {...props} />;
}
