import { useForm } from '../../hooks/useForm';
import logo from '../../assets/logoBlack.png';
import styles from './Styles.module.css';
interface Props {
    userSubmition: (u: string, p: string) => void;
    registredOrNot: () => void;
}

export const LoginForm = ({ userSubmition, registredOrNot }: Props) => {
    const { user, pass, error, action } = useForm({
        user: '',
        pass: '',
        error: '',
    });

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (user.length < 4) {
            action('error', 'Username cant be that short!');
        } else if (pass.length < 5) {
            action('error', 'Password cant be that short!');
        } else {
            action('error', '');
            userSubmition(user, pass);
        }
    };

    return (
        <form
            autoComplete='off'
            style={{ borderRadius: '15px' }}
            className='card card-body'
            onSubmit={(e) => submitHandler(e)}
        >
            <h1 className={styles.title}>WAVE 3.0</h1>
            <img alt='logo' className={styles.logo} src={logo} />
            <div className='form-group input-group mb-3 mt-3'>
                <input
                    style={{ padding: '15px' }}
                    className='form-control'
                    type={'text'}
                    value={user}
                    placeholder={'anyuser123'}
                    onChange={(e) => action('user', e.target.value)}
                />
            </div>
            <div className='form-group input-group mb-3'>
                <input
                    style={{ padding: '15px' }}
                    className='form-control'
                    type={'password'}
                    value={pass}
                    placeholder={'anyuser123'}
                    onChange={(e) => action('pass', e.target.value)}
                />
            </div>

            {error && <p className='text-danger'>{error}</p>}
            <button className='btn btn-outline-info'>Login</button>
            <p className='mt-3 mb-0'>
                Don't have an account?{' '}
                <a
                    href='#!'
                    style={{ cursor: 'pointer' }}
                    className='text-warning'
                    onClick={registredOrNot}
                >
                    {' '}
                    Register
                </a>
            </p>
        </form>
    );
};
