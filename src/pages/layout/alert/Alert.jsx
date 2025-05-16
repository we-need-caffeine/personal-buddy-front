import React, { useEffect, useRef } from 'react';
import S from './style';

const Alert = ({ alertInfo, onCancel, onDelete, onDeleteAll, fetchMore }) => {

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
                    <S.SelectBox>
                        <option>전체</option>
                        <option>포인트</option>
                        <option>이벤트</option>
                        <option>댓글</option>
                        <option>좋아요</option> 
                        <option>캘린더</option>
                        <option>팔로우</option>
                    </S.SelectBox>
                    <S.DeleteAllButton onClick={onDeleteAll}>알림 전체 삭제</S.DeleteAllButton>
                </S.TopContainer>
                {/* 알림 리스트 */}
                <S.ListContainer>
                    {alertInfo.map((info, i) => (
                    <S.ListItem key={info.id || i}>
                        <S.ProfileImg src={info.profileImg} alt="profile" />
                        <S.Content>
                            <S.Nickname>{info.nickname}</S.Nickname>
                            <S.Message>{info.message}</S.Message>
                        </S.Content>
                        <S.Meta>
                            <S.Time>{info.time}</S.Time>
                            <S.Delete onClick={() => onDelete(info.id)}>삭제</S.Delete>
                        </S.Meta>
                    </S.ListItem>
                    ))}
                </S.ListContainer>
            </S.AlartContainer>
        </>
    );
};

export default Alert;