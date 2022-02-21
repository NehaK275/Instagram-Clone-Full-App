import React, { useContext } from 'react';
import styles from './Comments.module.css';
import CommentsContext from '../../store/comments-context/comments-context';

const Comment = ({ comment }) => {
  const commentsCtx = useContext(CommentsContext);
  const deleteCommentHandler = () => {
    commentsCtx.deleteComment(comment.id)
    // Assurance for refreshing

  }
  return (
    <div className={styles.comment}>
      <p>
        <strong>{comment.username}: </strong>{comment.text}
      </p>
      {comment.owned && <p id={comment.id} onClick={deleteCommentHandler} className={styles.delete} children="x" />}
    </div>
  );
}

export default Comment;