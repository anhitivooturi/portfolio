import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        retro: {
          pink: '#ffd6ec',
          bubblegum: '#ffe8f4',
          accent: '#c9b8ff',
          night: '#6b4a63',
          chrome: '#fffbf7',
          frame: '#6b4a63',
        },
      },
      boxShadow: {
        retro: '0 0 0 4px rgba(0,0,0,1), 0 16px 40px rgba(0,0,0,0.16)',
      },
      fontFamily: {
        mono: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
