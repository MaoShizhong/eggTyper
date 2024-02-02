import testStyles from './css/test.module.css';

type CharProps = {
    char: string;
    isCurrentLetter: boolean;
    isScored: boolean;
    isCorrect: boolean;
    isMiddleRow: boolean;
    isLastChar: boolean;
};

export function Char({
    char,
    isCurrentLetter,
    isScored,
    isCorrect,
    isMiddleRow,
    isLastChar,
}: CharProps) {
    const correctness = isCorrect ? 'correct' : 'wrong';
    const classes = [];
    if (isCurrentLetter) classes.push(testStyles.current);
    if (isScored) classes.push(testStyles[correctness]);

    return <span className={classes.join(' ')}>{char}</span>;
}
