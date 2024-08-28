/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'explore-bg': "url('/src/assets/explorebg.jpg')",
        'register-bg': "url('/src/assets/register.jpg')",
      }),
    },
  },
  plugins: [],
}

