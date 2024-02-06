import randQuote from 'quote-library';
// @ts-expect-error: Current library has typo in index.d.ts
import { wordList } from 'random-words';
import { CapitalsOptions, NumbersOptions, TestOptions } from '../types/types';
import { WORDS_PER_WORDBLOCK } from './constants';

export function getWordBlock({ type, capitals, numbers }: TestOptions): string {
    if (type === 'quotes') {
        let quotes = '';
        while (quotes.split(' ').length < WORDS_PER_WORDBLOCK) {
            quotes = `${quotes} ${getRandomQuote()}`;
        }

        // remove leading space
        return quotes.slice(1);
    }

    let words = wordList;
    words = adjustForCapitals(words, capitals);
    words = adjustForNumbers(words, numbers);
    return shuffleInPlace(words).slice(0, WORDS_PER_WORDBLOCK).join(' ');
}

function adjustForCapitals(words: string[], rule: CapitalsOptions): string[] {
    const capitalise = (word: string): string => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    const randomCapitalise = (word: string): string =>
        Math.random() < 0.5 ? word : capitalise(word);

    switch (rule) {
        case 'capitalise_all_first_letters':
            return words.map(capitalise);
        case 'capitalise_some_first_letters':
            return words.map(randomCapitalise);
        default:
            return words;
    }
}

function adjustForNumbers(words: string[], rule: NumbersOptions): string[] {
    const randomNumbers = getRandomNumbers(words.length);

    switch (rule) {
        case 'include_numbers':
            return [...words, ...randomNumbers];
        default:
            return words;
    }
}

function getRandomNumbers(length: number): string[] {
    const PROPORTION_NUMBERS_TO_WORDS = 0.75;

    return Array.from({ length: Math.round(length * PROPORTION_NUMBERS_TO_WORDS) }, (): string => {
        // remove weighting towards more digits
        const numOfDigits = Math.floor(Math.random() * 3) + 1;
        switch (numOfDigits) {
            case 3:
                return `${Math.floor(Math.random() * 900) + 100}`;
            case 2:
                return `${Math.floor(Math.random() * 90) + 10}`;
            default:
            case 1:
                return `${Math.floor(Math.random() * 10)}`;
        }
    });
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
