"use client";

import { useSelector } from "react-redux";
import { selectAccess } from "@/store/slices/profileSlice";
import { SUBSCRIBE_URL } from "@/lib/config";
import { formatDay } from "@/lib/format";
import styles from "./PlanNotice.module.scss";

// Tells trial and free accounts what they can read. Paid accounts see nothing.
export default function PlanNotice({ className }) {
  const access = useSelector(selectAccess);
  if (!access || access.plan === "paid") return null;

  const trial = access.plan === "trial";
  return (
    <div className={`${styles.notice} ${trial ? styles.trial : styles.free} ${className ?? ""}`} role="status">
      <p>
        {trial
          ? `Your free trial includes every Premium story until ${formatDay(access.trial_ends_at)}.`
          : "Your free trial has ended. Premium stories show a preview until you subscribe."}
      </p>
      <a href={SUBSCRIBE_URL} className={styles.subscribe}>
        Subscribe
      </a>
    </div>
  );
}
