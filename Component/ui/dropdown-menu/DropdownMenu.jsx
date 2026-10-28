"use client";

import React from "react";
import clsx from "clsx";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import styles from "./DropdownMenu.module.scss";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 6, align = "end", ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          align={align}
          className={clsx(styles.content, className)}
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef(({ className, ...props }, ref) => {
  return <DropdownMenuPrimitive.Item ref={ref} className={clsx(styles.item, className)} {...props} />;
});
DropdownMenuItem.displayName = "DropdownMenuItem";
