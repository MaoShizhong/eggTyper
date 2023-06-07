export class UIController {
    static input = document.querySelector('#text-entry');
    static textDisplay = document.querySelector('#text-display');
    static firstLineCharLimit = 55;
    static thirdLineCharLimit = 165;
    static clock;
    static timer = document.querySelector('#timer');
    static resetBtn = document.querySelector('#reset');
    static instructions = document.querySelector('#caption');

    static changeTheme() {
        const root = document.querySelector('html');
        root.classList.toggle('dark');
        root.classList.toggle('light');
    }

    static clearTextDisplay() {
        this.textDisplay.replaceChildren();
    }

    static appendTestCharDivs(charArr) {
        charArr.forEach((char) => {
            const charDiv = document.createElement('div');
            charDiv.className = 'char';
            charDiv.textContent = char;
            this.textDisplay.appendChild(charDiv);
        });
        this.textDisplay.firstElementChild.style.boxShadow = '-2px 0 var(--font)';
    }

    static highlightChar(correct, i) {
        // * nth-child is 1-indexed
        const char = this.textDisplay.querySelector(`:nth-child(${i + 1})`);

        if (correct) {
            char.style.color = '#1a8cff';
        }
        else {
            char.style.color = '#800000';
            char.style.backgroundColor = '#f2a2a0';
        }
        this.moveCursor(char);
    }

    static clearAllHighlighting() {
        const divs = this.textDisplay.querySelectorAll('div');
        divs.forEach(div => div.removeAttribute('style'));
        this.textDisplay.firstElementChild.style.boxShadow = '-2px 0 var(--font)';
    }

    static clearLastHighlight(i) {
        // * nth-child is 1-indexed
        const char = this.textDisplay.querySelector(`:nth-child(${i + 1})`);
        char.removeAttribute('style');
        char.style.boxShadow = '-2px 0 var(--font)';
        char.nextElementSibling.style.boxShadow = null;
    }

    static moveCursor(char) {
        char.style.boxShadow = null;
        char.nextElementSibling.style.boxShadow = '-2px 0 var(--font)';
    }

    static checkScrollProgress(charArr) {
        // * char limit for 3 lines in text display
        const indexFinalSpaceOnFirstLine = charArr.lastIndexOf(' ', this.firstLineCharLimit) + 1;
        const indexFinalSpaceOnThirdLine = charArr.lastIndexOf(' ', this.thirdLineCharLimit) + 1;

        const finalSpaceOnThirdLine = this.textDisplay.querySelector(`:nth-child(${indexFinalSpaceOnThirdLine})`);
        if (finalSpaceOnThirdLine.style.borderLeft === '2px solid var(--font)') {
            const divs = this.textDisplay.querySelectorAll('div');
            for (let i = 0; i < indexFinalSpaceOnFirstLine; i++) {
                divs[i].style.display = 'none';
            }
            this.firstLineCharLimit += 55;
            this.thirdLineCharLimit += 55;
        }
    }

    static updateTimer(duration) {
        this.timer.textContent = `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;
    }

    static updateDurationBtns(newBtn) {
        const currentBtn = document.querySelector('.current');
        currentBtn.classList.remove('current');
        newBtn.classList.add('current');
        this.input.focus();
    }

    static toggleActiveTestUI() {
        const durationBtns = document.querySelectorAll('#durations > button');
        durationBtns.forEach(btn => btn.disabled = true);
        this.instructions.classList.add('hidden');
        this.resetBtn.classList.remove('hidden');
        this.timer.classList.remove('hidden');
    }

    static resetUI() {
        this.firstLineCharLimit = 55;
        this.thirdLineCharLimit = 165;
        this.input.value = '';
        this.input.focus();
        this.clearTextDisplay();

        document.querySelectorAll('*:disabled').forEach(el => el.disabled = false);

        const results = document.querySelector('#results');
        if (results) {
            results.replaceChildren();
            results.remove();
        }

        this.timer.classList.remove('hidden');
        const currentDuration = document.querySelector('.current').value;
        this.updateTimer(currentDuration);
    }

    static toggleCollapsible(e) {
        // * this === collapsible btn
        const collapsibleContent = this.nextElementSibling;
        if (collapsibleContent.style.maxHeight) {
            collapsibleContent.style.maxHeight = null;
            e.currentTarget.textContent = 'How is this calculated? \u25BC';
        }
        else {
            collapsibleContent.style.maxHeight = `${collapsibleContent.scrollHeight}px`;
            e.currentTarget.textContent = 'How is this calculated? \u25B2';
        }
    }
}