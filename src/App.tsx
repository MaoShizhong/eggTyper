import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';
import { ThemePicker } from './components/theme_picker/ThemePicker';
import { useTheme } from './helpers/hooks';

export function App() {
    const [theme, setTheme] = useTheme();

    return (
        <>
            <Header />
            <Outlet />
            <ThemePicker
                currentTheme={theme}
                setTheme={setTheme}
            />
        </>
    );
}
