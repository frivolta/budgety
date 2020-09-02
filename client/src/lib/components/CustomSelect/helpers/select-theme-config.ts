import { theme } from "../../../../styles/Theme";
import styled from "styled-components";

export const StyledSelectLabel = styled.label`
  font-family: ${(props) => props.theme.fonts[0]};
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 300;
  color: ${(props) => props.theme.colors.darkPrimary};
  padding-bottom: 0;
  margin-bottom: 0px;
`;

export const CustomSelectTheme = {
  color: {
    border: theme.colors.darkSecondary,
    danger: theme.colors.errorColor,
    primary: theme.colors.primaryColor,
    disabled: theme.colors.lightSecondary,
    placeholder: theme.colors.darkPrimary,
    dangerLight: "rgba(220, 53, 69, 0.25)",
  },
  input: {
    css: `
    color: ${theme.colors.darkPrimary};
    font-size: ${theme.fontSizes.base};
    font-weight: 300;
    `,
  },
  select: {
    css: `
    color: ${theme.colors.darkPrimary};
    font-size: ${theme.fontSizes.base};
    font-weight: 300;
    margin: 14px 0;
    margin-top: 7px;
    `,
  },
  loader: {
    size: "0.625rem",
    padding: "0.375rem 0.75rem",
    animation: "BOUNCE_KEYFRAMES 1.19s ease-in-out infinite",
    color: "rgba(0, 123, 255, 0.42)",
  },
  icon: {
    color: "#ccc",
    hoverColor: "#A6A6A6",
    padding: "0 0.9375rem",
    clear: {
      width: "14px",
      height: "16px",
      animation: "FADE_IN_KEYFRAMES 0.225s ease-in-out forwards",
      transition: "color 0.15s ease-in-out",
    },
    caret: {
      size: "7px",
      transition: "transform 0.25s ease-in-out, color 0.15s ease-in-out",
    },
  },
  control: {
    minHeight: "38px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "0.25rem",
    boxShadow: "0",
    padding: "12px 14px",
    boxShadowColor: "rgba(0, 123, 255, 0.25)",
    focusedBorderColor: "rgba(0, 123, 255, 0.75)",
    transition: "box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out",
  },
  menu: {
    width: "100%",
    margin: "0.5rem 0",
    padding: "0.15rem 0",
    borderRadius: "0.25rem",
    backgroundColor: "#fff",
    animation: "FADE_IN_KEYFRAMES 0.225s ease-in-out forwards",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px rgba(0, 0, 0, 0.1)",
    option: {
      textAlign: "left",
      selectedColor: "#fff",
      selectedBgColor: "#007bff",
      padding: "0.375rem 0.75rem",
      focusedBgColor: "rgba(0, 123, 255, 0.20)",
    },
  },
  noOptions: {
    fontSize: "1.25rem",
    margin: "0.25rem 0",
    color: "hsl(0, 0%, 60%)",
    padding: "0.375rem 0.75rem",
  },
  multiValue: {
    margin: "1px 2px",
    borderRadius: "0.25rem",
    backgroundColor: "#e7edf3",
    animation: "none",
    label: {
      fontSize: "0.825em",
      borderRadius: "0.25rem",
      padding: "1px 2px 1px 6px",
    },
    clear: {
      fontWeight: 700,
      padding: "0 7px",
      fontSize: "0.67em",
      alignItems: "center",
      borderRadius: "0.25rem",
      transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out",
    },
  },
};
