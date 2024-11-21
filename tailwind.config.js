/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"], // Enables dark mode by toggling a "class"
	content: [
	  "./pagess/**/*.{js,jsx}", // Fixed typo: 'pagess' to 'pages'
	  "./components/**/*.{js,jsx}",
	  "./app/**/*.{js,jsx}",
	  "./src/**/*.{js,jsx}",
	],
	prefix: "", // Prefix for Tailwind classes (left empty as no customization is specified)
	theme: {
	  container: {
		center: true, // Centers the container by default
		padding: "2rem", // Default padding for the container
		screens: {
		  "2xl": "1400px", // Defines max-width for the '2xl' breakpoint
		},
	  },
	  extend: {
		colors: {
		  border: "hsl(var(--border))", // Uses custom CSS variable
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)", // Large radius defined by variable
		  md: "calc(var(--radius) - 2px)", // Medium radius calculated from the base
		  sm: "calc(var(--radius) - 4px)", // Small radius calculated from the base
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		},
	  },
	},
	plugins: [
	  require("tailwindcss-animate"), // Plugin for animations
	],
  };
  