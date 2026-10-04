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
        bg: {
          primary: '#08090B',
          surface: '#0D1014',
          card: '#11151A',
          cardHover: '#151B22',
          lightPrimary: '#F7F8FA',
          lightSurface: '#F0F2F5',
          lightCard: '#FFFFFF',
          lightCardHover: '#F4F6F9',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.16)',
          lightSubtle: 'rgba(0, 0, 0, 0.08)',
          lightStrong: 'rgba(0, 0, 0, 0.15)',
        },
        text: {
          primary: '#F5F7FA',
          secondary: '#9AA4B2',
          muted: '#667085',
          lightPrimary: '#0F172A',
          lightSecondary: '#475569',
          lightMuted: '#94A3B8',
        },
        indigo: {
          DEFAULT: '#6366F1',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          400: '#22D3EE',
          500: '#06B6D4',
        },
        emerald: {
          DEFAULT: '#34D399',
          400: '#34D399',
          500: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        'micro': '0.06em',
        'wide-tech': '0.1em',
      },
      boxShadow: {
        'subtle-glow': '0 0 24px -6px rgba(99, 102, 241, 0.18)',
        'cyan-glow': '0 0 24px -6px rgba(34, 211, 238, 0.18)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
