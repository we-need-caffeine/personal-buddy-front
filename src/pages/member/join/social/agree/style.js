import styled from 'styled-components';
import { fontSizeH7 } from '../../../../../globals/common';

const S = {}

  S.Container = styled.div`
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  S.Logo = styled.img`
    margin-bottom: 45px;
  `;

  S.Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 25px;
    width: 460px;

    span {
      font-size: 20px;
      font-weight: 500;
    }

    img {
      width: 32px;
      height: 32px;
      cursor: pointer;
      margin-right: 0.5rem;
    }

    .text-essential {
      color: #01cd74;
    }

    .text-optional {
      color: #8e8e93;
    }

    p {
      ${fontSizeH7}
      font-weight: 300;
      margin: 0px 18px 0px 32px;
      width: 395px;
      max-height: 85px;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      overflow-y: auto;
      overflow-x: hidden;
      line-height: 25px;
      padding: 15px;
    }
  `;

  S.NextButton = styled.button`
    width: 460px;
    height: 50px;
    padding: 10px;
    background-color: #a5adb8;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: 500;
    border-radius: 5px;
    cursor: not-allowed;
    transition: all 0.3s ease-in-out;

    &.active {
      background-color: #01cd74;
      cursor: pointer;
    }

    &.active:hover {
      background-color: #218838;
    }
  `;

  S.HiddenInput = styled.input.attrs({ type: 'hidden' })``;

  S.CheckboxImg = styled.img`
    width: 32px;
    height: 32px;
    cursor: pointer;
    margin-right: 0.5rem;
  `;

  S.TermText = styled.span`
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  `;

export default S;