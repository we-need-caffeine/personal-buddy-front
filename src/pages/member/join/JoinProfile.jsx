import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import S from './joinProfileStyle';
import { fontSizeH9 } from '../../../globals/common';
import { useJoin } from './JoinContext';
import { useNavigate } from 'react-router-dom';

const JoinProfile = () => {
  const [profileImage, setProfileImage] = useState('/assets/images/member/profile-default.png');

  const { joinData } = useJoin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
  });

  

  const watchNickname = watch('memberNickName', '');
  const watchComment = watch('memberComment', '');
  const watchFile = watch('newMemberImageInput');

  const onSubmit = async (data) => {
  try {
    // 이미지 업로드
    let fileName = "";
    let filePath = "";

    if (data.newMemberImageInput) {
      const file = data.newMemberImageInput;
      const imageForm = new FormData();
      imageForm.append("imgFile", file);
      imageForm.append("dataType", "profile");


      const uploadRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/files/api/file-upload`, {
        method: "POST",
        body: imageForm
      });

      const uploadData = await uploadRes.json();
      console.log("파일 업로드 결과", uploadData);

      if (uploadData.fileName && uploadData.filePath) {
        fileName = uploadData.fileName;
        filePath = uploadData.filePath;
      } else {
        console.warn("업로드 결과에 파일 정보가 없음!");
      }
      
    }

    // useContext + 파일 정보 병합
    const completeMemberData = {
      ...joinData,
      memberNickName: data.memberNickName,
      memberStatusMessage: data.memberComment,
      memberImgName: fileName,
      memberImgPath: filePath,
      memberTermServiceAgree: 1,
      memberTermInformationAgree: 1,
      memberTermLocationAgree: 1,
      memberProvider: "local"
    };
    console.log("전송 데이터", completeMemberData);

    // JSON으로 회원가입 요청
    const joinRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/api/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(completeMemberData)
    });

    if (joinRes.ok) {
      alert("회원가입이 완료되었습니다!");
      navigate("/member/login");
    } else {
      alert("회원가입에 실패했습니다.");
    }
  } catch (err) {
    console.error("회원가입 중 오류:", err);
    alert("네트워크 오류가 발생했습니다.");
  }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setValue('newMemberImageInput', file); // react-hook-form 상태에 등록

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    setValue('newMemberImageInput', null);
    setProfileImage('/assets/images/member/profile-default.png');
  };

  const handleNicknameBlur = async () => {
  const nickname = watch('memberNickName');
  if (!nickname) return;

  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/api/check/nickname?nickname=${encodeURIComponent(nickname)}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("닉네임 중복 확인 실패");
    }

    const isDuplicate = await res.json(); // true 또는 false

    if (isDuplicate) {
      setError('memberNickName', {
        type: 'manual',
        message: '이미 사용 중인 닉네임입니다.',
      });
    } else {
      clearErrors('memberNickName');
    }
  } catch (err) {
    console.error('닉네임 확인 실패:', err);
  }
};


  return (
    <S.Container>
      <S.JoinContainer>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <S.InputGroup>
            {/* 이미지 */}
            <S.Wrapper>
              <S.ImageWrapper>
                <S.ImagePlusButton htmlFor="imageInput" />
                <S.ImageMinusButton
                  onClick={handleImageDelete}
                  style={{ display: profileImage !== '/assets/images/member/profile-default.png' ? 'block' : 'none' }}
                />
                <S.ProfileImage src={profileImage} alt="프로필 이미지" draggable={false} />
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  {...register('newMemberImageInput')}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </S.ImageWrapper>
            </S.Wrapper>

            {/* 닉네임 */}
            <S.Wrapper>
              <S.InputTitle>
                <span>닉네임</span>
                {errors.memberNickName && (
                  <span style={{ color: '#FF3F3F', fontSize: '12px', marginLeft: '18px' }}>
                    {errors.memberNickName.message}
                  </span>
                )}
              </S.InputTitle>

              <S.InputWrapper
                style={{
                  borderColor:
                    errors.memberNickName
                      ? '#FF3F3F'
                      : watchNickname
                      ? '#01CD74'
                      : '#C5CCD2',
                }}
              >
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요. (최대 12자)"
                  maxLength="12"
                  {...register('memberNickName', {
                    required: '닉네임을 입력해주세요.',
                    maxLength: {
                      value: 12,
                      message: '닉네임은 최대 12자까지 가능합니다.',
                    },
                    pattern: {
                      value: /^[가-힣a-zA-Z0-9]{1,12}$/,
                      message: '공백, 특수 문자(!, @, # 등) 를 제외한 문자만 가능합니다. 최대 12자',
                    },
                  })}
                  onBlur={handleNicknameBlur}
                />
                <span>{watchNickname.length} / 12</span>
              </S.InputWrapper>
            </S.Wrapper>

            {/* 상태 메시지 */}
            <S.Wrapper>
              <span>상태 메세지</span>
              <S.InputWrapper>
                <input
                  type="text"
                  placeholder="메세지를 입력해주세요. (최대 20자)"
                  maxLength="20"
                  {...register('memberComment')}
                />
                <span>{watchComment.length} / 20</span>
              </S.InputWrapper>
            </S.Wrapper>
          </S.InputGroup>

          <S.SignupButton
            type="submit"
            className={isValid ? 'active' : ''}
            disabled={!isValid || isSubmitting}
          >
            가입하기
          </S.SignupButton>
        </form>
      </S.JoinContainer>
    </S.Container>
  );
};

export default JoinProfile;
