import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MyThemeProvider } from "./styles/ThemeContext";

ReactDOM.render(
  <MyThemeProvider>
    <App />
  </MyThemeProvider>,
  document.getElementById("root")
);
