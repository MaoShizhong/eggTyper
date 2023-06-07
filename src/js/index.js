import { Test } from './word-tests.js';
import { Words } from './words.js';
import { UIController } from './ui-controller.js';
import '../css/style.css';

const themeBtn = document.querySelector('#theme');
const durationBtns = document.querySelectorAll('#durations > button');
const resetBtn = document.querySelector('#reset');
const input = document.querySelector('#text-entry');

// * initialise
let test = new Test(UIController.getCurrentDurationInS(), Words.words500);

themeBtn.addEventListener('click', UIController.changeTheme);
input.addEventListener('input', (e) => {
    test.startTest();
    test.inputChar(e);
});
durationBtns.forEach(button => {
    button.addEventListener('click', (e) => test.setDuration(e.target));
});
resetBtn.addEventListener('click', () => {
    clearInterval(test.clock);
    clearTimeout(test.endOfTest);
    test = new Test(UIController.getCurrentDurationInS(), Words.words500);
});