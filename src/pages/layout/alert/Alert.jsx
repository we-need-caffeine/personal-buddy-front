import React, { useEffect, useState } from 'react';
import S from './style';

const Alert = ({memberId, handleAlertModal}) => {

    // 알림 정보
    const [alertInfo, setAlertInfo] = useState([]);
    // 알림 타입 정보
    const [alertType, setAlertType] = useState("");

    // 알림을 조회하는 함수
    const getAlerts = async() => {
        let url = "";
        if (alertType === null || alertType === "") {
            url = `http://localhost:10000/alerts/api/alert/list?memberId=${memberId}`
        } else {
            url = `http://localhost:10000/alerts/api/alert/list?memberId=${memberId}&alertType=${alertType}`
        }
        const response = await fetch(url);
        const alerts = await response.json();
        setAlertInfo(alerts);
    };

    // 알림을 단일 삭제하는 함수
    const deleteOneAlert = async(id) => {
        await fetch(`http://localhost:10000/alerts/api/alert/delete/${id}`, {
            method : "DELETE",
        })
        .then((res) => {
            if (res.ok) {
                alert("알림 삭제 성공!")
                getAlerts();
            } else {
                alert("알림 삭제를 실패하였습니다.")
            }
        })
        .catch(console.error)
    };

    // 알림을 전체 삭제하는 함수
    const deleteAllAlert = async() => {
        await fetch(`http://localhost:10000/alerts/api/alert/delete-all/${memberId}`, {
            method : "DELETE",
        })
        .then((res) => {
            if (res.ok) {
                alert("알림 삭제 성공!")
                getAlerts();
            } else {
                alert("알림 삭제를 실패하였습니다.")
            }
            })
        .catch(console.error)
    };

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
            return date
            .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
            .replace(/\. /g, '.')
            .replace(/\.$/, '');
        }
    }

    // 모달이 활성화 될때, 외부요소의 스크롤을 막는다.
    useEffect(() => {
        if (handleAlertModal) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [handleAlertModal]);

    // 알림을 최초 조회하고, 알림 타입이 바뀔 때 마다 재조회
    useEffect(() => {
        if (memberId) {
            getAlerts();
        }
    }, [memberId, alertType]);

    return (
        <>
            <S.AlartContainer>
                {/* 알림 타이틀 / 닫기 버튼 */}
                <S.TitleContainer>
                    <S.Title>알림</S.Title>
                    <S.CloseButton src='/assets/images/modal/close-button.png' alt='x버튼' onClick={() => handleAlertModal(false)}/>
                </S.TitleContainer>
                {/* 알림 필터 / 전체 삭제 */}
                <S.TopContainer>  
                    <S.SelectBox onChange={(e) => setAlertType(e.target.value)}>
                        <option value="">전체</option>
                        <option value="guestbook">방명록</option>
                    </S.SelectBox>
                    <S.DeleteAllButton onClick={() => deleteAllAlert()}>알림 전체 삭제</S.DeleteAllButton>
                </S.TopContainer>
                {/* 알림 리스트 */}
                <S.ListContainer>
                    {alertInfo && alertInfo.length > 0 ? (
                        alertInfo.map((info) => (
                            <S.ListItem key={info.id}>
                                <S.ProfileImg 
                                    src={info.memberImgPath || "/assets/images/header/default-member-img.png"}
                                    alt="멤버 프로필 이미지" 
                                    onError={e => {
                                        e.target.src = "/assets/images/header/default-member-img.png";
                                    }}
                                />
                                <S.Content>
                                    <S.Nickname>{info.memberNickname}</S.Nickname>
                                    <S.Message>{info.alertMessage}</S.Message>
                                </S.Content>
                                <S.Meta>
                                    <S.Time>{getDisplayDate(info.alertCreateTime)}</S.Time>
                                    <S.Delete onClick={() => deleteOneAlert(info.id)}>삭제</S.Delete>
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