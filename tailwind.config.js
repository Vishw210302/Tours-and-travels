/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        planeFly: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(50px) translateY(-10px)' },
          '100%': { transform: 'translateX(100px)' },
        },
        rotateSun: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'plane-fly': 'planeFly 2s ease-in-out infinite',
        'rotate-sun': 'rotateSun 10s linear infinite',
      },
    },
  },
  plugins: [],
}
