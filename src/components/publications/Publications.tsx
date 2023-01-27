import { useContext } from 'react';
import { PublicationsContext, publication } from '../../context/PublicationsContext';
import { UserContext } from '../../context/UserContext';
export const Publications = () => {
    const { publications, upvotingPub } = useContext(PublicationsContext);
    const { isLogged } = useContext(UserContext);

    const upvoteRequest = (pub : publication) => {
        pub.upvotes.forEach((user)=>{
            if(user.username === isLogged?.username){
                upvotingPub(pub, isLogged, 2);
                return;
            }
        });
        upvotingPub(pub, isLogged!, 1);
    };

    return (
        <>
            <h2 className='mt-3 mb-3'>Publications</h2>
            <div className='list-group'>
                {publications.length > 0 ? (
                    publications.map((e) => {
                        return (
                            <div
                                className='card border-primary mb-3'
                                style={{ maxWidth: '20rem' }}
                                key={e.txt + e.username}
                            >
                                <div className='card-header d-flex justify-content-between'>
                                    <h6 className='txt mt-1'>{e.username}</h6>
                                    <div className='d-flex justify-content-around'>
                                        <i
                                            onClick={() => {upvoteRequest(e)}}
                                            className='material-icons'
                                            style={{cursor: 'pointer'}}
                                        >
                                            arrow_upward
                                        </i>
                                        &nbsp;
                                        <h6 className='txt mt-1'>
                                            {e.upvotes.length}
                                        </h6>
                                    </div>
                                </div>
                                <div className='card-body'>
                                    {e.title && (
                                        <h4 className='card-title'>
                                            {e.title}
                                        </h4>
                                    )}
                                    <p className='card-text'>{e.txt}</p>
                                </div>
                            </div>
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
