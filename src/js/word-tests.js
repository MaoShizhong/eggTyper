import { TestUIController } from './test-ui-controller.js';
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

        TestUIController.resetUI();
        TestUIController.appendTestChars(this.wordList.chars);
    }

    startTest() {
        // * trigger only if test not yet begun (shares input event listener)
        if (!this.active) {
            this.active = true;
            this.clock = setInterval(() => this.updateTimer(), 1000);
            this.endOfTest = setTimeout(() => this.endTest(), this.timeRemainingInS * 1000);
            TestUIController.toggleActiveTestUI();
        }
    }

    endTest() {
        clearInterval(this.clock);
        TestUIController.timer.classList.add('hidden');
        TestUIController.input.disabled = true;

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
        TestUIController.updateTimer(--this.timeRemainingInS);
    }

    setDuration(btn) {
        Test.durationInS = btn.value;
        this.timeRemainingInS = btn.value;
        TestUIController.updateTimer(this.timeRemainingInS);
        TestUIController.updateDurationBtns(btn);
    }

    typeInput(e) {
        console.log(this);
        this.startTest();
        this.inputChar(e);
    }

    inputChar(e) {
        const isFirstScroll = TestUIController.scrollTracker.length === 0;

        // * to catch CTRL+A -> keypress
        if (TestUIController.input.value === '' || TestUIController.input.value.length === 1) {
            this.charsEntered.length = 0;
            TestUIController.clearAllHighlighting();
        }

        if (e.inputType === 'deleteContentBackward') {
            this.deleteChar(isFirstScroll);
        }
        else {
            this.pushChar(e.data);
            this.assessCorrectness();

            TestUIController.charsSinceLastScroll++;
            TestUIController.checkScrollProgress(this.wordList.chars, isFirstScroll);
        }
    }

    deleteChar(isFirstScroll) {
        this.charsEntered.pop();
        TestUIController.clearLastHighlight(this.charsEntered.length);

        // * check to unscroll 1 line
        if (TestUIController.charsSinceLastScroll === 0 && !isFirstScroll) {
            TestUIController.unscrollLine();
        }
        else {
            TestUIController.charsSinceLastScroll--;
        }
    }

    pushChar(char) {
        // * convert space to unicode 1en space
        if (char === ' ') {
            this.charsEntered.push('\u2002');
        }
        else {
            this.charsEntered.push(TestUIController.input.value.slice(-1));
        }
    }

    assessCorrectness() {
        const i = this.charsEntered.length - 1;

        if (this.charsEntered[i] === this.wordList.chars[i]) {
            TestUIController.highlightChar(true, i);
        }
        else {
            TestUIController.highlightChar(false, i);
        }
    }

    static changeTest(modal, test, e) {
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
        modal.classList.remove('open');
        test = new Test();
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