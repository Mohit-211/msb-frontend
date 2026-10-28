"use client";

import clsx from "clsx";
import styles from "./Card.module.scss";

export function Card({ className, ...props }) {
  return <div className={clsx(styles.card, className)} {...props} />;
}

export function CardHeader({ className, ...props }) {
  return <div className={clsx(styles.cardHeader, className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={clsx(styles.cardTitle, className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={clsx(styles.cardDescription, className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={clsx(styles.cardContent, className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return <div className={clsx(styles.cardFooter, className)} {...props} />;
}
