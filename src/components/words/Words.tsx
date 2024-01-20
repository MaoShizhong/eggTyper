import { TestType } from '../../types/types';
import testStyles from './css/test.module.css';

type WordsProps = {
    fontSize: number;
    testType: TestType;
};

const ROWS = 5;

export function Words({ fontSize, testType }: WordsProps) {
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
                Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words
                WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords
                Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words
                WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords
                Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words
                WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords
                Words WordsWordsWords Words
            </div>
        </div>
    );
}
