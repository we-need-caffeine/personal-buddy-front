import styled from 'styled-components';
import { flexCenter, fontSizeH8, gray3Color, gray4Color, mainGreenColor, subBlueColor } from '../../../../globals/common';

const S = {};

// 게시글 상세 페이지 전체 컨테이너
S.Container = styled.div`
    width: 1000px;
    margin: 60px auto;
    padding: 0 16px;
`;

// 게시글 제목
S.Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

// 작성자 정보와 작성일이 들어가는 상단 박스
S.TopInfoBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 14px;
    color: #888;
`;

S.Left = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

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

// 닉네임
S.Nickname = styled.span`
    ${fontSizeH8};
    font-weight: bold;
`;

// 작성일
S.Date = styled.span`
    ${fontSizeH8};
`;

S.ViewCount = styled.span`
    font-size: 13px;
`;

S.LikeCount = styled.span`
    font-size: 13px;
`;

// 게시글 대표 이미지
S.Image = styled.img`
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin: 30px 0;
`;

// 게시글 본문 텍스트
S.Content = styled.p`
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 50px;
`;

S.LikeBox = styled.div`
    ${flexCenter};
    margin-bottom: 80px;
    gap: 4px;

    img {
        width: 16px;
        height: 16px;
    }
`;

S.CommentTitleBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
`;

S.CommentCountText = styled.span`
    color: ${subBlueColor.color};
`;

S.CommentInputBox = styled.div`
    border: 1px solid ${gray4Color.color};
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 10px;
`;

S.Textarea = styled.textarea`
    width: 100%;
    height: 100px;
    font-size: 14px;
    resize: none;
    border: none;
    outline: none;
`;

S.InputBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

S.CharCount = styled.div`
    font-size: 13px;
    color: ${gray4Color.color};
`;

S.SubmitButton = styled.button`
    padding: 8px 16px;
    border: none;
    background-color: ${({ active }) => (active ? subBlueColor.color : '#ddd')};
    color: white;
    font-weight: bold;
    border-radius: 6px;
    cursor: ${({ active }) => (active ? 'pointer' : 'default')};
`;

S.BestCommentSection = styled.div`
    margin-bottom: 30px;
`;

S.BestCommentItem = styled.div`
    background-color: #f6f6f6;
    padding: 16px;
    margin-bottom: 12px;
`;

S.BestBadge = styled.div`
    display: inline-block;
    background-color: ${subBlueColor.color};
    font-size: 12px;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
`;

S.CommentList = styled.div`
    margin-top: 30px;
    border-top: 1px solid #ccc;
`;

S.CommentItem = styled.div`
    padding: 16px 0;
    border-bottom: 1px solid #eee;
`;

// 게시글 좋아요 버튼
S.LikeButton = styled.button`
    ${flexCenter};
    width: 200px;
    height: 50px;
    background-color: ${({ liked }) => liked ? subBlueColor.color : gray3Color};
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 150px;
    cursor: pointer;

    &:hover{
        background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
    }
`;

// 댓글 상단
S.CommentTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 댓글 작성자
S.CommentUser = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

// 댓글 작성일
S.CommentDate = styled.span`
    font-size: 13px;
`;

// 댓글 좋아요 수 및 아이콘
S.CommentLikeCount = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;

    img {
        width: 14px;
        height: 14px;
    }

    span {
        font-size: 13px;
    }
`;

// 댓글 본문
S.CommentContent = styled.p`
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    margin-top: 8px;
`;

export default S;
