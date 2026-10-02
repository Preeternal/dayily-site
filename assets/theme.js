(() => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('dayily-theme');

  if (storedTheme === 'light' || storedTheme === 'dark') {
    root.dataset.theme = storedTheme;
  }

  const getTheme = () =>
    root.dataset.theme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    const updateButton = () => {
      const isDark = getTheme() === 'dark';
      button.textContent = isDark ? '☀' : '☾';
      button.setAttribute(
        'aria-label',
        isDark ? 'Switch to light theme' : 'Switch to dark theme',
      );
      button.title = isDark ? 'Light theme' : 'Dark theme';
    };

    updateButton();
    button.addEventListener('click', () => {
      const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      localStorage.setItem('dayily-theme', nextTheme);
      updateButton();
    });
  });
})();
