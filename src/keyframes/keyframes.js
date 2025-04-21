import { keyframes } from "styled-components";

export const fadaIn = keyframes`
  0%{
    opacity: 0;
    transform: translate(0, -30px);
  }
  100%{
    opacity: 1;
    transform: translate(0, 0);
  }
`