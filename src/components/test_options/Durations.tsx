import { Dispatch, FormEvent, MouseEvent, SetStateAction, useRef } from 'react';
import { DURATION_PRESETS_IN_S, ONE_SECOND } from '../../helpers/constants';
import { closeOnClickOutside, formatTime } from '../../helpers/util';
import durationStyles from './css/durations.module.css';

type DurationsProps = {
    selectedDuration: number;
    setTestDuration: Dispatch<SetStateAction<number>>;
    setTimeRemaining: Dispatch<SetStateAction<number>>;
};

export function Durations({ selectedDuration, setTestDuration, setTimeRemaining }: DurationsProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    function setNewTestDuration(e: MouseEvent<HTMLButtonElement>): void {
        const newDuration = Number(e.currentTarget.value);
        setTestDuration(newDuration);
        setTimeRemaining(newDuration);
    }

    function setCustomTestDuration(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const input = e.currentTarget.duration;
        // prevent 0s
        const newDuration = (Math.round(parseFloat(input.value)) || 1) * ONE_SECOND;
        setTestDuration(newDuration);
        setTimeRemaining(newDuration);

        modalRef.current?.close();
    }

    return (
        <>
            <div className={durationStyles.buttons}>
                {DURATION_PRESETS_IN_S.map(
                    (duration): JSX.Element => (
                        <button
                            key={duration}
                            onClick={setNewTestDuration}
                            className={
                                selectedDuration === duration
                                    ? `${durationStyles.selected} ${durationStyles.button}`
                                    : durationStyles.button
                            }
                            value={duration}
                        >
                            {formatTime({ time: duration, padMinutes: false })}
                        </button>
                    )
                )}
                <button
                    onClick={(): void => modalRef.current?.showModal()}
                    className={
                        !DURATION_PRESETS_IN_S.includes(selectedDuration)
                            ? `${durationStyles.selected} ${durationStyles.button}`
                            : durationStyles.button
                    }
                >
                    Custom
                </button>
            </div>

            <dialog
                className={durationStyles.modal}
                onClick={(e): void => closeOnClickOutside(e, modalRef)}
                ref={modalRef}
            >
                <form className={durationStyles.form} onSubmit={setCustomTestDuration}>
                    <label>Enter test duration in seconds (minimum 1 second):</label>
                    <input
                        name="duration"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        defaultValue={selectedDuration / ONE_SECOND}
                    ></input>

                    <div className={durationStyles.customFormButtons}>
                        <button type="button" onClick={(): void => modalRef.current?.close()}>
                            Cancel
                        </button>
                        <button type="submit">Apply</button>
                    </div>
                </form>
            </dialog>
        </>
    );
}
