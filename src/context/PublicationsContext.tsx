import { createContext, useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
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
    upvotingPub: (pub: publication, user: user, b: boolean) => void;
    deletingPub: (pub: publication) => void;
    setIsPubLoading: React.Dispatch<React.SetStateAction<string>>;
    isPubLoading: string;
}

export const PublicationsContext = createContext({} as publicationsInterface);

export const PublicationsProvider = ({ children }: any) => {
    const [publications, setPublications] = useState<publication[]>([]);
    const [isPubLoading, setIsPubLoading] = useState('');

    const publish = async (txt: string, username: string) => {
        try {
            const date = new Date();
            const docRef = await addDoc(collection(db, 'publications'), {
                id: 1,
            });
            await updateDoc(doc(db, 'publications', docRef.id), {
                txt,
                username,
                date,
                upvotes: [],
                id: docRef.id,
            });
            bringPublications();
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
            usefuls = usefuls.sort(
                (a: publication, b: publication) =>
                    Number(b.date.toLocaleString().substring(18, 28)) -
                    Number(a.date.toLocaleString().substring(18, 28))
            );
            setPublications(usefuls);
        } catch (e) {
            console.error('Error bringing info: ', e);
        }
    };

    const upvotingPub = async (
        pub: publication,
        user: user,
        up: boolean = true
    ) => {
        let upvotes = [...pub.upvotes];
        if (up) {
            upvotes.push(user);
        } else {
            upvotes = upvotes.filter((e) => e.username !== user.username);
        }
        try {
            await updateDoc(doc(db, 'publications', pub.id), {
                ...pub,
                upvotes,
            });
            bringPublications();
            setIsPubLoading('');
        } catch (e) {
            console.log(e);
        }
    };

    const deletingPub = async (pub: publication) => {
        try {
            await deleteDoc(doc(db, 'publications', pub.id));
            bringPublications();
            setIsPubLoading('');
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        bringPublications();
    }, []);

    return (
        <PublicationsContext.Provider
            value={{
                publish,
                publications,
                bringPublications,
                upvotingPub,
                setIsPubLoading,
                isPubLoading,
                deletingPub,
            }}
        >
            {children}
        </PublicationsContext.Provider>
    );
};
