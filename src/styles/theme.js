import theme from "styled-theming";

export const primaryBackgroundColor = theme("mode", {
  light: "#ffffff",
  dark: "#2c3e50",
});

export const secondaryBackgroundColor = theme("mode", {
  light: "#e6eaf2",
  dark: "#282c34",
});

export const inputBackgroundColor = theme("mode", {
  light: "#e6eaf2",
  dark: "#3c5168",
});

export const primaryTextColor = theme("mode", {
  light: "#222222",
  dark: "#ffffff",
});

export const secondaryTextColor = theme("mode", {
  light: "rgb(153, 153, 153)",
  dark: "rgba(255, 255, 255, 0.589)",
});

export const placeholderTextColor = theme("mode", {
  light: "rgba(0, 0, 0, 0.8)",
  dark: "rgba(255, 255, 255, 0.8)",
});

export const borderColor = theme("mode", {
  light: "#222222",
  dark: "#ffffff",
});

export const highlightColor = theme("mode", {
  light: "#007bff",
  dark: "#007bff",
});

export const cardShadow = theme("mode", {
  light: "0 4px 4px 0 #c8ccd4, 0 6px 10px 0 #c8ccd4f6",
  dark: "0 4px 4px 0 #282c34, 0 6px 10px 0 #282c34f6",
});

export const curvedCheckbox = theme("mode", {
  light: "none",
  dark: "inset 0px 0px 3px #2c3e50",
});
