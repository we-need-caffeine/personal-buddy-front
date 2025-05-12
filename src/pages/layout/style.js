// Layout.jsx style

import styled from 'styled-components';

const S = {};

S.MainWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 90px;
  min-height: calc(100vh - 90px - 200px); //  전체 뷰포트 높이에서 헤더(90px) + 푸터(200px) 제외한 만큼 채움
                                          //  화면이 작아도 최소한 이만큼은 차지해서 푸터가 밀려 올라오지 않게 처리
`;

export default S;