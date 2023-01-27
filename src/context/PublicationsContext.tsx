import { createContext, useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { user } from './UserContext';

export interface publication {
    txt: string;
    username: string;
    date: Date;
    upvotes: user[];
    id: string;
    title?: string;
}

interface publicationsInterface {
    publish: (txt: string, id: string) => void;
    publications: publication[];
    bringPublications: () => void;
    upvotingPub : (pub: publication, user: user, num: 1 | 2)=> void;
}

export const PublicationsContext = createContext({} as publicationsInterface);

export const PublicationsProvider = ({ children }: any) => {
    const [publications, setPublications] = useState<publication[]>([]);

    const publish = async (txt: string, username: string) => {
        try {
            const date = new Date();
            /* reading: date.toDateString(); */
            const docRef = await addDoc(collection(db, 'publications'), { id : 1});
            await updateDoc(doc(db, 'publications', docRef.id), {
                txt,
                username,
                date,
                upvotes: [],
                id : docRef.id,
            });
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const bringPublications = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'publications'));
            let usefuls: any = [];
            querySnapshot.forEach((doc) => {
                usefuls.push(doc.data());
            });
            setPublications(usefuls);
        } catch (e) {
            console.error('Error bringing info: ', e);
        }
    };

    const upvotingPub = async (pub: publication, user: user, num : 1 | 2) => {
        try{
            await updateDoc(doc(db, 'publications', pub.id), {
                ...pub, 
            });

        } catch (e){

        }
    };

    useEffect(() => {
        bringPublications();
    }, []);

    return (
        <PublicationsContext.Provider
            value={{ publish, publications, bringPublications, upvotingPub }}
        >
            {children}
        </PublicationsContext.Provider>
    );
};
