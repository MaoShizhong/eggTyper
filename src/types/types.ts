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
