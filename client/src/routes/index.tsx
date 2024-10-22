import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Login from '../pages/Login/Login';
import { Signup } from "../pages/Signup/Signup";
import { Nopage } from "../pages/Nopage";
import { User } from "../pages/User";
import  Logout  from "../pages/Logout/Logout";

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
                path: '/logout',
                element: <Logout/>
            },
            {
                path: '/*',
                element: <Nopage/>
            },
        ]
    },
])

export default router;