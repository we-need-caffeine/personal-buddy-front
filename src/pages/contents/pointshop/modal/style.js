import styled, { css, keyframes } from 'styled-components';
import { blackColor, flexBaseTop, flexCenter, flexCenterColumn, fontSizeH10, fontSizeH4, fontSizeH6, fontSizeH8, fontSizeH9, fontWeightBold, fontWeightLight, fontWeightMedium, fontWeightRegular, lightGreenColor, mainGreenColor, pointRedColor, subGreenColor, whiteColor } from '../../../../globals/common';

const columnWidths = ["40px", "120px", "200px", "80px", "140px", "140px"];

const S = {};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateX(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

S.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4); 
  backdrop-filter: blur(4px);     
  z-index: 999;                   
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.ModalContainer = styled.div`
  top: 50px;
  width: 960px;
  height: 700px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1000;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

S.TitleContainer = styled.div`
  width: 910px;
  background-color: ${({ theme }) => theme.PALLETE.primary.subBlue };
  border-radius: 12px 12px 0 0;
  ${whiteColor}
  height: 40px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

S.Title = styled.div`
  margin: 0;
`;

S.CloseButton = styled.img`
  cursor: pointer;
`;

S.GridContainer = styled.div`
  margin-top: 30px;
  border-radius: 15px;
  width: 760px;
  height: 500px;
  overflow: hidden;
  box-sizing: border-box;
`;

S.GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 760px;
  height: 500px;
`;

S.GridHeader = styled.div`
  ${flexCenter};
  ${fontWeightRegular};
  ${fontSizeH9};
  background-color: ${({theme}) => theme.PALLETE.primary.mainGreen};
  height: 40px;
  padding-right: 16px; //스크롤바 너비
`;

S.GridBody = styled.div`
  flex: 1;
  height: 460px;
  overflow-y: scroll;
  background-color: ${({theme}) => theme.PALLETE.primary.lightGreen};
  scrollbar-gutter: stable;
  border-radius: 0 0 20px 20px;
`;

S.GridRow = styled.ul`
  display: flex;
  height: 160px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

S.GridCell = styled.li`
  ${({ widthIndex, isHeader }) => `
    width: ${columnWidths[widthIndex]};
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${isHeader ? "bold" : "normal"};
    border-right: ${isHeader ? "none" : "1px dashed #aaa"};
    border-bottom: ${isHeader ? "none" : "1px dashed #aaa"};
  `}
  ${fontWeightLight}
  ${fontSizeH8}
`;

S.CheckBox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid black;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: white;
  }

  &:checked::after {
    content: '✔';
    ${subGreenColor}
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    top: -2px;
    left: 2px;
  }
`;

S.CartInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 760px;
  height: 120px;
`;

S.CartButton = styled.button`
  width: 120px;
  height: 40px;
  ${fontSizeH8};
  ${fontWeightMedium};
  ${whiteColor};
  border: none;
  border-radius: 40px;
  background-color: ${({background}) => background};
  &:hover{
    background-color: ${({hoverBackground}) => hoverBackground};
  }
`;

S.PointInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5px;
`;


S.InfoTitleText = styled.span`
    ${fontSizeH6}
    ${fontWeightMedium}
    padding: 3px;
`;

S.InfoDescText = styled.span`
    ${fontSizeH9}
    ${fontWeightRegular}
    padding: 3px;
`;

S.DescriptionPoint = styled.span`
    ${fontSizeH8}
    ${fontWeightBold}
    ${pointRedColor}
`;


export default S;