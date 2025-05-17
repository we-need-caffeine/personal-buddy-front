// Footer.jsx

import S from "./style";


const Footer = () => {
  return (
    <S.Footer>
      <S.Inner>
        <S.Content>
          <S.Left>
            <img src='/assets/images/logo/logo.png' alt="Personal Buddy Logo" />
          </S.Left>
          <S.Right>
            <S.Links>
              <ul>
                <li>
                    <S.Link href="/privacy-policy">
                        이용약관 | 개인정보처리방침
                    </S.Link>
                </li>
                <li>고객센터 : 010-5473-2969</li>
                <li>이메일 : rkddl94@gmail.com</li>
                <li>주소 : 서울특별시 어딘가 123</li>
                <li>대표자 : GOD JSON | 사업자등록번호 : 123-45-67890</li>
                <li>통신판매업신고 : 제2025-서울강남-0000호</li>
              </ul>
            </S.Links>
          </S.Right>
        </S.Content>
        <S.Copy>© 2025 PERSONAL BUDDY. All Rights Reserved.</S.Copy>
      </S.Inner>
    </S.Footer>
  );
};

export default Footer;
