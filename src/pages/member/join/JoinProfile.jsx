import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import S from './joinProfileStyle';

const JoinProfile = () => {
  const [profileImage, setProfileImage] = useState('/assets/images/member/profile-default.png');

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
    const formData = new FormData();
    formData.append('memberNickName', data.memberNickName);
    formData.append('memberComment', data.memberComment);
    if (data.newMemberImageInput?.[0]) {
      formData.append('imageInput', data.newMemberImageInput[0]);
    }

    try {
      const res = await fetch('join-profile-upload.member', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      console.log('업로드 결과:', result);
    } catch (err) {
      console.error('제출 실패:', err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setValue('newMemberImageInput', e.target.files); // react-hook-form 상태에 등록

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
    const nickname = watchNickname;
    if (!nickname) return;

    try {
      const res = await fetch('nickname-check.member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ nickname }).toString(),
      });
      const data = await res.json();

      if (data.nicknameCheckResult) {
        clearErrors('memberNickName');
      } else {
        setError('memberNickName', {
          type: 'manual',
          message: data.nicknameCheckResultMessage || '이미 사용 중인 닉네임입니다.',
        });
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
                  <span style={{ color: '#FF3F3F' }}>{errors.memberNickName.message}</span>
                )}
              </S.InputTitle>
              <S.InputWrapper
                style={{
                  borderColor:
                    errors.memberNickName
                      ? '#FF3F3F'
                      : watchNickname
                      ? '#01CD74'
                      : '#333333',
                }}
              >
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요. (최대 14자)"
                  maxLength="14"
                  {...register('memberNickName', { required: '닉네임을 입력해주세요.' })}
                  onBlur={handleNicknameBlur}
                />
                <span>{watchNickname.length} / 14</span>
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
