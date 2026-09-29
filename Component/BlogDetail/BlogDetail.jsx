import React, { useCallback } from 'react'
import styles from "./BlogDetail.module.scss"
import { Container, Offcanvas } from 'react-bootstrap'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BlogDetailAPI, LikeApi, LikeCountApi, getLocalStorageItem } from '@/Constants/Api/Api'
import { Image_URL } from '@/Constants/host'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLike } from '@/redux/getlikeslice'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { RxDotFilled } from "react-icons/rx";
import Comment from '../Comment/Comment'
import { fetchComments } from '@/redux/getcommentSlice'
import { AiFillLike } from 'react-icons/ai'
export default function BlogDetailComponent({ data }) {
    console.log(data, "data")
    const router = useRouter()
    const { id } = router.query
    const [like, setLike] = useState("")
    const [comment, setComment] = useState("")
    const dispatch = useDispatch()
    const storedValue = getLocalStorageItem("UserLoginToken");
    const [show, setShow] = useState(false);
    const [likeclick, setLikeClick] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    const likeCount = useSelector((state) =>
        state.rootReducer.like.like
    )
    useEffect(() => {
        dispatch(fetchLike(data?.data?.id, storedValue))
    }, [])
    const handleLike = useCallback(() => {
        setLikeClick(true)
        {
            storedValue &&
                LikeApi(data?.data?.id)
                    .then((res) => {
                        setLikeClick(false)
                        dispatch(fetchLike(data?.data?.id, storedValue));
                        setTimeout(() => {
                            setLikeClick(false)
                                ;
                        }, 1000);
                    })
                    .catch((e) => {
                        console.log(e, "error");
                    });
        }
    }, [data, storedValue, dispatch]);
    useEffect(() => {
        dispatch(fetchComments(data?.data?.id))
    }, [dispatch, data?.data?.id])
    const comments = useSelector((state) =>
        state.rootReducer.comment.comments
    )
    return (
    <>{data?.input?
    <div>
         <div className={styles.blockdetails}>
        <div className={styles.hedaer}>
            <Container className={styles.content}>
                <h2 >{data?.title}</h2>
               
            </Container>
        </div>
        <Container className={styles.BlogDetailComponent}>
            <div>
                {/* <Image
                    src={`${Image_URL}${data?.data?.blog_attachment[0]?.file_name}`}
                    width={100} height={100} alt='' className={styles.picture} /> */}
                <div>
                    {/* <span
                        style={{ color: like?.message === "User Liked Successfully." ? "#007FFF" : "unset", cursor: "pointer" }}
                        onClick={handleLike}><ThumbUpIcon /><span>{likeCount?.likes_count}</span> </span>
                    <span>Share </span>
                    <span>Comment </span> */}
                </div>
                <div className={styles.blogdescc}
                    style={{ paddingBottom: "20px" }}
                    dangerouslySetInnerHTML={{
                        __html: data?.text
                    }}
                />
            </div>
        </Container>
    </div>
    </div>:
    <div className={styles.blockdetails}>
        <div className={styles.hedaer}>
            <Container className={styles.content}>
                <h2 >{data?.data?.heading}</h2>
                <div className={styles.details}>
                    <div>
                        <h6>By <b>
                            Admin
                        </b>
                            <span>
                                <RxDotFilled />
                            </span>
                            <span>
                                Posted on {new Date(data?.data?.updated_at).toLocaleDateString("en-US")}
                            </span>
                        </h6>
                    </div>
                    <div>
                    <div className="like-comment-section">
  <span
    style={{
      color: likeCount?.is_like === true ? "#007FFF" : "unset",
      cursor: "pointer",
      marginRight: "10px",
    }}
    onClick={handleLike}
  >
     <AiFillLike  size={20}/>
  </span>
  <span
    style={{
      fontWeight: "bold",
      marginRight: "10px",
    }}
  >
    {likeCount?.total_likes}
  </span>
  <span
    style={{
      color:
        likeclick && likeCount?.is_like === false ? "#FF0000" : "unset",
    }}
  >
    {likeclick && likeCount?.is_like === false
      ? "Liked"
      : likeclick && likeCount?.is_like === true
      ? "Disliked"
      : "Like"}
  </span>
  &nbsp;|&nbsp;
  <span
    style={{
      cursor: "pointer",
      fontWeight: "bold",
      textDecoration: "underline",
    }}
    onClick={handleShow}
  >
    {comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
  </span>

  <Offcanvas placement="end" show={show} onHide={handleClose}>
    <Offcanvas.Body>
      <Comment id={id} storedValue={storedValue} />
    </Offcanvas.Body>
  </Offcanvas>
</div>

                    </div>
                </div>
            </Container>
        </div>
        <Container className={styles.BlogDetailComponent}>
            <div>
                <Image
                    src={`${Image_URL}${data?.data?.blog_attachment[0]?.file_name}`}
                    width={100} height={100} alt='' className={styles.picture} />
                <div>
                    {/* <span
                        style={{ color: like?.message === "User Liked Successfully." ? "#007FFF" : "unset", cursor: "pointer" }}
                        onClick={handleLike}><ThumbUpIcon /><span>{likeCount?.likes_count}</span> </span>
                    <span>Share </span>
                    <span>Comment </span> */}
                </div>
                <div className={styles.blogdescc}
                    style={{ paddingBottom: "20px" }}
                    dangerouslySetInnerHTML={{
                        __html: data?.text ? data?.text : data?.data?.description
                    }}
                />
            </div>
        </Container>
    </div>
    }
    </>
    )
}
