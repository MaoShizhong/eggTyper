import { Dispatch, SetStateAction, useState } from 'react';
import { SetThemeAction, ThemeName } from '../../helpers/themes';
import { CorrectnessColourPicker } from './CorrectnessColourPicker';
import { FontSize } from './FontSize';
import { ThemePicker } from './ThemePicker';
import styles from './css/UI_options.module.css';

type UIOptionsProps = {
    theme: ThemeName;
    setTheme: SetThemeAction;
    fontSize: number;
    setFontSize: Dispatch<SetStateAction<number>>;
};

export function UIOptions({ theme, setTheme, fontSize, setFontSize }: UIOptionsProps) {
    /**
     * Intended behaviour is that the used colours (and preview colour swatches) for
     * correctness indicators are taken from local storage, with the current theme colour
     * as a fallback if none in local storage.
     * Changing this colour manually will set the local storage colour and make changes
     * to all necessary components on screen.
     * Changing the theme should also overwrite the local storage and rendered colours
     * to the new theme's colours.
     *
     * Without this key hack, either the colour picker components would require some
     * hack for effects (when theme changes) to only set the new colour based on theme
     * dependency on update (and not mount), which would lead to breaking in development
     * with strict mode, or the components would not rerender when local storage values
     * change (since no state changes would occur).
     *
     * This key hack combines both - manually changing the colours via the colour picker
     * will change a state and change local storage values, and changing the theme will
     * force a completel rerender of the colour components by changing their keys.
     */
    const [key, setKey] = useState(1);

    return (
        <div className={styles.options}>
            <FontSize fontSize={fontSize} setFontSize={setFontSize} />
            <CorrectnessColourPicker key={`correct-${key}`} correctness="correct" theme={theme} />
            <CorrectnessColourPicker key={`wrong-${key}`} correctness="wrong" theme={theme} />
            <ThemePicker currentTheme={theme} setTheme={setTheme} setColourKey={setKey} />
        </div>
    );
}
