import { useContext, useState, useEffect } from 'react';

import { UserContext } from '../../context/UserContext';

import { Nav } from '../navbar/Nav';
import { Spinner } from '../spinner/Spinner';

export const Profile = () => {
    const { isLogged, logById, logoutUser, changePassword } =
        useContext(UserContext);
    const [changingPass, setChangingPass] = useState(false);
    const storage = localStorage.getItem('lg');

    const [newPass, setNewPass] = useState(isLogged ? isLogged.password : '');

    const changePassHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPass(e.target.value);
    };

    const passwordSubmit = () => {
        if (newPass.length > 6) {
            changePassword(newPass, storage!);
            setChangingPass(false);
        }else{
            setNewPass('');
        }
    };

    useEffect(() => {
        if (storage) {
            logById(storage);
        } else {
            logoutUser();
        }
    }, []);

    return (
        <div className='container'>
            <Nav />
            {isLogged ? (
                <>
                    <h1>{isLogged.username}</h1>
                    <h5>{isLogged.email}</h5>
                    {!changingPass && (
                        <button
                            onClick={() => setChangingPass(true)}
                            className='btn btn-warning'
                        >
                            Change password
                        </button>
                    )}
                </>
            ) : (
                <Spinner />
            )}
            {changingPass && (
                <>
                    <div className='form-group has-danger'>
                        <label className='form-label mt-4' htmlFor='inputValid'>
                            Enter your new password
                        </label>
                        <input
                            type='password'
                            value={newPass}
                            onChange={(e) => changePassHandler(e)}
                            className={`form-control ${
                                newPass.length < 7 ? 'is-invalid' : 'is-valid'
                            }`}
                            id='inputInvalid'
                        />
                        <div className='valid-feedback'>That looks nice!</div>
                        <button
                            disabled={newPass.length < 7 ? true : false}
                            className='btn btn-warning mt-2 text-dark'
                            onClick={passwordSubmit}
                        >
                            Done
                        </button>
                    </div>
                    {/* <div className='form-group has-danger'>
                        <label
                            className='form-label mt-4'
                            htmlFor='inputInvalid'
                        >
                            Invalid input
                        </label>
                        <input
                            type='text'
                            value='wrong value'
                            className='form-control is-invalid'
                            id='inputInvalid'
                        />
                        <div className='invalid-feedback'>
                            Sorry, that username's taken. Try another?
                        </div>
                    </div> */}
                </>
            )}
        </div>
    );
};
