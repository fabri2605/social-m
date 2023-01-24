import { useEffect } from 'react';
import { redirect } from "react-router-dom";
import styles from '../styles/Home.module.css';
import Imagee from '../assets/nemo.jpg';

export const Home = () => {

    useEffect(() => {
      window.location.href = '/login';
    }, [])
    

    return (
        <div className={styles.container}>
            <h1>Hi, this is the home page!</h1>
            <img alt='nemo' src={Imagee}/>
        </div>
    );
}