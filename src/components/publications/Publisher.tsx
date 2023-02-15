import { useState, useContext } from 'react';
import { PublicationsContext } from '../../context/PublicationsContext';
import { UserContext } from '../../context/UserContext';
import { PubLoader } from '../spinner/PubLoader';
export const Publisher = () => {
    const [pub, setPub] = useState('');
    const [error, setError] = useState('');
    const { publish, bringPublications, isPublishing } = useContext(PublicationsContext);
    const { isLogged } = useContext(UserContext);

    const changePubHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPub(e.target.value);
    };

    const submitHandler = () => {
        if (pub.length < 10) {
            setError('Your publication must be longer!');
        } else if (pub.length > 60) {
            setError('Your publication must be shorter!');
        } else {
            setError('');
            publish(pub, isLogged?.username!);
            bringPublications();
            setPub('');
        }
    };

    return (
        <div className='form-group'>
            <label htmlFor='exampleTextarea' className='form-label'>
                Write some announcement!
            </label>
            <textarea
                placeholder='Feel free to introduce yourself..'
                className='form-control'
                id='exampleTextarea'
                rows={2}
                value={pub}
                onChange={(e) => changePubHandler(e)}
            ></textarea>
            {error && <p className='text-danger m-0'>{error}</p>}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <button
                    onClick={submitHandler}
                    className='btn btn-dark mt-3'
                >
                    Publish
                </button>
                {isPublishing && (
                    <div style={{ marginRight: window.innerWidth/3, marginTop: '16px' }}>
                        <PubLoader />
                    </div>
                )}
            </div>
        </div>
    );
};
