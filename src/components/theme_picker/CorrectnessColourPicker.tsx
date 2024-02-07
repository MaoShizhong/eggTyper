import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { THEMES, ThemeName } from '../../helpers/themes';

type Correctness = 'correct' | 'wrong';
type CorrectnessColourPickerProps = {
    correctness: Correctness;
    theme: ThemeName;
};

export function CorrectnessColourPicker({ correctness, theme }: CorrectnessColourPickerProps) {
    const [colour, setColour] = useState(THEMES[theme][`--${correctness}`]);

    function setCorrectnessColour(
        e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>,
        useThemeColour?: boolean
    ): void {
        const newColour = useThemeColour
            ? THEMES[theme][`--${correctness}`]
            : e.currentTarget.value;
        setColour(newColour);
    }

    useEffect((): void => {
        const root = document.querySelector<HTMLHtmlElement>(':root');
        root?.style.setProperty(`--${correctness}`, colour);
    }, [correctness, colour]);

    return (
        <div>
            {correctness}: {colour}{' '}
            <input type="color" value={colour} onChange={setCorrectnessColour} />
            <button onClick={(e): void => setCorrectnessColour(e, true)}>Use theme colour</button>
        </div>
    );
}
