import { user } from '../../context/UserContext';

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
                <h4
                    className='card-title'
                    style={{ cursor: 'pointer' }}
                    onClick={() => goToProfile(u)}
                >
                    {u.username}
                </h4>
                <p className='card-text'>
                    {u.description
                        ? u.description
                        : 'This user has not completed his description!'}
                </p>
            </div>
        </div>
    );
};
