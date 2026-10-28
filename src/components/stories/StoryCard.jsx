"use client";

import Image from "next/image";
import Link, { useLinkStatus } from "next/link";
import { useIsClient } from "@/hooks/useIsClient";
import styles from "./StoryCard.module.scss";
import { Image_URL } from "@/lib/config";
import CommonImage from "@/assets/images/brand-collage.png";

// Lives inside the link: shows a spinner while Next loads the story.
function ReadMoreLabel() {
  const { pending } = useLinkStatus();
  return pending ? (
    <>
      <span className={styles.spinner} aria-hidden="true"></span>
      <span>Loading...</span>
    </>
  ) : (
    "Read More"
  );
}

function StoryCard(props) {
  const isClient = useIsClient();

  // AI stories have no page of their own; /story-read shows the one saved here.
  const href = props.input ? "/story-read" : `/story-detail/${props.path}`;
  const handleClick = () => {
    if (props.input) {
      sessionStorage.setItem("storyData", JSON.stringify(props));
    }
  };

  const imageSrc =
    isClient &&
    props.image === `${Image_URL}undefined`
      ? CommonImage
      : props.image;

  // Strip HTML and truncate text
  const getPlainText = (html) => {
    if (!html) return "";
    const text =
      new DOMParser().parseFromString(html, "text/html").body.textContent || "";
    return text.slice(0, 150) + (text.length > 150 ? "..." : "");
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={props.title || "Story Image"}
          width={400}
          height={250}
          className={styles.cardImage}
        />
        {props.paid && <span className={styles.badge}>Premium</span>}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{props.title}</h3>
        <p className={styles.cardText}>{getPlainText(props.text)}</p>

        <Link href={href} onClick={handleClick} className={styles.readButton}>
          <ReadMoreLabel />
        </Link>
      </div>
    </article>
  );
}

export default StoryCard;
