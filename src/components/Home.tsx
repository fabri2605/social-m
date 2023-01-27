import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Imagee from '../assets/nemo.jpg';
import { UserContext } from '../context/UserContext';
import { Nav } from './navbar/Nav';
import { Publications } from './publications/Publications';
import { Publisher } from './publish/Publisher';

import { Spinner } from './spinner/Spinner';

export const Home = () => {
    const { isLogged, logById, isLoading, setIsLoading } =
        useContext(UserContext);
    const navigate = useNavigate();

    const logDissaprobed = () => {
        navigate('/login');
    };

    const logging = async (id: string) => {
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
    };

    useEffect(() => {
        const storage = localStorage.getItem('lg');
        if (!storage) {
            logDissaprobed();
        } else {
            logging(storage);
        }
    }, []);

    if (isLoading) return <Spinner />;

    {
        /* update build assistant_photo person_add*/
    }

    return (
        <div className='container'>
            <Nav />
            <div className='alert alert-dismissible alert-warning'>
                <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='alert'
                ></button>
                <h4 className='alert-heading'>Warning!</h4>
                <p className='mb-0'>
                    This website is not completely developed, you can have fun
                    going into the finished ones... for that .
                    <a
                        href='https://my-briefcase-three.vercel.app/'
                        className='alert-link'
                    >
                        Click here!
                    </a>
                    .
                </p>
            </div>

            <Publisher />
            <Publications />
        </div>
    );
};
