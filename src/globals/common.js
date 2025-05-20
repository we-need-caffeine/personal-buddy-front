import { css } from "styled-components";

// 자주 쓰는 스타일 등록 - 필요한 스타일 등록해주십셔 (or 부팀장에게 말씀해주십셔)

// 정렬
export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const flexBaseTop = css`
  display: flex;
  justify-content: baseline;
  align-items: baseline;
`

export const flexCenterColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// 대표 색상
export const mainGreenColor = css`
  color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
`;
export const subGreenColor = css`
  color: ${({ theme }) => theme.PALLETE.primary.subGreen};
`;
export const lightGreenColor = css`
  color: ${({ theme }) => theme.PALLETE.primary.lightGreen};
`;
export const subBlueColor = css`
  color: ${({ theme }) => theme.PALLETE.primary.subBlue};
`;

// 흑백
export const blackColor = css`
  color: ${({ theme }) => theme.PALLETE.black};
`;
export const whiteColor = css`
  color: ${({ theme }) => theme.PALLETE.white};
`;

// 회색
export const gray1Color = css`
  color: ${({ theme }) => theme.PALLETE.gray.gray1};
`;
export const gray2Color = css`
  color: ${({ theme }) => theme.PALLETE.gray.gray2};
`;
export const gray3Color = css`
  color: ${({ theme }) => theme.PALLETE.gray.gray3};
`;
export const gray4Color = css`
  color: ${({ theme }) => theme.PALLETE.gray.gray4};
`;
export const gray5Color = css`
  color: ${({ theme }) => theme.PALLETE.gray.gray5};
`;
export const gray6Color = css`
  color: ${({ theme }) => theme.PALLETE.gray.gray6};
`;

// 적색
export const warningRedColor = css`
  color: ${({ theme }) => theme.PALLETE.warningRed};
`;
export const pointRedColor = css`
  color: ${({ theme }) => theme.PALLETE.pointRed};
`;

//폰트 사이즈
// 36px
export const fontSizeH1 = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h1};
`;
// 32px
export const fontSizeH2 = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h2};
`;
// 28px
export const fontSizeH3 = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h3};
`;
// 24px
export const fontSizeH4 = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h4};
`;
// 20px
export const fontSizeH5 = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
`;
// 18px
export const fontSizeH6 = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h6};
`;
// 16px
export const fontSizeH7 = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
`;
// 14px
export const fontSizeH8 = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
`;
// 12px
export const fontSizeH9 = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
`;
// 10px
export const fontSizeH10 = css`
  font-size: ${({ theme }) => theme.FONT_SIZE.h10};
`;

//폰트 두께
export const fontWeightThin = css`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
`
export const fontWeightLight = css`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`
export const fontWeightRegular = css`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
`
export const fontWeightMedium = css`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
`
export const fontWeightBold = css`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`