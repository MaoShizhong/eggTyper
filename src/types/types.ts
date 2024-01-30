export type User = {
    username: string;
    topScores: number[];
} | null;

const Tests = ['words', 'quotes'] as const;
export type TestType = (typeof Tests)[number];
export type TestOptions = {
    type: TestType;
    duration: number;
};

export type LetterCorrectness = Array<boolean | 'space'>;
export type CorrectnessCounts = {
    correct: number;
    wrong: number;
};
