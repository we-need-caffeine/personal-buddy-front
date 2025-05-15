import styled from 'styled-components';
import { fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightMedium, fontWeightRegular, gray2Color } from '../../../../globals/common';

const S = {};

S.Titles = styled.div`

`

S.SubTitle = styled.div`
  ${fontSizeH8}
  ${fontWeightRegular}
  color: #555;
  padding-bottom: 3px;
`;

S.BoardWriteTitle = styled.h2`
    ${fontSizeH4}
    ${fontWeightBold}
    margin-bottom: 20px;
`;

S.Hr = styled.hr`
    ${gray2Color};
`

S.Title = styled.div`
    ${fontWeightMedium};  
    ${fontSizeH6};  
    margin-top: 74px;

`

export default S;