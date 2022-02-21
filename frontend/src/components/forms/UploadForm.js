import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PostsContext from '../../store/posts-context/posts-context';
import styles from './Forms.module.css';

const UploadForm = () => {
    const [caption, setCaption] = useState('');
    const postsCtx = useContext(PostsContext);
    const [imgFile, setImgFile] = useState(null);
    const onCreatePostHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", imgFile);
        let requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: formData
        };
        try {
            let response = await fetch('http://localhost:8000/posts/image', requestOptions);
            if (!response.ok) {
                let responseData = await response.json();
                throw new Error(responseData.detail);
            }
            let responseData = await response.json();
            requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    img_url: responseData.path,
                    "img_url_type": "relative",
                    "caption": caption
                })
            }
            response = await fetch('http://localhost:8000/posts/create', requestOptions);
            if (!response.ok) {
                responseData = await response.json();
                throw new Error(responseData.detail);
            }
            postsCtx.reloadPosts();
        } catch (err) {
            console.log(err);
        }
        setCaption('');
    }

    return (
        <form onSubmit={onCreatePostHandler} className={styles.upload}>
            <input onChange={eve => setCaption(eve.target.value)} value={caption} type="text" minLength="4" placeholder="Caption" required />
            <input onChange={eve => setImgFile(eve.target.files[0])} accept=".png, .jpg, .jpeg, .bmp" type="file" required />
            <button type="submit" children="Upload" />
        </form>
    );
}

export default UploadForm;