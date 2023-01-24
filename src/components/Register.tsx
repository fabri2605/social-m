
import styles from '../styles/Login.module.css';
import { Link } from 'react-router-dom';

function Register() {

    return (
        <div className={styles.container}>
            <h1>Welcome to the Social-M</h1>
            <div>
                <label>Name</label>
                <input type={'text'} />
            </div>
            <div>
                <label>Username</label>
                <input type={'text'} />
            </div>
            <div>
                <label>Password</label>
                <input type={'password'} />
            </div>
            <p>Do you have an account? <Link to={'/login'}>Login</Link></p>
            <button>Register</button>
        </div>
    );
}

export default Register;
