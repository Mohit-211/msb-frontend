"use client";

import React from "react";
import clsx from "clsx";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import styles from "./Tabs.module.scss";

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef(({ className, ...props }, ref) => {
  return <TabsPrimitive.List ref={ref} className={clsx(styles.list, className)} {...props} />;
});
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => {
  return <TabsPrimitive.Trigger ref={ref} className={clsx(styles.trigger, className)} {...props} />;
});
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef(({ className, ...props }, ref) => {
  return <TabsPrimitive.Content ref={ref} className={clsx(styles.content, className)} {...props} />;
});
TabsContent.displayName = "TabsContent";
