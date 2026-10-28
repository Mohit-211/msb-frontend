import Link from "next/link";
import styles from "./not-found.module.scss";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>We couldn’t find that page</h1>
      <p className={styles.text}>The link may be broken, or the story may have been removed.</p>
      <Link href="/story/all" className={styles.link}>
        Browse stories
      </Link>
    </main>
  );
}
