/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        boxShadow: {
          custom: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        },
        planeFly: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(50px) translateY(-10px)' },
          '100%': { transform: 'translateX(100px)' },
        },
        rotateSun: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fly-across': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        },
        'slight-bounce': {
          '0%, 100%': { transform: 'rotate(90deg) translateY(0)' },
          '50%': { transform: 'rotate(90deg) translateY(-2px)' }
        },
        'float-cloud': {
          '0%, 100%': {
            transform: 'translateY(0)',
            opacity: '0.5'
          },
          '50%': {
            transform: 'translateY(-2px)',
            opacity: '0.7'
          }
        }
      },
      animation: {
        'plane-fly': 'planeFly 2s ease-in-out infinite',
        'rotate-sun': 'rotateSun 10s linear infinite',
        'fly-across': 'fly-across 2s infinite linear',
        'slight-bounce': 'slight-bounce 1s infinite ease-in-out',
        'float-cloud': 'float-cloud 2s infinite ease-in-out'
      },
    },
  },
  plugins: [],
}