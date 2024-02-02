import { wordList } from 'random-words';
import { TestType } from '../types/types';
import { ONE_HOUR, ONE_MINUTE, ONE_SECOND, WORDS_PER_WORDBLOCK } from './constants';

export function getWordBlock(testType: TestType): string {
    return shuffleInPlace(wordList).slice(0, WORDS_PER_WORDBLOCK).join(' ');
}

function shuffleInPlace<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function formatTime({ time, withLetters }: { time: number; withLetters: boolean }): string {
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

export function toRows(words: string, rowMaxChars: number): string[][] {
    let rowBreakpoint = rowMaxChars;

    // hack for `.slice` in the last loop
    const indicesOfRowEndSpaces = [-1];
    let spaceIndex = 0;
    for (let i = 0; i < words.length; i++) {
        if (i > rowBreakpoint) {
            indicesOfRowEndSpaces.push(spaceIndex);
            rowBreakpoint = spaceIndex + rowMaxChars;
        } else if (words[i] === ' ') {
            spaceIndex = i;
        }
    }

    const rowedLetters: string[][] = [];
    for (let i = 1; i < indicesOfRowEndSpaces.length; i++) {
        const start = indicesOfRowEndSpaces[i - 1] + 1;
        const end = indicesOfRowEndSpaces[i] + 1;
        rowedLetters.push(words.slice(start, end).split(''));
    }
    // get last chars in (not enough to fill a whole row)
    rowedLetters.push(words.slice(indicesOfRowEndSpaces.at(-1)).split(''));

    return rowedLetters;
}
