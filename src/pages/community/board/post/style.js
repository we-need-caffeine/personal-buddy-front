// Board 상세 페이지 Style - BoardPost

import styled from 'styled-components';
import {
  blackColor, flexCenter, fontSizeH7, fontSizeH8,
  fontWeightBold, gray3Color, gray4Color,
  pointRedColor,
  subBlueColor, whiteColor
} from '../../../../globals/common';
import { Link } from 'react-router-dom';

const S = {};

// 전체 페이지 컨테이너
S.Container = styled.div`
    width: 1000px;
    margin: 60px auto;
    padding: 0 16px;
`;

// 제목
S.Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;


// 작성자 정보
S.TopInfoBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 14px;
    color: #888;
`;

// 작성자, 날짜
S.Left = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

// 조회수, 좋아요 수, 댓글 수
S.Right = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

// 프로필 이미지
S.ProfileImg = styled.img`
    width: 28px;
    height: 28px;
    border-radius: 50%;
`;

// 작성자 닉네임
S.Nickname = styled.span`
    ${fontSizeH8};
    font-weight: bold;
    ${blackColor};
`;

// 작성일
S.Date = styled.span`
    ${fontSizeH8};
`;

// 조회수
S.ViewCount = styled.span`
    font-size: 13px;
`;

// 좋아요 수
S.LikeCount = styled.span`
    font-size: 13px;
`;

// 댓글 수
S.CommentCount = styled.span`
    font-size: 13px;
`;

// 게시글 이미지
S.Image = styled.img`
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin: 30px 0;
`;

// 게시글 본문
S.Content = styled.p`
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 50px;
`;

// 게시글 좋아요 버튼
S.LikeButton = styled.button`
    ${flexCenter};
    width: 200px;
    height: 50px;
    background-color: ${({ liked, theme }) => liked ? theme.PALLETE.primary.subBlue : gray3Color};
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 20px;
    font-weight: bold;
    margin: 40px auto 150px; 
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    // 좋아요 누른 상태면 hover 시 색 안 바뀌게
    ${({ liked, theme }) =>
        !liked &&
        `&:hover {
        background-color: ${theme.PALLETE.primary.subBlue};
        }`}
`;

// 댓글 제목 박스
S.CommentTitleBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
`;

// 댓글 수 강조
S.CommentCountText = styled.span`
    ${subBlueColor};
`;

// 댓글 입력창 박스
S.CommentInputBox = styled.div`

`;

// 댓글 입력 영역
S.Textarea = styled.textarea`
    font: inherit;
    resize: none;
    outline: none;
    width: 100%;
    height: 100px;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray4};
    ${blackColor};
    ${fontSizeH7};
`;

// 댓글 입력창 하단
S.InputBottom = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
    gap: 8px;
    ${fontSizeH7};
    ${gray4Color};
    margin-bottom: 58px;

    /* .div{
        display: flex;
        align-items: center;
        gap: 4px;

    } */
`;

// 글자 수 표시
S.CharCount = styled.div`
    color: ${({ theme }) => theme.PALLETE.black};
    font-size: 14px;
    padding-right: 4px;
`;

// 댓글 등록 버튼
S.SubmitButton = styled.button`
    text-align: center;
    border: none;
    border-radius: 50px;
    width: 79px;
    height: 43px;
    ${whiteColor};
    ${fontSizeH7};
    ${fontWeightBold};

    background-color: ${({ active, theme }) =>
        active ? theme.PALLETE.primary.subBlue : theme.PALLETE.gray.gray3};

    cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};

    &:disabled {
        cursor: not-allowed;
    }
`;

// BEST 댓글
S.BestCommentSection = styled.div`
    margin-bottom: 30px;
`;

// BEST 댓글 박스
S.BestCommentItem = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    margin-bottom: 12px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

// BEST 뱃지
S.BestBadge = styled.div`
    ${flexCenter}
    background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
    width: 67px;
    height: 22px;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
    color: white;
`;

// 일반 댓글 리스트
S.CommentList = styled.div`
    margin-top: 30px;
    border-top: 1px solid #ccc;
`;

// 댓글 1개
S.CommentItem = styled.div`
    background-color: white;
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

// 댓글 작성자 + 좋아요 버튼
S.CommentTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

// 댓글 작성자 정보
S.CommentUser = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: bold;
`;

// 댓글 작성일
S.CommentDate = styled.span`
    display: flex;
    justify-content: left;
    font-size: 13px;
    color: ${({ theme }) => theme.PALLETE.gray.gray4};
`;

// 댓글 좋아요 수
S.CommentLikeCount = styled.span`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: ${({ theme }) => theme.PALLETE.gray.gray4};

    img {
        width: 14px;
        height: 14px;
    }
`;

// 댓글 작성일 + 좋아요 묶은 것
S.LeftCommentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
    color: ${({ theme }) => theme.PALLETE.gray.gray4};
    font-size: 13px;
`;

// 댓글 좋아요 버튼
S.CommentLikeButton = styled.button`
    ${flexCenter};
    width: 40px;
    height: 27px;
    border: none;
    border-radius: 50px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    background-color: ${({ liked, theme }) =>
        liked ? theme.PALLETE.primary.subBlue : theme.PALLETE.gray.gray3};

    &:hover {
        background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
    }
`;

// 댓글 내용
S.CommentContents = styled.p`
    font-size: 15px;
    color: ${({ theme }) => theme.PALLETE.black};
    white-space: pre-wrap;
    word-break: break-word;
`;

// 제목 + 수정/삭제 한 줄 정렬
S.TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

// 수정/삭제 박스
S.EditDeleteBox = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

// 구분선 |
S.Separator = styled.span`
    color: #ccc;
    font-size: 13px;
`;

// 수정 버튼
S.EditButton = styled(Link)`
    font-size: 13px;
    ${pointRedColor};
    text-decoration: none;
    cursor: pointer;

    &:hover {
        font-weight: 500;
    }
`;

// 삭제 버튼
S.DeleteButton = styled.button`
    font-size: 13px;
    ${pointRedColor};
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;

    &:hover {
        font-weight: 500;
    }
`;

// 댓글 수정 버튼 
S.CommentEditButton = styled.button`
    font-size: 13px;
    ${pointRedColor};
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

// 댓글 삭제 버튼
S.CommentDeleteButton = styled.button`
    font-size: 13px;
    ${pointRedColor};
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

// 댓글 구분선
S.CommentSeparator = styled.span`
    font-size: 13px;
    color: #ccc;
    margin: 0 4px;
`;


export default S;
