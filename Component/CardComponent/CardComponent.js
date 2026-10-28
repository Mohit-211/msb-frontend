import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./CardComponent.module.scss";
import { Image_URL } from "@/Constants/host";
import CommonImage from "../../public/assets/msb.png";

function CardComponent(props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRedirect = () => {
    setIsLoading(true);
    const path = `/story-detail/${props.path}`;
    router.push(path);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleReadStory = (storyProps) => {
    console.log("Reading story props:", storyProps);
    setIsLoading(true);
    // Save full item in sessionStorage
    sessionStorage.setItem("storyData", JSON.stringify(storyProps));
    router.push("/story-read");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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

        <button
          className={`${styles.readButton} ${
            isLoading ? styles.loading : ""
          }`}
          onClick={() =>
            props?.input ? handleReadStory(props) : handleRedirect()
          }
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className={styles.spinner}></span>
              <span>Loading...</span>
            </>
          ) : (
            "Read More"
          )}
        </button>
      </div>
    </article>
  );
}

export default CardComponent;
