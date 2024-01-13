import { Test } from './word-tests.js';

export class WordList {
    constructor(wordArr) {
        if (Test.includeNumbers) {
            wordArr = [...wordArr, ...WordList.add200RandomNumbers()];
        }
        this.words = Test.isSentences ? wordArr : WordList.shuffleWords(wordArr);

        // * \u2002 space to allow wrapping but prevent white space collapse in HTML
        this.chars = this.words.join(' ').replaceAll(' ', '\u2002').split('');
    }

    static shuffleWords(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    static add200RandomNumbers() {
        return Array.from({ length: 200 }, () => {
            // * remove weighting towards more digits
            const numOfDigits = Math.floor(Math.random() * 3) + 1;
            switch (numOfDigits) {
                case 1:
                    return Math.floor(Math.random() * 10);
                case 2:
                    return Math.floor(Math.random() * 90) + 10;
                case 3:
                    return Math.floor(Math.random() * 900) + 100;
            }
        });
    }
}