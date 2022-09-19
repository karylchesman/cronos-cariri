import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body{
    height: 100%;
  }

  #root{
    height: 100%;
    --default-page-content-height:calc(100vh - var(--nav-bar-height));
  }
  
  body{
    color: ${props => props.theme.colors.text_primary};
    font: 400 16px Inter, sans-serif;
    --nav-bar-height:${props => props.theme.mensures.nav_bar_height};
  }
`;
