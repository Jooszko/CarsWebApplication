import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import CarList from "../Components/CarList";
import CarDetails from "../Components/CarDetails";
import CarForm from "../Components/CarForm";
import NotFound from "../NotFound";
import CarAdd from "../Components/CarAdd";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {path: 'cars', element: <CarList />},
            // :id jest tzw 'root parameter', który należy odebrać w <CarDetails />
            // używamy do tego useParams
            {path: 'cars/:id', element: <CarDetails />},
            {path: 'edit/:id', element: <CarForm />},
            {path: 'add', element: <CarAdd />},
            {path: 'not-found', element: <NotFound />},
            // za każdym razem jak będzie niepoprawny adres url odeśle nas do <NotFound />
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
]

export const router = createBrowserRouter(routes);