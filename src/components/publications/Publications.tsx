import { useContext, useState } from 'react';
import {
    PublicationsContext,
    publication,
} from '../../context/PublicationsContext';
import { UserContext } from '../../context/UserContext';
import { SinglePub } from './SinglePub';
export const Publications = () => {
    const { publications, upvotingPub } = useContext(PublicationsContext);
    const { isLogged } = useContext(UserContext);

    const upvoteRequest = (pub: publication) => {
        let work = true;
        pub.upvotes.forEach((user) => {
            if (user.username === isLogged?.username) {
                upvotingPub(pub, isLogged, false);
                work = false;
            }
        });
        if (work) upvotingPub(pub, isLogged!, true);
    };

    return (
        <>
            <h2 className='mt-3 mb-3'>Publications</h2>
            <div className='list-group'>
                {publications && publications.length > 0 ? (
                    publications.map((e) => {
                        
                        return (
                            <SinglePub key={e.date + e.username} e={e} upvoteRequest={(p)=>upvoteRequest(p)}  />
                        );
                    })
                ) : (
                    <p className='txt txt-danger'>
                        There are no publications in the database!
                    </p>
                )}
            </div>
        </>
    );
};
