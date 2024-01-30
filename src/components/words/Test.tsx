import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_TEST_DURATION, ONE_SECOND } from '../../helpers/constants';
import { getWordBlock } from '../../helpers/util';
import { CorrectnessCounts, TestOptions } from '../../types/types';
import { Timer } from './Timer';
import { Words } from './Words';
import testStyles from './css/test.module.css';

const PureWords = memo(Words);

export function Test() {
    const [testType, setTestType] = useState<TestOptions>({
        type: 'words',
        duration: DEFAULT_TEST_DURATION,
    });
    const [testWords, setTestWords] = useState([getWordBlock(testType), getWordBlock(testType)]);
    const [fontSize, setFontSize] = useState(20); // ! Will need input/slider
    const [testStarted, setTestStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(testType.duration);
    const [timerIntervalID, setTimerIntervalID] = useState(1);
    const [showingResults, setShowingResults] = useState(false);
    const [resetWordsStateOnNewTest, setResetWordsStateOnNewTest] = useState(0);
    const [inputLetters, setInputLetters] = useState('');
    const [wordsSubmitted, setWordsSubmitted] = useState(0);
    const [savedScore, setSavedScore] = useState<CorrectnessCounts>({ correct: 0, wrong: 0 });

    const inputRef = useRef<HTMLInputElement>(null);

    function startTest(): void {
        const testTimer = setInterval((): void => {
            setTimeRemaining((prev): number => prev - ONE_SECOND);
        }, ONE_SECOND);

        setTestStarted(true);
        setTimerIntervalID(testTimer);
    }

    function submitWord(): void {
        const indexOfLastSpace = inputLetters.lastIndexOf(' ') + 1;
        const comparedLetters = inputLetters.slice(indexOfLastSpace);
        const joinedTestWords = testWords.join(' ');

        const correctCount = comparedLetters
            .split('')
            .filter(
                (letter, i): boolean => letter === joinedTestWords[indexOfLastSpace + i]
            ).length;
        const wrongCount = comparedLetters.length - correctCount;

        setSavedScore({
            correct: savedScore.correct + correctCount,
            wrong: savedScore.wrong + wrongCount,
        });
        setWordsSubmitted(wordsSubmitted + 1);

        if (inputRef.current) inputRef.current.value = '';
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>): void {
        const inputValue = e.currentTarget.value;

        if (!testStarted) startTest();
        if (inputValue[inputValue.length - 1] === ' ') submitWord();

        const indexOfLastSpace = inputLetters.lastIndexOf(' ') + 1;
        const comparedLetters = inputLetters.slice(indexOfLastSpace);
        const hasBackspaced = inputValue.length < comparedLetters.length;

        if (hasBackspaced) {
            setInputLetters(inputLetters.slice(0, indexOfLastSpace + inputValue.length));
        } else {
            setInputLetters(`${inputLetters}${inputValue[inputValue.length - 1]}`);
        }
    }

    const resetTest = useCallback((): void => {
        setTestStarted(false);
        setTimeRemaining(testType.duration);
        setShowingResults(false);
        setResetWordsStateOnNewTest((prev): number => prev + 1);
        setInputLetters('');
        setWordsSubmitted(0);
        setSavedScore({ correct: 0, wrong: 0 });
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

    // const renderNewWordblock = useCallback((): void => {
    //     setTestWords((prev): string[] => [prev[prev.length - 1], getWordBlock(testType)]);
    // }, [testType]);

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
            <PureWords
                key={resetWordsStateOnNewTest}
                testType={testType.type}
                words={testWords}
                // renderNewWordblock={renderNewWordblock}
                inputLetters={inputLetters}
                fontSize={fontSize}
            />
            <input
                className={testStyles.input}
                type="text"
                placeholder={testStarted ? undefined : 'Start typing here'}
                onInput={handleInput}
                disabled={showingResults}
                ref={inputRef}
            />
            <Timer timeRemaining={timeRemaining} />
            {/* {showingResults && (
                <Results testDuration={testType.duration} scores={letterCorrectness} />
            )} */}
        </section>
    );
}
