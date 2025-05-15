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
    margin-bottom: 40px;
`;

// 제목과 글쓰기 버튼 나란히 정렬
S.TitlesAndWriteBtn = styled.div`
    display: flex;
    justify-content: space-between;
`

// 제목 묶음
S.Titles = styled.div`

`
// 서브 타이틀 (설명 문구)
S.SubTitle = styled.div`
  ${fontSizeH8}
  ${fontWeightRegular}
  color: #555;
  padding-bottom: 3px;
`;

// 메인 타이틀 (큰 제목)
S.BoardTitle = styled.h2`
    ${fontSizeH4}
    ${fontWeightBold}
    margin-bottom: 20px;
`;

// ----------  검색창 & 해시태그 영역 -----------
// 검색창 + 태그 버튼 전체 영역
S.SearchArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
`;

// 검색 입력창
S.SearchInput = styled.input`
    width: 540px;
    height: 45px;
    padding: 0 20px;
    font-size: 19px;
    font-weight: 400;
    border: 1px solid #bbb;
    border-radius: 30px;
    outline: none;
    margin-bottom: 20px;    
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
    font-weight: 500;
    color: #424242;
    background-color: #f1f1f1;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.2s;  
    &:hover {
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

    button {
        border: none;
        background: none;
        cursor: pointer;
        ${fontSizeH8}
        ${fontWeightMedium}
        color: ${({ theme }) => theme.PALLETE.gray.gray5};

        &:hover {
        color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
    }
    }
    p {
        border: none;
        background: none;
        cursor: pointer;
        ${fontSizeH8}
        ${fontWeightMedium}
        color: ${({ theme }) => theme.PALLETE.gray.gray5};
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
    gap: 40px;
    margin-top: 80px;
`;

// ---------- 게시글 카드 1개 단위 -----------
// 게시글 카드 한 개
S.PostCard = styled.div`
    width: 320px;
    height: 600px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

// 썸네일 이미지
S.Thumbnail = styled.img`
    width: 320px;
    height: 420px;
    object-fit: cover;
    border-radius: 20px;
    background: ${({ theme }) => theme.PALLETE.gray.gray1};

    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.03);
    }
`;

// 해시태그 
S.Tag = styled.div`
    ${flexCenter}
    width: 86px;
    height: 24px;
    ${fontSizeH8}
    ${fontWeightMedium}
    color: ${({ theme }) => theme.PALLETE.gray.gray5};
    background: ${({ theme }) => theme.PALLETE.gray.gray1};
    border-radius: 5px;
    margin-top: 15px;
`;

// 게시글 제목
S.Title = styled.span`
    ${fontSizeH5}
    ${fontWeightBold}
    color: ${({ theme }) => theme.PALLETE.gray.gray6};
    padding: 14px 0 18px 0;
`;

// 작성자 정보 영역 (프로필 이미지 + 닉네임)
S.UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 30px;
    margin-bottom: 10px;
`;

// 프로필 이미지
S.ProfileImg = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
`;

// 닉네임
S.Nickname = styled.span`
    ${fontSizeH8}
    ${fontWeightMedium}
    color: ${({ theme }) => theme.PALLETE.gray.gray4};
`;

// 작성일
S.Date = styled.span`
    ${fontSizeH9}
    ${fontWeightLight}
    color: ${({ theme }) => theme.PALLETE.gray.gray4};
    padding-bottom: 5px;
`;

// 좋아요, 조회수, 댓글 아이콘 + 숫자
S.MetaInfo = styled.div`
    ${fontSizeH9}
    ${fontWeightLight}
    color: ${({ theme }) => theme.PALLETE.gray.gray4};
    display: flex;
    gap: 10px;
    span {
        display: flex;
        align-items: center;
        gap: 3px;
    } 
    .icon {
        width: 12px;
        height: 12px;
    }
`;
export default S;
