import styled from 'styled-components';
import { blackColor, fontSizeH6, fontWeightRegular, mainGreenColor } from '../../../globals/common';

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
  left: -150px;
  z-index: 9998;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  padding: 0;
`;


S.AlertModalContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 240px;
  z-index: 9999;
`


export default S;