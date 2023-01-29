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

import avatarOne from '../assets/avatar.png';
import avatarGlass from '../assets/avatarGlass.png';
import avatarWom from '../assets/avatarWom.png';
import avatarRed from '../assets/avatarWomRed.png';
import menGlass from '../assets/menGlass.png';
import womBlond from '../assets/womBlond.png';

export interface avatar {
    url: string;
    name: string;
}
export interface user {
    username: string;
    email: string;
    password: string;
    age?: number;
    id: string;
    avatar?: avatar;
    description?: string;
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
    changePassword: (pass: string, id: string) => void;
    changeDescription: (desc: string, id: string) => void;
    changeAvatar: (av: avatar, id: string) => void;
    findById: (id: string) => Promise<any>;
    avatars: avatar[];
}

export const UserContext = createContext({} as usersInterface);

export const UserCtxProvider = ({ children }: any) => {
    const [users, setUsers] = useState<user[]>([]);
    const [isLogged, setIsLogged] = useState<user | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const avatars: avatar[] = [
        { url: avatarOne, name: 'avatar' },
        { url: avatarGlass, name: 'avatarGlass' },
        { url: menGlass, name: 'menGlass' },
        { url: avatarRed, name: 'avatarRed' },
        { url: avatarWom, name: 'avatarWom' },
        { url: womBlond, name: 'womBlond' },
    ];

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
            const docRef = await addDoc(collection(db, 'users'), { id: '1' });
            localStorage.setItem('lg', docRef.id);
            await updateDoc(doc(db, 'users', docRef.id), {
                ...user,
                id: docRef.id,
            });
            bringData();
            setIsLogged({
                ...user,
                id: docRef.id,
            });
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
            setIsLogged(user);
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

    const findById = async (id: string) => {
        try {
            const docRef = doc(db, 'users', id);
            const docSnap: any = await getDoc(docRef);
            return docSnap.data();
        } catch (e) {
            console.error('Error bringing info: ', e);
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
            console.error('Error editting document: ', e);
        }
    };

    const changeDescription = async (description: string, id: string) => {
        try {
            setIsLoading(true);
            await updateDoc(doc(db, 'users', id), {
                ...isLogged,
                description,
            });
            setIsLogged(await findById(id));
            bringData();
            setIsLoading(false);
        } catch (e) {
            console.error('Error editting document: ', e);
        }
    };

    const changeAvatar = async (avatar: avatar, id: string) => {
        try {
            setIsLoading(true);
            await updateDoc(doc(db, 'users', id), {
                ...isLogged,
                avatar,
            });
            setIsLogged(await findById(id));
            bringData();
            setIsLoading(false);
        } catch (e) {
            console.error('Error editting document: ', e);
        }
    }

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
                changePassword,
                findById,
                changeDescription,
                avatars,
                changeAvatar
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
