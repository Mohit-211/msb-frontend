import React, { useCallback } from "react";
import styles from "./BlogDetail.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dot, ThumbsUp } from "lucide-react";
import { LikeApi, getLocalStorageItem } from "@/Constants/Api/Api";
import { Image_URL } from "@/Constants/host";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLike } from "@/redux/getlikeslice";
import Comment from "../Comment/Comment";
import { fetchComments } from "@/redux/getcommentSlice";
import { Container } from "@/Component/ui/container/Container";
import { Dialog, DialogContent } from "@/Component/ui/dialog/Dialog";
export default function BlogDetailComponent({ data }) {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const storedValue = getLocalStorageItem("UserLoginToken");
  const [show, setShow] = useState(false);
  const [likeclick, setLikeClick] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const likeCount = useSelector((state) => state.rootReducer.like.like);
  useEffect(() => {
    dispatch(fetchLike(data?.data?.id, storedValue));
  }, []);
  const handleLike = useCallback(() => {
    setLikeClick(true);
    {
      storedValue &&
        LikeApi(data?.data?.id)
          .then((res) => {
            setLikeClick(false);
            dispatch(fetchLike(data?.data?.id, storedValue));
            setTimeout(() => {
              setLikeClick(false);
            }, 1000);
          })
          .catch((e) => {
            console.log(e, "error");
          });
    }
  }, [data, storedValue, dispatch]);
  useEffect(() => {
    dispatch(fetchComments(data?.data?.id));
  }, [dispatch, data?.data?.id]);
  const comments = useSelector((state) => state.rootReducer.comment.comments);
  return (
    <>
      {data?.input ? (
        <div>
          <div className={styles.blockdetails}>
            <div className={styles.hedaer}>
              <Container className={styles.content}>
                <h2>{data?.title}</h2>
              </Container>
            </div>
            <Container className={styles.BlogDetailComponent}>
              <div>
                <div
                  className={styles.blogdescc}
                  style={{ paddingBottom: "20px" }}
                  dangerouslySetInnerHTML={{
                    __html: data?.text,
                  }}
                />
              </div>
            </Container>
          </div>
        </div>
      ) : (
        <div className={styles.blockdetails}>
          <div className={styles.hedaer}>
            <Container className={styles.content}>
              <h2>{data?.data?.heading}</h2>
              <div className={styles.details}>
                <div>
                  <h6>
                    By <b>Admin</b>
                    <span>
                      <Dot size={20} aria-hidden="true" />
                    </span>
                    <span>
                      Posted on{" "}
                      {new Date(data?.data?.updated_at).toLocaleDateString(
                        "en-US",
                      )}
                    </span>
                  </h6>
                </div>
                <div>
                  <div>
                    <button
                      type="button"
                      className={`${styles.likeButton} ${
                        likeCount?.is_like === true ? styles.likeButtonActive : ""
                      }`}
                      onClick={handleLike}
                      aria-label="Like this story"
                      aria-pressed={likeCount?.is_like === true}
                    >
                      <ThumbsUp size={20} fill="currentColor" aria-hidden="true" />
                    </button>
                    <span className={styles.likeCount}>
                      {likeCount?.total_likes}
                    </span>
                    <span
                      className={
                        likeclick && likeCount?.is_like === false
                          ? styles.likeLabelActive
                          : undefined
                      }
                    >
                      {likeclick && likeCount?.is_like === false
                        ? "Liked"
                        : likeclick && likeCount?.is_like === true
                          ? "Disliked"
                          : "Like"}
                    </span>
                    &nbsp;|&nbsp;
                    <button type="button" className={styles.commentToggle} onClick={handleShow}>
                      {comments?.length}{" "}
                      {comments?.length === 1 ? "Comment" : "Comments"}
                    </button>
                    <Dialog open={show} onOpenChange={setShow}>
                      <DialogContent side="right" title="Comments">
                        <Comment id={id} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <Container className={styles.BlogDetailComponent}>
            <div>
              <Image
                src={`${Image_URL}${data?.data?.blog_attachment[0]?.file_name}`}
                width={100}
                height={100}
                alt=""
                className={styles.picture}
              />
              <div
                className={styles.blogdescc}
                style={{ paddingBottom: "20px" }}
                dangerouslySetInnerHTML={{
                  __html: data?.text ? data?.text : data?.data?.description,
                }}
              />
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
