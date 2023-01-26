import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

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
            className='card card-body rounded'
            onSubmit={(e) => submitHandler(e)}
        >
            <h1>Social-M</h1>
            <h3>Welcome, please log in!</h3>
            <div className='form-group input-group mb-3 mt-3'>
                <div className='input-group-text'>
                    <i className='material-icons'>contacts</i>
                </div>
                <label className='col-sm-2 col-form-label'>Username</label>
                <input
                    className='form-control'
                    type={'text'}
                    value={user}
                    placeholder={'anyuser123'}
                    onChange={(e) => action('user', e.target.value)}
                />
            </div>
            <div className='form-group input-group mb-3'>
                <div className='input-group-text'>
                    <i className='material-icons'>extension</i>
                </div>
                <label className='col-sm-2 col-form-label mr-2'>Password</label>
                <input
                    className='form-control'
                    type={'password'}
                    value={pass}
                    placeholder={'anyuser123'}
                    onChange={(e) => action('pass', e.target.value)}
                />
            </div>
            <p className='mt-1 mb-3'>
                Don't have an account? <button onClick={registredOrNot}>Register</button>
            </p>
            {error && <p className='text-danger'>{error}</p>}
            <button className='btn btn-primary'>Login</button>
        </form>
    );
};
