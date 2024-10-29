import { Config } from 'tailwindcss'
import tailwindcssRadixColors from 'tailwindcss-radix-colors'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        background: 'hsl(var(--color-background))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    tailwindcssRadixColors({ aliases: { sky: 'primary', slate: 'gray' } }),
    require('tailwindcss-animate'),
  ],
} satisfies Config
