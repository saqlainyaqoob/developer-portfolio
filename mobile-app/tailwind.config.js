/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        elevated: "var(--elevated)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        line: "var(--line)",
        soft: "var(--soft)",
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-semibold": ["Inter_600SemiBold"],
        display: ["SpaceGrotesk_500Medium"],
        "display-semibold": ["SpaceGrotesk_600SemiBold"],
        "display-bold": ["SpaceGrotesk_700Bold"],
        mono: ["JetBrainsMono_400Regular"],
        "mono-medium": ["JetBrainsMono_500Medium"],
      },
    },
  },
  plugins: [],
};
