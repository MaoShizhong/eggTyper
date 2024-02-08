import { SetThemeAction, ThemeName } from '../../helpers/themes';
import { CorrectnessColourPicker } from './CorrectnessColourPicker';
import { ThemePicker } from './ThemePicker';
import styles from './css/UI_options.module.css';

type UIOptionsProps = {
    theme: ThemeName;
    setTheme: SetThemeAction;
};

export function UIOptions({ theme, setTheme }: UIOptionsProps) {
    return (
        <div className={styles.options}>
            <CorrectnessColourPicker correctness="correct" theme={theme} />
            <CorrectnessColourPicker correctness="wrong" theme={theme} />
            <ThemePicker currentTheme={theme} setTheme={setTheme} />
        </div>
    );
}
