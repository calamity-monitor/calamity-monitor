import React, { useState } from "react";
import Navbar from "./Navbar";
import Routes from "../routes";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../styles/global";
import { ThemeProvider } from "styled-components";
import { colorsDark, colorsLight } from "../styles/palette";

const App = () => {
  const stored = localStorage.getItem("isDarkMode");
  const [isDarkMode, setIsDarkMode] = useState(stored === "true" ? true : false);

  const toggler = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", !isDarkMode);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={isDarkMode ? colorsDark : colorsLight}>
        <GlobalStyles />
        <Navbar theme={isDarkMode} setTheme={toggler} />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;


