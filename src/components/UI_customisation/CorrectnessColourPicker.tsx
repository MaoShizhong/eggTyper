import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { THEMES, ThemeName } from '../../helpers/themes';
import { CustomiserButton } from './CustomiserButton';
import { UIOptionsDialog } from './UIOptionsDialog';
import styles from './css/UI_options.module.css';

type Correctness = 'correct' | 'wrong';
type CorrectnessColourPickerProps = {
    correctness: Correctness;
    theme: ThemeName;
};

export function CorrectnessColourPicker({ correctness, theme }: CorrectnessColourPickerProps) {
    const isMounted = useRef(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const buttonID = `${correctness}-button`;
    const localStorageThemeColour = localStorage.getItem(`${correctness}-colour`);
    const themeColour = THEMES[theme][`--${correctness}`];
    const [colour, setColour] = useState(localStorageThemeColour ?? themeColour);

    function setCorrectnessColour(
        e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>,
        useThemeColour?: boolean
    ): void {
        const newColour = useThemeColour
            ? THEMES[theme][`--${correctness}`]
            : e.currentTarget.value;
        setColour(newColour);
    }

    useEffect((): (() => void) => {
        // prevent theme loading on mount overriding local storage colour
        if (isMounted.current) {
            setColour(themeColour);
        } else {
            isMounted.current = true;
        }

        // will break in development due to strict mode forcing double effect run
        return (): void => {
            isMounted.current = false;
        };
    }, [themeColour]);

    useEffect((): void => {
        const root = document.querySelector<HTMLHtmlElement>(':root');
        root?.style.setProperty(`--${correctness}`, colour);
        localStorage.setItem(`${correctness}-colour`, colour);
    }, [correctness, colour]);

    return (
        <>
            <CustomiserButton
                svgFileName={correctness}
                elementID={buttonID}
                dialogRef={dialogRef}
                currentColour={colour}
            />

            <UIOptionsDialog
                elementID={`${correctness}-colour-picker`}
                correspondingButtonID={buttonID}
                dialogRef={dialogRef}
            >
                <div>
                    <h2>Set indicator colour for {correctness} letters:</h2>

                    <div className={styles.colourOptions}>
                        <button type="button" onClick={(): void => setColour(themeColour)}>
                            Use theme colour
                        </button>

                        <label>
                            Custom:
                            <input
                                id={`${correctness}-input`}
                                type="color"
                                value={colour}
                                onChange={setCorrectnessColour}
                            />
                        </label>
                    </div>
                </div>
            </UIOptionsDialog>
        </>
    );
}
