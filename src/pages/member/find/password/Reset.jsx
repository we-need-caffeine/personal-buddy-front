import React, { useState, useEffect } from 'react';
import S from './style';
import { useLocation, useNavigate } from 'react-router-dom';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

const Reset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, memberEmail } = location.state || {};

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [matchError, setMatchError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!newPassword) {
      setPasswordError('');
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError('※ 비밀번호는 최소 8자, 소문자, 숫자, 특수문자(!@#)를 포함해야 합니다.');
    } else {
      setPasswordError('');
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      setMatchError('※ 비밀번호가 일치하지 않습니다.');
    } else {
      setMatchError('');
    }

    const valid = passwordRegex.test(newPassword) && newPassword === confirmPassword;
    setIsValid(valid);
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/api/password/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          memberPassword: newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || '비밀번호 변경 실패');
        return;
      }

      alert('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/member/login');
    } catch (err) {
      console.error('비밀번호 변경 오류:', err);
      alert('서버 오류가 발생했습니다.');
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
              <span>1. 아이디 입력 &gt; 2. 본인확인 &gt; <S.ActiveStep>3. 비밀번호 변경</S.ActiveStep></span>
            </S.StepText>
          </S.TitleWrapper>
          <S.SubTitle>
            <span>이메일 : <S.EmailText>{memberEmail}</S.EmailText></span>
          </S.SubTitle>
          <S.Inputs>
            <S.InputWrapper isValid={passwordError === ''}>
              <img src="../../assets/images/member/lock-icon.png" className="input-icon" alt="이름" />
              <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </S.InputWrapper>
            {passwordError && <div style={{ color: '#FF3F3F' }}>{passwordError}</div>}

            <S.InputWrapper isValid={matchError === ''}>
              <img src="../../assets/images/member/lock-icon.png" className="input-icon" alt="이름" />
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </S.InputWrapper>
            {matchError && <div style={{ color: '#FF3F3F' }}>{matchError}</div>}

            <S.SignupButton
              type="submit"
              className={isValid ? 'active' : ''}
              disabled={!isValid}
            >
              비밀번호 재설정
            </S.SignupButton>
          </S.Inputs>
        </form>
      </S.Wrapper>
    </S.Container>
  );
};

export default Reset;
