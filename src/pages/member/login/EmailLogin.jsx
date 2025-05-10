import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const EmailLogin = () => {

  const { register, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors}} = useForm({mode:"onChange"});
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  
  const navigate = useNavigate();

  // 소셜 로그인
  const navigateGoogleAuth = () => {
    window.location.href = "http://localhost:10000/oauth2/authorization/google"
  }
  const navigateKaKaoAuth = () => {
    window.location.href = "http://localhost:10000/oauth2/authorization/kakao"
  }
  const navigateNaverAuth = () => {
    window.location.href = "http://localhost:10000/oauth2/authorization/naver"
  }

  return (
    <form onSubmit={handleSubmit(async (data) => {
      const {memberEmail, memberPassword} = data;
      const MemberVO = {
        memberEmail : memberEmail,
        memberPassword : memberPassword
      }

        await fetch("http://localhost:10000/members/api/login", {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(MemberVO)
        })
        .then((res) => {
          if(!res.ok){
            return res.json().then((res) => {
              alert(res.message)
            })
          }
          return res.json()
        })
        .then((res) => {
          // console.log(res)
          const {jwtToken} = res;
          navigate("/main?jwtToken=" + jwtToken)
        })
        .catch(console.error)

    })}>

      <label>
        <p>이메일</p>
        <input type="text" placeholder='아이디를 입력하세요.' 
          {...register("memberEmail", {
            required : true,
            pattern : {
              value : emailRegex,
            }
          })}
        />
        {errors && errors?.email?.type === "required" && (
          <p>이메일을 입력하세요</p>
        )}
        {errors && errors?.email?.type === "pattern" && (
          <p>이메일 양식에 맞게 입력해주세요.</p>
        )}
      </label>

      {/* 비밀번호 로직 만들기 */}
      <label>
        <p>비밀번호</p>
        <input type="password" placeholder='비밀번호를 입력하세요.' 
          {...register("memberPassword", {
            required : true,
            // pattern : {
            //   value : passwordRegex,
            // }
          })}
        />
        {errors && errors?.password?.type === "required" && (
          <p>비밀번호를 입력하세요</p>
        )}
        {errors && errors?.password?.type === "pattern" && (
          <p>소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.</p>
        )}
      </label>

      <button disabled={isSubmitting}>로그인</button>
      <div>
        <button onClick={navigateGoogleAuth}>구글 로그인</button>
        <button onClick={navigateKaKaoAuth}>카카오 로그인</button>
        <button onClick={navigateNaverAuth}>네이버 로그인</button>
      </div>
    </form>
  );
};

export default EmailLogin;