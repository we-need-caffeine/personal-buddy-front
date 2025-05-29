import styled, { keyframes } from 'styled-components';
import { blackColor, fontSizeH8, whiteColor } from '../../../globals/common';

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

export default S;