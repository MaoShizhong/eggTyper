import { useEffect, useRef, useState } from 'react';
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
    const dialogRef = useRef<HTMLDialogElement>(null);
    const buttonID = `${correctness}-button`;
    const localStorageColour = localStorage.getItem(`${correctness}-colour`);
    const themeColour = THEMES[theme][`--${correctness}`];
    const colour = localStorageColour ?? themeColour;
    const [swatchColour, setSwatchColour] = useState<string | null>(null);

    function setColour(newColour: string): void {
        const root = document.querySelector<HTMLHtmlElement>(':root');
        root?.style.setProperty(`--${correctness}`, newColour);
        localStorage.setItem(`${correctness}-colour`, newColour);
        setSwatchColour(newColour);
    }

    useEffect((): void => {
        const root = document.querySelector<HTMLHtmlElement>(':root');
        root?.style.setProperty(`--${correctness}`, colour);
    }, [correctness, colour]);

    return (
        <>
            <CustomiserButton
                svgFileName={correctness}
                elementID={buttonID}
                dialogRef={dialogRef}
                currentColour={swatchColour ?? colour}
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
                                defaultValue={swatchColour ?? colour}
                                onChange={(e): void => setColour(e.currentTarget.value)}
                            />
                        </label>
                    </div>
                </div>
            </UIOptionsDialog>
        </>
    );
}
