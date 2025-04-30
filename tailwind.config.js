/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors:{
      primary:'#59B2F4',
      darktheme:'#191F36'
    },
    fontFamily:{
      Winky: ["Winky Rough" ,"sans-serif"],
      Poppins:['Poppins','sans-serif']
    },
    transitionProperty: {
      'width': 'width'
    },
    },
  },
  plugins: [],
}

