import styled from 'styled-components';
import { fontSizeH7, gray2Color, gray3Color, gray6Color } from '../../../globals/common';

const S = {};

// 기본 레이아웃
S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
`;

// 회원가입 전체 컨테이너
S.JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 460px;
  margin-top: 30px;
  gap: 30px;
`;

// 입력 그룹 전체
S.InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// 각 항목 wrapper
S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

// 텍스트 라벨과 실패 메시지 포함
S.InputTitle = styled.div`
  display: flex;
  align-items: center;

  #nickname-fail-message {
    margin: 0px 20px;
    font-size: var(--h9);
  }
`;

// 입력창 wrapper
S.InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: #C5CCD2 1px solid;
  border-radius: 10px;
  margin-bottom: -1px;

  input {
    width: 100%;
    height: 60px;
    padding: 10px 50px 10px 10px;
    color: black;
    margin: 0px 20px;
    border: none;
    ${fontSizeH7}
    box-sizing: border-box;
    outline: none;
    transition: all 0.3s ease-in-out;
  }

  span {
    width: 80px;
    margin: 0px 20px;
    ${gray3Color}
    font-weight: 700;
  }
`;

// 이미지 업로드 영역
S.ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

S.ImagePlusButton = styled.label`
  position: absolute;
  width: 60px;
  height: 60px;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  border-radius: 30px;
  background-color: #333333;
  opacity: 0.8;
  background-image: url("../../assets/images/member/plus-icon.png");
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

S.ImageMinusButton = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  top: calc(50% - 30px);
  left: calc(50% + 30px);
  border-radius: 30px;
  background-color: #333333;
  opacity: 0.8;
  background-image: url("../../assets/images/member/minus-icon.png");
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

// 프로필 이미지
S.ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

// 가입 버튼
S.SignupButton = styled.button`
  width: 460px;
  height: 50px;
  padding: 10px;
  background-color: #a5adb8; /* 비활성화 상태 */
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 500;
  border-radius: 5px;
  margin-top: 40px;
  cursor: not-allowed;
  transition: all 0.3s ease-in-out;

  &.active {
    background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
    cursor: pointer;
  }

  &.active:hover {
    background-color: #218838;
  }
`;

export default S;
