import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';
import { CorrectnessColourPicker } from './components/theme_picker/CorrectnessColourPicker';
import { ThemePicker } from './components/theme_picker/ThemePicker';
import { useTheme } from './helpers/hooks';

export function App() {
    const [theme, setTheme] = useTheme();

    return (
        <>
            <Header />
            <Outlet />
            <CorrectnessColourPicker correctness="correct" theme={theme} />
            <CorrectnessColourPicker correctness="wrong" theme={theme} />
            <ThemePicker currentTheme={theme} setTheme={setTheme} />
        </>
    );
}
