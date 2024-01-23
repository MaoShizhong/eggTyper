import { FormEvent, useRef, useState } from 'react';
import { TestType } from '../../types/types';
import { Words } from './Words';
import testStyles from './css/test.module.css';

type TestProps = {};

const words =
    'Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords WordsWordsWords Words WordsWordsWords WordsWordsWords Words WordsWordsWords';

export function Test({}: TestProps) {
    const [testType, setTestType] = useState<TestType>('words');
    const [fontSize, setFontSize] = useState(20); // ! Will need input/slider
    const [resetWordsStateOnNewTest, setResetWordsStateOnNewTest] = useState(Math.random());
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [letterCorrectness, setLetterCorrectness] = useState<boolean[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    function markLetterCorrectness(e: FormEvent<HTMLInputElement>): void {
        const input = e.target as HTMLInputElement;

        if (!input.value) {
            setLetterCorrectness([]);
        } else if (input.value.length < letterCorrectness.length) {
            setLetterCorrectness(letterCorrectness.slice(0, input.value.length));
        } else {
            setLetterCorrectness([
                ...letterCorrectness,
                input.value.at(-1) === words[input.value.length - 1],
            ]);
        }
    }

    function resetTest(): void {
        setResetWordsStateOnNewTest(Math.random());
        setLetterCorrectness([]);

        if (inputRef.current) inputRef.current.value = '';
    }

    return (
        <section className={testStyles.test}>
            <h1>The timer will start when you begin typing below</h1>
            <Words
                key={resetWordsStateOnNewTest}
                words={words}
                letterCorrectness={letterCorrectness}
                fontSize={fontSize}
                testType={testType}
            />
            <input
                className={testStyles.input}
                type="text"
                placeholder="Start typing here"
                onInput={markLetterCorrectness}
                ref={inputRef}
            />

            {/* Change to actual reset when test behaviour implemented */}
            <button onClick={resetTest}>reset</button>
        </section>
    );
}
