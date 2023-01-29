import { useContext, useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { UserContext, user, avatar } from '../../context/UserContext';

import { Nav } from '../navbar/Nav';
import { Publications } from '../publications/Publications';
import { MiniSpinner } from '../spinner/MiniSpinner';
import { Spinner } from '../spinner/Spinner';
import { ModalAvatars } from './ModalAvatars';

import styles from './Style.module.css';

export const Profile = () => {
    const {
        isLogged,
        changePassword,
        findById,
        changeDescription,
        isLoading,
        setIsLoading,
        avatars,
        logById,
        changeAvatar
    } = useContext(UserContext);
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<user>();

    const storage = localStorage.getItem('lg');

    const [changingPass, setChangingPass] = useState(false);
    const [changingDesc, setChangingDesc] = useState(false);

    const [newPass, setNewPass] = useState(user?.password ? user.password : '');
    const [newDesc, setNewDesc] = useState(
        user?.description ? user.description : ''
    );
    const [avatar, setAvatar] = useState('');

    const bringProfile = /* useCallback( */ async () => {
        console.log('bring')
        const storage = localStorage.getItem('lg');
        if(storage){
            logById(storage);
        }else{
            navigate('/login');
        }
        const dbuser: user = await findById(params.profileof!);
        setUser(dbuser);
        setNewPass(dbuser?.password ? dbuser.password : '');
        setNewDesc(dbuser?.description ? dbuser.description : '');
        setAvatar(dbuser.avatar ? dbuser.avatar.url : avatars[0].url);
        setIsLoading(false);
    }/* ,[user?.username]) */;

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


    const changeAvatarHan = (avatar : avatar, id : string) => {
        changeAvatar(avatar, id);
        setUser({...user!, avatar});
        Swal.fire('All good!', 'Avatar changed correctly!', 'success');
        document.getElementById("avatarsModal")!.click();
    };

    const isProp = user?.username === isLogged?.username;

    useEffect(() => {
        bringProfile();
    }, [isLogged?.username, isLogged?.description, isLogged?.avatar]);

    return (
        <div className='container'>
            <Nav />
            {user ? (
                <>
                    <h3 className='opacity-50'>
                        {isProp && 'Welcome to your profile!'}
                    </h3>
                    <div
                        style={{ borderRadius: '5px' }}
                        className='card border-warning mb-3 mt-3'
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
                        {/* 
                        
                        AVATAR
                        
                        */}
                        <div className='card-body'>
                            <div className={styles.avatarcont}>
                                <h4 className='card-title'>{user.username}</h4>
                                <div className={styles.avatar}>
                                    <img
                                        className={styles.avatar__image}
                                        src={avatar}
                                        alt='avatar'
                                    />
                                </div>
                                {isProp && (
                                    <>
                                        <button
                                            type='button'
                                            className='btn btn-success m-1'
                                            data-bs-toggle='modal'
                                            data-bs-target='#exampleModal'
                                        >
                                            Chose avatar
                                        </button>
                                        <ModalAvatars changeHan={changeAvatarHan} userId={user.id} key={'pro'} />
                                    </>
                                )}
                            </div>
                            <p className='card-text'>
                                {newDesc
                                    ? newDesc
                                    : isProp
                                    ? 'Write something about yourself!'
                                    : `${user.username} doesnt have a description yet..`}
                            </p>
                        </div>
                    </div>
                    {isProp && (
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
                        </>
                    )}
                </>
            ) : (
                <Spinner />
            )}
            {changingPass && (
                <>
                    <div className='form-group has-danger mb-3'>
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
                            className='btn btn-warning mt-2 text-white'
                            onClick={passwordSubmit}
                        >
                            Done
                        </button>
                    </div>
                </>
            )}
            {changingDesc && (
                <>
                    <div className='form-group has-danger mb-3'>
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
                            className='btn btn-primary mt-2 text-white'
                            onClick={descriptionSubmit}
                        >
                            Done
                        </button>
                    </div>
                </>
            )}
            <Publications filterByUser={user?.username ? user.username : ''} />
        </div>
    );
};
