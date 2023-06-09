import { Test } from './word-tests.js';
import { Words } from './words.js';
import { UIController } from './ui-controller.js';
import '../css/style.css';

const themeBtn = document.querySelector('#theme');
const durationBtns = document.querySelectorAll('#durations > button');
const resetBtn = document.querySelector('#reset');
const input = document.querySelector('#text-entry');
const testOptionsBtn = document.querySelector('#test-options');
const testOptionsModal = document.querySelector('dialog');
const applyTestOptions = document.querySelector('#apply');
const testTypes = document.querySelectorAll('.test-type');

// * initialise
let test = new Test(Words.words500NoCaps);

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
    test = new Test();
});
testOptionsBtn.addEventListener('click', () => {
    testOptionsModal.showModal();
    testOptionsModal.classList.add('open');
});
testTypes.forEach(btn => btn.addEventListener('click', UIController.toggleValidTestTypeOptions));
applyTestOptions.addEventListener('click', (e) => {
    Test.changeTest(testOptionsModal, e);
    test = new Test();
});
testOptionsModal.addEventListener('click', (e) => UIController.closeModal(testOptionsModal, e));
testOptionsModal.addEventListener('close', () => testOptionsModal.classList.remove('open'));