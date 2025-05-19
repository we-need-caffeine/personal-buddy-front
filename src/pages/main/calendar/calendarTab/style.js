import styled from 'styled-components';

const S = {};

S.DecorateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 61px;
`;

S.DecorateTitle = styled.div`
  width: 100%;
  font-size: 24px;
`;

S.DecorateItemsContainer = styled.div``;

S.DecorateTabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

S.DecorateTab = styled.button`
  text-align: center;
  line-height: 33px;
  font-size: 16px;
  width: 80px;
  height: 33px;
  color: #06c371;
  font-weight: 500;
  background-color: #eefff8;
  border: none;
  border-top-left-radius: 6.3px;
  border-top-right-radius: 6.3px;
  border-top: 1px solid #06c371;
  border-left: 1px solid #06c371;
  border-right: 1px solid #06c371;

  &.selected {
    background-color: #06c371;
    color: #ffffff;
  }
`;

export default S;