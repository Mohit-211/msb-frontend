"use client";

import { useEffect, useState } from "react";
import { GetSavedStoryApi, GetStoryApi, errorMessage } from "@/lib/api";
import NotFoundMessage from "@/components/layout/NotFoundMessage";
import { Button } from "@/components/ui/button/Button";
import { Container } from "@/components/ui/container/Container";
import { SkeletonText } from "@/components/ui/skeleton/Skeleton";
import StoryDetail from "./StoryDetail";
import styles from "./StoryDetail.module.scss";

// Loads a story in the browser, where the sign-in token is: a library story by id, or with
// `saved`, one of the reader's saved AI stories.
export default function StoryPage({ id, saved = false }) {
  const [result, setResult] = useState({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let current = true;
    (saved ? GetSavedStoryApi : GetStoryApi)(id)
      .then((res) => {
        if (current) setResult({ status: "ready", story: res.data });
      })
      .catch((error) => {
        if (!current) return;
        setResult(
          error.response?.status === 404
            ? { status: "missing" }
            : { status: "failed", message: errorMessage(error, "Couldn’t load this story.") },
        );
      });
    return () => {
      current = false;
    };
  }, [id, saved, attempt]);

  // The routes leave the title to this component; React places <title> in the head.
  if (result.status === "ready") {
    return (
      <>
        <title>{`${result.story.heading} | MyStoryBank`}</title>
        <StoryDetail story={result.story} saved={saved} />
      </>
    );
  }

  if (result.status === "missing") {
    return (
      <>
        <title>Story not found | MyStoryBank</title>
        <NotFoundMessage
          title="We couldn’t find that story"
          text={saved ? "It may have been removed from your saved stories." : undefined}
        />
      </>
    );
  }

  return (
    <div className={styles.blockdetails}>
      <title>{saved ? "Your story | MyStoryBank" : "Story | MyStoryBank"}</title>
      <div className={styles.hedaer} />
      <Container className={styles.storyBody}>
        {result.status === "loading" ? (
          <SkeletonText lines={6} label="Loading the story" className={styles.loading} />
        ) : (
          <div className={styles.loadError} role="alert">
            <p>{result.message}</p>
            <Button
              variant="outline"
              onClick={() => {
                setResult({ status: "loading" });
                setAttempt((count) => count + 1);
              }}
            >
              Try again
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
