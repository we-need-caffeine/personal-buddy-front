import styled from 'styled-components';
import { fontSizeH4, fontSizeH8, fontWeightBold, fontWeightRegular } from '../../../../globals/common';

const S = {};

// ---------- 전체 래퍼 & 제목 -----------
// 전체 슬라이드 영역을 감싸는 최상위 래퍼
S.EventWrapper = styled.div`
    width: 1400px;
    margin: auto;
    display: flex;
    flex-direction: column;
`

// 작은 제목 (BUDDYGROUND)
S.SubTitle = styled.div`
  ${fontSizeH8}
  ${fontWeightRegular}
  color: #555;
  padding-bottom: 3px;
`;

// 메인 제목 (진행중인 이벤트)
S.MainTitle = styled.div`
  ${fontSizeH4}
  ${fontWeightBold}
  color: black;
  margin-top: 1px;
  text-align: left;
  padding-bottom: 55px;
`;


export default S;