/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0c0c0c',
          900: '#121212',
          850: '#161616',
          800: '#1c1c1c',
          750: '#242424',
          700: '#2b2a27',
          600: '#3a3835',
        },
        paper: {
          50: '#faf8f5',
          100: '#f5f2eb',
          200: '#eae5db',
          300: '#ded7cb',
          400: '#cac1b2',
        },
        ink: {
          950: '#0f0e0d',
          900: '#1a1918',
          800: '#292524',
          700: '#44403c',
          600: '#57534e',
        },
        saffron: {
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#e58b24',
          600: '#d97706',
          700: '#b45309',
        },
        vermilion: {
          400: '#e0583b',
          500: '#c84b31',
          600: '#b03b22',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        'micro': '0.08em',
        'wide-tech': '0.12em',
      },
      borderWidth: {
        'hairline': '1px',
      }
    },
  },
  plugins: [],
}
