import styled from 'styled-components';

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
  font-size: ${({ theme }) => theme.FONT_SIZE.h6};
  color: ${({ theme }) => theme.PALLETE.black};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
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
    color: ${({ theme }) => theme.PALLETE.black};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};

    &.active {
      color: ${({ theme }) => theme.PALLETE.main}; // NavLink 활성화 시 색상 변경
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
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 40px;
    height: 40px;
    border-radius: 36px;
    margin-right: 25px;
    cursor: pointer;
  }

  span {
    cursor: pointer;
  }
`;

export default S;



// import theme from "../../../globals/theme";

// export const headerContainer = {
//     backgroundColor: theme.PALLETE.background.white,
//     position:'fixed',
//     display: "flex",
//     justifyContent: "center",
//     width: "100%",
//     height: "90px",
//     transition: "transform 0.5s ease",
//     zIndex: "10000",
//     fontSize: theme.FONT_SIZE.h6,
//     fontColor: theme.PALLETE.black,
//     fontWeight: theme.FONT_WEIGHT.regular,
// };

// export const headerMainContainer = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "1400px",
// };

// export const headerLeftContainer = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
// };

// export const headerRightContainer = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
// };

// export const headerMainIconContainer = {
//     display: "flex",
//     alignItems: "center",
//     width: "70px",
//     height: "46px",
// }

// export const headerLinkContainer = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginLeft: "54px",
//     width: "558px",
// }

// export const headerSocialContainer = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "80px",
//     marginRight: "20px",
// }

// export const headerProfileContainer = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
// }