import styled from 'styled-components';
import { flexCenter } from '../../../../globals/common';

const S = {};

  S.HotWrapper = styled.div`
    width: 1400px;
    margin: auto;
    display: flex;
    flex-direction: column;
  `;

  S.SubTitle = styled.div`
    color: #424242;
    font-size: 14px;
    font-weight: 400;
    padding-bottom: 3px;
  `;

  S.MainTitle = styled.div`
    color: black;
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 55px;
  `;

  S.HotContainer = styled.div`
    ${flexCenter};
    gap: 40px;
    height: 680px;
    margin-bottom: 60px;
  `;

  S.Hot = styled.div`
    overflow: hidden;
    width: 1160px;
    position: relative;
  `;

  S.HotSlider = styled.div`
    display: flex;
    gap: 100px;
    width: max-content;
    transition: transform 0.5s ease;
  `;

  S.HotContent = styled.div`
    width: 320px;
    height: 670px;
    display: flex;
    flex-direction: column;
  `;

  S.HotImageBox = styled.a`
    position: relative;
    display: inline-block;
    border-radius: 20px;
    background: #e8eaed;

    .img {
      width: 320px;
      height: 420px;
      object-fit: cover;
      border-radius: 20px;
    }
  `;

  S.NumberBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background-color: #009dcc;
    color: white;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    line-height: 50px;
    border-radius: 20px 0 20px 0;
  `;

  S.HotTitle = styled.span`
    font-size: 18px;
    font-weight: 700;
    color: #424242;
    padding: 14px 0 18px;
  `;

  S.HotUserBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 30px;
    margin-bottom: 10px;
  `;

  S.UserNickname = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #808080;
  `;

  S.UserProfile = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  `;

  S.HotDate = styled.span`
    font-size: 12px;
    font-weight: 300;
    color: #808080;
    padding-bottom: 5px;
  `;

  S.HotMetaBox = styled.div`
    font-size: 12px;
    font-weight: 300;
    color: #808080;
    display: flex;
    gap: 10px;

    .icon {
      width: 10px;
      height: 10px;
      margin-right: 3px;
    }
  `;

  S.HotBtnLeft = styled.div`
    width: 50px;
    height: 50px;
    cursor: pointer;
  `;

  S.HotBtnRight = styled.div`
    width: 50px;
    height: 50px;
    cursor: pointer;
  `;

export default S;
