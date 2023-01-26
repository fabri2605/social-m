import { useEffect, useContext, useState } from 'react';
import Imagee from '../assets/nemo.jpg';
import { UserContext } from '../context/UserContext';
import { Spinner } from './spinner/Spinner';

export const Home = () => {
    const { isLogged, loginUser, bringData, findById, logoutUser } =
        useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    const logDissaprobed = () => {
        logoutUser();
        setIsLoading(false);
        window.location.href = '/login';
    };

    const logging = async (id: string) => {
        try {
            const myUser = await findById(id);
            if (myUser) {
                loginUser(myUser);
                setIsLoading(false);
            } else {
                logDissaprobed();
            }
        } catch (e) {
            console.log('error: ', e);
            logDissaprobed();
        }
    };

    useEffect(() => {
        if (!isLogged) {
            const storage = localStorage.getItem('lg');
            if (!storage) {
                logDissaprobed();
            } else {
                /* bringData(); */
                /* logging(storage); */
            }
        }
    }, []);

    if (isLoading) return <Spinner />;

    return (
        <div className='container'>
            <h1>Hi, this is the home page!</h1>
            <img alt='nemo' src={Imagee} />
            <button onClick={logDissaprobed} className='btn btn-primary'>
                Log out
            </button>
            <h3>{JSON.stringify(isLogged)}</h3>
        </div>
    );
};
