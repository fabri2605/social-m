import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { UserCtxProvider } from './context/UserContext';

import { Login } from './components/login/Login';
import { Home } from './components/Home';

import './firebase';
import 'bootswatch/dist/superhero/bootstrap.min.css';
import { Error } from './components/Error';
import { useContext } from 'react';
import { Profile } from './components/profile/Profile';
import { PublicationsProvider } from './context/PublicationsContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
        /* children: [{path: 'contacts/:contactsId'}] */
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: '/profile/:profileof',
        element: <Profile />,
        errorElement: <Error />,
    },
    {
        path: '/error',
        element: <Error />,
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <UserCtxProvider>
            <PublicationsProvider>
                <RouterProvider router={router} />
            </PublicationsProvider>
        </UserCtxProvider>
    </React.StrictMode>
);
