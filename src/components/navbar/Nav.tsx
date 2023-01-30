import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoWhite.png';
import styles from '../login/Styles.module.css';
import Swal from 'sweetalert2';
export const Nav = () => {
    const { isLogged, logoutUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'We have just met!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Logged Out!', 'Hope to see you soon!', 'success');
                logoutUser();
                navigate('/login');
            }
        });
    };

    return (
        <>
            <div style={{ height: '6px' }}></div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary rounded mb-2 nav-pills'>
                <div className='container-fluid'>
                    <div>
                        <img className={styles.logonav} src={logo} />
                        <a
                            className='navbar-brand'
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                        >
                            Wave
                        </a>
                    </div>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarColor01'
                        aria-controls='navbarColor01'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div
                        className='collapse navbar-collapse'
                        id='navbarColor01'
                    >
                        <ul className='navbar-nav me-auto'>
                            <li>
                                <a
                                    className='nav-link'
                                    role='button'
                                    onClick={() => navigate('/')}
                                >
                                    Home
                                </a>
                            </li>
                            <li className='nav-item dropdown'>
                                <a
                                    className='nav-link dropdown-toggle'
                                    data-bs-toggle='dropdown'
                                    href='#'
                                    role='button'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    About
                                </a>
                                <div className='dropdown-menu'>
                                    <a
                                        className='dropdown-item text-warning'
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            navigate(`/profile/${isLogged!.id}`)
                                        }
                                    >
                                        {isLogged?.username.toUpperCase()}
                                    </a>
                                    <a
                                        className='dropdown-item'
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate(`/people`)}
                                    >
                                        Meet People
                                    </a>
                                    <div className='dropdown-divider'></div>
                                    <a
                                        className='dropdown-item text-danger'
                                        onClick={logoutHandler}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Log out
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <form className='d-flex'>
                            {/* <input
                                className='form-control me-sm-2'
                                type='search'
                                placeholder='Search'
                            />
                            <button
                                className='btn btn-secondary my-2 my-sm-0'
                                type='submit'
                            >
                                Search
                            </button> */}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};
