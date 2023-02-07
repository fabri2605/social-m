
import { useForm } from '../../hooks/useForm';
import logo from '../../assets/logoBlack.png';
import styles from './Styles.module.css';
interface Props {
    userSubmition: (u: string, p: string) => void;
    registredOrNot: ()=>void;
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
            style={{borderRadius: '15px'}}
            className='card card-body'
            onSubmit={(e) => submitHandler(e)}
        >
            <h1 className={styles.title}>WAVE 3.0</h1>
            <img alt='logo' className={styles.logo} src={logo} />
            <div className='form-group input-group mb-3 mt-3'>
                <div style={{padding:'16px 5px 16px 15px'}} className='input-group-text'>
                    <i className='material-icons'>contacts</i>
                </div>
                &nbsp;&nbsp;&nbsp;
                <input
                    className='form-control'
                    type={'text'}
                    value={user}
                    placeholder={'anyuser123'}
                    onChange={(e) => action('user', e.target.value)}
                />
            </div>
            <div className='form-group input-group mb-3'>
                <div style={{padding:'16px 5px 16px 15px'}} className='input-group-text pl-0 pr-0'>
                    <i className='material-icons'>extension</i>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                    className='form-control'
                    type={'password'}
                    value={pass}
                    placeholder={'anyuser123'}
                    onChange={(e) => action('pass', e.target.value)}
                />
            </div>
            <p className='mt-1 mb-3'>
                Don't have an account? <a style={{cursor: 'pointer'}} className='text-warning' onClick={registredOrNot}> Register</a>
            </p>
            {error && <p className='text-danger'>{error}</p>}
            <button className='btn btn-primary'>Login</button>
        </form>
    );
};
