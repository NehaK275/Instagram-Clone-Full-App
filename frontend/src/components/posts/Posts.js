import React, { useContext, useEffect, useState } from 'react';
import Post from './Post';
import styles from './Posts.module.css';
import PostsContext from '../../store/posts-context/posts-context';

const Posts = () => {
    const postsCtx = useContext(PostsContext);

    return (
        //Mapping the posts, Sorted by date.
        <div className={styles.container}>
            {
                postsCtx.posts.sort((post1, post2) => {
                    const post1_date = new Date(post1.timestamp);
                    const post2_date = new Date(post2.timestamp);
                    return post2_date - post1_date;
                }).map(post => {
                    return <Post key={post.id} post={post} />
                })
            }
        </div>
    );
}

export default Posts;