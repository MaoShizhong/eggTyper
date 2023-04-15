const themeBtn = document.querySelector('#theme');
const collapsibleBtn = document.querySelector('.collapsible');

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