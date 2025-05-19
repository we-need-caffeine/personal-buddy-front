import React, { useEffect } from 'react';
import S from './style';

const Alert = ({ alertInfo, onCancel, onDelete, onDeleteAll, onChangeType }) => {
  
  // 현재 시간과 비교하여 표시값을 변환해주는 함수
  function getDisplayDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // 오늘
    if (diffDays === 0) {
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours < 12 ? '오전' : '오후';
      const displayHour = hours % 12 === 0 ? 12 : hours % 12;
      return `${ampm} ${displayHour}:${minutes}`;
    }
    // 어제
    else if (diffDays === 1) {
      return '어제';
    }
    // 2~6일 전
    else if (diffDays < 7) {
      return `${diffDays}일 전`;
    }
    // 일주일 이상은 날짜로 표기
    else {
      return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '');
    }
  }

    useEffect(() => {
        if (alertInfo) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [alertInfo]);

    return (
        <>
            <S.AlartContainer>
                {/* 알림 타이틀 / 닫기 버튼 */}
                <S.TitleContainer>
                    <S.Title>알림</S.Title>
                    <S.CloseButton src='/assets/images/modal/close-button.png' alt='x버튼' onClick={onCancel} />
                </S.TitleContainer>
                {/* 알림 필터 / 전체 삭제 */}
                <S.TopContainer>  
                    <S.SelectBox onChange={(e) => onChangeType(e.target.value)}>
                        <option value="">전체</option>
                        <option value="point">포인트</option>
                        <option value="event">이벤트</option>
                        <option value="board">커뮤니티</option>
                        <option value="calender">캘린더</option>
                        <option value="follow">팔로우</option>
                    </S.SelectBox>
                    <S.DeleteAllButton onClick={onDeleteAll}>알림 전체 삭제</S.DeleteAllButton>
                </S.TopContainer>
                {/* 알림 리스트 */}
                <S.ListContainer>
                    {alertInfo && alertInfo.length > 0 ? (
                        alertInfo.map((info) => (
                            <S.ListItem key={info.id}>
                                <S.ProfileImg src={info.memberImgPath} alt="profile" />
                                <S.Content>
                                    <S.Nickname>{info.memberNickname}</S.Nickname>
                                    <S.Message>{info.alertMessage}</S.Message>
                                </S.Content>
                                <S.Meta>
                                    <S.Time>{getDisplayDate(info.alertCreateTime)}</S.Time>
                                    <S.Delete onClick={() => onDelete(info.id)}>삭제</S.Delete>
                                </S.Meta>
                            </S.ListItem>
                        ))
                    ) : (
                        <></>
                    )}
                </S.ListContainer>
            </S.AlartContainer>
        </>
    );
};

export default Alert;