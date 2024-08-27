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
      // colors: {
      //   'paybtn' : 'grey',
      // }
    },
  },
daisyui: {
    themes: [
      {
        light: {
          primary: '#F15A5A',
          secondary: '#d4a5a5',
          accent: '#f6c6c6',
          neutral: '#2a2a2a',
          'base-100' : '#ffffff',
          'base-200' : '#d9d9d9',
        },
      },
      'light',
      'dark',
      {
        dark: {
          primary: '#F15A5A',
          secondary: '#d4a5a5',
          accent: '#f6c6c6',
          neutral: '#2a2a2a',
          'base-100' : '#1a1a1a',
          'base-200' : '#141414',
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
