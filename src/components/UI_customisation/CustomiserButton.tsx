import { RefObject } from 'react';
import { openDialog } from '../../helpers/util';
import styles from './css/UI_options.module.css';

type CustomiserButtonProps = {
    svgFileName: string;
    elementID: string;
    dialogRef: RefObject<HTMLDialogElement>;
    currentColour?: string;
};

export function CustomiserButton({
    svgFileName,
    elementID,
    dialogRef,
    currentColour,
}: CustomiserButtonProps) {
    return (
        <button
            id={elementID}
            className={styles.optionsButton}
            onClick={(): void => openDialog({ ref: dialogRef })}
        >
            {currentColour && (
                <div
                    className={styles.colourPreview}
                    style={{ backgroundColor: currentColour }}
                ></div>
            )}

            <svg>
                <use href={`/ui_SVGs/${svgFileName}.svg#svg`} />
            </svg>
        </button>
    );
}
