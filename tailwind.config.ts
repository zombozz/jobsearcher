import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#F15A5A', // Custom primary color
          secondary: '#d4a5a5', // Example secondary color
          accent: '#f6c6c6', // Example accent color
          neutral: '#2a2a2a', // Example neutral color
          'base-100': '#ffffff', // Example base color
        },
      },
      'light',
      'dark',
      {
        dark: {
          primary: '#F15A5A', // Custom primary color for dark theme
          secondary: '#d4a5a5', // Example secondary color for dark theme
          accent: '#f6c6c6', // Example accent color for dark theme
          neutral: '#2a2a2a', // Example neutral color for dark theme
          'base-100': '#1a1a1a', // Example base color for dark theme
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
