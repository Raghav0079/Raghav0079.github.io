(function() {
    const storageKey = 'theme';
    const root = document.documentElement;

    function getStoredTheme() {
        try {
            return localStorage.getItem(storageKey);
        } catch (error) {
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem(storageKey, theme);
        } catch (error) {
            // Ignore storage errors.
        }
    }

    function getPreferredTheme() {
        const stored = getStoredTheme();
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateButtons(theme) {
        const toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach((toggle) => {
            const icon = toggle.querySelector('.theme-toggle-icon');
            const nextLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';
            toggle.setAttribute('aria-label', `Switch to ${nextLabel}`);
            toggle.setAttribute('title', `Switch to ${nextLabel}`);
            if (icon) {
                icon.textContent = theme === 'dark' ? 'Light' : 'Dark';
            }
        });
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (document.body) {
            document.body.setAttribute('data-theme', theme);
            document.body.style.colorScheme = theme;
        }
        root.style.colorScheme = theme;
        setStoredTheme(theme);
        updateButtons(theme);
    }

    function initThemeToggle() {
        const initialTheme = getPreferredTheme();
        applyTheme(initialTheme);

        const toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach((toggle) => {
            toggle.addEventListener('click', () => {
                const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
                const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
                applyTheme(nextTheme);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
})();
