/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SoftballProAI Brand Colors
        background: 'hsl(0, 0%, 2%)',
        foreground: 'hsl(0, 0%, 98%)',
        card: 'hsl(0, 0%, 5%)',
        'card-foreground': 'hsl(0, 0%, 98%)',
        popover: 'hsl(0, 0%, 5%)',
        'popover-foreground': 'hsl(0, 0%, 98%)',
        primary: 'hsl(110, 100%, 54%)', // Neon Green
        'primary-foreground': 'hsl(0, 0%, 2%)',
        secondary: 'hsl(0, 0%, 8%)',
        'secondary-foreground': 'hsl(0, 0%, 95%)',
        muted: 'hsl(0, 0%, 10%)',
        'muted-foreground': 'hsl(0, 0%, 60%)',
        accent: 'hsl(305, 100%, 53%)', // Hot Pink
        'accent-foreground': 'hsl(0, 0%, 100%)',
        destructive: 'hsl(0, 84%, 60%)',
        'destructive-foreground': 'hsl(0, 0%, 100%)',
        border: 'hsl(110, 100%, 25%)',
        input: 'hsl(0, 0%, 8%)',
        ring: 'hsl(110, 100%, 54%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

