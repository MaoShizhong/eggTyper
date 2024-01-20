import { useState } from 'react';
import { TestType } from '../../types/types';
import { Words } from './Words';
import testStyles from './css/test.module.css';

type TestProps = {};

export function Test({}: TestProps) {
    const [testType, setTestType] = useState<TestType>('words');
    const [fontSize, setFontSize] = useState(20); // ! Will need input/slider
    const [resetWordsStateOnNewTest, setResetWordsStateOnNewTest] = useState(Math.random());

    return (
        <section className={testStyles.test}>
            <h1>The timer will start when you begin typing below</h1>
            <Words
                key={resetWordsStateOnNewTest}
                fontSize={fontSize}
                testType={testType}
                resetState={setResetWordsStateOnNewTest}
            />
            <input className={testStyles.input} type="text" placeholder="Start typing here" />

            {/* Change to actual reset when test behaviour implemented */}
            <button onClick={(): void => setResetWordsStateOnNewTest(Math.random())}>reset</button>
        </section>
    );
}
