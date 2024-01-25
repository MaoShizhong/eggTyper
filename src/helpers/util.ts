import { TestType } from '../types/types';
import { ONE_HOUR, ONE_MINUTE, ONE_SECOND } from './constants';
import { words } from './word_tests';

export function getTestWords(testType: TestType): string {
    return words;
}

export function formatTime({
    time,
    withLetters,
}: {
    time: number;
    withLetters: boolean;
}): string {
    const hours = Math.floor(time / ONE_HOUR);
    const minutes = Math.floor((time - hours * ONE_HOUR) / ONE_MINUTE);
    const seconds = (time - hours * ONE_HOUR - minutes * ONE_MINUTE) / ONE_SECOND;

    const minutesString = minutes.toString();
    const secondsString = seconds.toString();

    if (withLetters) {
        let timeString = `${minutesString}m ${secondsString}s`;
        if (hours > 0) timeString = `${hours}h ${timeString}`;

        return timeString;
    } else {
        let timeString = `${minutesString.padStart(2, '0')}:${secondsString.padStart(2, '0')}`;
        if (hours > 0) timeString = `${hours}:${timeString}`;

        return timeString;
    }
}

export function toMaxOneDP(num: number): number {
    return Math.round(num * 10) / 10;
}
