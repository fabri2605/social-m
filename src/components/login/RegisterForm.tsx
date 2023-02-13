import { useForm } from '../../hooks/useForm';
import logo from '../../assets/logoBlack.png';
import styles from './Styles.module.css';
interface Props {
    userSubmition: (e: string, u: string, p: string) => void;
    registredOrNot: () => void;
}

export const RegisterForm = ({ userSubmition, registredOrNot }: Props) => {
    const { user, pass, email, error, action } = useForm({
        user: '',
        pass: '',
        email: '',
        error: '',
    });

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (email.length < 10 || !email.includes('@')) {
            action('error', 'Email is invalid!');
        } else if (user.length < 4) {
            action('error', 'Username cant be that short!');
        } else if (pass.length < 7) {
            action('error', 'Password cant be that short!');
        } else {
            action('error', '');
            userSubmition(email, user, pass);
        }
    };

    {
        /* <div
                    style={{ padding: '16px 5px 16px 15px' }}
                    className='input-group-text'
                >
                    <i className='material-icons'>local_post_office</i>
                </div>
                &nbsp;&nbsp;&nbsp; */
    }

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
                    className='form-control ml-5'
                    type={'email'}
                    value={email}
                    placeholder={'user@xxx.com'}
                    onChange={(e) => action('email', e.target.value)}
                />
            </div>
            <div className='form-group input-group mb-3'>
                <input
                    style={{ padding: '15px' }}
                    className='form-control'
                    type={'text'}
                    value={user}
                    placeholder={'anyuser123'}
                    onChange={(e) => action('user', e.target.value)}
                />
            </div>
            <div className='form-group input-group mb-3 d-flex flex-row justify-content-start'>
                <input
                    style={{ padding: '15px' }}
                    className='form-control'
                    type={'password'}
                    value={pass}
                    placeholder={'password'}
                    onChange={(e) => action('pass', e.target.value)}
                />
                {/* <div
                    style={{ padding: '16px 5px 16px 15px' }}
                    className='input-group-text'
                >
                    <i className='material-icons'>visibility_off</i>
                </div> */}
            </div>

            {error && <p className='text-danger'>{error}</p>}
            <button className='btn btn-outline-info'>Register</button>
            <p className='mt-3 mb-0'>
                Already have an account?{' '}
                <a
                    style={{ cursor: 'pointer' }}
                    className='text-warning'
                    onClick={registredOrNot}
                    href='#!'
                >
                    Login
                </a>
            </p>
        </form>
    );
};
