import { Test } from './word-tests.js';
import { Words } from './words.js';
import { UIController } from './ui-controller.js';
import '../css/style.css';
import '../css/dialogs.css';
import '../css/main.css';
import cssHasPseudo from 'css-has-pseudo/browser';
cssHasPseudo(document, { hover: true });

const themeBtn = document.querySelector('#theme-btn');
const themes = document.querySelector('#themes > ul');
const durationBtns = document.querySelectorAll('#durations > button:not(:last-child)');
const customDurationBtn = document.querySelector('#custom');
const customDurationModal = document.querySelector('#custom-duration');
const applyCustomDuration = document.querySelector('#custom-apply');
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

// * event listeners
window.addEventListener('keydown', preventCtrlBackspace);
input.addEventListener('input', (e) => test.typeInput(e));
resetBtn.addEventListener('click', createNewTest);
durationBtns.forEach(button => {
    button.addEventListener('click', (e) => test.setDuration(e.target));
});
testTypes.forEach(btn => {
    btn.addEventListener('click', UIController.toggleValidTestTypeOptions);
});
[themeBtn, testOptionsBtn, customDurationBtn].forEach(btn => {
    btn.addEventListener('click', UIController.toggleDialog);
});
[customDurationModal, testOptionsModal].forEach(modal => {
    modal.addEventListener('click', (e) => UIController.closeModaOnClickOutside(e.target, e));
});
applyTestOptions.addEventListener('click', (e) => {
    Test.changeTest(testOptionsModal, e);
    test = new Test();
});
applyCustomDuration.addEventListener('click', (e) => test.setCustomDuration(customDurationBtn, e));
themes.addEventListener('click', UIController.selectTheme);
dialogs.forEach(dialog => dialog.addEventListener('close', (e) => e.target.classList.remove('open')));


// ? util funcs unsure what class to put in?
// ? adding as instance method or static method of Test class causes bugs - does not correctly reassign test to new Test
// ? therefore typing does not initiate test/timer on the new test, as "test" still references the previous instance
function createNewTest() {
    clearInterval(test.clock);
    clearTimeout(test.endOfTest);
    test = new Test();

    // * remove esc resetting
    document.removeEventListener('keydown', Test.resetOnEscape);
}

function preventCtrlBackspace(e) {
    if (e.ctrlKey && e.key === 'Backspace') e.preventDefault();
}


// ! delete when login implemented
document.querySelector('#profile').addEventListener('mouseenter', () => {
    const WIP = document.createElement('h1');
    WIP.id = 'WIP';
    WIP.innerHTML = 'Work in progress<br>other features yet to come';
    WIP.style.position = 'fixed';
    WIP.style.textAlign = 'right';
    WIP.style.top = '6rem';
    WIP.style.right = '2rem';
    WIP.style.color = 'var(--general-font)';
    document.querySelector('body').appendChild(WIP);
});
document.querySelector('#profile').addEventListener('mouseleave', () => {
    document.querySelector('#WIP').remove();
});