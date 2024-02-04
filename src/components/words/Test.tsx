import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_TEST_DURATION, ONE_SECOND, WORDS_PER_WORDBLOCK } from '../../helpers/constants';
import { getWordBlock } from '../../helpers/util';
import { CorrectnessCounts, TestOptions, WordScroll } from '../../types/types';
import { CapsLockIndicator } from './CapsLockIndicator';
import { Results } from './Results';
import { Timer } from './Timer';
import { Words } from './Words';
import testStyles from './css/test.module.css';

const PureWords = memo(Words);

export function Test() {
    const [testType, setTestType] = useState<TestOptions>({
        type: 'words',
        duration: DEFAULT_TEST_DURATION,
    });
    const [testWords, setTestWords] = useState(
        `${getWordBlock(testType.type)} ${getWordBlock(testType.type)}`
    );
    const [wordScroll, setWordScroll] = useState<WordScroll>({ firstRowLength: 0, scrollPoint: 0 });
    const [fontSize, setFontSize] = useState(20); // ! Will need input/slider
    const [testStarted, setTestStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(testType.duration);
    const [timerIntervalID, setTimerIntervalID] = useState(1);
    const [showingResults, setShowingResults] = useState(false);
    const [inputChars, setInputChars] = useState('');
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
        const indexOfLastSpace = inputChars.lastIndexOf(' ') + 1;
        const comparedChars = inputChars.slice(indexOfLastSpace);
        const lengthOfComparedWord = testWords.slice(indexOfLastSpace).indexOf(' ');

        const correctCount = comparedChars
            .split('')
            .filter((char, i): boolean => char === testWords[indexOfLastSpace + i]).length;
        const wrongCount = comparedChars.length - correctCount;

        setSavedScore({
            correct: savedScore.correct + correctCount,
            wrong: savedScore.wrong + wrongCount,
        });
        setWordsSubmitted(wordsSubmitted + 1);
        setInputChars(inputChars.slice(0, indexOfLastSpace + lengthOfComparedWord) + ' ');

        if (inputRef.current) inputRef.current.value = '';
        if (inputChars.length >= wordScroll.scrollPoint) deleteFirstRow();
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>): void {
        const inputValue = e.currentTarget.value;

        if (!testStarted) startTest();
        if (inputValue[inputValue.length - 1] === ' ') {
            submitWord();
            return;
        }

        const indexOfLastSpace = inputChars.lastIndexOf(' ') + 1;
        const comparedChars = inputChars.slice(indexOfLastSpace);
        const hasBackspaced = inputValue.length < comparedChars.length;

        if (hasBackspaced) {
            setInputChars(inputChars.slice(0, indexOfLastSpace + inputValue.length));
        } else {
            setInputChars(`${inputChars}${inputValue[inputValue.length - 1]}`);
        }
    }

    function deleteFirstRow(): void {
        const withFirstRowDeleted = (prev: string): string => prev.slice(wordScroll.firstRowLength);
        setTestWords(withFirstRowDeleted);
        setInputChars(withFirstRowDeleted);
    }

    function endTest(): void {
        submitWord(); // handles unfinished last word/no submitted words
        setTestStarted(false);
        setShowingResults(true);
        clearInterval(timerIntervalID);
    }

    const resetTest = useCallback((): void => {
        setTestStarted(false);
        setTimeRemaining(testType.duration);
        setShowingResults(false);
        setTestWords(`${getWordBlock(testType.type)} ${getWordBlock(testType.type)}`);
        setInputChars('');
        setWordsSubmitted(0);
        setSavedScore({ correct: 0, wrong: 0 });
        clearInterval(timerIntervalID);
    }, [testType, timerIntervalID]);

    useEffect((): void => {
        const inputEl = inputRef.current;
        if (inputEl) {
            inputEl.value = '';
            inputEl.disabled = showingResults;
            inputEl.focus();
        }
    }, [showingResults]);

    useEffect((): (() => void) => {
        const resetTestOnEsc = (e: KeyboardEvent): void => {
            if ((testStarted || showingResults) && e.code === 'Escape') resetTest();
        };
        window.addEventListener('keydown', resetTestOnEsc);

        return (): void => window.removeEventListener('keydown', resetTestOnEsc);
    }, [resetTest, testStarted, showingResults]);

    // endless test words
    useEffect((): void => {
        if (testStarted && wordsSubmitted && wordsSubmitted % WORDS_PER_WORDBLOCK === 0) {
            setTestWords((prev): string => `${prev} ${getWordBlock(testType.type)}`);
        }
    }, [wordsSubmitted, testStarted, testType.type]);

    if (testStarted && timeRemaining <= 0) endTest();

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
                testType={testType.type}
                words={testWords}
                inputChars={inputChars}
                setWordScroll={setWordScroll}
                fontSize={fontSize}
            />
            <input
                className={testStyles.input}
                type="text"
                placeholder={testStarted ? undefined : 'Start typing here'}
                onInput={handleInput}
                ref={inputRef}
            />
            <CapsLockIndicator toBeShown={!showingResults} />
            <Timer timeRemaining={timeRemaining} />
            {showingResults && <Results testDuration={testType.duration} scores={savedScore} />}
        </section>
    );
}
