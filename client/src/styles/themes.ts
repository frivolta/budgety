import { blue, neutral, darkPurple, purple, red } from "./colors";
import { primaryFont, typeScale } from "./typography";

export const defaultTheme = {
  primaryFont: primaryFont,
  colors: {
    primaryColor: blue[200],
    primaryDarkColor: darkPurple[100],
    primaryHoverColor: blue[300],
    primaryActiveColor: blue[200],
    textColorPrimary: neutral[100],
    secondaryColor: purple[200],
    textColor: neutral[500],
    textColorInverted: neutral[100],
    pageBackground: neutral[200],
    componentBackground: neutral[100],
    borderColor: neutral[300],
    error: red[200],
    placeholder: neutral[400],
  },
  fonts: {
    header: {
      size: typeScale.paragraph,
      weight: "600",
    },
    default: {
      size: typeScale.paragraph,
      weight: "500",
      secondaryWeight: "300",
      tertiaryWeight: "700",
    },
    small: {
      size: typeScale.helperText,
      weight: 500,
    },
  },
  space: {
    s: "0.25rem" /* 4px */,
    m: "0.5rem" /* 8px */,
    l: "0.75rem" /* 12px */,
    xl: "1rem" /* 16px */,
    xxl: "1.5rem" /* 24px */,
  },
  borderRadius: {
    base: "5px",
    large: "15px",
  },
  shadows: {
    default: "2px 0px 15px rgba(0, 0, 0, 0.05)",
    small: "0px 2px 10px rgba(0, 0, 0, 0.25)",
  },
};
