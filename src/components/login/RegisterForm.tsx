import { useForm } from '../../hooks/useForm';
import logo from '../../assets/logoBlack.png';
import styles from './Styles.module.css';
import { useState } from 'react';

interface Props {
    userSubmition: (e: string, u: string, p: string) => void;
    registredOrNot: () => void;
    serverError?: string;
}

export const RegisterForm = ({ userSubmition, registredOrNot, serverError }: Props) => {
    const { user, pass, email, error, action } = useForm({
        user: '',
        pass: '',
        email: '',
        error: '',
    });

    const [visible, setVisible] = useState(false);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.length < 10 || !email.includes('@')) {
            action('error', 'Please enter a valid email address.');
        } else if (user.length < 4) {
            action('error', 'Username must be at least 4 characters.');
        } else if (pass.length < 7) {
            action('error', 'Password must be at least 7 characters.');
        } else {
            action('error', '');
            userSubmition(email, user, pass);
        }
    };

    const displayError = error || serverError;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <img alt='logo' className={styles.logo} src={logo} />
                <h1 className={styles.title}>WAVE 3.0</h1>
                <span className={styles.subtitle}>Create a new account</span>
            </div>

            <form autoComplete='off' onSubmit={submitHandler}>
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Email</label>
                    <div className={styles.inputWrapper}>
                        <i className={`material-icons ${styles.inputIcon}`}>email</i>
                        <input
                            className={styles.input}
                            type='email'
                            value={email}
                            placeholder='user@example.com'
                            onChange={(e) => action('email', e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Username</label>
                    <div className={styles.inputWrapper}>
                        <i className={`material-icons ${styles.inputIcon}`}>person</i>
                        <input
                            className={styles.input}
                            type='text'
                            value={user}
                            placeholder='anyuser123'
                            onChange={(e) => action('user', e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Password</label>
                    <div className={styles.inputWrapper}>
                        <i className={`material-icons ${styles.inputIcon}`}>lock</i>
                        <input
                            className={styles.input}
                            type={visible ? 'text' : 'password'}
                            value={pass}
                            placeholder='••••••••'
                            onChange={(e) => action('pass', e.target.value)}
                        />
                        <span className={styles.visibilityBtn} onClick={() => setVisible(v => !v)}>
                            <i className='material-icons'>{visible ? 'visibility_off' : 'visibility'}</i>
                        </span>
                    </div>
                </div>

                {displayError && (
                    <div className={styles.error}>
                        <i className='material-icons' style={{ fontSize: '16px' }}>error_outline</i>
                        {displayError}
                    </div>
                )}

                <button type='submit' className={styles.submitBtn}>Create account</button>
            </form>

            <p className={styles.toggleText}>
                Already have an account?
                <a href='#!' className={styles.toggleLink} onClick={registredOrNot}>
                    Sign in
                </a>
            </p>
        </div>
    );
};
