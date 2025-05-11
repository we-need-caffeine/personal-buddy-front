import { css } from "styled-components";

// 자주 쓰는 스타일 등록 - 필요한 스타일 등록해주십셔 (or 부팀장에게 말씀해주십셔)

// 정렬
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

// 색상
export const mainGreenColor = css`
  color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
`;

