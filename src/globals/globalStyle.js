import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${process.env.PUBLIC_URL}/assets/fonts/SpoqaHanSansNeo-Thin.otf) format('opentype');
    font-weight: normal;
    font-style: 100;
  }
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${process.env.PUBLIC_URL}/assets/fonts/SpoqaHanSansNeo-Light.otf) format('opentype');
    font-weight: normal;
    font-style: 300;
  } 
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${process.env.PUBLIC_URL}/assets/fonts/SpoqaHanSansNeo-Regular.otf) format('opentype');
    font-weight: normal;
    font-style: 400;
  }
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${process.env.PUBLIC_URL}/assets/fonts/SpoqaHanSansNeo-Medium.otf) format('opentype');
    font-weight: normal;
    font-style: 500;
  }
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    src: url(${process.env.PUBLIC_URL}/assets/fonts/SpoqaHanSansNeo-Bold.otf) format('opentype');
    font-weight: normal;
    font-style: 700;
  }

  body {
    font-family: 'SpoqaHanSansNeo';
    /* text-shadow: 0 0 2px rgba(0, 0, 0, 0.05); */
    /* letter-spacing: -0.4px; // 자간  */
    color: #000;
  }

  button {
    cursor: pointer;
  }
`

export default GlobalStyle;