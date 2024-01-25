import { formatTime } from '../../helpers/util';
import testStyles from './css/test.module.css';

type TimerProps = { timeRemaining: number };

export function Timer({ timeRemaining }: TimerProps) {
    return (
        <div className={testStyles.timer}>
            {formatTime({ time: timeRemaining, withLetters: false })}
        </div>
    );
}
