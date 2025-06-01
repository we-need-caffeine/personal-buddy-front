import styled from 'styled-components';
import { blackColor, flexCenter, 
    fontSizeH7, fontSizeH8, fontWeightBold,  
    gray4Color, whiteColor } from '../../../../../globals/common';

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
    bottom: 20px;
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
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
`;

S.Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
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
  gap: 6px;
`;

S.StatBox = styled.div`
  color: ${({ theme }) => theme.PALLETE.gray.gray4};

  strong {
    color: ${({ theme }) => theme.PALLETE.black};
    margin: 0 4px;
  }
`;

S.CommentInputBox = styled.div`
  margin-bottom: 40px;
`;

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

S.InputBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  ${fontSizeH7};
  ${gray4Color};
`;

S.CharCount = styled.div`
  color: ${({ theme }) => theme.PALLETE.black};
  font-size: 14px;
`;

S.SubmitButton = styled.button`
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  ${whiteColor};
  ${fontSizeH7};
  ${fontWeightBold};
  background-color: ${({ active, theme }) =>
    active ? theme.PALLETE.primary.subBlue : theme.PALLETE.gray.gray3};
  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
`;

// BEST 댓글
S.BestCommentSection = styled.div`
  margin-bottom: 30px;
`;

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

// 일반 댓글 리스트
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

S.Nickname = styled.span`
  ${fontSizeH8};
  font-weight: bold;
  ${blackColor};
`;

S.CommentDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.PALLETE.gray.gray4};
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

// 수정 삭제
S.EditDeleteBox = styled.div`
  display: flex;
  gap: 6px;
  justify-content: flex-end;
`;

S.CommentEditButton = styled.button`
  font-size: 13px;
  color: ${({ theme }) => theme.PALLETE.gray.gray4};
  background: none;
  border: none;
  cursor: pointer;
`;

S.CommentDeleteButton = styled.button`
  font-size: 13px;
  color: ${({ theme }) => theme.PALLETE.pointRed};
  background: none;
  border: none;
  cursor: pointer;
`;

S.CommentSeparator = styled.span`
  color: #ccc;
`;

S.SaveButton = styled.button`
  padding: 6px 12px;
  background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

S.CancelButton = styled.button`
  padding: 6px 12px;
  background-color: ${({ theme }) => theme.PALLETE.gray.gray3};
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
`;

// 댓글 날짜 + 좋아요 묶는 Wrapper
S.LeftCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
  color: ${({ theme }) => theme.PALLETE.gray.gray4};
  font-size: 13px;
`;

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

S.Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

S.Refer = styled.div`
  ${flexCenter};
  margin-top: 80px;
  margin-bottom: 100px;
  font-weight: bold;
`

export default S;
