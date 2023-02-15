import { useContext, useState } from 'react';
import {
    PublicationsContext,
    publication,
} from '../../context/PublicationsContext';
import { UserContext } from '../../context/UserContext';
import { People } from '../people/People';
import { MiniSpinner } from '../spinner/MiniSpinner';
import { SinglePub } from './SinglePub';

export const Publications = ({ filterByUser }: { filterByUser: string }) => {
    const { publications, upvotingPub } = useContext(PublicationsContext);
    const { isLogged } = useContext(UserContext);
    const [sorting, setSorting] = useState({
        new: true,
        old: false,
        meet: false,
    });

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

    const toggleButtons = (sortBy: 'new' | 'old' | 'meet') => {
        let sortings = { new: false, old: false, meet: false };
        setSorting({ ...sortings, [sortBy]: true });
    };

    const sortFunc = () => {
        if (sorting.new)
            return (a: publication, b: publication) =>
                Number(b.date.toLocaleString().substring(18, 28)) -
                Number(a.date.toLocaleString().substring(18, 28));
        return (a: publication, b: publication) =>
            Number(a.date.toLocaleString().substring(18, 28)) -
            Number(b.date.toLocaleString().substring(18, 28));
    };

    return (
        <>
            {filterByUser &&
                (publications.filter((e) => e.username === filterByUser)
                    .length === 0 ? (
                    <p style={{ textAlign: 'center', marginTop: '10px' }}>
                        Hasnt published anything yet..
                    </p>
                ) : (
                    <p style={{ marginTop: '10px' }}>History</p>
                ))}
            {!filterByUser && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '15px',
                        marginBottom: '15px',
                        marginLeft: '5px',
                    }}
                >
                    <div>
                        <h2 className='mt-2'>Feed</h2>
                    </div>
                    <div
                        className='btn-group'
                        role='group'
                        aria-label='Basic radio toggle button group'
                        style={{ alignItems: 'center' }}
                    >
                        <input
                            onChange={() => toggleButtons('new')}
                            type='radio'
                            className='btn-check'
                            name='btnradio'
                            id='btnradio1'
                            checked={sorting.new}
                        />
                        <label
                            className='btn btn-outline-success  p-2'
                            htmlFor='btnradio1'
                        >   
                            &nbsp;
                            Newest
                        </label>
                        <input
                            onChange={() => toggleButtons('old')}
                            type='radio'
                            className='btn-check'
                            name='btnradio'
                            id='btnradio2'
                            checked={sorting.old}
                        />
                        <label
                            className='btn btn-outline-danger  p-2'
                            htmlFor='btnradio2'
                        >
                            Oldest
                        </label>
                        <input
                            onChange={() => toggleButtons('meet')}
                            type='radio'
                            className='btn-check'
                            name='btnradio'
                            id='btnradio3'
                            checked={sorting.meet}
                        />
                        <label
                            className='btn btn-outline-info p-2'
                            htmlFor='btnradio3'
                        >
                            Meet
                            &nbsp;
                        </label>
                    </div>
                </div>
            )}

            {sorting.meet ? (
                <People />
            ) : (
                <div
                    style={{ backgroundColor: '#ffffff00', boxShadow: 'none' }}
                    className={`list-group`}
                >
                    {publications.length > 0 ? (
                        publications.sort(sortFunc()).map((e) => {
                            if (filterByUser) {
                                return (
                                    e.username === filterByUser && (
                                        <SinglePub
                                            key={e.date + e.username}
                                            e={e}
                                            upvoteRequest={(p) =>
                                                upvoteRequest(p)
                                            }
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
            )}
        </>
    );
};
