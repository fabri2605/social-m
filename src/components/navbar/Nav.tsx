import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
export const Nav = () => {
    const { isLogged, logoutUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <div className='container-fluid'>
                <a
                    className='navbar-brand'
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    Social-m
                </a>
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
                <div className='collapse navbar-collapse' id='navbarColor01'>
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
                                        navigate(
                                            `/profile/${isLogged!.username}`
                                        )
                                    }
                                >
                                    {isLogged?.username.toUpperCase()}
                                </a>
                                <a className='dropdown-item' href='#'>
                                    Friends
                                </a>
                                <div className='dropdown-divider'></div>
                                <a
                                    className='dropdown-item text-danger'
                                    onClick={logoutHandler}
                                >
                                    Log out
                                </a>
                            </div>
                        </li>
                    </ul>
                    {/* <form className='d-flex'>
                        <input
                            className='form-control me-sm-2'
                            type='search'
                            placeholder='Search'
                        />
                        <button
                            className='btn btn-secondary my-2 my-sm-0'
                            type='submit'
                        >
                            Search
                        </button>
                    </form> */}
                </div>
            </div>
        </nav>
    );
};
