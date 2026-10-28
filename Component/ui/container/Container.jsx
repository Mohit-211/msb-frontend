"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Container.module.scss";

// Centers page content at --container-max wide; `fluid` drops the limit.
export const Container = React.forwardRef(({ fluid = false, className, ...props }, ref) => {
  return <div ref={ref} className={clsx(styles.container, fluid && styles.fluid, className)} {...props} />;
});
Container.displayName = "Container";
