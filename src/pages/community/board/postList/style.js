import styled from 'styled-components';
import {
  flexCenter,
  fontSizeH8,
  fontSizeH5,
  fontSizeH9,
  fontWeightBold,
  fontWeightMedium,
  fontWeightLight,
  fontSizeH4,
  fontWeightRegular
} from '../../../../globals/common';
import { Link } from 'react-router-dom';

const S = {};

// ---------- 헤더 영역 (상단 설명 + 검색/해시태그 + 글쓰기 버튼) -----------
// 게시판 헤더 전체 영역
S.BoardHeader = styled.div`
    width: 100%;
`;

// 제목과 글쓰기 버튼 나란히 정렬
S.TitlesAndWriteBtn = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin: 0 0 55px 0;
`

// 제목 묶음
S.Titles = styled.div`

`
// 서브 타이틀 (설명 문구)
S.SubTitle = styled.div`
    font-size: 18px;
    font-weight: 300;
    color: #666;
    padding-bottom: 3px;
    margin: 0 0 6px 0;
`;

// 메인 타이틀 (큰 제목)
S.BoardTitle = styled.h2`
    font-size: 30px;
    font-weight: 700;
    color: #222;
    margin-top: 1px;
    text-align: left;
`;

// ----------  검색창 & 해시태그 영역 -----------
// 검색창 + 태그 버튼 전체 영역
S.SearchArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
`;

S.SearchPositionWrap = styled.div`
    position: relative;
    margin-bottom: 20px;    

    img {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translate(0, -50%);
    }
    
`

// 검색 입력창
S.SearchInput = styled.input`
    width: 540px;
    height: 45px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 300;
    border: 1px solid #bbb;
    border-radius: 30px;
    outline: none;
    &::placeholder {
      color: #bbb;
    }
`;

// 해시태그 버튼 그룹
S.TagArea = styled.div`
    display: flex;
    gap: 12px;
`;

// 해시태그 버튼
S.TagButton = styled.button`
    padding: 8px 16px;
    font-size: 14px;
    font-weight: ${({ theme, $active }) =>
        $active ? '500' : '300'};
    border: ${({ theme, $active }) =>
        $active ? 'solid 1px #01CD74' : '1px solid #ccc'};
    color: ${({ theme, $active }) =>
        $active ? '#222' : '#666'};
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: ${({ theme, $active }) =>
        $active ? theme.PALLETE.primary.mainGreen : 'transparent'};

    &:hover {
        border: solid 1px #01CD74;
        color: #222;
        background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
    }
`;


// ---------- 정렬 버튼 영역 (최신순, 좋아요순 등) -----------
// 정렬 버튼 영역
S.SortBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 12px;

    p {
        border: none;
        background: none;
        cursor: pointer;
        ${fontSizeH8}
        ${fontWeightMedium}
        color: ${({ theme }) => theme.PALLETE.gray.gray5};
    }
    
`;

S.SortButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    ${fontSizeH8}
    ${fontWeightMedium}
    color: ${({ theme, $active }) =>
        $active ? theme.PALLETE.primary.mainGreen : theme.PALLETE.gray.gray5};
    &:hover {
        color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
    }
`;



// ---------- 글쓰기 버튼 -----------
S.WriteBtn = styled(Link)`
    ${flexCenter}
    margin-left: auto;
    width: 120px;
    height: 44px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    background:${({ theme }) => theme.PALLETE.primary.subBlue};
    border: none;
    border-radius: 50px;
    cursor: pointer;
`;

// ---------- 게시글 카드 전체 그리드 (flex-wrap) -----------
S.PostGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 1400px;
    gap: 60px 40px;
`;

// ---------- 게시글 카드 1개 단위 -----------
// 게시글 카드 한 개
S.PostCard = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

// 썸네일 이미지
S.Thumbnail = styled.img`
    width: 320px;
    height: 420px;
    flex-shrink: 0;
    object-fit: cover;
    border-radius: 20px;
    background: ${({ theme }) => theme.PALLETE.gray.gray1};
    transition: transform 0.2s ease;
    margin: 0 0 25px 0;
    &:hover {
        transform: scale(1.03);
    }
`;

S.TagWrap = styled.div`
  display: flex;
  margin: 0 0 20px 0;
`;

// 해시태그 
S.Tag = styled.div`
    ${flexCenter}
  flex : 0 0 auto;
  font-size: 14px;
  color: #666;
  border: 1px solid #ccc;
  border-radius: 30px;
  text-align: center;
  padding: 10px 16px 8px 16px;
  font-weight: 300;
  letter-spacing: 1px;
`;

// 게시글 제목
S.Title = styled.span`
    font-size: 24px;
    margin: 0 0 12px 0;
    font-weight: 500;
    color: #222;
`;

// 작성자 정보 영역 (프로필 이미지 + 닉네임)
S.UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 50px;
`;

// 프로필 이미지
S.ProfileImg = styled.img`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
`;

// 닉네임
S.Nickname = styled.span`
    font-size: 18px;
    font-weight: 400;
    color: #666;
`;

// 작성일
S.Date = styled.span`
  font-size: 16px;
  font-weight: 300;
  margin: 0 0 8px 0;
  color: #999;
`;

S.MetaBoxWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

// 좋아요, 조회수, 댓글 아이콘 + 숫자
S.MetaInfo = styled.div`
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 12px 0;
    color: #666;
    font-weight: 300;
    span {
        display: flex;
        align-items: center;
    } 
    .icon {
        width: 14px;
        height: 14px;
        margin-right: 3px;
    }
`;

// ---------- 프로필 모달 -----------
S.ProfileCardDropdown = styled.div`
    position: absolute;
    top: ${({yLocation}) => (
        `${yLocation}px`
    )};
    right: calc(100% - ${({xLocation}) => (
        `${xLocation}px`
    )});
    transform: translateX(100%);
    z-index: 9998;
`;

S.CardBG = styled.div`
    position: fixed;
    left: 0;
    top : 0;
    width: 100vw;
    height: 100vh;
    z-index: 9000;
`
export default S;
