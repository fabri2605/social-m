
import { useForm } from '../../hooks/useForm';
import logo from '../../assets/Social.jpg';

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
            style={{borderRadius: '5px'}}
            className='card card-body'
            onSubmit={(e) => submitHandler(e)}
        >
            <h1>Social.v2</h1>
            {/* <img src={logo} /> */}
            <div className='form-group input-group mb-3 mt-3'>
                <div style={{backgroundColor: 'none'}} className='input-group-text'>
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
            <div className='form-group input-group mb-3'>
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
                Don't have an account? <a style={{cursor: 'pointer'}} className='text-warning' onClick={registredOrNot}> Register</a>
            </p>
            {error && <p className='text-danger'>{error}</p>}
            <button className='btn btn-primary'>Login</button>
        </form>
    );
};
