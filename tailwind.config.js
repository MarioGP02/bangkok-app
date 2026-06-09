/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bk: {
          bg:       '#080808',
          card:     '#111111',
          card2:    '#191919',
          border:   '#1e1e1e',
          border2:  '#2a2a2a',
          primary:  '#ff6b00',
          text:     '#f0f0f0',
          muted:    '#555555',
          muted2:   '#333333',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'slide-up': 'slideUp 0.32s cubic-bezier(0.32,0.72,0,1)',
        'fade-in':  'fadeIn 0.2s ease',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to:   { transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(5px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(255,107,0,0.5)' },
          '50%':     { boxShadow: '0 0 0 6px rgba(255,107,0,0)' },
        },
      },
      boxShadow: {
        'phone':  '0 60px 120px -20px rgba(0,0,0,0.95), 0 0 0 1px #2a2a2a, inset 0 0 0 1px #111',
        'orange': '0 4px 24px rgba(255,107,0,0.3)',
        'indigo': '0 4px 20px rgba(129,140,248,0.25)',
      },
    },
  },
  plugins: [],
}
