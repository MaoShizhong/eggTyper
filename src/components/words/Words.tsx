import { TestType } from '../../types/types';
import testStyles from './css/test.module.css';

type WordsProps = {
    words: string;
    letterCorrectness: boolean[];
    fontSize: number;
    testType: TestType;
};

const ROWS = 5;

export function Words({ words, letterCorrectness, fontSize, testType }: WordsProps) {
    const lineHeight = fontSize * 1.5;
    return (
        <div className={testStyles.words_container}>
            <div
                style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`,
                    height: `${ROWS * lineHeight}px`,
                }}
            >
                {words.split('').map((letter: string, i: number): JSX.Element => {
                    const currentLetter = letterCorrectness.length === i;
                    const isScored = letterCorrectness.length >= i + 1;
                    const correctness = letterCorrectness[i] ? 'correct' : 'wrong';

                    const classes = [];
                    if (currentLetter) classes.push(testStyles.current);
                    if (isScored) classes.push(testStyles[correctness]);

                    return (
                        <span key={i} className={classes.join(' ')}>
                            {letter}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
