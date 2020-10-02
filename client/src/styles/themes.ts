import {
  risinBlack,
  spaceCadet,
  neonBlue,
  romanSilver,
  darkThemeNeutral,
  winterSky,
  emerald,
  vermillion,
} from "./darkModeColors";
import { primaryFont, typeScale } from "./typography";
import { Theme } from "./types";

export const defaultTheme: Theme = {
  primaryFont: primaryFont,
  colors: {
    primary: neonBlue[500],
    primaryHover: neonBlue[400],
    primaryActive: neonBlue[700],
    text: romanSilver[500],
    lightText: darkThemeNeutral[100],
    componentBackground: spaceCadet[800],
    componentHover: spaceCadet[700],
    needs: neonBlue[500],
    needsBackground: neonBlue.rgba,
    wants: winterSky[500],
    wantsBackground: winterSky.rgba,
    incomes: emerald[500],
    incomesBackground: emerald.rgba,
    error: vermillion[500],
    errorBackground: vermillion.rgba,
    background: risinBlack[800],
    border: spaceCadet[500],
    placeholder: romanSilver[500],
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
      weight: "500",
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
