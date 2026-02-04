// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    { pattern: /.*/ }, // 🔥 force keep all classes
  ],
  theme: { extend: {} },
  plugins: [],
};
