export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }]
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(0, 0, 0, 0.08)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'elevated': '0 16px 48px rgba(0, 0, 0, 0.16)',
        'premium': '0 20px 60px rgba(0, 0, 0, 0.2)',
        'panel': '0 20px 60px rgba(2, 6, 23, 0.28)',
        'glow': '0 0 0 1px rgba(14, 165, 233, 0.14), 0 20px 80px rgba(14, 165, 233, 0.16)'
      },
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66'
        },
        neutral: {
          950: '#0a0a0a',
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#404040',
          600: '#525252'
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
