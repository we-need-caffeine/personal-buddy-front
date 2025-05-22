import React, { useEffect, useState } from 'react';
import S from './style';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [serverCode, setServerCode] = useState(null);
  const [timer, setTimer] = useState(0);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsNameValid(name.trim().length > 1);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, [name, email]);

  const sendCode = async () => {
    try {
      const response = await fetch("http://localhost:10000/sms/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (!response.ok || !data.verificationCode) {
        alert(data.message || '이메일 전송 실패');
        return;
      }

      setServerCode(data.verificationCode);
      setCodeSent(true);
      setTimer(180);
      alert(`※ 인증번호 [${data.verificationCode}] (테스트용)이 발송되었습니다.`);

      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error(err);
      alert('이메일 인증번호 발송 실패');
    }
  };

  const verifyCode = async () => {
    try {
      const response = await fetch("http://localhost:10000/sms/api/email/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      });

      const data = await response.json();
      if (response.ok && data.isFlag) {
        setIsCodeValid(true);
        alert(data.message || "인증 성공!");
      } else {
        setIsCodeValid(false);
        alert(data.message || "인증번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error("인증 오류:", err);
      alert("인증 확인 중 오류 발생");
    }
  };

  const formatTime = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNameValid && isEmailValid && isCodeValid) {
      navigate('/member/find-password/reset', { state: { name, email } });
    } else {
      alert('모든 항목을 올바르게 입력하고 인증을 완료해주세요.');
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <form onSubmit={handleSubmit}>
          <S.Title>
            <span>비밀번호 찾기</span>
          </S.Title>
          <S.SubTitle>
            <span>본인확인 이메일로 인증</span>
          </S.SubTitle>
          <S.Inputs>
            <S.InputWrapper isValid={isNameValid}>
              <img src="../../assets/images/member/smile.png" className="input-icon" alt="이름" />
              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </S.InputWrapper>

            <S.InputWrapper isValid={isEmailValid}>
              <img src="../../assets/images/member/person-icon.png" className="input-icon" alt="이메일" />
              <input
                type="text"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <S.PhoneButton type="button" onClick={sendCode}>인증번호 발송</S.PhoneButton>
            </S.InputWrapper>

            {codeSent && (
              <S.InputWrapper isValid={isCodeValid}>
                <img src="../../assets/images/member/lock-icon.png" className="input-icon" alt="인증" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="인증번호 6자리 숫자 입력"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <S.AuthCheckWrapper>
                  <S.TimerText>{formatTime(timer)}</S.TimerText>
                  <S.VerifyButton type="button" onClick={verifyCode}>확인</S.VerifyButton>
                </S.AuthCheckWrapper>
              </S.InputWrapper>
            )}

            <S.SignupButton
              type="submit"
              className={isNameValid && isEmailValid && isCodeValid ? 'active' : ''}
              disabled={!(isNameValid && isEmailValid && isCodeValid)}
            >
              다음
            </S.SignupButton>
          </S.Inputs>
        </form>
      </S.Wrapper>
    </S.Container>
  );
};

export default Verify;
