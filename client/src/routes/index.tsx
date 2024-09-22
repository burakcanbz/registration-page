import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import React from "react";
import Login from '../pages/Login';
import { Signup } from "../pages/Signup";
import { Nopage } from "../pages/Nopage";

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
                path: '/*',
                element: <Nopage/>
            }
        ]
    },
])

export default router;