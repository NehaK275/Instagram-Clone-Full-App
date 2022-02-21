import React, { useContext, useState } from 'react';
import styles from './Comments.module.css';
import Comment from './Comment';
import UsersContext from '../../store/users-context/users-context';
import CommentsContext from '../../store/comments-context/comments-context';
import { Link } from 'react-router-dom';

const Comments = props => {
    const usersCtx = useContext(UsersContext);
    const commentsCtx = useContext(CommentsContext);
    const [newComment, setNewComment] = useState('');
    const addingHandler = () => {
        commentsCtx.addComment(newComment, props.forPost);
        setNewComment('');
        // Assurance for refreshing

    }
    return (
        <React.Fragment>
            <div className={styles.container}>
                {
                    props.comments.map(comment => (
                        <Comment key={comment.id} comment={comment} />
                    ))
                }
            </div>
            {
                !usersCtx.isLoggedIn && (<div className={styles.disabledCommentContainer}>
                    <Link to="/login">Log in</Link> to like or comment. </div>)
            }
            {
                usersCtx.isLoggedIn && (<div className={styles.enabledCommentContainer}>
                    <input placeholder="Add a comment..." value={newComment} onChange={event => setNewComment(event.target.value)} />
                    <button onClick={addingHandler} className={styles.post} children="Post" />
                </div>)
            }
        </React.Fragment>
    );
}

export default Comments;