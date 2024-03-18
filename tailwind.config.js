/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'heading-1': '3.375rem',
        'heading-2': '2.625rem',
        'heading-3': '2rem',
        'heading-4': '1.5rem',
        'heading-5': '1.25rem',
        'heading-6': '1.125rem',
        'body-L': '1.125rem',
        'body-M': '1rem',
        'body-S': '0.875rem',
        'body-XS': '0.75rem',
        'body-XXS': '0.625rem',
        'subtitle-M': '1rem',
        'subtitle-S': '0.875rem',
        'caption': '1.125rem',
        'menu': '1rem',
        'button-L': '1.125rem',
        'button-M': '1rem',
        'button-S': '0.875rem',
      },
      fontWeight: {
        'heading': '700',
        'body': '400',
        'subtitle': '500',
        'caption': '700',
        'menu': '500',
        'button': '500',
      },
      colors: {
        'primary': {
          30: '#DEE5CB',
          40: '#ADC178',
          60: '#73A942',
          90: '#265902',
        },
        'default': {
          'white': '#FFFFFF',
          'alert': '#DA1E28',
          'warning': '#F1C21B',
          'success': '#25A249',
          'overlay': '#121619',
        },
        'cool-gray': {
          10: '#F2F4F8',
          20: '#DDE1E6',
          30: '#C1C7CD',
          40: '#A2A9B0',
          50: '#878D96',
          60: '#697077',
          70: '#4D5358',
          80: '#343A3F',
          90: '#1A4301',
          100: '#0C1F00',
        },
      },
      borderRadius: {
        '0xl': '0.625rem'
      },
      width: {
        '20': '5rem',
        '25': '6.25rem',
        '150': '37.5rem',
        '160': '40rem',
        '170': '42.5rem',
        '180': '45rem',
      },
      backgroundImage: {
        'building': "url('../assets/Building.svg')",
      },
    },
  },
  plugins: [],
};
