import Link from "next/link";
import styles from "./NotFoundMessage.module.scss";

// The 404 page's content. Story pages load in the browser, so they show this themselves
// when the API has no such story.
export default function NotFoundMessage({
  title = "We couldn’t find that page",
  text = "The link may be broken, or the story may have been removed.",
}) {
  return (
    <main className={styles.notFound}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      <Link href="/story/all" className={styles.link}>
        Browse stories
      </Link>
    </main>
  );
}
