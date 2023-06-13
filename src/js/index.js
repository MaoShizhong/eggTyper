import { Test } from './word-tests.js';
import { Words } from './words.js';
import { UIController } from './ui-controller.js';
import '../css/style.css';
import '../css/dialogs.css';
import '../css/main.css';

const themeBtn = document.querySelector('#theme-btn');
const themes = document.querySelector('#themes > ul');
const durationBtns = document.querySelectorAll('#durations > button');
const resetBtn = document.querySelector('#reset');
const input = document.querySelector('#text-entry');
const dialogs = document.querySelectorAll('dialog');
const testOptionsBtn = document.querySelector('#test-options');
const testOptionsModal = document.querySelector('#test-config');
const applyTestOptions = document.querySelector('#apply');
const testTypes = document.querySelectorAll('.test-type');

// * initialise
UIController.changeTheme('Mocha Rose');
let test = new Test(Words.words500NoCaps);

input.addEventListener('input', (e) => test.typeInput(e));
resetBtn.addEventListener('click', createNewTest);
durationBtns.forEach(button => {
    button.addEventListener('click', (e) => test.setDuration(e.target));
});
testTypes.forEach(btn => {
    btn.addEventListener('click', UIController.toggleValidTestTypeOptions);
});
[themeBtn, testOptionsBtn].forEach(btn => {
    btn.addEventListener('click', UIController.toggleDialog);
});
testOptionsModal.addEventListener('click', (e) => UIController.closeModaOnClickOutside(e.target, e));
applyTestOptions.addEventListener('click', (e) => Test.changeTest(testOptionsModal, test, e));
themes.addEventListener('click', UIController.selectTheme);
dialogs.forEach(dialog => dialog.addEventListener('close', (e) => e.target.classList.remove('open')));


// ? util funcs unsure what class to put in?
// ? adding as instance method or static method of Test class causes bugs - does not correctly reassign test to new Test
// ? therefore typing does not initiate test/timer on the new test, as "test" still references the previous instance
function createNewTest() {
    clearInterval(test.clock);
    clearTimeout(test.endOfTest);
    test = new Test();
}