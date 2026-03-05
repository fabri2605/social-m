import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoWhite.png';
import styles from './Nav.module.css';

export const Nav = () => {
    const { isLogged, logoutUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav className={styles.nav}>
            {/* Brand */}
            <a className={styles.brand} href='#!' onClick={() => navigate('/')}>
                <img alt='logo' className={styles.logo} src={logo} />
                <span className={styles.brandName}>WAVE</span>
            </a>

            {/* Nav links */}
            <div className={styles.links}>
                <a className={styles.link} href='#!' onClick={() => navigate('/')}>
                    <i className={`material-icons ${styles.linkIcon}`}>home</i>
                    Home
                </a>
                <a
                    className={styles.link}
                    href='#!'
                    onClick={() => navigate(`/profile/${isLogged!.id}`)}
                >
                    <i className={`material-icons ${styles.linkIcon}`}>person</i>
                    Profile
                </a>
            </div>

            {/* Right: username + logout */}
            <div className={styles.right}>
                {isLogged && (
                    <span className={styles.username}>@{isLogged.username}</span>
                )}
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <i className={`material-icons ${styles.logoutIcon}`}>logout</i>
                    Log out
                </button>
            </div>

            {/* Mobile toggler (visual only) */}
            <button className={styles.toggler}>
                <i className='material-icons'>menu</i>
            </button>
        </nav>
    );
};
