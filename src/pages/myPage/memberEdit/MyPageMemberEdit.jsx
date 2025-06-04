import React, { useEffect, useState } from 'react';
import S from './style';
import { useSelector } from 'react-redux';
import BirthDate from '../../../utils/birthDate/BirthDate';
import BrithModal from './memberEditModal/BrithModal';
import NameModal from './memberEditModal/NameModal';
import PhoneModal from './memberEditModal/PhoneModal';
import PasswordModal from './memberEditModal/PasswordModal';
import ConfirmDeleteModal from '../../layout/modal/ConfirmDeleteModal';
import { useNavigate, useParams } from 'react-router-dom';

const MyPageMemberEdit = () => {
  // 마이페이지 파람에서 id값을 가져오는 훅함수
  const { id } = useParams();
  // 아이디 값을 저장
  const ownerId = id;
  // 로그인된 유저정보
  const {currentUser} = useSelector((state) => state.member)
  // 로그인된 유저의 아이디
  const memberId = currentUser.id;
  // 이름 변경 모달 상태
  const [viewNameModal, setViewNameModal] = useState(false);
  // 생년월일 변경 모달 상태
  const [viewBirthModal, setViewBirthModal] = useState(false);
  // 전화번호 변경 모달 상태
  const [viewPhoneModal, setViewPhoneModal] = useState(false);
  // 비밀번호 변경 모달 상태
  const [viewPasswordModal, setViewPasswordModal] = useState(false);
  // 회원탈퇴 모달
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // currentUser가 아직 undefined일 때 렌더 보호
    if (!currentUser) return;
    // 타입 통일 (둘 다 string으로)
    if (String(ownerId) !== String(memberId)) {
      navigate(`/main/mypage/${ownerId}`, { replace: true });
    }
  }, [memberId, navigate, ownerId, currentUser]);

  // 회원 탈퇴
  const handleConfirmDelete = async () => {
    console.log(currentUser.id);
    
    try {
      const response = await fetch(`http://localhost:10000/members/api/withdraw?memberId=${currentUser.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert("탈퇴가 완료되었습니다.");
        window.location.href = '/'; 
      } else {
        alert("탈퇴 실패");
      }
    } catch (error) {
      console.error("탈퇴 요청 중 에러 발생:", error);
      alert("에러 발생");
    }
  };

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
            <S.MemberInfo style={{color:'#666'}}>{currentUser.memberEmail}</S.MemberInfo>
          </S.MemberInfoInputContainer>
          {/* 비밀번호 */}
          {currentUser.memberProvider === 'local' && (
            <>
              <S.InputTextTitle>
                <h1>비밀번호</h1>
              </S.InputTextTitle>
              <S.MemberInfoInputContainer>
                <S.MemberInfo>------</S.MemberInfo>
                <span onClick={() => setViewPasswordModal(true)}>비밀번호 변경</span>
              </S.MemberInfoInputContainer>
            </>
          )}
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
        <S.BtnContainer>
          <S.WithdrawBtn onClick={() => setShowDeleteModal(true)}>
            계정 삭제
          </S.WithdrawBtn>
        </S.BtnContainer>
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
      
      {/* 비밀번호 변경 모달 */}
      {viewPasswordModal && (
        <PasswordModal
          currentUser={currentUser}
          handlePasswordModal={viewPasswordModal}
          onCancel={() => setViewPasswordModal(false)}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          handleConfrmDeleteModal={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          title="계정 삭제"
          message="정말로 계정을 삭제하시겠습니까?"
          onConfirmDelete={handleConfirmDelete}
        />
      )}

    </div>
  );
};

export default MyPageMemberEdit;