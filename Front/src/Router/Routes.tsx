import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import CarList from "../Components/CarList";
import CarDetails from "../Components/CarDetails";
import CarForm from "../Components/CarForm";
import NotFound from "../NotFound";
import CarAdd from "../Components/CarAdd";
import LoginForm from "../Components/LoginForm"; 
import RegisterForm from "../Components/RegisterForm";
import RequireAuth from "./RequireAuth"; 

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Navigate replace to='/cars' /> },


            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },


            {
                element: <RequireAuth />,
                children: [
                    { path: 'cars', element: <CarList /> },
                    { path: 'cars/:id', element: <CarDetails /> },
                    { path: 'edit/:id', element: <CarForm /> },
                    { path: 'add', element: <CarAdd /> },
                ]
            },

            { path: 'not-found', element: <NotFound /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
]

export const router = createBrowserRouter(routes);