/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#020617',
          900: '#050816',
          850: '#070B18',
          800: '#0B1220',
          700: '#111827',
          600: '#1A2332',
        },
        line: '#1E293B',
        mist: '#94A3B8',
        snow: '#F8FAFC',
        accent: {
          DEFAULT: '#22C55E',
          dim: '#16A34A',
          glow: 'rgba(34,197,94,0.18)',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          dim: '#06B6D4',
        },
        ember: '#F59E0B',
        rose: '#F43F5E',
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(34,197,94,0.18)',
        card: '0 20px 50px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
