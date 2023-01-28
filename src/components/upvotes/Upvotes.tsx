import { useParams } from 'react-router-dom';
import { Nav } from '../navbar/Nav';
import { useContext } from 'react';
import { PublicationsContext } from '../../context/PublicationsContext';

export const Upvotes = () => {
    const { publications } = useContext(PublicationsContext);
    const { pubId } = useParams();

    const upvotes = publications.find((p)=>p.id===pubId)?.upvotes;
    console.log(upvotes);
    return (
        <div
            className='modal fade'
            id='exampleModalCenter'
            tabIndex={-1}
            role='dialog'
            aria-labelledby='exampleModalCenterTitle'
            aria-hidden='true'
        >
            <div className='modal-dialog modal-dialog-centered' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='exampleModalLongTitle'>
                            Modal title
                        </h5>
                        <button
                            type='button'
                            className='close'
                            data-dismiss='modal'
                            aria-label='Close'
                        >
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div className='modal-body'>...</div>
                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            data-dismiss='modal'
                        >
                            Close
                        </button>
                        <button type='button' className='btn btn-primary'>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
