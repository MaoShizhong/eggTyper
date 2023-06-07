import { UIController } from './ui-controller.js';
import { UIFactory } from './ui-factory.js';
import { WordList } from './word-list.js';

export class Test {
    constructor(duration, words) {
        this.clock;
        this.endOfTest;
        this.active = false;
        this.duration = duration;
        this.timeRemaining = duration;
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
            this.endOfTest = setTimeout(() => this.endTest(), this.timeRemaining * 1000);
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
        return chars / 5 * (1 / (this.duration / 60)) * accuracy;
    }

    updateTimer() {
        UIController.updateTimer(--this.timeRemaining);
    }

    setDuration(btn) {
        this.duration = btn.value;
        this.timeRemaining = btn.value;
        UIController.updateTimer(this.timeRemaining);
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
}