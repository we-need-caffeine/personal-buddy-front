import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import S from './style';
import { useNavigate } from 'react-router-dom';

const FindId = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  const [authTimer, setAuthTimer] = useState(0);
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [authResultMessage, setAuthResultMessage] = useState('');
  const [isAuthValid, setIsAuthValid] = useState(null);
  const timerRef = useRef(null);

  const phone = watch('phone');
  const phoneAuthCode = watch('phoneAuthCode');

  const navigate = useNavigate();

  const formatTimer = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  const handleSendPhoneAuth = async () => {
    // 실제 서버 연동 시
    /*
    try {
      const res = await fetch('http://localhost:10000/sms/api/phone/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('※ 인증번호가 발송되었습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('인증번호 발송 실패');
    }
    */

    // 테스트용 코드
    alert('※ 인증번호 [000000] (테스트용)이 발송되었습니다.');
    setShowAuthInput(true);
    setAuthResultMessage('※ 인증번호가 발송되었습니다. (000000)');
    setIsAuthValid(null);
    setAuthTimer(180);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAuthTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCheckPhoneCode = async () => {
    // 테스트용 인증
    if (phoneAuthCode === '000000') {
      setIsAuthValid(true);
      setAuthResultMessage('※ 휴대전화번호 인증 완료');
      clearInterval(timerRef.current);
    } else {
      setIsAuthValid(false);
      setAuthResultMessage('※ 인증번호가 올바르지 않습니다');
    }

    // 실제 서버 연동 시
    /*
    try {
      const res = await fetch("http://localhost:10000/sms/api/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          code: phoneAuthCode
        })
      });

      const data = await res.json();

      if (res.ok && data.isFlag) {
        setIsAuthValid(true);
        setAuthResultMessage(data.message || "※ 휴대전화번호 인증 완료");
        clearInterval(timerRef.current);
      } else {
        setIsAuthValid(false);
        setAuthResultMessage(data.message || "※ 인증번호가 올바르지 않습니다");
      }
    } catch (err) {
      console.error(err);
      setIsAuthValid(false);
      setAuthResultMessage("※ 서버 오류로 인증 실패");
    }
    */
  };

  const onSubmit = async (data) => {
    if (!isAuthValid) {
      alert('인증번호 확인을 완료해주세요.');
      return;
    }

    try {
      const res = await fetch("http://localhost:10000/members/api/find/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberName: data.memberName,
          memberPhone: data.phone
        }),
      });

      if (!res.ok) {
        throw new Error("이메일 찾기 실패");
      }

      const foundUser = await res.json();

      navigate("/member/find-id-complete", {
        state: {
          memberName: foundUser.memberName,
          memberEmail: foundUser.memberEmail,
          memberCreateDate: foundUser.memberCreateDate,
        }
      });
    } catch (err) {
      console.error(err);
      alert("이메일 찾기 실패");
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.Title>
            <span>아이디 찾기</span>
          </S.Title>
          <S.SubTitle>
            <span>본인확인 SMS 인증</span>
          </S.SubTitle>
          <S.Inputs>
            {/* 이름 */}
            <S.InputWrapper>
              <img src="../assets/images/member/smile.png" className="input-icon" alt="이름" />
              <input
                type="text"
                placeholder="이름"
                {...register('memberName', { required: '※ 이름은 필수입니다.' })}
              />
            </S.InputWrapper>
            {errors.memberName && <span style={{ color: '#FF3F3F' }}>{errors.memberName.message}</span>}

            {/* 전화번호 */}
            <S.InputWrapper>
              <img src="../assets/images/member/phone-icon.png" className="input-icon" alt="전화" />
              <input
                type="tel"
                placeholder="휴대전화번호"
                {...register('phone', {
                  required: '※ 휴대폰 번호를 입력해주세요.',
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: '10~11자리 숫자만 입력하세요.'
                  }
                })}
              />
              <S.PhoneButton type="button" onClick={handleSendPhoneAuth}>
                인증번호 발송
              </S.PhoneButton>
            </S.InputWrapper>
            {errors.phone && <span style={{ color: '#FF3F3F' }}>{errors.phone.message}</span>}

            {/* 인증번호 */}
            {showAuthInput && (
              <S.InputWrapper>
                <img src="../assets/images/member/lock-icon.png" className="input-icon" alt="인증" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="인증번호 6자리 입력"
                  {...register('phoneAuthCode', {
                    required: '인증번호를 입력해주세요.'
                  })}
                />
                <S.AuthCheckWrapper>
                  <S.TimerText>{formatTimer(authTimer)}</S.TimerText>
                  <S.VerifyButton type="button" onClick={handleCheckPhoneCode}>
                    확인
                  </S.VerifyButton>
                </S.AuthCheckWrapper>
              </S.InputWrapper>
            )}

            {/* 메시지 */}
            {authResultMessage && (
              <div style={{ color: isAuthValid ? '#01CD74' : '#FF3F3F' }}>{authResultMessage}</div>
            )}

            {/* 제출 */}
            <S.SignupButton
              type="submit"
              className={isAuthValid && watch('memberName') && watch('phone') ? 'active' : ''}
            >
              다음
            </S.SignupButton>
          </S.Inputs>
        </form>
      </S.Wrapper>
    </S.Container>
  );
};

export default FindId;
