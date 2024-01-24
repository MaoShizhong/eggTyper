import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';
import { useTheme } from './helpers/hooks';
import { ThemeName } from './helpers/themes';

const DEFAULT_THEME: ThemeName = 'Cappuccino';

export function App() {
    const [theme, setTheme] = useTheme(DEFAULT_THEME);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
