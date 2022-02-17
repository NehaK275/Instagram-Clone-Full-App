import React, { useState, useEffect } from 'react';
import styles from './Posts.module.css';
import { Avatar, Button } from '@material-ui/core';

const BASE_URL = "http://localhost:8000/"

const Post = ({ post }) => {
  const [imgUrl, setImgUrl] = useState('');
  const [comments, setComments] = useState();

  useEffect(() => {
    if (post.img_url_type == 'absolute') {
      setImgUrl(post.img_url);
    } else {
      setImgUrl(BASE_URL + post.img_url);
    }
  }, []);

  useEffect(() => {
    setComments(post.comments);
  }, []);

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <Avatar alt={post.user.username} />
        <div className={styles.postHeaderInfo}>
          <h3>{post.user.username}</h3>
          <Button className={styles.delete} children="Delete"/>
        </div>
      </div>
      <img className={styles.postImg} src={imgUrl} />
      <h4 className={styles.caption}>{post.caption}</h4>
      <div className={styles.comments}>
        {
          post.comments.map(comment => (
            <p>
              <strong>{comment.username}: </strong>
              {comment.text}
            </p>
          ))
        }
      </div>
    </div>
  );
}

export default Post;