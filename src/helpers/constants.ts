import { TestOptions } from '../types/types';
import { ThemeName } from './themes';

export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MINUTE;

export const DEFAULT_TEST_DURATION = 100 * 60 * ONE_SECOND;
export const CHARS_IN_WORD = 5;
export const WORDS_PER_WORDBLOCK = 70;
export const ROWS = 5;

export const DEFAULT_TEST_OPTIONS: TestOptions = {
    type: 'words',
    capitals: 'no_capitals',
    numbers: 'no_numbers',
};

export const DURATION_PRESETS_IN_S = [
    15 * ONE_SECOND,
    30 * ONE_SECOND,
    ONE_MINUTE,
    1.5 * ONE_MINUTE,
    2 * ONE_MINUTE,
];

export const DEFAULT_THEME: ThemeName = 'Cappuccino';
