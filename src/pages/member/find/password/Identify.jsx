import React from 'react';
import S from './style';

const Identify = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <form>
          <S.Title>
            <span>비밀번호 찾기</span>
          </S.Title>
          <S.SubTitle>
            <span>비밀번호를 찾고자하는 이메일을 입력해주세요.</span>
          </S.SubTitle>
          <S.Inputs>
            <S.InputWrapper>
              <img src="../../assets/images/member/person-icon.png" className="input-icon" alt="이름" />
              <input
                type="text"
                placeholder="이메일"
              />
            </S.InputWrapper>

            <S.SignupButton type="submit">다음</S.SignupButton>
          </S.Inputs>
        </form>
      </S.Wrapper>
    </S.Container>
  );
};

export default Identify;