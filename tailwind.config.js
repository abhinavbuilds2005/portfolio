/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#030508',
          900: '#070a12',
          850: '#0c101d',
          800: '#111728',
          700: '#1b243b',
          600: '#283452',
        },
        cyber: {
          cyan: '#00f2ff',
          neon: '#00ffff',
          purple: '#8b5cf6',
          violet: '#7000ff',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
        },
        hud: {
          border: 'rgba(0, 242, 255, 0.2)',
          borderDim: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(0, 242, 255, 0.35)',
          bg: 'rgba(11, 16, 29, 0.75)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Sora"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glitch': 'glitch 1s infinite linear alternate-reverse',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'cyber-cyan': '0 0 25px -5px rgba(0, 242, 255, 0.4)',
        'cyber-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'cyber-glow': '0 0 35px 0 rgba(0, 242, 255, 0.25)',
        'glass-edge': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
