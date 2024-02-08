import { Outlet } from 'react-router-dom';
import { UIOptions } from './components/UI_customisation/UIOptions';
import { Header } from './components/header/Header';
import { useFontSize, useTheme } from './helpers/hooks';

export function App() {
    const [theme, setTheme] = useTheme();
    const [fontSize, setFontSize] = useFontSize();

    return (
        <>
            <Header />
            <Outlet context={{ fontSize }} />
            <UIOptions
                theme={theme}
                setTheme={setTheme}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />
        </>
    );
}
