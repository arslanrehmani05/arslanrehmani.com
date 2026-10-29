import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-surface': 'var(--bg-surface)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'text-subtle': 'var(--text-subtle)',
        'accent-gold': 'var(--accent-gold)',
        'accent-gold-hover': 'var(--accent-gold-hover)',
        'accent-gold-bright': 'var(--accent-gold-bright)',
        'accent-gold-dim': 'var(--accent-gold-dim)',
        'border-color': 'var(--border)',
        'border-gold': 'var(--border-gold)',
      },
      fontFamily: {
        sans: ['var(--font-dmsans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
