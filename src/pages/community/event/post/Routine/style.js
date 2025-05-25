import styled from 'styled-components';
import { blackColor, flexCenter, fontSizeH7, fontWeightBold, gray4Color, subBlueColor, whiteColor } from '../../../../../globals/common';


const S = {};

S.Container = styled.div`
    max-width: 768px;
    margin: 40px auto;
    padding: 0 20px;
`;

S.ImageBox = styled.div`
    img {
        width: 100%;
        border-radius: 12px;
        object-fit: cover;
    }
`;
S.ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 32px;

    img {
        width: 100%;
        height: auto;
        display: block;
    }
`;

S.IsSuccess = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 622px;
    height: 60px;
    background-color: ${({ $joined, theme }) => $joined ? theme.PALLETE.primary.subBlue : '#BBBBBB'};
    color: white;
    font-weight: bold;
    font-size: 18px;
    ${flexCenter};
    border-radius: 50px;
    z-index: 10;
    pointer-events: none;
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


export default S;
