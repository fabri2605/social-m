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

export interface user {
    username: string;
    email: string;
    password: string;
    age?: number;
}

interface usersInterface {
    users: user[];
    bringData: () => void;
    registerUser: (user: user) => void;
    loginUser: (user: user) => void;
    logById: (id: string) => void;
    isLogged: user | null;
    logoutUser: () => void;
    isLoading: boolean;
    setIsLoading: (b: boolean) => void;
    changePassword: (pass: string, id: string)=>void;
}

export const UserContext = createContext({} as usersInterface);

export const UserCtxProvider = ({ children }: any) => {
    const [users, setUsers] = useState<user[]>([]);
    const [isLogged, setIsLogged] = useState<user | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const bringData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            let usefuls: any = [];
            querySnapshot.forEach((doc) => {
                usefuls.push(doc.data());
            });
            setUsers(usefuls);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const registerUser = async (user: user) => {
        try {
            const docRef = await addDoc(collection(db, 'users'), user);
            localStorage.setItem('lg', docRef.id);
            bringData();
            setIsLogged(user);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const logoutUser = () => {
        setIsLogged(null);
        localStorage.removeItem('lg');
    };

    const loginUser = async (user: user) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            querySnapshot.forEach((doc) => {
                if (doc.data().username === user.username) {
                    localStorage.setItem('lg', doc.id);
                }
            });
        } catch (e) {
            console.error('Error adding document: ', e);
        }

        setIsLogged(user);
        window.location.href = '/';
    };

    const logById = async (id: string) => {
        try {
            const docRef = doc(db, 'users', id);
            const docSnap: any = await getDoc(docRef);
            setIsLogged(docSnap.data());
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const changePassword = async (password: string, id: string) => {
        try {
            setIsLoading(true);
            await updateDoc(doc(db, 'users', id), {
                ...isLogged,
                password,
            });
            bringData();
            setIsLoading(false);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    useEffect(() => {
        bringData();
    }, []);

    return (
        <UserContext.Provider
            value={{
                users,
                registerUser,
                bringData,
                isLogged,
                loginUser,
                logById,
                logoutUser,
                isLoading,
                setIsLoading,
                changePassword
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
