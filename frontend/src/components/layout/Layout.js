import React from 'react';
import styles from './Layout.module.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Layout = props => {
    return (
        <React.Fragment>
            <div className={styles.container}>
                <Link to="/">
                    <img className={styles.logo} src={logo} alt="Instagram Clone Logo" />
                </Link>
                {props.isLoggedIn ?
                    (<div className={styles.menu}>
                        <button onClick={props.logOutHandler} className={styles.logout} children='Logout' />
                    </div>) :
                    (<div className={styles.menu}>
                        <Link to="/login" children='Log in' />
                        <Link to="/signup" className={styles.register} children='Sign Up' />
                    </div>)
                }
            </div>
            {props.children}
        </React.Fragment>
    );
}

export default Layout;