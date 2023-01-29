import { useContext } from 'react';
import {
    PublicationsContext,
    publication,
} from '../../context/PublicationsContext';
import { UserContext } from '../../context/UserContext';
import { MiniSpinner } from '../spinner/MiniSpinner';
import { SinglePub } from './SinglePub';

export const Publications = ({ filterByUser }: { filterByUser: string }) => {
    const { publications, upvotingPub } =
        useContext(PublicationsContext);
    const { isLogged } = useContext(UserContext);
    const upvoteRequest = (pub: publication) => {
        let work = true;
        pub.upvotes.forEach((user) => {
            if (user?.username === isLogged?.username) {
                upvotingPub(pub, isLogged, false);
                work = false;
            }
        });
        if (work) upvotingPub(pub, isLogged!, true);
    };

    return (
        <>
            {filterByUser && publications.filter((e) => e.username === filterByUser).length ===
                0 ? (
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Hasnt published anything yet..
                </p> ): <p style={{marginTop: '10px' }}>History</p>
            }
            {!filterByUser && <h2 className='mt-3 mb-3'>Feed</h2>}
            <div className={`list-group`}>
                {publications && publications.length > 0 ? (
                    publications.map((e) => {
                        if (filterByUser) {
                            return (
                                e.username === filterByUser && (
                                    <SinglePub
                                        key={e.date + e.username}
                                        e={e}
                                        upvoteRequest={(p) => upvoteRequest(p)}
                                    />
                                )
                            );
                        } else {
                            return (
                                <SinglePub
                                    key={e.date + e.username}
                                    e={e}
                                    upvoteRequest={(p) => upvoteRequest(p)}
                                />
                            );
                        }
                    })
                ) : (
                    <div className='align-self-center'>
                        <MiniSpinner />
                    </div>
                )}
            </div>
        </>
    );
};
