// src/lib/theme.ts - Use this for data visualization components

export const brandColors = {
  neutralBlack: "#232226",
  charcoal: "#3c4659",
  manatee: "#8a8ba6",
  horizon: "#5988a6",
  blush: "#d9848b",
};

// Export variants for data visualization
export const horizonPalette = {
  50: "#f0f5f8",
  100: "#daeaf3",
  200: "#b5d5e6",
  300: "#8ebfd9",
  400: "#70a8c0",
  500: "#5988a6", // Base
  600: "#4a7a97",
  700: "#3c6379",
  800: "#304d5c",
  900: "#263b47",
};

// Use in Recharts, D3, or other visualization libs
export const chartColors = [
  brandColors.horizon, // Primary
  brandColors.charcoal, // Secondary
  brandColors.blush, // Accent
  brandColors.manatee, // Neutral
];
