import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';
import { ThemeButton } from './components/theme_picker/ThemeButton';
import { ThemePicker } from './components/theme_picker/ThemePicker';
import { useTheme } from './helpers/hooks';



export function App() {
    const [theme, setTheme] = useTheme();
    const [isThemePickerShowing, setIsThemePickerShowing] = useState(false);

    return (
        <>
            <Header />
            <Outlet />
            <ThemeButton setIsThemePickerShowing={setIsThemePickerShowing} />
            {isThemePickerShowing && (
                <ThemePicker
                    currentTheme={theme}
                    setTheme={setTheme}
                    setIsThemePickerShowing={setIsThemePickerShowing}
                />
            )}
        </>
    );
}
