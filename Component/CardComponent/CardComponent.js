import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./CardComponent.module.scss";
import { Image_URL } from "@/Constants/host";
import CommonImage from "../../public/assets/msb.png";

function CardComponent(props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const openBuyNowLink = () => {
    const path =
      "https://transactions.sendowl.com/products/78271145/4A5919F0/view";
    window.open(path, "_blank");
    handleCloseModal();
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
    <>
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

      {/* Custom Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Subscribe for Exclusive Updates
              </h2>
              <button
                className={styles.modalClose}
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p>
                Join us to get exclusive updates, offers, and access to more
                stories!
              </p>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.modalButtonSecondary}
                onClick={handleCloseModal}
              >
                Ignore
              </button>
              <button
                className={styles.modalButtonPrimary}
                onClick={openBuyNowLink}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardComponent;
