import { useContext } from 'react';
import { UserContext, avatar } from '../../context/UserContext';
import styles from './Style.module.css';
export const ModalAvatars = ({
    userId,
    changeHan,
}: {
    userId: string;
    changeHan: (avatar: avatar, id: string) => void;
}) => {
    const { avatars  } = useContext(UserContext);

    return (
        <div
            className='modal fade'
            id='exampleModal'
            tabIndex={-1}
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='exampleModalLabel'>
                            Select your avatar
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                            id='avatarsModal'
                        ></button>
                    </div>
                    <div className='modal-body pt-2'>
                        <div className={styles.avatarprof}>
                            {avatars.map((a) => {
                                return (
                                    <img
                                        key={a.name}
                                        alt='avatar'
                                        className={styles.avatar__imageprof}
                                        src={a.url}
                                        onClick={() => changeHan(a, userId)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            data-bs-dismiss='modal'
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
