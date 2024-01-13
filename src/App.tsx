import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';

export function App() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
