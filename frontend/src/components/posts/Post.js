import React, { useContext, useState } from 'react';
import styles from './Posts.module.css';
import { Avatar } from '@material-ui/core';
import Comments from '../comments/Comments';
import PostsContext from '../../store/posts-context/posts-context';

const Post = ({ post }) => {
  const postsCtx = useContext(PostsContext);

  const deletePostHandler = () => {
    postsCtx.deletePost(post.id);
  }

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <Avatar alt={post.user.username} />
        <div className={styles.postInfo}>
          <h3>{post.user.username}</h3>     
          {post.owned && <button className={styles.delete} children="Delete" onClick={deletePostHandler} />}
        </div>
      </div>
      <img className={styles.postImg} src={post.img_url_type === 'relative' ? "http://localhost:8000/" + post.img_url : post.img_url} />
      <h4 className={styles.caption}>{post.caption}</h4>
      <Comments comments={post.comments} forPost={post.id} />
    </div>
  );
}

export default Post;