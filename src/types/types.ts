export type User = {
    username: string;
    topScores: number[];
} | null;

const testTypes = ['words', 'quotes'] as const;
const capitalsOptions = [
    'no_capitals',
    'capitalise_all_first_letters',
    'capitalise_some_first_letters',
] as const;
const numbersOptions = ['no_numbers', 'include_numbers'] as const;

export type TestType = (typeof testTypes)[number];
export type CapitalsOptions = (typeof capitalsOptions)[number];
export type NumbersOptions = (typeof numbersOptions)[number];
export type TestOptions = {
    type: TestType;
    capitals: CapitalsOptions;
    numbers: NumbersOptions;
};

export const allTestOptions = {
    type: testTypes,
    capitals: capitalsOptions,
    numbers: numbersOptions,
} as const;

export type LetterCorrectness = Array<boolean | 'space'>;
export type CorrectnessCounts = {
    correct: number;
    wrong: number;
};

export type WordScroll = {
    firstRowLength: number;
    scrollPoint: number;
};
