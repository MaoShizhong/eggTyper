import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_DURATION, ONE_SECOND } from '../../helpers/constants';
import { TestType } from '../../types/types';
import { Words } from './Words';
import testStyles from './css/test.module.css';

const words =
    'Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords Words WordsWordsWords WordsWordsWords Words WordsWordsWords WordsWordsWords Words WordsWordsWords';

export function Test() {
    const [testType, setTestType] = useState<TestType>({
        type: 'words',
        duration: DEFAULT_DURATION,
    });
    const [fontSize, setFontSize] = useState(20); // ! Will need input/slider
    const [testStarted, setTestStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(testType.duration);
    const [resetWordsStateOnNewTest, setResetWordsStateOnNewTest] = useState(Math.random());
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

    const resetTest = useCallback((): void => {
        setTestStarted(false);
        setTimeRemaining(testType.duration);
        setResetWordsStateOnNewTest(Math.random());
        setLetterCorrectness([]);

        if (inputRef.current) inputRef.current.value = '';
    }, [testType.duration]);

    // Trigger on test start
    useEffect((): (() => void) | void => {
        if (!testStarted) {
            resetTest();
            return;
        }

        function resetTestOnEsc(e: KeyboardEvent): void {
            if (e.code === 'Escape') resetTest();
        }

        window.addEventListener('keydown', resetTestOnEsc);
        const testTimer = setInterval((): void => {
            setTimeRemaining((prev): number => prev - ONE_SECOND);
        }, ONE_SECOND);

        return (): void => {
            window.removeEventListener('keydown', resetTestOnEsc);
            clearInterval(testTimer);
        };
    }, [testStarted, resetTest]);

    useEffect((): void => {
        if (timeRemaining <= 0) resetTest();
    }, [timeRemaining, resetTest]);

    return (
        <section className={testStyles.test}>
            <h1 className={testStyles.heading}>
                {testStarted ? (
                    <button onClick={resetTest}>
                        Click here or press <kbd>Esc</kbd> to reset
                    </button>
                ) : (
                    'The timer will start when you begin typing below'
                )}
            </h1>
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
                onInput={(e: FormEvent<HTMLInputElement>): void => {
                    if (!testStarted) setTestStarted(true);
                    markLetterCorrectness(e);
                }}
                ref={inputRef}
            />
            <div>{timeRemaining}</div>
        </section>
    );
}
