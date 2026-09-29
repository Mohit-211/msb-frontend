"use client";

import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

const Button = React.forwardRef(
  ({ variant = "default", size = "default", className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    return (
      <Comp
        ref={ref}
        className={clsx(styles.button, styles[variant], styles[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
