import {
    publication,
    PublicationsContext,
} from '../../context/PublicationsContext';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { MiniSpinner } from '../spinner/MiniSpinner';
interface Props {
    e: publication;
    upvoteRequest: (e: publication) => void;
}

export const SinglePub = ({ e, upvoteRequest }: Props) => {
    const { isLogged } = useContext(UserContext);
    const { setIsPubLoading, isPubLoading } = useContext(PublicationsContext);
    let found = e.upvotes.find((e) => e.username === isLogged?.username);
    const auxSecs = Number(e.date.toLocaleString().substring(18, 28));
    const auxDate = new Date(auxSecs * 1000);
    const relDate = auxDate.toDateString();

    console.log(e.id);

    const upvoteReqHandler = () => {
        setIsPubLoading(e.id);
        upvoteRequest(e);
    };

    return (
        <div
            className='card border-primary mb-3'
            style={{ maxWidth: '20rem', borderRadius: '10px' }}
            key={e.date.toString() + e.username}
        >
            <div className='card-header d-flex justify-content-between'>
                <h6 className='txt mt-1'>{e.username}</h6>
                <h6 className='txt mt-1 opacity-50'>{relDate}</h6>
                {isPubLoading === e.id && (
                    <div
                        className='spinner-grow text-primary position-absolute'
                        role='status'
                        style={{right: '25px'}}
                    >
                        <span className='sr-only'></span>
                    </div>
                )}
                <div className='d-flex justify-content-around'>
                    &nbsp;
                    <i
                        onClick={upvoteReqHandler}
                        className={`material-icons ${found && 'text-success'}`}
                        style={{ cursor: 'pointer', marginTop: '2px' }}
                    >
                        arrow_upward
                    </i>
                    &nbsp;
                    <h6 className='txt mt-1 pl-3'>{e.upvotes.length}</h6>
                </div>
            </div>
            <div className='card-body'>
                {e.title && <h4 className='card-title'>{e.title}</h4>}
                <p className='card-text'>{e.txt}</p>
            </div>
        </div>
    );
};
