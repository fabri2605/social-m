import { createContext, useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface user {
    username: string;
    email: string;
    password: string;
}

interface usersInterface {
    users: user[];
    bringData: () => void;
    registerUser: (user: user) => void;
    loginUser: (user: user) => void;
    findById: (id: string) => Promise< user  | undefined>;
    isLogged: user | null;
    logoutUser: ()=>void;
}

export const UserContext = createContext({} as usersInterface);

export const UserCtxProvider = ({ children }: any) => {
    const [users, setUsers] = useState<user[]>([]);
    const [isLogged, setIsLogged] = useState<user | null>(null);

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

    const registerUser = async ({ email, username, password }: user) => {
        try {
            const user = { email, username, password };
            const docRef = await addDoc(collection(db, 'users'), user);
            console.log(`Document written with ID: ${docRef.id}`);
            localStorage.setItem('lg', docRef.id);
            setIsLogged(user);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const loginUser = async (user : user) => {

        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            querySnapshot.forEach((doc) => {
                if(doc.data().username === user.username){
                    localStorage.setItem('lg', doc.id);
                };
            });
        } catch (e) {
            console.error('Error adding document: ', e);
        }

        setIsLogged(user);
        window.location.href = '/';
    };

    const logoutUser = () => {
        setIsLogged(null);
        localStorage.removeItem('lg');
    };

    const findById = async (id : string) => {
        try {
            const docRef = doc(db, "users", id);
            const docSnap : any = await getDoc(docRef);
            const { email, username, password } = docSnap.data()
            return { email, username, password }
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    useEffect(() => {
        bringData();
    }, []);

    return (
        <UserContext.Provider
            value={{ users, registerUser, bringData, isLogged, loginUser, findById, logoutUser }}
        >
            {children}
        </UserContext.Provider>
    );
};
