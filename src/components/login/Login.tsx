import { useState, useContext } from 'react';

import { UserContext } from '../../context/UserContext';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export function Login() {
    const [isRegistred, setIsRegistred] = useState(false);
    const [error, setError] = useState('');
    const { users, registerUser, loginUser } = useContext(UserContext);

    const userLogin = async (username: string, password: string) => {
        try {
            const user = users.find((e) => e.username === username);
            if(!user){
                setError(`${username} is not registred!`)
            }else{
                if(user.password !==password){
                    setError('Wrong password!')
                }else{
                    loginUser(user);
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
                setError('');
                registerUser({ email, username, password });
                window.location.href = '/';
            }
        } catch (e) {
            setError(`Error: ${e}`);
        }
    };

    const changingIsRegistred = () => {
        setIsRegistred((e) => !e);
    };

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
            </div>
        </div>
    );
}
