import React, { useContext, useEffect } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {

    // isOpen : 모달 활성화 여부 ex) onClick={() => setModalOpen(true)}로 실행
    // title : 모달 제목 ex) 방명록 등록
    // message : 모달 내용 ex) 방명록을 등록 하시겠습니까?
    // onConfirm : 확인 버튼을 눌렀을 때, 실행시킬 함수 ex) onConfirm={handleRegister}
    // onCancel : 배경, 취소버튼, X버튼을 눌렀을 때, 실행시킬 함수 ex) onCancel={() => setModalOpen(false)}로 실행

    // ex)
    // const [modalOpen, setModalOpen] = useState(false); // 모달의 상태변화를 체크하기 위해 추가해줍니다.


    // <button onClick={() => setModalOpen(true)}> //특정 버튼으로 모달을 활성화시키는 예시입니다.
    // <ConfirmModal
    //     isOpen={modalOpen} // 상태변화를 읽고 모달을 활성화 / 비활성화 합니다.
    //     title="방명록 등록" // 모달의 제목을 넣는 공간입니다.(문자열)
    //     message="방명록을 등록 하시겠습니까?" // 모달의 내용을 넣는 공간입니다.(문자열)
    //     onConfirm={handleRegister} // 모달의 확인 버튼을 눌렀을 때, 실행시킬 함수를 담는 공간입니다.
    //     onCancel={() => setModalOpen(false)} // 배경, 취소버튼, X버튼을 눌렀을 때, 실행할 함수를 담는 공간입니다.
    // />

    // 헤더 이벤트 콘텍스트
    const { setHeaderScroll } = useContext(HeaderContext);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setHeaderScroll(false)
        }
        return () => {
            document.body.style.overflow = 'auto';
            setHeaderScroll(true)
        };
    }, [isOpen, setHeaderScroll]);

    if (!isOpen) return (
        <>
        </>
    );

    return (
        <S.Backdrop onClick={onCancel}>
            <S.ModalContainer onClick={(e) => e.stopPropagation()}>
                <S.TitleContainer>
                    <S.Title>{title}</S.Title>
                    <S.CloseButton src='/assets/images/modal/close-button.png' alt='x버튼' onClick={onCancel} />
                </S.TitleContainer>
                <S.ContentContainer>
                    <p>{message}</p>
                </S.ContentContainer>
                <S.ButtonContainer>
                    <S.ConfirmButton onClick={onConfirm}>등록</S.ConfirmButton>
                    <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
                </S.ButtonContainer>
            </S.ModalContainer>
        </S.Backdrop>
    );
};

export default ConfirmModal;