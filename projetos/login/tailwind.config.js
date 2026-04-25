/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0061a4',
        'on-primary': '#ffffff',
        'surface-container-lowest': '#0f1417',
        'surface-container-low': '#191c1e',
        'surface-container-high': '#232a2f',
        background: '#191c1e',
        'on-background': '#e2e2e6',
        tertiary: '#822800',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '800' }],
      }
    },
  },
  plugins: [],
}
