/** @type {import('tailwindcss').Config} */
module.exports = { 
	content: [ "./src/**/*.{js,ts,jsx,tsx}" ], 
	theme: {
		container: {
		  padding: {
			DEFAULT: '1rem',
			sm: '2rem',
			lg: '4rem',
			xl: '5rem',
			'2xl': '6rem',
		  },
		  screens: {
			
			lg: '1200px', // Set the maximum width for lg screens
			xl: '1600px',
			'2xl':'1800px'
		  },
		  
		},
	  }, 
	plugins: [], 
}