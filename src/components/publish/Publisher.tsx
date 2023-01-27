import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
export const Publisher = () => {
    const [pub, setPub] = useState('');
    const {} = useContext(UserContext);

    const changePubHandler = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setPub(e.target.value);
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
                rows={3}
                value={pub}
                onChange={(e)=>changePubHandler(e)}
            ></textarea>
            <button className='btn btn-primary mt-3'>Publish</button>
        </div>
    );
};
