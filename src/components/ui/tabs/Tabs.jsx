"use client";

import clsx from "clsx";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import styles from "./Tabs.module.scss";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }) {
  return <TabsPrimitive.List className={clsx(styles.list, className)} {...props} />;
}

export function TabsTrigger({ className, ...props }) {
  return <TabsPrimitive.Trigger className={clsx(styles.trigger, className)} {...props} />;
}

export function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content className={clsx(styles.content, className)} {...props} />;
}
