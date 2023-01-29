import { user } from '../../context/UserContext';
import styles from './Style.module.css';
import avatarDefault from '../../assets/avatar.png';

interface Props {
    u: user;
    goToProfile: (e: user) => void;
}

export const Person = ({ u, goToProfile }: Props) => {
    return (
        <div
            key={u.username}
            className={`card ${
                u.username === 'leko' ? 'border-warning' : 'border-info'
            } mb-3`}
            style={{ margin: '20px' }}
        >
            <div className='card-header'>{u.email}</div>
            <div className='card-body pt-1'>
                <div className={styles.avatarcont}>
                <div className={styles.avatar}>
                        <img
                            alt='avatar'
                        onClick={() => goToProfile(u)}
                            className={styles.avatar__image}
                            src={
                                u?.avatar
                                    ? u?.avatar.url
                                    : avatarDefault
                            }
                        />
                    </div>
                    <h4
                        className='card-title mb-0'
                        style={{ cursor: 'pointer' }}
                        onClick={() => goToProfile(u)}
                    >
                        {u.username}
                    </h4>
                </div>
                <p className='card-text'>
                    {u.description
                        ? u.description
                        : 'This user has not completed his description!'}
                </p>
            </div>
        </div>
    );
};
