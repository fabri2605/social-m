import { useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { Footer } from './nav&foot/Footer';
import { Nav } from './nav&foot/Nav';
import { Publications } from './publications/Publications';
import { Publisher } from './publications/Publisher';

import { Spinner } from './spinner/Spinner';

export const Home = () => {
    const { isLogged, logById, isLoading, setIsLoading } =
        useContext(UserContext);
    const navigate = useNavigate();

    const logDissaprobed = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const logging = useCallback(
        async (id: string) => {
            try {
                if (isLogged) {
                    setIsLoading(false);
                    return;
                }
                logById(id);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
                setIsLoading(false);
                logDissaprobed();
            }
        },
        [isLogged, logById, logDissaprobed, setIsLoading]
    );

    useEffect(() => {
        const storage = localStorage.getItem('lg');
        if (storage) {
            logging(storage);
        } else {
            logDissaprobed();
        }
    }, [logDissaprobed, logging]);

    if (isLoading) return <Spinner />;

    return (
        <div className='container'>
            <Nav />

            {/* WARNING - page not finished */}

            <div className='alert alert-dismissible alert-warning mb-2'>
                <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='alert'
                ></button>
                <h4 className='alert-heading'>Warning!</h4>
                <p className='mb-0'>
                    This website is not completely developed. If you want to,
                    you can dive into my finished projects ..
                    <a
                        href='https://my-briefcase-three.vercel.app/'
                        className='alert-link'
                    >
                        Clicking here!
                    </a>
                    ..
                </p>
            </div>

            <Publisher />
            <Publications filterByUser={''} />
            <Footer />
        </div>
    );
};
