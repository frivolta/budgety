import { blue, neutral, darkPurple } from "./colors";
import { primaryFont, typeScale } from "./typography";

export const defaultTheme = {
  primaryFont: primaryFont,
  colors: {
    primaryColor: blue[200],
    primaryDarkColor: darkPurple[100],
    primaryHoverColor: blue[300],
    primaryActiveColor: blue[200],
    textColorOnPrimary: neutral[100],
    textColor: neutral[500],
    textColorInverted: neutral[100],
    pageBackground: neutral[200],
    componentBackground: neutral[100],
    borderColor: neutral[300],
  },
  fonts: {
    header: {
      size: typeScale.paragraph,
      weight: "600",
    },
  },
  space: {
    s: "0.25rem" /* 4px */,
    m: "0.5rem" /* 8px */,
    l: "0.75rem" /* 12px */,
    xl: "1rem" /* 16px */,
    xxl: "1.5rem" /* 24px */,
  },
};
