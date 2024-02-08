import { Outlet } from 'react-router-dom';
import { UIOptions } from './components/UI_customisation/UIOptions';
import { Header } from './components/header/Header';
import { useTheme } from './helpers/hooks';

export function App() {
    const [theme, setTheme] = useTheme();

    return (
        <>
            <Header />
            <Outlet />
            <UIOptions theme={theme} setTheme={setTheme} />
        </>
    );
}
