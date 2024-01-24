import { Test } from '../components/words/Test';
import pageStyles from './css/pages.module.css';

type TestProps = {};

export function TestPage({}: TestProps) {
    return (
        <main className={`${pageStyles.main} ${pageStyles.testPage}`}>
            <Test />
        </main>
    );
}
