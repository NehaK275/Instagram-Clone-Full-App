import React, { useContext, useState } from 'react';
import styles from './Layout.module.css';
import UsersContext from '../../store/users-context/users-context';
import Modal from '../UI/modal/Modal';
import UploadForm from '../forms/UploadForm';
import PostsContext from '../../store/posts-context/posts-context';
import { Link } from 'react-router-dom';

const LoggedInMenu = () => {
    const usersCtx = useContext(UsersContext);
    const postsCtx = useContext(PostsContext);
    const [clickedUpload, setClickedUpload] = useState(false);
    const logOutHandler = () => {
        usersCtx.logout();
        postsCtx.reloadPosts();
    }
    return (
        <div className={styles.menu}>
            {clickedUpload && <Modal onClose={() => setClickedUpload(false)} ><UploadForm /></Modal>}
            <Link to="#" onClick={() => setClickedUpload(true)} className={styles.upload} children='Upload' />
            <button onClick={logOutHandler} className={styles.logout} children='Logout' />
        </div>
    );
}

export default LoggedInMenu;