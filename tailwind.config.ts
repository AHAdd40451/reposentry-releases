import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#070A16',
        brand: { 300: '#A5B4FC', 400: '#818CF8', 500: '#6366F1', 600: '#4F46E5' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        line: { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'none' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pop: { from: { opacity: '0', transform: 'translateY(12px) scale(0.96)' }, to: { opacity: '1', transform: 'none' } },
        shine: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        line: 'line 400ms ease-out both',
        float: 'float 6s ease-in-out infinite',
        pop: 'pop 500ms cubic-bezier(.2,.8,.2,1) both',
        shine: 'shine 6s linear infinite',
      },
    },
  },
} satisfies Config;
