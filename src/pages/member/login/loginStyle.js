import styled from 'styled-components';
import { blackColor, fontSizeH8 } from '../../../globals/common';

const S = {};

S.InputGroup = styled.div``;

S.InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

S.ErrorMessage = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'show',
})`
  height: 18px;
  margin: 5px 20px;
  ${fontSizeH8}
  color: ${({ show }) => (show ? 'red' : 'transparent')};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`;

S.Input = styled.input`
  width: 100%;
  height: 60px;
  padding: 10px 40px 10px 10px;
  margin: 0px 20px;
  border: 1px solid #C5CCD2;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 300;
  box-sizing: border-box;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
  }

  &.filled {
    border-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
  }
`;

S.Label = styled.label`
  position: absolute;
  margin: 0px 20px;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  font-weight: 300;
  color: #8e8e8e;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  ${S.Input}:focus + &,
  ${S.Input}.filled + & {
    top: 10px;
    font-size: 12px;
    color: #8e8e8e;
  }
`;

S.Icon = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

S.ClearIcon = styled(S.Icon)`
  right: 30px;
`;

S.TogglePasswordIcon = styled(S.Icon)`
  right: 60px;
`;

S.RememberMe = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  ${fontSizeH8}
  ${blackColor}
  margin-bottom: 20px;
  font-weight: 300;
`;

S.LoginButton = styled.button`
  width: 410px;
  height: 50px;
  padding: 10px;
  background-color: #A5ADB8;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 500;
  border-radius: 5px;
  cursor: not-allowed;
  transition: all 0.3s ease-in-out;

  &.active {
    background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
    cursor: pointer;
  }
`;

export default S;
