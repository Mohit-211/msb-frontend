import React from 'react'
import styles from "./Comment.module.scss"
import { FloatingLabel, Form, Image } from 'react-bootstrap'
import { AddCommentApi, getLocalStorageItem } from '@/Constants/Api/Api'
import { useState } from 'react'
import DescriptionAlerts from '@/Constants/alert/alert'
import moment from 'moment/moment'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchComments } from '@/redux/getcommentSlice'
const Comment = (props) => {
    const [comment, setComment] = useState('');
    const [result, setResult] = useState([]);
    const [alert, setAlert] = useState(false);
    const storedValue = getLocalStorageItem("UserLoginToken");
    const [alertConfig, setAlertConfig] = useState({
      text: '',
    });
    const handleAddComment = () => {
      AddCommentApi(comment, props.id)
        .then((res) => {
          if (res.data === 200 || res.data.status === 200) {
            setAlert(true);
            setAlertConfig({
              text: 'Successfully Comment Added',
              icon: 'success',
            });
            dispatch(fetchComments(props.id)); 
                setComment('');}
          })
        .catch((e) => {
          console.log(e);
          
        });
    };
  const dispatch = useDispatch();
  const comments  = useSelector((state) => state.rootReducer.comment.comments
    );
  useEffect(() => {
    // console.log(storedValue,"props.storedValue")
    dispatch(fetchComments(props.id));
  }, [dispatch, props.id]);
    return (<>
        {alert ? (
            <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
        ) : null}
        <div className={styles.Comments}>
            <h4>Comments</h4>
            <FloatingLabel controlId="floatingTextarea2" label="Comments" style={{ marginBottom: "20px" }}>
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className={styles.butn_theme} onClick={handleAddComment}>Post</button>
            </FloatingLabel>
             <div className={styles.scroll_comment}>
                 {comments?.map((item,index)=>{
                     return(
                         <div className={styles.read_comments} key={index}>
                         <div className={styles.section1}>
                             <Image src="data:image/png;base64,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" width={50} height={50} className={styles.imagesss} />
                             <div className={styles.name}>
                                 <h5>{item?.commented_by?.name}</h5>
                                 <h6>{moment(item?.created_at).fromNow()}</h6>
                             </div>
                         </div>
                         <p>{item.comment}</p>
                     </div>
                     )
                 })}
             </div>
        </div>
    </>
    )
}
export default Comment
