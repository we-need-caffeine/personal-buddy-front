import React, { useEffect, useState } from 'react';
import S from './style';
import { NavLink, useParams } from 'react-router-dom';
import ConfirmModal from '../../layout/modal/ConfirmModal';
import { useSelector } from 'react-redux';
import GuestItem from './GuestItem';

const MyPageMain = () => {
    // 로그인된 유저정보
    const {currentUser} = useSelector((state) => state.member)
    // 로그인된 유저의 아이디
    const memberId = currentUser.id;
    // 텍스트에리어값
    const [guestBookText, setGuestBookText] = useState("");
    // 게스트북 리스트
    const [guestBooks, setGuestBooks] = useState([]);
    // 게스트북 카운터
    const [guestBookCount, setGuestBookCount] = useState(0);
    // 모달 상태값
    const [modalOpen, setModalOpen] = useState(false);
    // 마이페이지 파람에서 id값을 가져오는 훅함수
    const { id } = useParams();
    // 게스트북 오너 아이디를 저장
    const ownerMemberId = id;
    // 페이지
    const page = 1;

    // 텍스트에리어에서 값을 입력할 때 마다 잡아서 상태변경
    const handleTextareaChange = (e) => {
        setGuestBookText(e.target.value);
    };

    // 비동기로 방명록을 페이지로 백엔드에 요청하는 함수
    const getGuestBook = async () => {
        const response = await fetch(`http://localhost:10000/guestbooks/api/guestbook/list?ownerMemberId=${ownerMemberId}&page=${page}`);
        const guestBooks = await response.json()
        setGuestBooks(guestBooks);
    }

    // 해당 유저에게 달린 모든 방명록을 카운트하는 함수
    const getGuestBookCount = async () => {
        const response = await fetch(`http://localhost:10000/guestbooks/api/guestbook/count/${ownerMemberId}`)
        const guestBookCount = await response.json();
        setGuestBookCount(guestBookCount);
    }

    // 방명록을 작성할 때, 비동기로 방명록을 작성하고, 백엔드에서 방명록 리스트를 다시 가져오고, 인풋값을 초기화하는 함수
    const handleRegister = async() => {
        // 방명록을 작성할 사람의 아이디
        const writerMemberId = memberId;
        await fetch("http://localhost:10000/guestbooks/api/guestbook/write", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                guestbookContent: guestBookText,
                ownerMemberId: ownerMemberId,
                writerMemberId: writerMemberId
            })
        })
        .then((res) => {
            if (res.ok) {
                setGuestBookText("");
                setModalOpen(false);
                getGuestBook()
                getGuestBookCount()
            } else {
                alert("방명록 작성을 실패했습니다.")
            }
        })
        .catch(console.error)
    }

    
    // 방명록을 삭제하는 함수
    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:10000/guestbooks/api/guestbook/delete/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {  
            alert("방명록 삭제 성공!");
            getGuestBook();
            getGuestBookCount();
        } else {
            alert("방명록 삭제 실패");
        }
    };
        
    //최초로 방명록 리스트와 카운팅을 가져오는 함수
    useEffect(() => {
        getGuestBook()
        getGuestBookCount()
    }, [ownerMemberId])

    // 시간값 변환 함수
    const formatDate = (time) => {
        const date = new Date(time);
        const offsetDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
        const yyyy = offsetDate.getFullYear();
        const mm = String(offsetDate.getMonth() + 1).padStart(2, '0');
        const dd = String(offsetDate.getDate()).padStart(2, '0');
        const hh = String(offsetDate.getHours()).padStart(2, '0');
        const min = String(offsetDate.getMinutes()).padStart(2, '0');
        return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
    };

    return (
        <>
            <S.MainContainer>
                {/* 타이틀 영역 */}
                <S.TitleContainer>
                    <S.TitleTopContainer>
                        <span>자신만의 나무를 꾸며보세요.</span>
                    </S.TitleTopContainer>
                    <S.TitleBottomContainer>
                            <span>나의 성장 나무</span>
                        <S.TitleTopLinkText>
                            <NavLink to="">
                                <span>나의 성장 나무 꾸미기 &gt;&gt;</span>
                            </NavLink>
                        </S.TitleTopLinkText>
                    </S.TitleBottomContainer>
                </S.TitleContainer>
                {/* 트리 영역 */}
                <S.TreeContainer>
                    <img src='/assets/images/mypage/treeBackground.png' alt='임시 나무배경'/>
                </S.TreeContainer>
                {/* 방명록 타이틀 */}
                <S.GuestBookTitleContainer>
                    <S.GuestBookTitle>
                        <span>방명록</span>
                    </S.GuestBookTitle>
                    <S.GuestBookWriteCount>
                        <span>{guestBookCount}</span>
                    </S.GuestBookWriteCount>
                </S.GuestBookTitleContainer>
                {/* 방명록 인풋 영역 */}
                <S.GuestBookInputContainer>
                    <S.GuestBookInputTitle>
                        <span>방명록을 남겨보세요, 바르고 고운말을 사용합시다.</span>
                    </S.GuestBookInputTitle>
                    <S.GuestBookInput
                        maxLength={500} 
                        placeholder='방명록을 작성해주세요.'
                        onChange={handleTextareaChange}
                        value={guestBookText}
                    >
                    </S.GuestBookInput>
                    <S.GuestBookInputBottomContainer>
                        <S.GuestBookInputCount>
                            <span>{guestBookText.length}</span>
                        </S.GuestBookInputCount>
                        <span>/ 500</span>
                        <S.GuestBookInputButton 
                            $isActive={guestBookText.length > 0}
                            $disabled={guestBookText.length === 0}
                            onClick={() => setModalOpen(true)}
                        >
                            <span>등록</span>
                        </S.GuestBookInputButton>
                        {/* 컨펌 모달 */}
                        <ConfirmModal
                            isOpen={modalOpen}
                            title="방명록 등록"
                            message="방명록을 등록 하시겠습니까?"
                            onConfirm={handleRegister}
                            onCancel={() => setModalOpen(false)}
                        />
                    </S.GuestBookInputBottomContainer>
                </S.GuestBookInputContainer>
                {/* 게스트북 리스트 영역*/}
                <S.GuestBookListContainer>
                    {guestBooks.map((item, i) => (
                        <GuestItem 
                            key={i}
                            item={item} 
                            memberId={memberId}
                            handleDelete={handleDelete}
                            formatDate={formatDate}
                        />
                    ))}
                </S.GuestBookListContainer>
            </S.MainContainer>
        </>
    );
};

export default MyPageMain;