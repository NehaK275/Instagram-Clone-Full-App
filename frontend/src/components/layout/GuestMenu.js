import React from 'react';
import styles from './Layout.module.css';
import { Link } from 'react-router-dom';

const GuestMenu = () => {
    return (
        <div className={styles.menu}>
            <Link to="/login" children='Log in' />
            <Link to="/signup" className={styles.register} children='Sign Up' />
        </div>
    );
}

export default GuestMenu;