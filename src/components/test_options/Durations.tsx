import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { DURATION_PRESETS_IN_S } from '../../helpers/constants';
import { formatTime } from '../../helpers/util';
import durationStyles from './css/durations.module.css';

type DurationsProps = {
    selectedDuration: number;
    setTestDuration: Dispatch<SetStateAction<number>>;
    setTimeRemaining: Dispatch<SetStateAction<number>>;
};

export function Durations({ selectedDuration, setTestDuration, setTimeRemaining }: DurationsProps) {
    function setNewTestDuration(e: MouseEvent<HTMLButtonElement>): void {
        const newDuration = Number(e.currentTarget.value);
        setTestDuration(newDuration);
        setTimeRemaining(newDuration);
    }

    return (
        <div className={durationStyles.buttons}>
            {DURATION_PRESETS_IN_S.map(
                (duration): JSX.Element => (
                    <button
                        key={duration}
                        className={
                            selectedDuration === duration
                                ? `${durationStyles.selected} ${durationStyles.button}`
                                : durationStyles.button
                        }
                        value={duration}
                        onClick={setNewTestDuration}
                    >
                        {formatTime({ time: duration, padMinutes: false })}
                    </button>
                )
            )}
            <button
                className={
                    !DURATION_PRESETS_IN_S.includes(selectedDuration)
                        ? `${durationStyles.selected} ${durationStyles.button}`
                        : durationStyles.button
                }
            >
                Custom
            </button>
        </div>
    );
}
