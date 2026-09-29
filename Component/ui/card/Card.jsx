"use client";

import React from "react";
import styles from "./Card.module.scss";
import clsx from "clsx";

export const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx(styles.card, className)} {...props} />
  );
});
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx(styles.cardHeader, className)} {...props} />
  );
});
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <h3 ref={ref} className={clsx(styles.cardTitle, className)} {...props} />
  );
});
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <p ref={ref} className={clsx(styles.cardDescription, className)} {...props} />
    );
  }
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx(styles.cardContent, className)} {...props} />
  );
});
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx(styles.cardFooter, className)} {...props} />
  );
});
CardFooter.displayName = "CardFooter";
