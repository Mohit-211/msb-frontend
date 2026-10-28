"use client";

import clsx from "clsx";
import styles from "./Container.module.scss";

// Centers page content at --container-max wide; `fluid` drops the limit.
export function Container({ fluid = false, className, ...props }) {
  return <div className={clsx(styles.container, fluid && styles.fluid, className)} {...props} />;
}
