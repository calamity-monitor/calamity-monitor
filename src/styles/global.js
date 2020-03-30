import { createGlobalStyle } from "styled-components";
import { mobile } from "./mediaQueries";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: Lato, Helvetica, Roboto, sans-serif;
    width: 100vw;
    overflow-x: hidden;
    background: ${({ theme }) => theme.backgroundColor};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a {
    text-decoration: none;
    $:visited {
      color: inherit;
    }
  }

  .webmap {
    height: Calc(100vh - 9vh);
  }

  ${mobile} {
    min-height: -moz-available; /* WebKit-based browsers will ignore this. */
  min-height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  min-height: fill-available;
  }

  `;

export default GlobalStyles;
