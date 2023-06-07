import { UIController } from './ui-controller';

export class UIFactory {
    static explanationText = [
        'Your net words-per-minute (WPM) takes your gross WPM and adjusts it based on your accuracy.',
        'Since words can vary in length, a "word" in this case is defined as a distinct block of 5'
        + 'characters (including spaces). Therefore, the number of words typed is defined'
        + 'as the total number of typed characters divided by 5.',
        'To get your net WPM (the displayed metric), simply divide the total number of characters'
        + 'typed by 5, then normalise for 1 minute and multiply by the accuracy.<br>',
        'E.g. 500 characters in 2 minutes (120 seconds), of which 18 were incorrect, will result in an'
        + 'accuracy of 96.4%.<br>500 characters equates to 100 words in 2 minutes'
        + 'which normalises to a gross WPM of 50.<br>Multiply 50 by the accuracy (96.4%) and round to'
        + 'get a final result of 48 WPM.',
    ];

    static createResults(wpm, accuracy, errors) {
        const results = document.createElement('div');
        results.setAttribute('id', 'results');
        results.setAttribute('aria-label', 'test results');

        const stats = this.createStats(wpm, accuracy, errors);
        const explanation = this.createExplanation();

        results.appendChild(stats);
        results.appendChild(explanation);
        document.querySelector('.container').appendChild(results);
    }

    static createStats() {
        const stats = document.createElement('div');
        stats.setAttribute('id', 'stats');

        const headings = ['WPM', 'Accuracy', 'Errors'];
        const IDs = ['wpm', 'accuracy', 'errors'];

        [...arguments].forEach((arg, i) => {
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');

            div.classList.add('stat');
            h2.textContent = headings[i];
            p.textContent = arg;
            p.setAttribute('id', IDs[i]);

            div.appendChild(h2);
            div.appendChild(p);
            stats.appendChild(div);
        });
        return stats;
    }

    static createExplanation() {
        const explanation = document.createElement('div');
        explanation.setAttribute('id', 'explanation');

        const collapseBtn = document.createElement('button');
        collapseBtn.classList.add('collapsible');
        collapseBtn.textContent = 'How is this calculated? \u25BC';
        collapseBtn.addEventListener('click', UIController.toggleCollapsible);

        const text = document.createElement('div');
        text.classList.add('collapsible-content');
        this.explanationText.forEach(paragraph => {
            const p = document.createElement('p');
            p.innerHTML = paragraph;
            text.appendChild(p);
        });

        explanation.appendChild(collapseBtn);
        explanation.appendChild(text);
        return explanation;
    }
}