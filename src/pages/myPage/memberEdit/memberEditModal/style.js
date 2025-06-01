import styled, { keyframes } from "styled-components";
import { blackColor, fontSizeH7, fontSizeH8, fontSizeH9, fontWeightRegular, pointRedColor, warningRedColor, whiteColor } from "../../../../globals/common";

const S = {}

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

S.Backdrop = styled.div`
  position: fixed;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
`

S.BackdropNone = styled.div`
  position: fixed;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10002;
`

S.ModalContainer = styled.div`
  animation: ${fadeInUp} 0.1s ease-out;
  background-color: ${({ theme }) => theme.PALLETE.white};
  width: 400px;
  height: 260px;
  border-radius: 20px;
  overflow: hidden;
  ${fontSizeH8}
`

S.TitleContainer = styled.div`
  background-color: ${({ $handleConfrmDeleteModal, theme }) => 
    $handleConfrmDeleteModal 
      ? theme.PALLETE.pointRed
      : theme.PALLETE.primary.subBlue 
  };
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

S.ContentContainer = styled.div`
  padding: 30px 40px;
  ${blackColor}
  width: 320px;
  height: 100px;
`;

S.ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: end;
  padding-right: 40px;
  gap: 10px;
`;

S.ConfirmButton = styled.button`
  background-color: ${({ $handleConfrmDeleteModal, theme }) => 
    $handleConfrmDeleteModal 
    ? theme.PALLETE.pointRed
    : theme.PALLETE.primary.subBlue 
  };
  ${whiteColor}
  border: none;
  border-radius: 50px;
  width: 60px;
  height: 30px;
`;

S.CancelButton = styled.button`
  background-color: ${({ theme }) => theme.PALLETE.gray.gray4};
  ${whiteColor}
  border: none;
  border-radius: 50px;
  width: 60px;
  height: 30px;
`;

S.BirthInputWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'validationState',
})`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  margin-top: 20px;
  border: 1px solid
  ${({ validationState  }) => {
      if (validationState  === true) return '#01CD74';
      if (validationState  === false) return '#FF3F3F';
      return '#C5CCD2';
    }};
  transition: border 0.3s ease-in-out;
`;

S.InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray6};
`;

S.Input = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'isValid',
})`
  width: 318px;
  padding-left: 20px;
  color: ${({ theme }) => theme.PALLETE.gray.gray6};
  border: none;
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  box-sizing: border-box;
  outline: none;
`;

S.MemberInfoInput = styled.input`
  ${fontSizeH7}
  ${fontWeightRegular}
  ${blackColor}
  padding-left: 20px;
  border: none;
  box-sizing: border-box;
  outline: none;
  transition: all 0.3s ease-in-out;
`

S.Timer = styled.div`
  ${pointRedColor}
  ${fontSizeH9}
  padding-right: 20px;
`

S.ErrorMessage = styled.div`
  margin-top: 10px;
  ${warningRedColor}
  ${fontSizeH9}
`

export default S;