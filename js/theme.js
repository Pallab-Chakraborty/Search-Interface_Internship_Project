$('theme-btn').addEventListener('click', () => {
  const isLight = document.documentElement.dataset.theme === 'light';
  document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
  $('theme-icon').className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  showToast(isLight ? 'Dark mode on' : 'Light mode on', 'fa-solid fa-palette');
});

