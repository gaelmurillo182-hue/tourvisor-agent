import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        warm: '#F8F3EC',
        dark: '#1C0F0A',
        accent: '#7A4F3A',
        sage: '#8FA68A',
        cream: '#EDD89A',
        'text-main': '#3D2B1F',
        card: '#EFE6D8',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        soft: '14px',
      },
    },
  },
  plugins: [],
} satisfies Config
