import { useContext } from 'react';
import { PublicationsContext } from '../../context/PublicationsContext';
export const Publications = () => {
    const { publications } = useContext(PublicationsContext);

    return (
        <>
            <h2 className='mt-3 mb-3'>Publications</h2>
            {publications.length > 0 ? (
                publications.map((e) => {
                    return (
                        <div
                        className='card border-primary mb-3'
                            style={{maxWidth: '20rem'}}
                        >
                            <div className='card-header'>{e.username}</div>
                            <div className='card-body'>
                                {e.title && <h4 className='card-title'>{e.title}</h4>}
                                <p className='card-text'>
                                    {e.txt}
                                </p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className='txt txt-danger'>
                    There are no publications in the database!
                </p>
            )}
        </>
    );
};
