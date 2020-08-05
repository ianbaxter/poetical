import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  primaryBackgroundColor,
  secondaryBackgroundColor,
  inputBackgroundColor,
  primaryTextColor,
  secondaryTextColor,
  placeholderTextColor,
  borderColor,
  highlightColor,
  cardShadow,
  curvedCheckbox,
} from "./theme";

const ThemeToggleContext = React.createContext({
  toggle: () => {},
});

export const useTheme = () => React.useContext(ThemeToggleContext);

const Wrapper = styled.div`
  background-color: ${primaryBackgroundColor};
  color: ${primaryTextColor};
  border-color: ${borderColor};
  header,
  footer {
    background-color: ${secondaryBackgroundColor};
  }
  button {
    color: ${primaryTextColor};
    border-color: ${borderColor};
    background: ${"transparent"};
    &:hover {
      color: ${primaryTextColor};
      border-color: ${highlightColor};
    }
  }
  a {
    color: ${primaryTextColor};
    &:hover {
      color: ${primaryTextColor};
      border-color: ${highlightColor};
    }
  }
  textarea,
  input {
    color: ${primaryTextColor};
    background-color: ${inputBackgroundColor};
    ::placeholder {
      color: ${placeholderTextColor};
    }
  }
  svg {
    fill: ${primaryTextColor};
  }
  .btn--minimal {
    &:hover {
      background: ${primaryBackgroundColor};
    }
  }
  .post--summary {
    &:hover {
      border-color: ${"transparent"};
      background-color: ${secondaryBackgroundColor};
    }
  }
  .card {
    background: ${"transparent"};
    box-shadow: ${cardShadow};
  }
  .tags,
  .post__details,
  .post__stats {
    color: ${secondaryTextColor};
    p {
      color: ${secondaryTextColor};
    }
    button {
      color: ${secondaryTextColor};
      border-color: ${secondaryTextColor};
      &:hover {
        color: ${primaryTextColor};
        border-color: ${borderColor};
      }
      &:focus {
        color: ${primaryTextColor};
      }
    }
  }
  .btn--red {
    &:hover {
      border-color: ${"red"};
    }
  }
  .line1,
  .line2,
  .line3 {
    background: ${primaryTextColor};
  }
  .user-options {
    background-color: ${secondaryBackgroundColor};
  }
  .font--secondary-color {
    color: ${secondaryTextColor};
  }
  #privacy-checkbox {
    box-shadow: ${curvedCheckbox};
  }
`;

export const MyThemeProvider = ({ children }) => {
  const storedMode = localStorage.getItem("mode");

  const [themeState, setThemeState] = useState({
    mode: storedMode ? storedMode : "dark",
  });

  const toggle = () => {
    const mode = themeState.mode === "dark" ? "light" : "dark";
    localStorage.setItem("mode", mode);
    setThemeState({ mode });
  };

  return (
    <ThemeToggleContext.Provider value={{ toggle: toggle }}>
      <ThemeProvider theme={{ mode: themeState.mode }}>
        <Wrapper>{children}</Wrapper>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;
