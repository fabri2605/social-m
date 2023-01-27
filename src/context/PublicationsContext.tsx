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

export interface publication {
    txt: string;
    id: string;
}

interface publicationsInterface {
    publish: (txt: string, id: string) => void;
    publications: publication[];
    bringPublications: ()=> void;
}

export const PublicationsContext = createContext({} as publicationsInterface);

export const PublicationsProvider = ({ children }: any) => {
    const [publications, setPublications] = useState<publication[]>([]);

    const publish = async (txt: string, id: string) => {
        try {
            await addDoc(collection(db, 'publications'), { txt, id });
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

    return (
        <PublicationsContext.Provider value={{ publish, publications, bringPublications }}>
            {children}
        </PublicationsContext.Provider>
    );
};
