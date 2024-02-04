import randQuote from 'quote-library';
import { wordList } from 'random-words';
import { TestType } from '../types/types';
import { ONE_HOUR, ONE_MINUTE, ONE_SECOND, WORDS_PER_WORDBLOCK } from './constants';

export function getWordBlock(testType: TestType): string {
    if (testType === 'quotes') {
        let quotes = '';
        while (quotes.split(' ').length < WORDS_PER_WORDBLOCK) {
            quotes = `${quotes} ${getRandomQuote()}`;
        }

        // remove leading space
        return quotes.slice(1);
    }

    return shuffleInPlace(wordList).slice(0, WORDS_PER_WORDBLOCK).join(' ');
}

function shuffleInPlace<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getRandomQuote(): string {
    let quote;
    do {
        quote = randQuote.randomQuote().quoteText;
    } while (quote.includes('�')); // some quotes contain a single bad character

    return quote;
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

export function getContentWidth(element: HTMLElement): number {
    const styles = getComputedStyle(element);
    const inlinePadding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    return element.offsetWidth - inlinePadding;
}

// input chars rely on rowed wordlist row lengths as breakpoints instead of max chars
export function toRows(words: string, rowMaxChars: number, rowedWordlist?: string[][]): string[][] {
    const rowedWordlistLengths = rowedWordlist?.map((row): number => row.length);
    let rowBreakpoint = rowedWordlistLengths ? rowedWordlistLengths[0] - 1 : rowMaxChars - 1;

    // hack for `.slice` in the last loop
    const indicesRowEndSpaces = [-1];
    let spaceIndex = 0;
    for (let i = 0; i < words.length; i++) {
        if (i > rowBreakpoint) {
            const toNextBreakpoint =
                rowedWordlistLengths?.[indicesRowEndSpaces.length] ?? rowMaxChars;
            rowBreakpoint = spaceIndex + toNextBreakpoint;
            indicesRowEndSpaces.push(spaceIndex);
        } else if (words[i] === ' ') {
            spaceIndex = i;
        }
    }

    const rowedChars: string[][] = [];
    for (let i = 1; i < indicesRowEndSpaces.length; i++) {
        const start = indicesRowEndSpaces[i - 1] + 1;
        const end = indicesRowEndSpaces[i] + 1;
        rowedChars.push(words.slice(start, end).split(''));
    }

    // get last chars in (not enough to fill a whole row)
    rowedChars.push(words.slice(indicesRowEndSpaces[indicesRowEndSpaces.length - 1] + 1).split(''));

    return rowedChars;
}
