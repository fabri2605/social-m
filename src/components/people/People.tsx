import { Nav } from '../navbar/Nav';
import { useContext, useEffect } from 'react';
import { user, UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Person } from './Person';

export const People = () => {
    const { users, logById, isLogged } = useContext(UserContext);
    const navigate = useNavigate();

    const goToProfile = (e: user) => {
        const propietary = users.find((u) => u.username === e.username);
        navigate(`/profile/${propietary?.id}`);
    };

    const bringInfo = () => {
        const storage = localStorage.getItem('lg');
        if (storage) {
            logById(storage);
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        bringInfo();
    }, []);

    return (
        <div className='container'>
            <Nav />
            <div>
                {users.length > 0 &&
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
                        })}
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
