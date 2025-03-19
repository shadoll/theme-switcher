# Theme Switcher Demo

A lightweight, elegant theme switcher for web applications that allows users to toggle between light, dark, and system themes, along with custom accent colors.

## Features

- **Multiple theme options**:
  - Light mode
  - Dark mode
  - System preference detection
- **Custom accent color** selection
- **Persistent settings** using localStorage
- **Responsive design** that works on all screen sizes
- **No flash of unstyled content** when loading in dark mode
- **Modern UI** with accessible controls
- **Smooth transitions** between themes

## Demo

The project includes a demo page with various UI elements to showcase the theme switching capabilities:
- Text elements (headings, paragraphs)
- Cards with different backgrounds
- Buttons
- Form elements
- Footer

## How It Works

### Theme Switching

The theme switcher allows users to select between three theme options:
- **Light**: Forces light theme regardless of system settings
- **Dark**: Forces dark theme regardless of system settings
- **System**: Automatically follows the user's system preference

### Accent Color

Users can customize the accent color used throughout the interface:
1. Click on the color preview in the theme menu
2. Select a color using the color picker
3. The accent color is applied across buttons, headings, and UI accents

### Persistence

User preferences are stored in the browser's localStorage, so theme settings persist between visits.

## Usage

1. Include the CSS and JavaScript files in your project
2. Add the theme toggle HTML markup
3. Initialize the theme switcher with JavaScript

```html
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
```

## Implementation Details

### Preventing Flash

To prevent flash of unstyled content when loading in dark mode, the project includes an inline script in the head that sets the theme before the page renders:

```html
<script>
    // Immediately set theme before page renders
    const savedTheme = localStorage.getItem('preferred-theme') || 'system';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if (savedTheme === 'system') {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDarkScheme ? 'dark' : 'light');
    }
</script>
```

### CSS Variables

The theme switcher uses CSS custom properties (variables) to define theme colors:

```css
:root {
    --background-color: #ffffff;
    --text-color: #333333;
    --accent-color: #4a90e2;
    /* more variables... */
}

[data-theme="dark"] {
    --background-color: #1a1a1a;
    --text-color: #f5f5f5;
    /* more variables... */
}
```

## Browser Support

This theme switcher works in all modern browsers that support:
- CSS Custom Properties (variables)
- localStorage API
- matchMedia API

## License

This project is available for use under the MIT License.

## Author

Created by sHa.

## Getting Started

1. Clone the repository
2. Open index.html in your browser
3. Try switching between themes and selecting custom accent colors
