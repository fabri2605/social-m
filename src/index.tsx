import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/Login';
import reportWebVitals from './reportWebVitals';

import {
    ActionFunction,
    createBrowserRouter,
    LoaderFunction,
    RouterProvider,
    ShouldRevalidateFunction,
} from 'react-router-dom';
import { Home } from './components/Home';
import Register from './components/Register';

interface RouteObject {
    path?: string;
    index?: boolean;
    children?: React.ReactNode;
    caseSensitive?: boolean;
    id?: string;
    loader?: LoaderFunction;
    action?: ActionFunction;
    element?: React.ReactNode | null;
    errorElement?: React.ReactNode | null;
    shouldRevalidate?: ShouldRevalidateFunction;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <div>Error!</div>,
        /* children: [{path: 'contacts/:contactsId'}] */
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <div>Error!</div>,
        /* children: [{path: 'contacts/:contactsId'}] */
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <div>Error!</div>,
        /* children: [{path: 'contacts/:contactsId'}] */
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
