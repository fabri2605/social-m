import { Nav } from '../navbar/Nav';
import { useCallback, useContext, useEffect } from 'react';
import { user, UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Person } from './Person';
import { Spinner } from '../spinner/Spinner';

export const People = () => {
    const { users, logById, isLogged } = useContext(UserContext);
    const navigate = useNavigate();

    const logDissaprobed = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const goToProfile = (e: user) => {
        const propietary = users.find((u) => u.username === e.username);
        navigate(`/profile/${propietary?.id}`);
    };

    useEffect(() => {
        const storage = localStorage.getItem('lg');
        if (storage) {
            logById(storage);
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div className='container'>
            <Nav />
            <div>
                {users.length > 0 ?
                    users
                        .filter((e) => e.username !== isLogged?.username)
                        .map((u) => {
                            return (
                                <Person
                                    key={u.username}
                                    u={u}
                                    goToProfile={goToProfile}
                                />
                            );
                        }) : <Spinner />}
            </div>
            <p
                style={{
                    textAlign: 'center',
                    paddingBottom: '10px',
                    marginBottom: '1px',
                }}
            >
                Page done by Fabricio Di Paolo
            </p>
        </div>
    );
};
