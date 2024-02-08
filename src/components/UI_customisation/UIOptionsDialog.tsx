import { RefObject, useEffect } from 'react';
import styles from './css/UI_options.module.css';

type UIOptionsDialogProps = {
    elementID: string;
    correspondingButtonID: string;
    dialogRef: RefObject<HTMLDialogElement>;
    children: JSX.Element;
};

export function UIOptionsDialog({
    elementID,
    correspondingButtonID,
    dialogRef,
    children,
}: UIOptionsDialogProps) {
    useEffect((): (() => void) => {
        function closeThemePickerOnClickOutside(e: MouseEvent): void {
            const clickTarget = e.target as HTMLElement;
            if (
                !clickTarget.closest(`#${elementID}`) &&
                !clickTarget.closest(`#${correspondingButtonID}`)
            ) {
                dialogRef.current?.close();
            }
        }

        window.addEventListener('click', closeThemePickerOnClickOutside);

        return (): void => window.removeEventListener('click', closeThemePickerOnClickOutside);
    }, [elementID, correspondingButtonID, dialogRef]);

    return (
        <dialog id={elementID} className={styles.dialog} ref={dialogRef}>
            {children}
        </dialog>
    );
}
