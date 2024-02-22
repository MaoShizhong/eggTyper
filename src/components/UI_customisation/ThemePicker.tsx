import { Dispatch, SetStateAction, useRef } from 'react';
import { THEMES, ThemeName } from '../../helpers/themes';
import { CustomiserButton } from './CustomiserButton';
import { UIOptionsDialog } from './UIOptionsDialog';
import styles from './css/UI_options.module.css';

type ThemePickerProps = {
    currentTheme: ThemeName;
    setTheme: Dispatch<SetStateAction<ThemeName>>;
    setColourKey: Dispatch<SetStateAction<number>>;
};

export function ThemePicker({ currentTheme, setTheme, setColourKey }: ThemePickerProps) {
    const themePickerRef = useRef<HTMLDialogElement>(null);
    const buttonID = 'theme-picker-button';

    function changeTheme(newTheme: ThemeName): void {
        setTheme(newTheme);
        setColourKey((prev) => prev + 1);
        localStorage.setItem(`correct-colour`, THEMES[newTheme]['--correct']);
        localStorage.setItem(`wrong-colour`, THEMES[newTheme]['--wrong']);

        themePickerRef.current?.close();
    }

    return (
        <>
            <CustomiserButton
                svgFileName="theme_picker"
                elementID={buttonID}
                dialogRef={themePickerRef}
            />

            <UIOptionsDialog
                elementID="theme-picker"
                correspondingButtonID={buttonID}
                dialogRef={themePickerRef}
            >
                <ul className={styles.themes}>
                    {Object.keys(THEMES).map(
                        (theme: string, i: number): JSX.Element => (
                            <li key={i}>
                                <button
                                    className={
                                        theme === currentTheme ? styles.currentTheme : undefined
                                    }
                                    onClick={(): void => changeTheme(theme as ThemeName)}
                                >
                                    {theme}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </UIOptionsDialog>
        </>
    );
}
