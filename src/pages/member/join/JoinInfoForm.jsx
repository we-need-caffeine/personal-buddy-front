import React from 'react';
import { useForm } from 'react-hook-form';

const JoinInfoForm = () => {

  const { register, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors}} = useForm({mode:"onChange"});
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <form onSubmit={handleSubmit(async (data) => {
      // 데이터 요청
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
        {errors && errors?.memberEmail?.type === "required" && (
          <p>이메일을 입력하세요</p>
        )}
        {errors && errors?.memberEmail?.type === "pattern" && (
          <p>이메일 양식에 맞게 입력해주세요.</p>
        )}
      </label>

      {/* 비밀번호 로직 만들기 */}
      <label>
        <p>비밀번호</p>
        <input type="password" placeholder='비밀번호를 입력하세요.' 
          {...register("memberPassword", {
            required : true,
            pattern : {
              value : passwordRegex,
            }
          })}
        />
        {errors && errors?.memberPassword?.type === "required" && (
          <p>비밀번호를 입력하세요</p>
        )}
        {errors && errors?.memberPassword?.type === "pattern" && (
          <p>소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.</p>
        )}
      </label>

      <label>
        <p>비밀번호 확인</p>
        <input type="password" id='passwordConfirm' placeholder='비밀번호를 입력하세요.' 
          {...register("passwordConfirm", {
            required : true,
            validate : {
              matchPassword : (passwordConfirm) => {
                const { memberPassword } = getValues();
                console.log(memberPassword, passwordConfirm, memberPassword === passwordConfirm );
                return memberPassword === passwordConfirm;
              }
            }
          })}
        />
        {errors && errors?.passwordConfirm && (
          <p>비밀번호가 일치하지 않습니다.</p>
        )}
      </label>

      <label>
        <p>이름</p>
        <input type="text" placeholder='이름을 입력하세요.' 
          {...register("memberName")}
        />
      </label>

      <label>
        <p>닉네임</p>
        <input type="text" placeholder='닉네임을 입력하세요.' 
          {...register("memberNickName")}
        />
      </label>
      <label>
        <p>휴대폰 번호</p>
        <input type="text" placeholder='닉네임을 입력하세요.' 
          {...register("memberPhone")}
        />
      </label>
      <label>
        <p>인증번호</p>
        <input type="text" placeholder='닉네임을 입력하세요.' 
          {...register("Authentication")}
        />
      </label>

      <button disabled={isSubmitting}>회원가입</button>
    </form>
  );
};

export default JoinInfoForm;