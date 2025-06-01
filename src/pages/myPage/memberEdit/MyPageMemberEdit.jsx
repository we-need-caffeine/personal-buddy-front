import React, { useState } from 'react';
import S from './style';
import { useSelector } from 'react-redux';
import BirthDate from '../../../utils/birthDate/BirthDate';
import BrithModal from './memberEditModal/BrithModal';
import NameModal from './memberEditModal/NameModal';
import PhoneModal from './memberEditModal/PhoneModal';

const MyPageMemberEdit = () => {

  // 로그인된 유저정보
  const {currentUser} = useSelector((state) => state.member)
  console.log(currentUser);
  // memberProvider
  // 이름 변경 모달 상태
  const [viewNameModal, setViewNameModal] = useState(false);
  // 생년월일 변경 모달 상태
  const [viewBirthModal, setViewBirthModal] = useState(false);
  // 전화번호 변경 모달 상태
  const [viewPhoneModal, setViewPhoneModal] = useState(false);

  return (
    <div>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>계정 정보를 변경할 수 있습니다.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>계정 설정</span>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        <S.BodyContainer>
          {/* 이메일 */}
          <S.InputTextTitle>
            <h1>이메일</h1>
          </S.InputTextTitle>
          <S.MemberInfoInputContainer>
            <S.MemberInfo style={{color:'#777777'}}>{currentUser.memberEmail}</S.MemberInfo>
          </S.MemberInfoInputContainer>
          {/* 비밀번호 */}
          <S.InputTextTitle>
            <h1>비밀번호</h1>
          </S.InputTextTitle>
          <S.MemberInfoInputContainer>
            <S.MemberInfo>------</S.MemberInfo>
            <span>비밀번호 변경</span>
          </S.MemberInfoInputContainer>
          {/* 이름 */}
          <S.InputTextTitle>
            <h1>이름</h1>
          </S.InputTextTitle>
          <S.MemberInfoInputContainer>
            <S.MemberInfo>{currentUser.memberName}</S.MemberInfo>
            <span onClick={() => setViewNameModal(true)}>이름 변경</span>
          </S.MemberInfoInputContainer>
          {/* 생년월일 */}
          <S.InputTextTitle>
            <h1>생년월일</h1>
          </S.InputTextTitle>
          <S.MemberInfoInputContainer>
            <S.MemberInfo>{BirthDate(currentUser.memberBirth)}</S.MemberInfo>
            <span onClick={() => setViewBirthModal(true)}>생년월일 변경</span>
          </S.MemberInfoInputContainer>
          {/* 전화번호 */}
          <S.InputTextTitle>
            <h1>전화번호</h1>
          </S.InputTextTitle>
          <S.MemberInfoInputContainer>
            <S.MemberInfo>{currentUser.memberPhone}</S.MemberInfo>
            <span onClick={() => setViewPhoneModal(true)}>전화번호 변경</span>
          </S.MemberInfoInputContainer>
        </S.BodyContainer>
      </S.MainContainer>

      {/* 생년월일 변경 모달 */}
      {viewBirthModal && (
        <BrithModal
          currentUser={currentUser}
          handleBrithModal={viewBirthModal}
          onCancel={() => setViewBirthModal(false)}
        />
      )}

      {/* 이름 변경 모달 */}
      {viewNameModal && (
        <NameModal
          currentUser={currentUser}
          handleNameModal={viewNameModal}
          onCancel={() => setViewNameModal(false)}
        />
      )}

      {/* 휴대전화 변경 모달 */}
      {viewPhoneModal && (
        <PhoneModal
          currentUser={currentUser}
          handlePhoneModal={viewPhoneModal}
          onCancel={() => setViewPhoneModal(false)}
        />
      )}

    </div>
  );
};

export default MyPageMemberEdit;