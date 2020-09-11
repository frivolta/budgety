import { defaultTheme } from "react-select";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "defaultTheme",
    values: [
      {
        name: "defaultTheme",
        value: "#F8F9FE",
      },
    ],
  },
};
