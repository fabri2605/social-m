
import { useForm } from '../../hooks/useForm';

interface Props {
    userSubmition: (e: string, u: string, p: string) => void;
    registredOrNot: ()=>void;
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

    return (
        <form
            autoComplete='off'
            className='card card-body rounded'
            onSubmit={(e) => submitHandler(e)}
        >
            <h1>Social-M</h1>
            <h3>Welcome, please register!</h3>
            <div className='form-group input-group mb-3 mt-3'>
                <div className='input-group-text'>
                    <i className='material-icons'>local_post_office</i>
                </div>
                <label className='col-sm-2 col-form-label'>Email</label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                    className='form-control ml-5'
                    type={'email'}
                    value={email}
                    placeholder={'user@xxx.com'}
                    onChange={(e) => action('email', e.target.value)}
                />
            </div>
            <div className='form-group input-group mb-3'>
                <div className='input-group-text'>
                    <i className='material-icons'>contacts</i>
                </div>
                <label className='col-sm-2 col-form-label'>Username</label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                    className='form-control'
                    type={'text'}
                    value={user}
                    placeholder={'anyuser123'}
                    onChange={(e) => action('user', e.target.value)}
                />
            </div>
            <div className='form-group input-group mb-3 d-flex flex-row justify-content-start'>
                <div className='input-group-text'>
                    <i className='material-icons'>extension</i>
                </div>
                <label className='col-sm-2 col-form-label mr-2'>Password</label>
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
                Already have an account? <a style={{cursor: 'pointer'}} className='text-warning' onClick={registredOrNot}>Login</a>
            </p>
            {error && <p className='text-danger'>{error}</p>}
            <button className='btn btn-primary'>Register</button>
        </form>
    );
};
