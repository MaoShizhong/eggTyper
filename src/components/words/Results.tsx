import { CHARS_IN_WORD, ONE_MINUTE } from '../../helpers/constants';
import { formatTime, toMaxOneDP } from '../../helpers/util';
import resultsStyles from './css/results.module.css';

type ResultsProps = { testDuration: number; scores: boolean[] };

export function Results({ testDuration, scores }: ResultsProps) {
    const totalChars = scores.length;
    const correctCount = scores.filter((score): boolean => score === true).length;
    const wrongCount = scores.filter((score): boolean => score === false).length;

    const accuracy = correctCount / totalChars;
    const oneMinuteNormalisation = testDuration / ONE_MINUTE;
    const grossWPM = totalChars / CHARS_IN_WORD / oneMinuteNormalisation;
    const netWPM = grossWPM * accuracy;

    return (
        <section className={resultsStyles.results}>
            <h2>Results</h2>
            <div className={resultsStyles.stats}>
                <section>
                    <h3>Test Duration</h3>
                    <div>{formatTime({ time: testDuration, withLetters: true })}</div>
                </section>
                <section>
                    <h3>Net WPM</h3>
                    <div>{toMaxOneDP(netWPM)}</div>
                </section>
                <section>
                    <h3>Gross WPM</h3>
                    <div>{toMaxOneDP(grossWPM)}</div>
                </section>
                <section>
                    <h3>Errors</h3>
                    <div>{wrongCount}</div>
                </section>
                <section>
                    <h3>Accuracy</h3>
                    <div>{toMaxOneDP(accuracy * 100)}%</div>
                </section>
            </div>
        </section>
    );
}
