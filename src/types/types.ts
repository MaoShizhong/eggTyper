export type TopScores = [
    number?,
    number?,
    number?,
    number?,
    number?,
    number?,
    number?,
    number?,
    number?,
    number?
];

export type User = {
    username: string;
    top10Scores: TopScores;
} | null;