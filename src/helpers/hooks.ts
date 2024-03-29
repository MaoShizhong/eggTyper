import { Dispatch, RefObject, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
import { DEFAULT_FONT_SIZE, DEFAULT_THEME } from './constants';
import { THEMES, ThemeName } from './themes';
import { getContentWidth } from './util';

type ThemeSetter = [ThemeName, Dispatch<SetStateAction<ThemeName>>];
type CorrectnessColourSetter = [string, Dispatch<SetStateAction<string>>];
type FontSizeSetter = [number, Dispatch<SetStateAction<number>>];

export function useTheme(): ThemeSetter {
    const localStorageTheme = localStorage.getItem('theme') as ThemeName | null;
    const [currentTheme, setCurrentTheme] = useState(localStorageTheme ?? DEFAULT_THEME);

    useLayoutEffect((): void => {
        localStorage.setItem('theme', currentTheme);
        for (const [property, value] of Object.entries(THEMES[currentTheme])) {
            document.documentElement.style.setProperty(property, value);
        }
    }, [currentTheme]);

    return [currentTheme, setCurrentTheme];
}

export function useCorrectnessColour(
    correctness: 'correct' | 'wrong',
    theme: ThemeName
): CorrectnessColourSetter {
    const localStorageColour = localStorage.getItem(`${correctness}-colour`);
    const themeColour = THEMES[theme][`--${correctness}`];
    const [colour, setColour] = useState(localStorageColour ?? themeColour);

    useEffect((): void => {
        document.documentElement.style.setProperty(`--${correctness}`, colour);
        localStorage.setItem(`${correctness}-colour`, colour);
    }, [correctness, colour]);

    return [colour, setColour];
}

export function useRowCapacity(
    rowContainerRef: RefObject<HTMLDivElement>,
    fontSize: number
): number {
    const DEFAULT_ROW_CAPACTIY = 64;
    const [rowCapacity, setRowCapacity] = useState(DEFAULT_ROW_CAPACTIY);

    useLayoutEffect((): (() => void) => {
        const handleResize = (): void => {
            if (!rowContainerRef.current) return;

            const INCONSOLATA_CH_WIDTH = Math.ceil(fontSize / 2);
            const rowContainer = rowContainerRef.current;
            setRowCapacity(Math.floor(getContentWidth(rowContainer) / INCONSOLATA_CH_WIDTH));
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return (): void => window.removeEventListener('resize', handleResize);
    }, [rowContainerRef, fontSize]);

    return rowCapacity;
}

export function useFontSize(): FontSizeSetter {
    const localStorageFontSize = Number(localStorage.getItem('font-size'));
    const [fontSize, setFontSize] = useState(localStorageFontSize || DEFAULT_FONT_SIZE);

    useEffect((): void => {
        localStorage.setItem('font-size', String(fontSize));
    }, [fontSize]);

    return [fontSize, setFontSize];
}
