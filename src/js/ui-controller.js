import { themes } from './themes.js';

export class UIController {
    static modals = {
        'theme-btn': document.querySelector('#themes'),
        'test-options': document.querySelector('#test-config'),
        'custom': document.querySelector('#custom-duration'),
    };

    static selectTheme(e) {
        if (e.target.tagName === 'LI') {
            [...this.children].forEach(li => {
                if (li.textContent.includes('--')) li.textContent = li.textContent.slice(3, -3);
            });
            UIController.changeTheme(e.target.textContent);
            e.target.textContent = `-- ${e.target.textContent} --`;
        }
    }

    static changeTheme(theme) {
        const root = document.querySelector(':root');
        const cssVariables = [
            '--faded',
            '--general-font',
            '--header',
            '--header-font',
            '--background',
            '--text-display',
            '--text-display-font',
            '--input-border',
            '--explanation',
        ];
        cssVariables.forEach((variable, i) => {
            root.style.setProperty(variable, themes[theme][i]);
        });
        this.closeDialog(this.modals['theme-btn']);
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

    static toggleValidTestTypeOptions(e) {
        const wordsNumsExclusiveOptions = document.querySelectorAll('dialog input:not(.test-type)');
        wordsNumsExclusiveOptions.forEach(input => {
            input.disabled = e.target.value === 'sentences';
        });
    }

    static toggleDialog() {
        // * this === button pressed
        const dialog = UIController.modals[this.id];

        if (dialog.classList.contains('open')) UIController.closeDialog(dialog);
        else UIController.openDialog(dialog);
    }

    static openDialog(dialog) {
        if (dialog.id === 'themes') dialog.show();
        else dialog.showModal();

        dialog.classList.add('open');
    }

    static closeDialog(dialog) {
        dialog.close();
        dialog.classList.remove('open');
    }

    static closeModaOnClickOutside(modal, e) {
        if (e.target.nodeName === 'DIALOG') {
            modal.close();
        }
    }
}