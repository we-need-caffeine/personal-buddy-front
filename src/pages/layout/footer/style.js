import styled from 'styled-components';
import { mainGreenColor } from '../../../globals/common';

const S = {};

S.Footer = styled.footer`
    background-color: #f8f8f8;
    padding: 40px 0;
    border-top: 1px solid #ddd;
    margin-top: 80px;
    font-size: 14px;
    color: #333;
`;

S.Inner = styled.div`
    width: 1160px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

S.Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

S.Left = styled.div`

`;

S.Logo = styled.img`
    width: 150px;
    height: auto;
`;

S.Right = styled.div`
    display: flex;
    justify-content: flex-end;
`;

S.Links = styled.div`
    ul {
        list-style: none;
        padding: 0;     
        li {
            margin-bottom: 6px;
            color: #666;
        }       
        a {
            text-decoration: none;      

            &:hover {
                ${mainGreenColor}
                text-decoration: none;
            }
        }
    }
`;

S.Link = styled.a`
    text-decoration: none;
    color: inherit;

        &:hover {
            color: green;
        }
`;

S.Copy = styled.div`
    margin-top: 30px;
    color: #999;
`;

export default S;
