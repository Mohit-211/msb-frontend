"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Dot, Lock, ThumbsUp } from "lucide-react";
import { LikeApi, ViewCountBlog, errorMessage } from "@/lib/api";
import { Image_URL, SUBSCRIBE_URL } from "@/lib/config";
import { sanitizeHtml } from "@/lib/sanitize";
import { fetchLike } from "@/store/slices/likesSlice";
import { fetchComments } from "@/store/slices/commentsSlice";
import { Container } from "@/components/ui/container/Container";
import { Dialog, DialogContent } from "@/components/ui/dialog/Dialog";
import { toast } from "@/components/ui/toast/toast";
import StoryComments from "./StoryComments";
import styles from "./StoryDetail.module.scss";

// One story. A library story has likes, comments and an image; a saved AI story (`saved`) is
// its title and text. A locked story is a Premium story the reader's plan can't open: the API
// sends a teaser instead of the text and refuses likes, comments and views.
export default function StoryDetail({ story, saved = false }) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [liking, setLiking] = useState(false);
  const likes = useSelector((state) => state.rootReducer.like.like);
  const comments = useSelector((state) => state.rootReducer.comment.comments);
  const interactive = !saved && !story.is_locked;
  const imageFile = story.blog_attachment?.[0]?.file_name;

  useEffect(() => {
    if (!interactive) return;
    dispatch(fetchLike(story.id));
    dispatch(fetchComments(story.id));
    // The API counts one view per reader.
    ViewCountBlog(story.id);
  }, [dispatch, interactive, story.id]);

  const handleLike = useCallback(() => {
    setLiking(true);
    LikeApi(story.id)
      .then(() => dispatch(fetchLike(story.id)))
      .catch((error) => toast.error(errorMessage(error, "Couldn’t save your like. Try again.")))
      .finally(() => setLiking(false));
  }, [dispatch, story.id]);

  return (
    <div className={styles.blockdetails}>
      <div className={styles.hedaer}>
        <Container className={styles.content}>
          <h2>{story.heading}</h2>
          {!saved && (
            <div className={styles.details}>
              <div>
                <h6>
                  By <b>Admin</b>
                  <span>
                    <Dot size={20} aria-hidden="true" />
                  </span>
                  {/* created_at: the API moves updated_at when a story is first viewed */}
                  <span>Posted on {new Date(story.created_at).toLocaleDateString("en-US")}</span>
                </h6>
              </div>
              {interactive && (
                <div>
                  <button
                    type="button"
                    className={`${styles.likeButton} ${likes?.is_like ? styles.likeButtonActive : ""}`}
                    onClick={handleLike}
                    disabled={liking}
                    aria-label="Like this story"
                    aria-pressed={likes?.is_like === true}
                  >
                    <ThumbsUp size={20} fill="currentColor" aria-hidden="true" />
                  </button>
                  <span className={styles.likeCount}>{likes?.total_likes}</span>
                  <span className={likes?.is_like ? styles.likeLabelActive : undefined}>
                    {likes?.is_like ? "Liked" : "Like"}
                  </span>
                  &nbsp;|&nbsp;
                  <button type="button" className={styles.commentToggle} onClick={() => setShowComments(true)}>
                    {comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
                  </button>
                  <Dialog open={showComments} onOpenChange={setShowComments}>
                    <DialogContent side="right" title="Comments">
                      <StoryComments id={story.id} />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          )}
        </Container>
      </div>
      <Container className={styles.storyBody}>
        <div>
          {imageFile && (
            <Image
              src={`${Image_URL}${imageFile}`}
              width={100}
              height={100}
              alt=""
              className={styles.picture}
              loading="eager"
            />
          )}
          <div
            className={styles.blogdescc}
            style={{ paddingBottom: "20px" }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(story.description) }}
          />
          {story.is_locked && (
            <div className={styles.locked}>
              <Lock size={22} aria-hidden="true" className={styles.lockedIcon} />
              <div className={styles.lockedText}>
                <h3>This is a Premium story</h3>
                <p>Your free trial has ended, so you’re reading a preview. Subscribe to read every Premium story in full.</p>
              </div>
              <a href={SUBSCRIBE_URL} className={styles.subscribe}>
                Subscribe
              </a>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
