export class WordList {
    constructor(wordArr) {
        this.words = WordList.shuffleWords(wordArr);
        this.chars = this.words.slice(0, 400).join('\u2002').split('');
    }

    static shuffleWords(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}