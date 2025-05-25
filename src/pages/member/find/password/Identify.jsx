import React, { useState } from 'react';
import S from './style';
import { useNavigate } from 'react-router-dom';

const Identify = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/api/email/check?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const exists = await response.json(); // true 또는 false

      if (Boolean(exists) === true || exists === 'true') {
        navigate('/member/find-password/verify', { state: { email } });
      } else {
        setError('존재하지 않는 이메일입니다.');
      }
    } catch (err) {
      setError('이메일 확인 중 오류가 발생했습니다.');
    }
  };
  return (
    <S.Container>
      <S.Wrapper>
        <form onSubmit={handleSubmit}>
          <S.TitleWrapper>
            <S.Title>
              <span>비밀번호 찾기</span>
            </S.Title>
            <S.StepText>
              <span><S.ActiveStep>1. 아이디 입력</S.ActiveStep> &gt; 2. 본인확인 &gt; 3. 비밀번호 변경</span>
            </S.StepText>
          </S.TitleWrapper>
          <S.SubTitle>
            <span>비밀번호를 찾고자하는 이메일을 입력해주세요.</span>
          </S.SubTitle>
          <S.Inputs>
            <S.InputWrapper>
              <img src="../../assets/images/member/person-icon.png" className="input-icon" alt="이름" />
              <input
                type="text"
                placeholder="이메일"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />
            </S.InputWrapper>

            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

            <S.SignupButton type="submit" className={email.trim() ? 'active' : ''}>다음</S.SignupButton>
          </S.Inputs>
        </form>
      </S.Wrapper>
    </S.Container>
  );
};

export default Identify;