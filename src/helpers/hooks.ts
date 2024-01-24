import { useState } from 'react';
import { THEMES, ThemeName } from './themes';

type ThemeSetter = [ThemeName, (defaultTheme: ThemeName) => void];

export function useTheme(defaultTheme: ThemeName): ThemeSetter {
    const [currentTheme, setCurrentTheme] = useState(defaultTheme);

    function setTheme(theme: ThemeName): void {
        const root = document.querySelector<HTMLHtmlElement>(':root');

        if (!root) {
            throw new Error('There is no <html> element. This would be a very unlikely occurence.');
        }

        for (const [property, value] of Object.entries(THEMES[theme])) {
            root.style.setProperty(property, value);
        }

        if (theme !== currentTheme) setCurrentTheme(theme);
    }

    setTheme(defaultTheme);

    return [currentTheme, setTheme];
}
