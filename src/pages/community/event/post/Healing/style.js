import styled from 'styled-components';
import { blackColor, flexCenter, 
    fontSizeH7, fontSizeH8, fontWeightBold,  
    gray4Color, pointRedColor, whiteColor } from '../../../../../globals/common';
import { Link } from 'react-router-dom';

const S = {};

S.Container = styled.div`
  width: 1000px;
  margin: 60px auto;
  padding: 0 16px;
`;

S.ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
  margin-top: 30px;

  img {
    width: 100%;

  }
`;

S.IsSuccess = styled.div`
    ${flexCenter};
    width: 620px;
    height: 60px;
    position: absolute;
    bottom: 200px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ $joined, theme }) => $joined ? theme.PALLETE.primary.subBlue : '#BBB'};
    color: #fff;
    border-radius: 50px;
    font-weight: bold;
    font-size: 20x;
`;

S.MetaBox = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.primary.subBlue};
  padding-bottom: 10px;
`;

S.TitleRow = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 18px;
`;

S.Title = styled.h2`
  font-size: 24px;
  margin: 0 0 12px 0;
  font-weight: 500;
  color: #222;
`;

S.Date = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.PALLETE.gray.gray4};
`;

S.MetaBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
`;

S.Author = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;

  & span {
    font-size: 18px;
    flex-shrink: 0;
    font-weight: 500;
    color: #222;
    margin: 0 0 0 6px;
  }
`;

S.StatBox = styled.div`
  display: flex;
  gap: 8px;
  margin: 0 0 0 auto;
  white-space: nowrap;
  color: ${({ theme }) => theme.PALLETE.gray.gray4};

  strong {
    color: ${({ theme }) => theme.PALLETE.black};
    margin: 0 4px;
    font-size: 16px;
    color: #666;
    font-weight: 300;
  }
  & span {
    font-size: 16px;
    color: #666;
    font-weight: 300;
  }
`;

// 댓글 입력창 박스
S.CommentInputBox = styled.div`
    width: 1000px;
`;

// 댓글 입력 영역
S.Textarea = styled.textarea`
    font: inherit;
    resize: none;
    outline: none;
    width: calc(100% - 42px);
    height: 100px;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #ccc;
    color: #666;
    font-weight: 300;
    font-size: 16px;
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

    & span {
        font-weight: 700;
        color: #ccc;
    }

    & p {
        font-weight: 500;
    }
    /* .div{
        display: flex;
        align-items: center;
        gap: 4px;

    } */
`;

// 글자 수 표시
S.CharCount = styled.div`
    color: ${({ theme }) => theme.PALLETE.black};
    font-size: 16px;
    font-weight: 700;
    padding-right: 4px;
`;

// 댓글 등록 버튼
S.SubmitButton = styled.button`
    text-align: center;
    border: none;
    border-radius: 50px;
    width: 120px;
    height: 44px;
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

S.BestCommentSection = styled.div`
  margin-bottom: 30px;
`;

S.BestBadgeWrap = styled.div`
    display: flex;
`

S.BestCommentItem = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.BestBadge = styled.div`
  ${flexCenter};
  background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
  width: 80px;
  height: 24px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
  color: white;
`;

S.CommentList = styled.div`
  margin-top: 30px;
  border-top: 1px solid #ccc;
`;

S.CommentItem = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.CommentUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

S.ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;
S.Right = styled.div`
    display: flex;
    gap: 16px;
    margin: 0 0 0 auto;
`;

S.Nickname = styled.span`
  ${fontSizeH8};
  font-weight: bold;
  ${blackColor};
`;

S.CommentContents = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.PALLETE.black};
  white-space: pre-wrap;
  word-break: break-word;
`;

S.CommentLikeButton = styled.button`
  ${flexCenter};
  padding: 6px 12px;
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

S.Refer = styled.div`
  ${flexCenter};
  margin-top: 80px;
  margin-bottom: 100px;
  font-size: 18px;
  font-weight: 300;
`
S.CommentTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.CommentBottomRow = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: flex-end; */
  margin-top: 6px;
`;

S.CommentLeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

S.CommentRightBox = styled.div`
  display: flex;
  align-items: center;
`;

S.CommentMetaBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.PALLETE.gray.gray4};
`;

S.LikeCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    width: 14px;
    height: 14px;
  }
`;

S.CommentDate = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.PALLETE.gray.gray4};
`;

S.CommentContents = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.PALLETE.black};
  white-space: pre-wrap;
  word-break: break-word;
  flex: 1;
`;


S.LikeWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width : 100%;
`

// 댓글 작성일 + 좋아요 묶은 것
S.LeftCommentWrapper = styled.div`
    display: flex;
    align-items: center;
    
    gap: 12px;
    margin-top: 4px;
    color: ${({ theme }) => theme.PALLETE.gray.gray4};
    font-size: 13px;
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

S.BestBadgeWrap = styled.div`
    display: flex;
`

// BEST 뱃지
S.BestBadge = styled.div`
    ${flexCenter}
    background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
    font-size: 12px;
    font-weight: bold;
    padding: 4px 8px 4px 6px;
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
    padding: 40px 20px;
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
    flex-direction: column;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
`;

// 댓글 작성일
S.CommentDate = styled.span`
    font-size: 16px;
    font-weight: 300;
    color: #999;
`;

// 댓글 좋아요 수
S.CommentLikeCount = styled.span`
    display: flex;
    align-items: center;

    gap: 4px;
    font-size: 13px;
    color: ${({ theme }) => theme.PALLETE.gray.gray4};

    p {
        font-size: 16px;
        font-weight: 600;
        color: #666;
    }
    img {
        width: 14px;
        height: 14px;
    }
`;

S.LikeWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width : 100%;
`

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
    padding: 6px 16px;
    border: none;
    border-radius: 50px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    background-color: ${({ liked, theme }) =>
        liked ? theme.PALLETE.primary.subBlue : theme.PALLETE.gray.gray3};

    & span {
        margin : 0 4px 0 0;
    }

    &:hover {
        background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
    }
`;

// 댓글 내용
S.CommentContents = styled.p`
    font-size: 18px;
    font-weight: 300;
    color: ${({ theme }) => theme.PALLETE.black};
    white-space: pre-wrap;
    word-break: break-word;
    margin: 5px 0 30px 0;
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

//--------------------------
export default S;
