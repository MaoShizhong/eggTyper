import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { ComingSoon } from '../pages/ComingSoon';
import { Error404 } from '../pages/Error404';
import { TestPage } from '../pages/TestPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error404 />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '/signup', element: <ComingSoon featureName="Signup" /> }, // ! change el when created
            { path: '/login', element: <ComingSoon featureName="Login" /> }, // ! change el when created
            { path: '/user/:username', element: <ComingSoon featureName="Profile" /> },
        ],
    },
]);
