export type User = {
    username: string;
    topScores: number[];
} | null;

const Tests = ['words', 'quotes'] as const;
export type TestType = {
    type: (typeof Tests)[number];
    duration: number;
};
