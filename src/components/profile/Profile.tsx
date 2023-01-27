import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UserContext, user } from '../../context/UserContext';

import { Nav } from '../navbar/Nav';
import { MiniSpinner } from '../spinner/MiniSpinner';
import { Spinner } from '../spinner/Spinner';

export const Profile = () => {
    const {
        isLogged,
        changePassword,
        findById,
        changeDescription,
        isLoading,
        setIsLoading,
    } = useContext(UserContext);
    const params = useParams();
    const [user, setUser] = useState<user>();

    const storage = localStorage.getItem('lg');

    const [changingPass, setChangingPass] = useState(false);
    const [changingDesc, setChangingDesc] = useState(false);
    const [photo, setPhoto] = useState('');
    const [newPass, setNewPass] = useState(user?.password ? user.password : '');
    const [newDesc, setNewDesc] = useState(
        user?.description ? user.description : ''
    );
    const bringProfile = async () => {
        const useru: user = await findById(params.profileof!);
        setUser(useru);
        setNewDesc(useru.description ? useru.description : '');
        setNewPass(useru.password);
        setIsLoading(false);
    };

    const changePassHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPass(e.target.value);
    };

    const changeDescHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDesc(e.target.value);
    };

    const passwordSubmit = () => {
        if (newPass.length > 6) {
            changePassword(newPass, storage!);
            setChangingPass(false);
        } else {
            setNewPass('');
        }
    };

    const descriptionSubmit = () => {
        if (newDesc.length < 40) {
            changeDescription(newDesc, user!.id);
            setChangingDesc(false);
        }
    };

    const photoSubmit = (e : React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    };

    useEffect(() => {
        bringProfile();
    }, [isLogged]);

    return (
        <div className='container'>
            <Nav />
            {user ? (
                <>
                    <div
                        style={{ borderRadius: '5px' }}
                        className='card border-warning mb-3 mt-5'
                    >
                        <div className='card-header txt mt-1 opacity-50'>
                            {user.email}
                            {isLoading && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        right: 70,
                                        top: -19,
                                        width: '10px',
                                    }}
                                >
                                    <MiniSpinner />
                                </div>
                            )}
                        </div>
                        <div className='card-body'>
                            <h4 className='card-title'>{user.username}</h4>
                            <p className='card-text'>
                                {newDesc
                                    ? newDesc
                                    : 'Write something about yourself!'}
                            </p>
                        </div>
                    </div>
                    {user.username === isLogged?.username && (
                        <>
                            {!changingPass && (
                                <button
                                    onClick={() => setChangingPass(true)}
                                    className='btn btn-warning m-1'
                                >
                                    Change password
                                </button>
                            )}
                            &nbsp;
                            {!changingDesc && (
                                <button
                                    onClick={() => setChangingDesc(true)}
                                    className='btn btn-primary m-1'
                                >
                                    Edit description
                                </button>
                            )}
                            &nbsp;
                            <div className='form-group m-1'>
                                <label
                                    htmlFor='formFile'
                                    className='form-label mt-4'
                                >
                                    Change your profile photo!
                                </label>
                                <input
                                    onChange={(e)=>photoSubmit(e)}
                                    className='form-control'
                                    type='file'
                                    id='formFile'
                                />
                                <button
                                    className='btn btn-info mt-2'
                                >
                                    Upload
                                </button>
                            </div>
                        </>
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
                </>
            )}
            {changingDesc && (
                <>
                    <div className='form-group has-danger'>
                        <label className='form-label mt-4' htmlFor='inputValid'>
                            Enter your new description
                        </label>
                        <textarea
                            placeholder='Feel free to introduce yourself..'
                            className={`form-control ${
                                newDesc.length < 5 ? '' : 'is-valid'
                            }`}
                            id='inputInvalid'
                            rows={2}
                            value={newDesc}
                            onChange={(e) => changeDescHandler(e)}
                        ></textarea>
                        <div className='valid-feedback'>That looks nice!</div>
                        <button
                            disabled={newDesc.length < 5 ? true : false}
                            className='btn btn-primary mt-2 text-dark'
                            onClick={descriptionSubmit}
                        >
                            Done
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
