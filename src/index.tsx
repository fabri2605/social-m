import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { UserCtxProvider } from './context/UserContext';

import { Login } from './components/login/Login';
import { Home } from './components/Home';

import './firebase';

import 'bootswatch/dist/morph/bootstrap.min.css';

import { Error } from './components/Error';
import { Profile } from './components/profile/Profile';
import { PublicationsProvider } from './context/PublicationsContext';
import { People } from './components/people/People';

import './App.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
        /* children: [{
            path: 'contacts/:contactsId'
        }] */
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
        path: '/people',
        element: <People />,
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
