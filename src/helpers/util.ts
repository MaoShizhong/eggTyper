import randQuote from 'quote-library';
import { wordList } from 'random-words';
import { TestOptions } from '../types/types';
import {
    ONE_HOUR,
    ONE_MINUTE,
    ONE_SECOND,
    QUOTES_LOADED_PER_TEST_MINUTE,
    WORDS_LOADED_PER_TEST_MINUTE,
} from './constants';

export function getTestWords({ type, duration }: TestOptions): string[] {
    const minutes = Math.ceil(duration / ONE_MINUTE);

    if (type === 'quotes') {
        const quotes: string[] = [];
        while (quotes.length < minutes * QUOTES_LOADED_PER_TEST_MINUTE) {
            quotes.push(randQuote.randomQuote().quoteText);
        }
        return quotes;
    } else {
        return shuffleInPlace(wordList).slice(0, minutes * WORDS_LOADED_PER_TEST_MINUTE);
    }
}

function shuffleInPlace<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
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
