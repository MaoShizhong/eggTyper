import { RefObject, useLayoutEffect, useState } from 'react';
import { DEFAULT_THEME } from './constants';
import { SetThemeAction, THEMES, ThemeName } from './themes';
import { getContentWidth } from './util';

type ThemeSetter = [ThemeName, SetThemeAction];

export function useTheme(): ThemeSetter {
    const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);

    function setTheme(theme: ThemeName): void {
        const root = document.querySelector<HTMLHtmlElement>(':root');

        if (!root) {
            throw new Error('There is no <html> element. This would be a very unlikely occurrence.');
        }

        for (const [property, value] of Object.entries(THEMES[theme])) {
            root.style.setProperty(property, value);
        }

        if (theme !== currentTheme) setCurrentTheme(theme);
    }

    setTheme(currentTheme);

    return [currentTheme, setTheme];
}

export const useRowCapacity = (
    rowContainerRef: RefObject<HTMLDivElement>,
    fontSize: number
): number => {
    const DEFAULT_ROW_CAPACTIY = 64;
    const [rowCapacity, setRowCapacity] = useState(DEFAULT_ROW_CAPACTIY);

    useLayoutEffect((): (() => void) => {
        const handleResize = (): void => {
            if (!rowContainerRef.current) return;

            const INCONSOLATA_CH_WIDTH = fontSize / 2;
            const rowContainer = rowContainerRef.current;
            setRowCapacity(Math.floor(getContentWidth(rowContainer) / INCONSOLATA_CH_WIDTH));
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return (): void => window.removeEventListener('resize', handleResize);
    }, [rowContainerRef, fontSize]);

    return rowCapacity;
};
