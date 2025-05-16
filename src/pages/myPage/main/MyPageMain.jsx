import React, { useEffect, useState } from 'react';
import S from './style';
import { NavLink } from 'react-router-dom';
import ConfirmModal from '../../layout/modal/ConfirmModal';

const MyPageMain = () => {
    // 텍스트에리어값
    const [guestBookText, setGuestBookText] = useState("");
    // 게스트북 리스트
    const [guestBooks, setGuestBooks] = useState([]);
    // 게스트북 카운터
    const [guestBookCount, setGuestBookCount] = useState(0);
    // 전체 페이지
    // const totalPage = Math.ceil(guestBookCount / 4);
    // 페이지네이션
    // const [currentPage, setCurrentPage] = useState(0);

    // 모달 상태값
    const [modalOpen, setModalOpen] = useState(false);

    // 텍스트에리어에서 값을 입력할 때 마다 잡아서 상태변경
    const handleTextareaChange = (e) => {
        setGuestBookText(e.target.value);
    };

    // 게스트북의 주인의 아이디
    const ownerMemberId = 1;
    // 방명록을 작성할 사람의 아이디
    const writerMemberId = 2;
    // 현재 유저
    const memberId = 2;

    const page = 1;

    // 비동기로 방명록을 백엔드에 요청하는 함수
    const getGuestBook = async () => {
        const response = await fetch(`http://localhost:10000/guestbooks/api/guestbook/list/page/${ownerMemberId}/${page}`);
        const guestBooks = await response.json()
        return guestBooks;
    }

    // 해당 유저에게 달린 모든 방명록을 카운트하는 함수
    const getGuestBookCount = async () => {
        const response = await fetch(`http://localhost:10000/guestbooks/api/guestbook/list/${ownerMemberId}`);
        const guestBooks = await response.json()
        return guestBooks.length;
    }

    // 방명록을 작성할 때, 비동기로 방명록을 작성하고, 백엔드에서 방명록 리스트를 다시 가져오고, 인풋값을 초기화하는 함수
    const handleRegister = () => {
        const writeGuestBook = async () => {
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
                        .then((data) => {
                            setGuestBooks(data);
                        })
                        .catch(console.error);
                    getGuestBookCount()
                        .then((data) => {
                            setGuestBookCount(data);
                        })
                        .catch(console.error);
                } else {
                    alert("방명록 작성을 실패했습니다.")
                }
            })
            .catch(console.error)
        }
        writeGuestBook();
    };

    //방명록 리스트를 가져오는 함수
    useEffect(() => {
        getGuestBook()
            .then((data) => {
                setGuestBooks(data);
            })
            .catch(console.error);
        getGuestBookCount()
            .then((data) => {
                setGuestBookCount(data);
            })
            .catch(console.error);
    }, [])

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

    // 방명록을 삭제하는 함수
    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:10000/guestbooks/api/guestbook/delete/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {  
            alert("방명록 삭제 성공!")
            getGuestBook()
                .then((data) => {
                    setGuestBooks(data);
                })
                .catch(console.error);
            getGuestBookCount()
            .then((data) => {
                setGuestBookCount(data);
            })
            .catch(console.error);
        } else {
            alert("방명록 삭제 실패");
        }
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
                {/* 방명록 인풋 */}
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
                        <ConfirmModal
                            isOpen={modalOpen}
                            title="방명록 등록"
                            message="방명록을 등록 하시겠습니까?"
                            onConfirm={handleRegister}
                            onCancel={() => setModalOpen(false)}
                        />
                    </S.GuestBookInputBottomContainer>
                </S.GuestBookInputContainer>
                <S.GuestBookListContainer>
                    {guestBooks.map((item) => 
                        <S.GuestBookItemContainer key={item.id}>
                            <S.GuestBookMemberInfoContainer>
                                <S.GuestBookMemberInfo>
                                    <S.GuestBookMemberProfileImg src="/assets/images/header/memberProfile.png" alt='멤버 프로필 이미지' />
                                    <span>{item.writerName}</span>
                                </S.GuestBookMemberInfo>
                                {item.writerMemberId === memberId || item.ownerMemberId === memberId ? 
                                (
                                    <S.GuestBookDeleteButton onClick={() => handleDelete(item.id)}>
                                        <span>삭제</span>
                                    </S.GuestBookDeleteButton>
                                ) : (
                                    <></>
                                )}
                            </S.GuestBookMemberInfoContainer>
                            <S.GuestBookContent>
                                <span>{item.guestbookContent}</span>
                            </S.GuestBookContent>
                            <S.GuestBookCreateTime>
                                <span>{formatDate(item.guestbookCreateTime)}</span>
                            </S.GuestBookCreateTime>
                        </S.GuestBookItemContainer>
                    )}
                </S.GuestBookListContainer>
                {/* 페이지네이션 영역 */}
            </S.MainContainer>
        </>
    );
};

export default MyPageMain;