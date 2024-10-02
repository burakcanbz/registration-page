import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import React from "react";
import Login from '../pages/Login';
import { Signup } from "../pages/Signup";
import { Nopage } from "../pages/Nopage";
import { User } from "../pages/User";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/user',
                element: <User/>
            },
            {
                path: '/*',
                element: <Nopage/>
            }
        ]
    },
])

export default router;