import styled from 'styled-components';
import {
  flexCenter,
  fontSizeH8,
  fontSizeH5,
  fontSizeH9,
  fontWeightBold,
  fontWeightMedium,
  fontWeightLight,
  fontSizeH4
} from '../../../../globals/common';
import { Link } from 'react-router-dom';

const S = {};

S.BoardHeader = styled.div`
    width: 100%;
    margin-bottom: 40px;
`;

S.BoardTitle = styled.h2`
    ${fontSizeH4}
    ${fontWeightBold}
    margin-bottom: 20px;
`;

S.SearchArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
`;

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

S.TagArea = styled.div`
    display: flex;
    gap: 12px;
`;

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

S.PostGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin-top: 80px;
`;

S.PostCard = styled.div`
    width: 320px;
    height: 600px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

S.Thumbnail = styled.img`
    width: 320px;
    height: 420px;
    object-fit: cover;
    border-radius: 20px;
    background: ${({ theme }) => theme.PALLETE.gray.gray1};
`;

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

S.Title = styled.span`
    ${fontSizeH5}
    ${fontWeightBold}
    color: ${({ theme }) => theme.PALLETE.gray.gray6};
    padding: 14px 0 18px 0;
`;

S.UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 30px;
    margin-bottom: 10px;
`;

S.ProfileImg = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
`;

S.Nickname = styled.span`
    ${fontSizeH8}
    ${fontWeightMedium}
    color: ${({ theme }) => theme.PALLETE.gray.gray4};
`;

S.Date = styled.span`
    ${fontSizeH9}
    ${fontWeightLight}
    color: ${({ theme }) => theme.PALLETE.gray.gray4};
    padding-bottom: 5px;
`;

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
