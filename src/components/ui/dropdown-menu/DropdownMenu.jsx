"use client";

import clsx from "clsx";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import styles from "./DropdownMenu.module.scss";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownMenuContent({ className, sideOffset = 6, align = "end", ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        align={align}
        className={clsx(styles.content, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({ className, ...props }) {
  return <DropdownMenuPrimitive.Item className={clsx(styles.item, className)} {...props} />;
}
