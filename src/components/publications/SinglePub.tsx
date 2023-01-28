import {
    publication,
    PublicationsContext,
} from '../../context/PublicationsContext';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Upvotes } from '../upvotes/Upvotes';
interface Props {
    e: publication;
    upvoteRequest: (e: publication) => void;
}

export const SinglePub = ({ e, upvoteRequest }: Props) => {
    const { isLogged, users } = useContext(UserContext);
    const { setIsPubLoading, isPubLoading, deletingPub } =
        useContext(PublicationsContext);

    const navigate = useNavigate();

    let found = e.upvotes.find((e) => e.username === isLogged?.username);

    const [showingUpvotes, setShowingUpvotes] = useState(false);

    const auxSecs = Number(e.date.toLocaleString().substring(18, 28));
    const auxDate = new Date(auxSecs * 1000);
    const relDate = auxDate.toDateString();

    const upvoteReqHandler = () => {
        setIsPubLoading(e.id);
        upvoteRequest(e);
    };

    const removeReqHandler = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then(() => deletingPub(e));
            }
        });
    };

    const goToProfile = () => {
        const propietary = users.find((u) => u.username === e.username);
        navigate(`/profile/${propietary?.id}`);
    };

    const goToUpvotes = () => {
        setShowingUpvotes(true);
    };

    return (
        <div
            className='card border-primary mb-3'
            style={{ borderRadius: '10px' }}
            key={e.date.toString() + e.username}
        >
            <div className='card-header d-flex justify-content-between pb-1'>
                <h6
                    style={{ cursor: 'pointer' }}
                    className='txt mt-1'
                    onClick={goToProfile}
                >
                    {e.username}
                </h6>
                <h6 className='txt mt-1 opacity-50' style={{ cursor: 'none' }}>
                    {relDate}
                </h6>
                {isPubLoading === e.id && (
                    <div
                        className='spinner-grow text-primary position-absolute'
                        role='status'
                        style={{ right: '25px' }}
                    >
                        <span className='sr-only'></span>
                    </div>
                )}
                <div className='d-flex justify-content-around'>
                    &nbsp;
                    {isLogged?.username === e.username && (
                        <i
                            onClick={removeReqHandler}
                            className={`material-icons ${
                                true && 'text-danger'
                            }`}
                            style={{ cursor: 'pointer', marginTop: '2px' }}
                        >
                            delete_forever
                        </i>
                    )}
                    &nbsp;
                    <i
                        onClick={upvoteReqHandler}
                        className={`material-icons ${found && 'text-success'}`}
                        style={{ cursor: 'pointer', marginTop: '1px' }}
                    >
                        arrow_upward
                    </i>
                    &nbsp;
                    <button
                        type='button'
                        className='txt opacity-50'
                        data-bs-toggle='modal'
                        data-bs-target={`#${e.id}`}
                        style={{border: 'none', backgroundColor:'rgba(255, 255, 255, 0)'}}
                    >
                        {e.upvotes.length}
                    </button>
                </div>
            </div>
            <Upvotes pubId={e.id} />
            <div className='card-body'>
                {e.title && <h4 className='card-title'>{e.title}</h4>}
                <p className='card-text'>{e.txt}</p>
            </div>
        </div>
    );
};
