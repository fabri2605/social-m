import { useContext } from 'react';
import { PublicationsContext } from '../../context/PublicationsContext';
export const Publications = () => {
    const { publications } = useContext(PublicationsContext);

    return (
        <>
            <h2 className='mt-3 mb-3'>Publications</h2>
            {publications.length > 0 ? (
                publications.forEach((e) => {
                    return (
                        <div className='alert alert-dismissible alert-light'>
                            <p>{e.txt}</p>
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
