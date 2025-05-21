import styled from 'styled-components';
import { blackColor, fontSizeH10, fontSizeH6, fontWeightBold, fontWeightRegular, mainGreenColor, whiteColor } from '../../../globals/common';

const S = {};

// 헤더 전체 wrapper (transform 이동)
S.Container = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.background.white};
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 90px;
  transition: transform 0.5s ease;
  z-index: 10000;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  ${fontSizeH6};
  ${blackColor};
  ${fontWeightRegular}
`;

// 가운데 정렬되는 내부 컨테이너 (전체 max-width 설정)
S.Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1400px;
`;

// 왼쪽 영역 (아이콘 + 메뉴 링크)
S.Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 오른쪽 영역 (알림 + 프로필)
S.Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 왼쪽 아이콘 컨테이너
S.IconBox = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  height: 46px;
`;

// 메뉴 링크 컨테이너
S.LinkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 54px;
  width: 558px;

  a {
    text-decoration: none;
    ${blackColor};
    ${fontWeightRegular}
    &.active {
        ${mainGreenColor}
    }
  }
`;

// 알림 아이콘 영역 (message, alert)
S.SocialBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  margin-right: 20px;

  img {
    cursor: pointer;
  }
`;

// 프로필 영역 (사진 + 로그아웃)
S.ProfileBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    cursor: pointer;
  }
`;

S.MemberProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 36px;
  margin-right: 25px;
  cursor: pointer;
`

S.ProfileCardDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 9998;
`;


S.AlertModalContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 240px;
  z-index: 9999;
`

S.CardBG = styled.div`
  position: fixed;
  left: 0;
  top : 0;
  width: 100vw;
  height: 100vh;
  z-index: 9000;
`

S.AlertIconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

S.AlertImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`

S.NotReadAlertCount = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.PALLETE.pointRed};
  border-radius: 50px;
  padding: 5px;
  top: -7px;
  right: 16px;
  transform: translateX(100%);
  ${fontWeightBold}
  ${fontSizeH10}
  ${whiteColor}
`


export default S;