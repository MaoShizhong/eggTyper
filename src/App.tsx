import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UIOptions } from './components/UI_customisation/UIOptions';
import { Header } from './components/header/Header';
import { DEFAULT_FONT_SIZE } from './helpers/constants';
import { useTheme } from './helpers/hooks';

export function App() {
    const [theme, setTheme] = useTheme();
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

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
