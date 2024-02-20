import { useRef, useState } from 'react';
import { useCorrectnessColour } from '../../helpers/hooks';
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
    const [colour, setColour] = useCorrectnessColour(correctness, theme);

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
                        <button
                            type="button"
                            onClick={(): void => setColour(THEMES[theme][`--${correctness}`])}
                        >
                            Use theme colour
                        </button>

                        <label>
                            Custom:
                            <input
                                id={`${correctness}-input`}
                                type="color"
                                value={colour}
                                onChange={(e): void => setColour(e.currentTarget.value)}
                            />
                        </label>
                    </div>
                </div>
            </UIOptionsDialog>
        </>
    );
}
