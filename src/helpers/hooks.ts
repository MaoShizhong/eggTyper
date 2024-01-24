import { useState } from 'react';
import { SetThemeAction, THEMES, ThemeName } from './themes';

type ThemeSetter = [ThemeName, SetThemeAction];
const DEFAULT_THEME: ThemeName = 'Cappuccino';

export function useTheme(): ThemeSetter {
    const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);

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

    setTheme(currentTheme);

    return [currentTheme, setTheme];
}
