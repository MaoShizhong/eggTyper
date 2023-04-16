import { words, shuffleWords } from './words.js';

const themeBtn = document.querySelector('#theme');
const collapsibleBtn = document.querySelector('.collapsible');

// global array to compare 
const displayCharacters = [];
const charactersToCheckAgainst = [];

themeBtn.addEventListener('click', changeTheme);
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
        collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + 'px';
        e.currentTarget.textContent = 'How is this calculated? \u25B2';
    }
}

function generateWordList(displayChar, scoreChar) {
    const textDisplay = document.querySelector('#text-display');
    shuffleWords(words);
    displayChar = words.slice(0, 200).join(' ').split('');
    for (let i = 0; i < displayChar.length; i++) {
        textDisplay.textContent += `${displayChar[i]}`;
        scoreChar[i] = displayChar[i];
    }
}

// initialise
generateWordList(displayCharacters, charactersToCheckAgainst);