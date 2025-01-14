
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle.querySelector('span');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        icon.textContent = 'dark_mode';
    } else {
        icon.textContent = 'light_mode';
    }
});
