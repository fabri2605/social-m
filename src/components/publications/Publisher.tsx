import { useState, useContext } from 'react';
import { PublicationsContext } from '../../context/PublicationsContext';
export const Publisher = () => {
    const [pub, setPub] = useState('');
    const [error, setError] = useState('');
    const { publish, bringPublications } = useContext(PublicationsContext);
    const userId = localStorage.getItem('lg');

    const changePubHandler = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setPub(e.target.value);
    };

    const submitHandler = () => {
        if(pub.length < 10){
            setError('Your publication must be longer!');
        }else{
            setError('');
            publish(pub, userId!);
            bringPublications();
            setPub('')
        }
    };

    return (
        <div className='form-group'>
            <label htmlFor='exampleTextarea' className='form-label mt-4'>
                Write some announcement!
            </label>
            <textarea
                placeholder='Feel free to introduce yourself..'
                className='form-control'
                id='exampleTextarea'
                rows={2}
                value={pub}
                onChange={(e)=>changePubHandler(e)}
            ></textarea>
            {error && <p className='text-danger m-0'>{error}</p>}
            <button onClick={submitHandler} className='btn btn-primary mt-3'>Publish</button>
        </div>
    );
};
