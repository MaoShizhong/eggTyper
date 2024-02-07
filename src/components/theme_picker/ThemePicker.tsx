import { useEffect, useRef } from 'react';
import { SetThemeAction, THEMES, ThemeName } from '../../helpers/themes';
import { ThemeButton } from './ThemeButton';
import themeStyles from './css/theme_picker.module.css';

type ThemePickerProps = {
    currentTheme: ThemeName;
    setTheme: SetThemeAction;
};

export function ThemePicker({ currentTheme, setTheme }: ThemePickerProps) {
    const themePickerRef = useRef<HTMLDialogElement>(null);

    useEffect((): (() => void) => {
        function closeThemePickerOnClickOutside(e: MouseEvent): void {
            const clickTarget = e.target as HTMLElement;
            if (!clickTarget.closest('#theme-picker') && !clickTarget.closest('#theme-button')) {
                themePickerRef.current?.close();
            }
        }

        window.addEventListener('click', closeThemePickerOnClickOutside);

        return (): void => window.removeEventListener('click', closeThemePickerOnClickOutside);
    }, []);

    function changeTheme(newTheme: ThemeName): void {
        setTheme(newTheme);
        themePickerRef.current?.close();
    }

    return (
        <>
            <ThemeButton themeDialog={themePickerRef} />

            <dialog id="theme-picker" className={themeStyles.themePicker} ref={themePickerRef}>
                <ul className={themeStyles.themes}>
                    {Object.keys(THEMES).map(
                        (theme: string, i: number): JSX.Element => (
                            <li key={i}>
                                <button
                                    className={
                                        theme === currentTheme
                                            ? themeStyles.currentTheme
                                            : undefined
                                    }
                                    onClick={(): void => changeTheme(theme as ThemeName)}
                                >
                                    {theme}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </dialog>
        </>
    );
}
