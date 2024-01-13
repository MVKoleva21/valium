/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blackblack-100": "var(--blackblack-100)",
        "blackblack-5": "var(--blackblack-5)",
        "blackblack-60": "var(--blackblack-60)",
      },
      fontFamily: {
        "body-16px": "var(--body-16px-font-family)",
        "h1-85px": "var(--h1-85px-font-family)",
        "h2-50px": "var(--h2-50px-font-family)",
      },
      boxShadow: {
        "glass-morph": "var(--glass-morph)",
        shadow: "var(--shadow)",
      },
    },
  },
  plugins: [],
};
