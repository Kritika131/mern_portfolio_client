/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
    extend: {  

      colors:{
        "primary":"#0A192F",
        "secondary":"#F97316",
        "thirdry":"#54D6BB",
      },
      },
      screens:{
        
        lg:{max:'1224px'},
        // md:{max:'767px'},
        sm:{max:'639px'},

      }
  },
  plugins: [],
}

