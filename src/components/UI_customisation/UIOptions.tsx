import { Dispatch, SetStateAction } from 'react';
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
    return (
        <div className={styles.options}>
            <FontSize fontSize={fontSize} setFontSize={setFontSize} />
            <CorrectnessColourPicker correctness="correct" theme={theme} />
            <CorrectnessColourPicker correctness="wrong" theme={theme} />
            <ThemePicker currentTheme={theme} setTheme={setTheme} />
        </div>
    );
}
