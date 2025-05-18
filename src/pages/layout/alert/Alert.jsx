import React, { useEffect } from 'react';
import S from './style';

const Alert = ({ alertInfo, onCancel, onDelete, onDeleteAll, onChangeType }) => {
    
    const formatDate = (time) => {
        const date = new Date(time);
        const offsetDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
        const yyyy = offsetDate.getFullYear();
        const mm = String(offsetDate.getMonth() + 1).padStart(2, '0');
        const dd = String(offsetDate.getDate()).padStart(2, '0');
        return `${yyyy}.${mm}.${dd}`;
    };

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
                        <option value="borad">커뮤니티</option>
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
                                    <S.Time>{formatDate(info.alertCreateTime)}</S.Time>
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