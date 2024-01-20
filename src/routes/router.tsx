import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { Profile } from '../pages/Profile';
import { TestPage } from '../pages/TestPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '/signup', element: <Profile /> }, // ! change el when created
            { path: '/login', element: <Profile /> }, // ! change el when created
            { path: '/:username', element: <Profile /> },
        ],
    },
]);
