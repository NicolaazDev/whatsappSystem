import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			accent: 'var(--accent)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
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
  presets: [require("@medusajs/ui-preset")],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
