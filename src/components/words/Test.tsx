import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_TEST_DURATION, ONE_SECOND } from '../../helpers/constants';
import { getTestWords } from '../../helpers/util';
import { TestOptions } from '../../types/types';
import { Results } from './Results';
import { Timer } from './Timer';
import { Words } from './Words';
import testStyles from './css/test.module.css';

export function Test() {
    const [testType, setTestType] = useState<TestOptions>({
        type: 'words',
        duration: DEFAULT_TEST_DURATION,
    });
    const [testWords, setTestWords] = useState(getTestWords(testType.type));
    const [fontSize, setFontSize] = useState(20); // ! Will need input/slider
    const [testStarted, setTestStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(testType.duration);
    const [timerIntervalID, setTimerIntervalID] = useState(1);
    const [showingResults, setShowingResults] = useState(false);
    const [resetWordsStateOnNewTest, setResetWordsStateOnNewTest] = useState(0);
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
                input.value.at(-1) === testWords[input.value.length - 1],
            ]);
        }
    }

    function startTest(): void {
        const testTimer = setInterval((): void => {
            setTimeRemaining((prev): number => prev - ONE_SECOND);
        }, ONE_SECOND);

        setTestStarted(true);
        setTimerIntervalID(testTimer);
    }

    const resetTest = useCallback((): void => {
        setTestStarted(false);
        setTimeRemaining(testType.duration);
        setShowingResults(false);
        setResetWordsStateOnNewTest((prev): number => prev + 1);
        setLetterCorrectness([]);
        clearInterval(timerIntervalID);

        if (inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.focus();
        }
    }, [testType.duration, timerIntervalID]);

    const resetTestOnEsc = useCallback(
        (e: KeyboardEvent): void => {
            if ((testStarted || showingResults) && e.code === 'Escape') resetTest();
        },
        [resetTest, testStarted, showingResults]
    );

    useEffect((): (() => void) => {
        window.addEventListener('keydown', resetTestOnEsc);
        return (): void => window.removeEventListener('keydown', resetTestOnEsc);
    }, [resetTestOnEsc]);

    useEffect((): void => {
        if (timeRemaining <= 0) {
            setTestStarted(false);
            setShowingResults(true);
            clearInterval(timerIntervalID);
        }
    }, [timeRemaining, timerIntervalID]);

    return (
        <section className={testStyles.test}>
            <h1 className={testStyles.heading}>
                {testStarted || showingResults ? (
                    <button onClick={resetTest}>
                        Click here or press <kbd>Esc</kbd> to reset
                    </button>
                ) : (
                    'The timer will start when you begin typing below'
                )}
            </h1>
            <Words
                key={resetWordsStateOnNewTest}
                testType={testType.type}
                words={testWords}
                letterCorrectness={letterCorrectness}
                fontSize={fontSize}
            />
            <input
                className={testStyles.input}
                type="text"
                placeholder="Start typing here"
                onInput={(e: FormEvent<HTMLInputElement>): void => {
                    if (!testStarted) startTest();
                    markLetterCorrectness(e);
                }}
                disabled={showingResults}
                ref={inputRef}
            />
            <Timer timeRemaining={timeRemaining} />
            {showingResults && (
                <Results testDuration={testType.duration} scores={letterCorrectness} />
            )}
        </section>
    );
}
