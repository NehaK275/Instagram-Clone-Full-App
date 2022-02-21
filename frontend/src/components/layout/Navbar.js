import React, { useContext } from 'react';
import GuestMenu from './GuestMenu';
import LoggedInMenu from './LoggedInMenu';
import logo from '../../assets/logo.png';
import styles from './Layout.module.css';
import UsersContext from '../../store/users-context/users-context';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const usersCtx = useContext(UsersContext);
    return (
        <div className={styles.navbar}>
            <Link to="/">
                <img className={styles.logo} src={logo} alt="Instagram Clone Logo" />
            </Link>
            {usersCtx.isLoggedIn ? <LoggedInMenu /> : <GuestMenu />}
        </div>
    );
}

export default Navbar;