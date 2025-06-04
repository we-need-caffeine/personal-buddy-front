import { Link } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const S = {}

  S.Container = styled.div`
    font-family: 'Spoqa Han Sans Neo', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  S.LoginBox = styled.div`
    background: white;
    border: solid 1px #bbb;
    border-radius: 30px;
    width: 450px;
    min-height: 380px;
    text-align: center;
    margin-top: 30px;
  `;

  S.LoginSelect = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 25px;
    align-items: center;
  `;

  S.Tab = styled(NavLink).withConfig({
    shouldForwardProp: (prop) => prop !== 'right',
  })`
  width: 50%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;

  font-size: 16px;
  font-weight: 500;
  color: #222;
  background-color: #d9d9d9;

  border-top-left-radius: ${({ right }) => (!right ? '25px' : '0')};
  border-top-right-radius: ${({ right }) => (right ? '25px' : '0')};

  &.active {
    background-color: transparent;
  }
`;

  S.BottomLinks = styled.div`
    color: #218838;
    margin-top: 15px;
    font-size: 13px;
    font-weight: 300;

    a {
      color: #aaa;
      margin: 0 5px;
      text-decoration: none;

      &:hover {
        color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
        text-decoration: underline;
      }
    }
  `;
  S.ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  `;

  S.SocialButton = styled.button`
    width: 410px;
    height: 52px;
    padding: 0 24px;
    border: 1px solid #C5CCD2;
    background: none;
    color: #222;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #EFFFF8;
    }

    img {
      width: 20px;
      height: 20px;
      margin-right: 40px;
      object-fit: contain;
    }
  `;


export default S;