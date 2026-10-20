(() => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('dayily-theme');
  const language = root.lang.toLowerCase().split('-')[0];
  const labels = {
    en: ['Switch to light theme', 'Switch to dark theme', 'Light theme', 'Dark theme'],
    ru: ['Переключить на светлую тему', 'Переключить на тёмную тему', 'Светлая тема', 'Тёмная тема'],
    es: ['Cambiar al tema claro', 'Cambiar al tema oscuro', 'Tema claro', 'Tema oscuro'],
    pt: ['Mudar para o tema claro', 'Mudar para o tema escuro', 'Tema claro', 'Tema escuro'],
    fr: ['Passer au thème clair', 'Passer au thème sombre', 'Thème clair', 'Thème sombre'],
    zh: ['切换到浅色主题', '切换到深色主题', '浅色主题', '深色主题'],
  };
  const [switchToLight, switchToDark, lightTitle, darkTitle] = labels[language] || labels.en;

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
        isDark ? switchToLight : switchToDark,
      );
      button.title = isDark ? lightTitle : darkTitle;
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
