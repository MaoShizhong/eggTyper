import { Dispatch, FormEvent, SetStateAction, useRef } from 'react';
import { CustomiserButton } from './CustomiserButton';
import { UIOptionsDialog } from './UIOptionsDialog';
import styles from './css/UI_options.module.css';

type FontSizeProps = {
    fontSize: number;
    setFontSize: Dispatch<SetStateAction<number>>;
};

export function FontSize({ fontSize, setFontSize }: FontSizeProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const buttonID = 'font-size-button';

    function setNewFontSize(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        setFontSize(e.currentTarget.fontSize.value);
    }

    return (
        <>
            <CustomiserButton svgFileName="font_size" elementID={buttonID} dialogRef={dialogRef} />

            <UIOptionsDialog
                elementID="font-size-setter"
                correspondingButtonID={buttonID}
                dialogRef={dialogRef}
            >
                <form className={styles.fontForm} onSubmit={setNewFontSize}>
                    <label>Set test font size:</label>
                    <input type="number" name="fontSize" min={1} defaultValue={fontSize} />
                    <button type="submit" aria-label="set font size">
                        Set
                    </button>
                </form>
            </UIOptionsDialog>
        </>
    );
}
