import React, { useContext, useEffect, useState } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';
import DisplayDate from '../../../utils/DisplayDate/DisplayDate';

const Alert = ({memberId, handleAlertModal}) => {

    // 알림 정보
    const [alertInfo, setAlertInfo] = useState([]);
    // 알림 타입 정보
    const [alertType, setAlertType] = useState("");
    // 헤더 스크롤을 막는 상태
    const { lockScroll, unlockScroll } = useContext(HeaderContext);

    useEffect(() => {
        if (handleAlertModal) lockScroll();
        return () => unlockScroll();
    }, [handleAlertModal]);

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

    // 알림을 최초 조회하고, 알림 타입이 바뀔 때 마다 재조회
    useEffect(() => {
        if (memberId) {
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
                                    <S.Time>{DisplayDate(info.alertCreateTime)}</S.Time>
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