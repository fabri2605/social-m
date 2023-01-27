import { useContext } from 'react';
import { PublicationsContext } from '../../context/PublicationsContext';
export const Publications = () => {
    const { publications } = useContext(PublicationsContext);

    return (
        <>
            {publications.forEach((e) => {
                return (
                    <div className='alert alert-dismissible alert-light'>
                        {e.txt}
                    </div>
                );
            })}
        </>
    );
};
