import { useContext } from 'react';
import { PublicationsContext } from '../../context/PublicationsContext';

export const Upvotes = ({ pubId }: { pubId: string }) => {
    const { publications } = useContext(PublicationsContext);

    const pub = publications.find((p) => p?.id === pubId);

    return (
        <div
            className='modal fade'
            id={`${pub?.id}`}
            tabIndex={-1}
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='exampleModalLabel'>
                            Upvotes
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        ></button>
                    </div>
                    <div className='modal-body'>
                        {pub && (
                            <table
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: '10px',
                                }}
                                className='table table-hover'
                            >
                                <thead>
                                    <tr>
                                        <th scope='col'>State</th>
                                        <th scope='col'>User</th>
                                        <th scope='col'>Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pub.upvotes?.map((u) => {
                                        return (
                                            <tr
                                                key={u?.id + pub.id}
                                                className='table-active'
                                            >
                                                <th scope='row'>Active</th>
                                                <td>{u?.username}</td>
                                                <td>{u?.id.substring(0, 5)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-primary'
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
