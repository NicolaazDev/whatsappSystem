import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			accent: 'var(--accent)'
  		},
  		fontFamily: {
  			poppinsThin: 'Poppins Thin',
  			poppinsExtraLight: 'Poppins ExtraLight',
  			poppinsLight: 'Poppins Light',
  			poppinsRegular: 'Poppins Regular',
  			poppinsMedium: 'Poppins Medium',
  			poppinsSemiBold: 'Poppins SemiBold',
  			poppinsBold: 'Poppins Bold',
  			poppinsExtraBold: 'Poppins ExtraBold',
  			poppinsBlack: 'Poppins Black',
  			futuraExtraBold: 'Futura ExtraBold'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
