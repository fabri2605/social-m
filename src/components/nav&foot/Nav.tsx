import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoWhite.png';
import styles from '../login/Styles.module.css';
import Swal from 'sweetalert2';
export const Nav = () => {
    const { isLogged } = useContext(UserContext);
    const navigate = useNavigate();


    return (
        <>
            <div style={{ height: '6px' }}></div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary rounded mb-2 nav-pills'>
                <div className='container-fluid'>
                    <div>
                        <img alt='logo' className={styles.logonav} src={logo} />
                        <a
                            className='navbar-brand'
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                            href='#!'
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
                                    href='#!'
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#!'
                                    className='nav-link'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/people`)}
                                >
                                    Meet People
                                </a>
                            </li>
                            <li>
                                <a
                                    className='nav-link text-capitalize'
                                    style={{ color: '#fda615',  }}
                                    onClick={() =>
                                        navigate(`/profile/${isLogged!.id}`)
                                    }
                                    href='#!'
                                >   
                                
                                    {isLogged?.username}
                                </a>
                            </li>

                            {/* <li className='nav-item dropdown'>
                                <a
                                    className='nav-link dropdown-toggle'
                                    data-bs-toggle='dropdown'
                                    href='#!'
                                    role='button'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    About
                                </a>
                                <div className='dropdown-menu'>
                                    <a
                                        className='dropdown-item text-danger'
                                        onClick={logoutHandler}
                                        style={{ cursor: 'pointer' }}
                                        href='#!'
                                    >
                                        Log out
                                    </a>
                                </div>
                            </li> */}
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
