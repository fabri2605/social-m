import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import { Spinner } from '../spinner/Spinner';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import Swal from 'sweetalert2';

export function Login() {
    const [isRegistred, setIsRegistred] = useState(true);
    const [error, setError] = useState('');
    const { users, registerUser, loginUser, isLoading, setIsLoading } =
        useContext(UserContext);
    const navigate = useNavigate();

    const userLogin = async (username: string, password: string) => {
        try {
            const user = users.find((e) => e.username === username);
            if (!user) {
                setError(`${username} is not registred!`);
            } else {
                if (user.password !== password) {
                    setError('Wrong password!');
                } else {
                    setIsLoading(true);
                    loginUser(user);
                    Swal.fire(
                        'Nice!',
                        'You log in correctly!',
                        'success'
                    ).then(() => navigate('/'));
                }
            }
        } catch (e) {
            setError(`Error: ${e}`);
        }
    };

    const userRegister = async (
        email: string,
        username: string,
        password: string
    ) => {
        try {
            const emailRegistred = users.find((e) => e.email === email);
            const userRegistred = users.find((e) => e.username === username);
            if (emailRegistred) {
                setError('Your email is already in the database, log in!');
            } else if (userRegistred) {
                setError('That username is already in use!');
            } else {
                setIsLoading(true);
                setIsRegistred(true);
                setError('');
                registerUser({ email, username, password, id: '1' });
                Swal.fire(
                    'Good job!',
                    'You have registered correctly!',
                    'success'
                ).then(() => navigate('/'));
            }
        } catch (e) {
            setError(`Error: ${e}`);
        }
    };

    const changingIsRegistred = () => {
        setIsRegistred((e) => !e);
    };

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) return <Spinner />;

    return (
        <div className='container p-4'>
            <div className='row'>
                {isRegistred ? (
                    <LoginForm
                        registredOrNot={changingIsRegistred}
                        userSubmition={(u, p) => userLogin(u, p)}
                    />
                ) : (
                    <RegisterForm
                        registredOrNot={changingIsRegistred}
                        userSubmition={(e, u, p) => userRegister(e, u, p)}
                    />
                )}
                {error && <p className='text-danger'>{error}</p>}
                <p
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        left: 0,
                        right: 0,
                        textAlign:'center'
                    }}
                >
                    Page done by Fabricio Di Paolo
                </p>
            </div>
        </div>
    );
}
