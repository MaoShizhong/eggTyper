import { UIController } from './ui-controller.js';
import { UIFactory } from './ui-factory.js';
import { WordList } from './word-list.js';
import { Words } from './words.js';

export class Test {
    static isSentences = false;
    static selectedWordList = Words.words500NoCaps;
    static includeNumbers = false;
    static durationInS = 60;

    constructor(words = Test.selectedWordList) {
        this.clock;
        this.endOfTest;
        this.active = false;
        this.timeRemainingInS = Test.durationInS;
        this.wordList = new WordList(words);
        this.charsEntered = [];

        UIController.resetUI();
        UIController.appendTestCharDivs(this.wordList.chars);
    }

    startTest() {
        // * trigger only if test not yet begun (shares input event listener)
        if (!this.active) {
            this.active = true;
            this.clock = setInterval(() => this.updateTimer(), 1000);
            this.endOfTest = setTimeout(() => this.endTest(), this.timeRemainingInS * 1000);
            UIController.toggleActiveTestUI();
        }
    }

    endTest() {
        clearInterval(this.clock);
        UIController.timer.classList.add('hidden');
        UIController.input.disabled = true;

        const chars = this.charsEntered.length;
        const errors = this.countErrors(chars);
        const accuracy = this.calculateAccuracy(chars, errors);
        const wpm = this.calculateWPM(chars, accuracy);

        UIFactory.createResults(Math.round(wpm), `${Math.round(accuracy * 1000) / 10}%`, errors);
    }

    countErrors(chars) {
        if (!chars) return 0;
        return this.charsEntered.filter((char, i) => char !== this.wordList.chars[i]).length;
    }

    calculateAccuracy(chars, errors) {
        if (!chars) return 0;
        return (chars - errors) / chars;
    }

    calculateWPM(chars, accuracy) {
        if (!chars) return 0;
        return chars / 5 * (1 / (Test.durationInS / 60)) * accuracy;
    }

    updateTimer() {
        UIController.updateTimer(--this.timeRemainingInS);
    }

    setDuration(btn) {
        Test.durationInS = btn.value;
        this.timeRemainingInS = btn.value;
        UIController.updateTimer(this.timeRemainingInS);
        UIController.updateDurationBtns(btn);
    }

    inputChar(e) {
        const isFirstScroll = UIController.scrollTracker.length === 0;

        // * to catch CTRL+A -> keypress
        if (UIController.input.value === '' || UIController.input.value.length === 1) {
            this.charsEntered.length = 0;
            UIController.clearAllHighlighting();
        }

        if (e.inputType === 'deleteContentBackward') {
            this.deleteChar(isFirstScroll);
        }
        else {
            this.pushChar(e.data);
            this.assessCorrectness();

            UIController.charsSinceLastScroll++;
            UIController.checkScrollProgress(this.wordList.chars, isFirstScroll);
        }
    }

    deleteChar(isFirstScroll) {
        this.charsEntered.pop();
        UIController.clearLastHighlight(this.charsEntered.length);

        // * check to unscroll 1 line
        if (UIController.charsSinceLastScroll === 0 && !isFirstScroll) {
            UIController.unscrollLine();
        }
        else {
            UIController.charsSinceLastScroll--;
        }
    }

    pushChar(char) {
        // * convert space to unicode 1en space
        if (char === ' ') {
            this.charsEntered.push('\u2002');
        }
        else {
            this.charsEntered.push(UIController.input.value.slice(-1));
        }
    }

    assessCorrectness() {
        const i = this.charsEntered.length - 1;

        if (this.charsEntered[i] === this.wordList.chars[i]) {
            UIController.highlightChar(true, i);
        }
        else {
            UIController.highlightChar(false, i);
        }
    }

    static changeTest(modal, e) {
        if (document.querySelector('.test-type:checked').value === 'sentences') {
            Test.selectedWordList = Words.randomQuote;
            Test.includeNumbers = false;
        }
        else {
            const capitals = document.querySelector('input[name="capitals"]:checked').value;
            const numbers = document.querySelector('input[name="numbers"]:checked').value;
            Test.changeWordList(capitals);
            Test.setNumbersInclusion(numbers);
        }

        e.preventDefault();
        modal.close();
    }

    static changeWordList(capitals) {
        switch (capitals) {
            case 'no-caps':
                Test.selectedWordList = Words.words500NoCaps;
                break;
            case 'all-first-caps':
                Test.selectedWordList = Words.words500FirstCaps;
                break;
            case 'some-first-caps':
                Test.selectedWordList = Words.words500MixedFirstCaps;
        }
    }

    static setNumbersInclusion(numbers) {
        Test.includeNumbers = numbers === 'inc-numbers';
    }
}