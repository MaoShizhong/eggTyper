import { ONE_HOUR, ONE_MINUTE, ONE_SECOND } from './constants';

export function formatCountdown(timeRemaining: number): string {
    const hours = Math.floor(timeRemaining / ONE_HOUR);
    const minutes = Math.floor((timeRemaining - hours * ONE_HOUR) / ONE_MINUTE);
    const seconds = (timeRemaining - hours * ONE_HOUR - minutes * ONE_MINUTE) / ONE_SECOND;

    const minutesString = minutes.toString();
    const secondsString = seconds.toString();

    if (hours > 0) {
        return `${hours}:${minutesString.padStart(2, '0')}:${secondsString.padStart(2, '0')}`;
    } else {
        return `${minutesString.padStart(2, '0')}:${secondsString.padStart(2, '0')}`;
    }
}
