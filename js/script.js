import { words, shuffleWords } from './words.js';

const themeBtn = document.querySelector('#theme');
const instruction = document.querySelector('#caption');
const resetBtn = document.querySelector('#reset');
const textDisplay = document.querySelector('#text-display');
const input = document.querySelector('#text-entry');
const timer = document.querySelector('#timer');
const results = document.querySelector('#results');
const collapsibleBtn = document.querySelector('.collapsible');

// global arrays to compare for scoring
let charactersToCheckAgainst;
let charactersBeingEntered = [];

let duration;
let clock;
let testActive = false;
let selectedDuration = 4;
let testDurationInSeconds = selectedDuration;

themeBtn.addEventListener('click', changeTheme);
resetBtn.addEventListener('click', resetTest);
input.addEventListener('input', startTest);
input.addEventListener('input', updateTextDisplay);
collapsibleBtn.addEventListener('click', showContent);

function changeTheme() {
    const root = document.querySelector('html');
    root.classList.toggle('dark');
    root.classList.toggle('light');
}

function showContent(e) {
    const collapsibleContent = e.currentTarget.nextElementSibling;
    if (collapsibleContent.style.maxHeight) {
        collapsibleContent.style.maxHeight = null;
        e.currentTarget.textContent = 'How is this calculated? \u25BC';
    }
    else {
        collapsibleContent.style.maxHeight = `${collapsibleContent.scrollHeight}px`;
        e.currentTarget.textContent = 'How is this calculated? \u25B2';
    }
}

function generateWordList() {
    shuffleWords(words);
    const testWords = words.slice(0, 250).join(' ');
    textDisplay.textContent = testWords;

    // populate global array for scoring after test
    charactersToCheckAgainst = testWords.split('');
}

function startTest() {
    if (!testActive) {
        testActive = true;
        clock = setInterval(updateTimer, 1000);
        duration = setTimeout(showResults, selectedDuration * 1000);
        instruction.classList.add('hidden');
        resetBtn.classList.remove('hidden');
    }
}

function updateTimer() {
    testDurationInSeconds--;
    timer.textContent = `${Math.floor(testDurationInSeconds / 60)}:${String(testDurationInSeconds % 60).padStart(2, '0')}`;
}

function updateTextDisplay(e) {
    // to catch CTRL+A backspace or other complete clears
    if (input.value === '') {
        charactersBeingEntered = [];
    }
    else if (e.inputType === 'deleteContentBackward') {
        charactersBeingEntered.pop();
    }
    else {
        charactersBeingEntered.push(input.value.slice(-1));
    }
    console.log(charactersBeingEntered[charactersBeingEntered.length - 1]);

    // highlightText();
}

function showResults() {
    input.disabled = true;
    clearInterval(clock);
    timer.classList.toggle('hidden');
    results.classList.toggle('hidden');
}

function resetTest() {
    testDurationInSeconds = selectedDuration;
    timer.textContent = `${Math.floor(testDurationInSeconds / 60)}:${String(testDurationInSeconds % 60).padStart(2, '0')}`;
    testActive = false;
    input.disabled = false;

    generateWordList();
    charactersToCheckAgainst = [];
    charactersBeingEntered = [];
    input.value = '';

    timer.classList.remove('hidden');
    results.classList.add('hidden');
    instruction.classList.toggle('hidden');
    resetBtn.classList.toggle('hidden');
    clearTimeout(duration);
    clearInterval(clock);
}

// initialise
generateWordList();