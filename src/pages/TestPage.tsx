import { Test } from '../components/words/Test';
import pageStyles from './css/pages.module.css';

export function TestPage() {
    return (
        <main className={`${pageStyles.main} ${pageStyles.testPage}`}>
            <Test />
        </main>
    );
}
