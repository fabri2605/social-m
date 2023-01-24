
import styles from '../styles/Login.module.css';
import { Link } from 'react-router-dom';

function Login() {

    return (
        <div className={styles.container}>
            <h1>Welcome to the Social-M</h1>
            <div>
                <label>Username</label>
                <input type={'text'} />
            </div>
            <div>
                <label>Password</label>
                <input type={'password'} />
            </div>
            <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
            <button>Login</button>
        </div>
    );
}

export default Login;
