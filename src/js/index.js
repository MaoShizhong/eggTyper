import { Test } from './word-tests.js';
import { Words } from './words.js';
import { UIController } from './ui-controller.js';
import '../css/style.css';

const themeBtn = document.querySelector('#theme');
const currentDurationBtn = document.querySelector('.current');
const durationBtns = document.querySelectorAll('#durations > button');
const resetBtn = document.querySelector('#reset');
const input = document.querySelector('#text-entry');

// * initialise
let test = new Test(currentDurationBtn.value, Words.words500);

themeBtn.addEventListener('click', UIController.changeTheme);
resetBtn.addEventListener('click', () => {
    clearInterval(test.clock);
    clearTimeout(test.endOfTest);
    test = new Test(currentDurationBtn.value, Words.words500);
});
input.addEventListener('input', () => test.startTest());
input.addEventListener('input', (e) => test.inputChar(e));
durationBtns.forEach(button => {
    button.addEventListener('click', (e) => test.setDuration(e.target));
});

function updateTextDisplay(e) {
    // to catch CTRL+A backspace or other complete clears
    if (input.value === '' || input.value.length === 1) {
        charactersBeingEntered = [];
        clearAllHighlighting();
    }

    if (e.inputType === 'deleteContentBackward') {
        charactersBeingEntered.pop();
        clearLastHighlight();
    }
    else {
        charactersBeingEntered.push(input.value.slice(-1));
        highlightText();
    }

    checkProgressToScroll();
}

function checkProgressToScroll() {
    // char limit for 3 lines in text display
    const finalSpaceOnFirstLine = charactersToCheckAgainst.lastIndexOf(' ', firstLineCharLimit) + 1;
    const finalSpaceOnThirdLine = charactersToCheckAgainst.lastIndexOf(' ', thirdLineCharLimit) + 1;

    if (textDisplay.querySelector(`:nth-child(${finalSpaceOnThirdLine})`).style.borderLeft === '2px solid var(--font)') {
        const divs = textDisplay.querySelectorAll('div');
        for (let i = 0; i < finalSpaceOnFirstLine; i++) {
            divs[i].style.display = 'none';
        }
        firstLineCharLimit += 55;
        thirdLineCharLimit += 55;
    }
}