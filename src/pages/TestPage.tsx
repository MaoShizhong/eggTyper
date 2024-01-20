import { Test } from '../components/words/Test';
import testStyles from './css/test_page.module.css';

type TestProps = {};

export function TestPage({}: TestProps) {
    return (
        <main className={testStyles.main}>
            <Test />
        </main>
    );
}
