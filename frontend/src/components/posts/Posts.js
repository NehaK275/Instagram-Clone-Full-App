import React, { useState, useEffect } from 'react';
import Post from './Post';
import styles from './Posts.module.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:8000/posts/all');
            if (!response.ok) {
                throw new Error();
            }
            const responseData = await response.json();
            setPosts(responseData);
            setIsLoading(false);
        }
        fetchPosts().catch(err => {
            setIsLoading(false);
            setError(err.message);
        });
    }, []);
    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        );
    }
    if (error) {
        return (
            <div>
                There's a network problem, try again later.
            </div>
        );
    }
    return (
        <div className={styles.container}>
            {
                posts.sort((post1, post2) => {
                    const post1_date = new Date(post1.timestamp);
                    const post2_date = new Date(post2.timestamp);
                    return post1_date - post2_date;
                }).map(post => {
                    return <Post key={post.id} post={post} />
                })
            }
        </div>
    );
}

export default Posts;