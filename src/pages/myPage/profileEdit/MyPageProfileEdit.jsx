import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import S from './style';
import { useSelector } from 'react-redux';

const MyPageProfileEdit = () => {

  // 로그인된 유저정보
  const {currentUser} = useSelector((state) => state.member)

  const [profileImage, setProfileImage] = useState(``);

  const defaultImg = '/assets/images/member/profile-default.png';

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      memberNickName: '',
      memberComment: '',
    }
  });

  const watchNickname = watch('memberNickName', '');
  const watchComment = watch('memberComment', '');

  useEffect(() => {
    if (currentUser) {
      reset({
        memberNickName: currentUser.memberNickName || '',
        memberComment: currentUser.memberStatusMessage || ''
      });

      setProfileImage(`http://localhost:10000/images/profile/${currentUser.memberImgName}`);
    }
  }, [currentUser, reset]);

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

  const onSubmit = async (data) => {
    try {
      const profilePayload = {
        id: currentUser.id,
        memberNickName: data.memberNickName,
        memberStatusMessage: data.memberComment,
        memberImgName: profileImage === defaultImg ? '' : currentUser.memberImgName,
        memberImgPath: profileImage === defaultImg ? '' : currentUser.memberImgPath,
      };

      // 이미지 업로드 먼저
      if (data.newMemberImageInput) {
        const file = data.newMemberImageInput;
        const imageForm = new FormData();
        imageForm.append("imgFile", file);
        imageForm.append("dataType", "profile");

        const uploadRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/files/api/file-upload`, {
          method: "POST",
          body: imageForm,
        });

        const uploadData = await uploadRes.json();

        profilePayload.memberImgName = uploadData.fileName || '';
        profilePayload.memberImgPath = uploadData.memberImgPath || '';
        // filePath = uploadData.filePath;
      }
      
      const updateRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/api/update`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(profilePayload),
      });

      if (updateRes.ok) {
        alert("프로필이 수정되었습니다!");
        window.location.reload();
      } else {
        alert("프로필 수정에 실패했습니다.");
      }
    } catch (err) {
      console.error("프로필 수정 중 오류 발생:", err);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  const handleNicknameBlur = async () => {
    const nickname = watch('memberNickName');

    if (!nickname || nickname === currentUser.memberNickName) {
      clearErrors('memberNickName');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/api/nickname/check?nickname=${encodeURIComponent(nickname)}`, {
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
    <div>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>프로필 정보를 변경할 수 있습니다.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>프로필 설정</span>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <S.BodyContainer>
            <S.MemberProfile>
              <S.ImagePlusButton htmlFor="imageInput" />
              <S.ImageMinusButton
                onClick={handleImageDelete}
                style={{ display: profileImage !== '/assets/images/member/profile-default.png' ? 'block' : 'none' }}
              />
              <S.ProfileImage 
                src={profileImage} 
                alt="프로필 이미지" 
                draggable={false}
                onError={e => {
                  e.target.src = "/assets/images/header/default-member-img.png";
                }}
              />
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                {...register('newMemberImageInput')}
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </S.MemberProfile>
            <S.BottomContainer>
              <S.InputTextContainer>
                <S.InputTextTitle>
                  <h1>닉네임</h1>
                  <h2>닉네임은 공백과 특수문자를 포함할 수 없고, 최대 12자 까지 입력할 수 있습니다.</h2>
                </S.InputTextTitle>
              <S.MemberInfoInputContainer>
                <S.MemberInfoInput 
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
              </S.MemberInfoInputContainer>
              <S.ErrorMessage>
                {errors.memberNickName && (
                    errors.memberNickName.message
                )}
              </S.ErrorMessage>
              </S.InputTextContainer>
              <S.InputTextContainer>
                <S.InputTextTitle>
                  <h1>상태메세지</h1>
                  <h2>상태 메세지는 최대 20자 까지 입력할 수 있습니다.</h2>
                </S.InputTextTitle>
                <S.MemberInfoInputContainer>
                  <S.MemberInfoInput 
                    type="text"
                    placeholder="메세지를 입력해주세요. (최대 20자)"
                    maxLength="20"
                    {...register('memberComment', {
                      maxLength: {
                        value: 20,
                        message: '상태메세지는 최대 20자까지 입력 가능합니다.'
                      }
                    })}
                  />
                  <span>{watchComment.length} / 20</span>
                </S.MemberInfoInputContainer>
                <S.ErrorMessage>
                  {errors.memberComment  && (
                      errors.memberComment.message
                  )}
                </S.ErrorMessage>
              </S.InputTextContainer>
              <S.SaveBtnContainer>
                <S.SaveBtn
                  type="submit"
                  className={isValid ? 'active' : ''}
                  disabled={!isValid || isSubmitting}
                >
                  저장
                </S.SaveBtn>
              </S.SaveBtnContainer>
            </S.BottomContainer>
          </S.BodyContainer>
        </form>
      </S.MainContainer>
    </div>
  );
};

export default MyPageProfileEdit;