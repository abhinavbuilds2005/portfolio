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
        porcelain: {
          DEFAULT: '#F5F2EB',
          light: '#FAF8F5',
          card: '#FFFFFF',
          border: '#E2DDD2',
        },
        ink: {
          DEFAULT: '#132532',
          light: '#1D3546',
          muted: '#5A6874',
          faint: '#8E9BA5',
        },
        electric: {
          DEFAULT: '#315CFF',
          hover: '#2047E5',
          subtle: 'rgba(49, 92, 255, 0.08)',
        },
        persimmon: {
          DEFAULT: '#F0784B',
          hover: '#DC6437',
          subtle: 'rgba(240, 120, 75, 0.1)',
        },
        'canvas-base': 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          subtle: 'var(--accent-subtle)',
          secondary: 'var(--accent-secondary)',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Space Grotesk', 'Inter', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'editorial': '4px 4px 0px #F0784B',
        'editorial-ink': '4px 4px 0px #132532',
        'editorial-blue': '4px 4px 0px #315CFF',
        'editorial-card': '0 2px 10px rgba(19, 37, 50, 0.04)',
        'editorial-hover': '0 12px 30px rgba(19, 37, 50, 0.08)',
      },
      letterSpacing: {
        'micro': '0.04em',
        'tech': '0.08em',
        'widest-editorial': '0.15em',
      },
      borderWidth: {
        hairline: '1px',
      }
    },
  },
  plugins: [],
}
