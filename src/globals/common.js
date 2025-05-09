import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const flexCenterColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const h1Bold = css`
  font-size: ${({theme}) => theme.FONT_SIZE["h1"]};
  line-height: ${({theme}) => theme.FONT_LINE["h1"]};
  font-weight: 800;
`

