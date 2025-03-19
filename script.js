document.addEventListener('DOMContentLoaded', () => {
    const themeMenuToggle = document.getElementById('theme-menu-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    const themeMenu = document.getElementById('theme-menu');
    const themeButtons = document.querySelectorAll('.theme-button');
    const accentColorInput = document.getElementById('accent-color');
    const accentColorPreview = document.getElementById('accent-color-preview');

    console.log('Theme switcher initialized');

    // Function to update toggle icon based on theme
    const updateToggleIcon = (theme) => {
        const iconPath = theme === 'light' ? 'sun.svg' :
                         theme === 'dark' ? 'moon.svg' : 'system.svg';
        toggleIcon.src = iconPath;
        console.log(`Updated toggle icon to: ${iconPath}`);
    };

    // Function to set theme
    const setTheme = (theme) => {
        console.log(`Setting theme preference to: ${theme}`);
        let appliedTheme;

        if (theme === 'system') {
            // Check system preference
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            appliedTheme = prefersDarkScheme ? 'dark' : 'light';
            console.log(`System preference detected: ${appliedTheme}`);
        } else {
            // Set specific theme
            appliedTheme = theme;
        }

        // Apply the determined theme
        document.documentElement.setAttribute('data-theme', appliedTheme);

        // Update toggle icon to reflect current theme
        updateToggleIcon(theme);

        // Update active state in button group
        themeButtons.forEach(button => {
            if (button.getAttribute('data-theme') === theme) {
                button.classList.add('active');

                // Apply accent color dynamically to active button
                button.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
            } else {
                button.classList.remove('active');
                button.style.backgroundColor = '';
            }
        });

        console.log(`Applied theme: ${appliedTheme}`);

        // Save to localStorage
        localStorage.setItem('preferred-theme', theme);
    };

    // Function to set accent color
    const setAccentColor = (color) => {
        console.log(`Setting accent color to: ${color}`);
        document.documentElement.style.setProperty('--accent-color', color);

        // Convert hex to RGB for the accent-color-rgb variable
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        document.documentElement.style.setProperty('--accent-color-rgb', `${r}, ${g}, ${b}`);

        // Update active button with new accent color
        const activeButton = document.querySelector('.theme-button.active');
        if (activeButton) {
            activeButton.style.backgroundColor = color;
        }

        accentColorInput.value = color;
        accentColorPreview.style.backgroundColor = color;
        localStorage.setItem('accent-color', color);
    };

    // Toggle theme menu
    themeMenuToggle.addEventListener('click', (e) => {
        themeMenu.classList.toggle('active');
        e.stopPropagation();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeMenu.contains(e.target) && e.target !== themeMenuToggle) {
            themeMenu.classList.remove('active');
        }
    });

    // Theme button selection
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            console.log(`Theme changed by user to: ${theme}`);
            setTheme(theme);
        });
    });

    // Accent color preview click opens color picker
    accentColorPreview.addEventListener('click', () => {
        accentColorInput.click();
    });

    // Event listener for accent color change
    accentColorInput.addEventListener('change', (e) => {
        console.log(`Accent color changed by user to: ${e.target.value}`);
        setAccentColor(e.target.value);
    });

    // Load saved theme or use system default
    const savedTheme = localStorage.getItem('preferred-theme') || 'system';
    console.log(`Loading saved theme from localStorage: ${savedTheme}`);
    setTheme(savedTheme);

    // Load saved accent color or use default
    const savedAccentColor = localStorage.getItem('accent-color') || '#4a90e2';
    console.log(`Loading saved accent color from localStorage: ${savedAccentColor}`);
    setAccentColor(savedAccentColor);

    // Listen for system theme changes when in "system" mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        console.log(`System theme preference changed. Dark mode: ${e.matches}`);
        const currentTheme = localStorage.getItem('preferred-theme');
        if (currentTheme === 'system') {
            setTheme('system');
        }
    });

    // Enable transitions after initial load (prevents flash of white)
    setTimeout(() => {
        document.documentElement.classList.add('transitions-enabled');
        console.log('Theme transitions enabled');
    }, 100);
});
