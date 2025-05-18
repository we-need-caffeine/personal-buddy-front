import styled from 'styled-components';
import { flexCenter, fontSizeH8, gray3Color, gray4Color, subBlueColor } from '../../../../globals/common';

const S = {};

S.Container = styled.div`
    width: 1000px;
    margin: 60px auto;
    padding: 0 16px;
`;

S.Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

S.MetaTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    font-size: 14px;
    color: #888;
`;

S.RightMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    color: #999;
`;

S.AuthorBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

S.ProfileImg = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
`;

S.Nickname = styled.span`
    ${fontSizeH8};
    font-weight: bold;
`;

S.Date = styled.span`
    ${fontSizeH8};
`;

S.Image = styled.img`
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin: 30px 0;
`;

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

S.LikeButton = styled.button`
    width: 200px;
    height: 50px;
    background-color: ${({ liked, theme }) => liked ? theme.PALLETE.primary.subBlue : gray3Color};
    border: none;
    border-radius: 25px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    cursor: pointer;

    &:hover{
        background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
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

S.CommentCount = styled.span`
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
    background-color: ${subBlueColor.color};
    color: white;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
`;

S.CommentList = styled.div`
    margin-top: 30px;
    border-top: 1px solid #ccc;
`;

S.CommentItem = styled.div`
    padding: 16px 0;
    border-bottom: 1px solid #eee;
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

S.CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`;

S.CommentWriter = styled.span`
    font-weight: bold;
`;

S.CommentTime = styled.span`
    font-size: 13px;
    color: ${gray4Color.color};
`;

S.CommentContent = styled.p`
    font-size: 14px;
    line-height: 1.5;
    color: #333;
`;

export default S;
