/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(211, 100%, 50%)',
          hover: 'hsl(211, 100%, 45%)',
        },
        danger: {
          DEFAULT: 'hsl(0, 84%, 60%)',
        },
        success: {
          DEFAULT: 'hsl(142, 76%, 36%)',
        },
        warning: {
          DEFAULT: 'hsl(38, 92%, 50%)',
        },
        accent: {
          DEFAULT: 'hsl(24, 100%, 50%)',
          hover: 'hsl(24, 100%, 45%)',
        },
        text: {
          primary: 'hsl(222, 47%, 11%)',
          secondary: 'hsl(215, 16%, 47%)',
          muted: 'hsl(215, 13%, 65%)',
        },
        bg: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          secondary: 'hsl(210, 20%, 98%)',
        },
        surface: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          hover: 'hsl(210, 20%, 96%)',
        },
        border: {
          DEFAULT: 'hsl(214, 32%, 91%)',
        },
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px hsla(222, 47%, 11%, 0.08)',
        'card-hover': '0 8px 24px hsla(222, 47%, 11%, 0.12)',
        'alert': '0 4px 16px hsla(0, 84%, 60%, 0.2)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
        '2xl': '48px',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}