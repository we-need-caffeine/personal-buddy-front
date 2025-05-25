import styled from "styled-components";
import {
  fontSizeH4,
  fontSizeH8,
  fontWeightMedium,
} from "../../../../globals/common";

const S = {};

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 61px;
`;

S.TitleWord = styled.div`
  width: 100%;
  font-size: 24px;
  ${fontSizeH4};
`;

S.MenuWord = styled.div`
  width: 100%;
  font-size: 14px;
  ${fontSizeH8};
`;

S.TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

S.Tab = styled.button`
  display: flex; // 추가
  align-items: center; // 추가
  justify-content: center;
  text-align: center;
  line-height: 33px;
  font-size: 16px;
  padding: 0 12px;
  height: 33px;
  color: #06c371;
  font-weight: ${fontWeightMedium};
  background-color: white;
  border: none;
  border-top-left-radius: 6.3px;
  border-top-right-radius: 6.3px;
  border-top: 1px solid #06c371;
  border-left: 1px solid #06c371;
  border-right: 1px solid #06c371;
  cursor: pointer;
  white-space: nowrap;

  &.selected {
    background-color: #06c371;
    color: #ffffff;
  }
`;

S.ItemWrapper = styled.div`
  // 콘텐츠 렌더링 영역
`;

S.DailyButtonWrapper = styled.div`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #01CD74;
    color: #fff;
    width: 80px;
    height: 30px;
    border-radius: 30px;
    text-decoration: none;
    font-size: 16px;
    ${fontWeightMedium};

    &:hover {
      opacity: 0.9;
    }
  }
`;
export default S;
