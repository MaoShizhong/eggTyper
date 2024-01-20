export type User = {
    username: string;
    topScores: number[];
} | null;

const TestTypes = ['words', 'quotes'] as const;
export type TestType = (typeof TestTypes)[number];
