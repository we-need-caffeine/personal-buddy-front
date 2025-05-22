import React, { useEffect, useRef, useState } from 'react';
import S from './style';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(0);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const [emailVerified, setEmailVerified] = useState(false);
  const [emailAuthCodeValid, setEmailAuthCodeValid] = useState(false);
  const [emailVerifyMessage, setEmailVerifyMessage] = useState('');

  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsNameValid(name.trim().length > 1);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, [name, email]);

  const sendCode = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sms/api/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
      });

      const data = await response.json();
      if (!response.ok || !data.verificationCode) {
        alert(data.message || '이메일 전송 실패');
        return;
      }

      // 테스트 전용 코드
      console.log("이메일 인증 코드:", data.verificationCode);

      setCodeSent(true);
      setTimer(180);
      alert(data.message || "이메일 인증번호가 전송되었습니다.");

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
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

  const handleCheckEmailCode = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sms/api/email/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(code)
      });

      const data = await response.json();
      console.log("응답:", data);

      if (data.isFlag) {
        setEmailVerified(true);
        setEmailAuthCodeValid(true);
        setEmailVerifyMessage(data.message || "※ 이메일 인증 완료");
        setIsCodeValid(true);
        clearInterval(timerRef.current);
      } else {
        setEmailVerified(false);
        setEmailAuthCodeValid(false);
        setIsCodeValid(false);
        setEmailVerifyMessage(data.message || "※ 이메일 인증 실패");
        alert(data.message || "인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("인증번호 확인 오류:", error);
      alert("인증 확인 중 오류 발생");
    }
  };

  const formatTime = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!(isNameValid && isEmailValid && isCodeValid)) {
    alert("모든 항목을 올바르게 입력하고 인증을 완료해주세요.");
    return;
  }

  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/api/find/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        memberName: name,
        memberEmail: email
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "회원 정보 조회 실패");
      return;
    }

    const id = data.id;

    navigate('/member/find-password/reset', {
      state: {
        id,
        memberName: name,
        memberEmail: email
      }
    });
  } catch (err) {
    console.error("비밀번호 찾기 요청 실패:", err);
    alert("서버 오류 발생");
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
              <span>1. 아이디 입력 &gt; <S.ActiveStep>2. 본인확인</S.ActiveStep> &gt; 3. 비밀번호 변경</span>
            </S.StepText>
          </S.TitleWrapper>
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
                  <S.VerifyButton type="button" onClick={handleCheckEmailCode}>확인</S.VerifyButton>
                </S.AuthCheckWrapper>
              </S.InputWrapper>
            )}

            {emailVerifyMessage && (
              <div style={{ color: isCodeValid ? '#01CD74' : '#FF3F3F', marginTop: '5px' }}>
                {emailVerifyMessage}
              </div>
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
