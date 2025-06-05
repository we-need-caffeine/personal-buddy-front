import React, { useEffect, useRef, useState } from 'react';
import S from './style';
import { NavLink, useParams } from 'react-router-dom';
import ConfirmModal from '../../layout/modal/ConfirmModal';
import { useSelector } from 'react-redux';
import GuestItem from './GuestItem';
import ConfirmDeleteModal from '../../layout/modal/ConfirmDeleteModal';
import Pagination from '../../../hooks/pagenation/Pagination';
import Sticker from '../../contents/mytree/display/Sticker';

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
    // 컨펌 모달 상태값
    const [showConfrmModal, setShowConfrmModal] = useState(false);
    // 마이페이지 파람에서 id값을 가져오는 훅함수
    const { id } = useParams();
    // 게스트북 오너 아이디를 저장
    const ownerMemberId = id;
    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 보여줄 아이템의 갯수
    const itemsPerPage = 4;
    // 나의 나무
    const backgroundRef = useRef(null);
    const [memberCustomizingList, setMemberCustomizingList] = useState([]);
    const [memberAppliedItemBackground, setMemberAppliedItemBackground] = useState({});
    const [memberAppliedItemTree, setMemberAppliedItemTree] = useState({});
    const [memberAppliedItemsSticker, setMemberAppliedItemSticker] = useState([]);

    useEffect(() => {
        const fetchAppliedTreeItems = async () => {
            try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-tree/api/tree/list/applied/${memberId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();

            // 초기화
            setMemberAppliedItemSticker([]); // 초기화 필수!

            data.memberAppliedTrees.forEach(item => {
                switch (item.itemType) {
                case "스티커":
                    setMemberAppliedItemSticker(prev => [...prev, item]);
                    break;
                case "배경":
                    setMemberAppliedItemBackground(item);
                    break;
                case "나무":
                    setMemberAppliedItemTree(item);
                    break;
                }
            });
            } catch (err) {
            console.error("트리 아이템 불러오기 실패:", err);
            }
        };
        fetchAppliedTreeItems();
    }, [memberId]);

    // 컨펌 모달 상태를 변경하는 함수
    const handleConfrmModal = (state) => {
        setShowConfrmModal(state)
    }

    // 컨펌 삭제용 모달 상태값
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    // 삭제 요청 받기 (자식에서)
    const handleAskDelete = (id) => {
        setDeleteTargetId(id);
        setShowDeleteModal(true);
    };

    // 실제 삭제 로직
    const handleConfirmDelete = async () => {
        const response = await fetch(`http://localhost:10000/guestbooks/api/guestbook/delete/${deleteTargetId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            setShowDeleteModal(false);
            setDeleteTargetId(null);
        } else {
            alert("방명록 삭제 실패");
        }
    };

    // 텍스트에리어에서 값을 입력할 때 마다 잡아서 상태변경
    const handleTextareaChange = (e) => {
        setGuestBookText(e.target.value);
    };

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
                handleConfrmModal(false);
            } else {
                alert("방명록 작성을 실패했습니다.")
            }
        })
        .catch(console.error)
    }

    //최초로 방명록 리스트와 카운팅을 가져오는 함수
    useEffect(() => {
        // 비동기로 방명록을 페이지로 백엔드에 요청하는 함수
        const getGuestBook = async () => {
            const response = await fetch(`http://localhost:10000/guestbooks/api/guestbook/list?ownerMemberId=${ownerMemberId}&page=${currentPage}`);
            const guestBooks = await response.json()
            setGuestBooks(guestBooks);
        }

    // 해당 유저에게 달린 모든 방명록을 카운트하는 함수
        const getGuestBookCount = async () => {
            const response = await fetch(`http://localhost:10000/guestbooks/api/guestbook/count/${ownerMemberId}`)
            const guestBookCount = await response.json();
            setGuestBookCount(guestBookCount);
        }
        getGuestBook()
        getGuestBookCount()
    }, [ownerMemberId, showConfrmModal, showDeleteModal, currentPage])

    return (
        <>
            <S.MainContainer>
                {/* 타이틀 영역 */}
                <S.TitleContainer>
                    <S.TitleTopContainer>
                        <span>자신만의 나무를 꾸며보세요.</span>
                    </S.TitleTopContainer>
                    <S.TitleBottomContainer>
                            <span>나의 성장 나무 🌳</span>
                        <S.TitleTopLinkText>
                            <NavLink to="/main/contents/mytree">
                                <span>나의 성장 나무 꾸미기 &gt;&gt;</span>
                            </NavLink>
                        </S.TitleTopLinkText>
                    </S.TitleBottomContainer>
                </S.TitleContainer>
                {/* 트리 영역 */}
                <S.TreeContainer>
                    <S.MyTreeBackGround
                        url={
                            memberAppliedItemBackground && memberAppliedItemBackground.itemImgPath && memberAppliedItemBackground.itemImgName ? 
                            `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${memberAppliedItemBackground.itemImgPath}&fileName=${memberAppliedItemBackground.itemImgName}`
                            :
                            `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=images/tree/background&fileName=default-background.png`
                            } 
                        ref={backgroundRef}
                    >
                        {memberAppliedItemsSticker.map((sticker) => (
                            <Sticker
                                key={sticker.treeCustomizingId} sticker={sticker}
                                memberAppliedItemsSticker={memberAppliedItemsSticker}
                                setMemberAppliedItemSticker={setMemberAppliedItemSticker}
                                memberCustomizingList={memberCustomizingList}
                                setMemberCustomizingList={setMemberCustomizingList}
                                backgroundRef={backgroundRef}
                            />
                        ))}
                        <S.MyTreeItemTreeIcon 
                            url={ 
                                memberAppliedItemTree && memberAppliedItemTree.itemImgPath && memberAppliedItemTree.itemImgName  ? 
                                `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${memberAppliedItemTree.itemImgPath}&fileName=${memberAppliedItemTree.itemImgName}`
                                :
                                `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=images/tree/tree&fileName=default.png`
                            }
                        />
                    </S.MyTreeBackGround>
                </S.TreeContainer>
                {/* 방명록 타이틀 */}
                <S.GuestBookTitleContainer>
                    <S.GuestBookTitle>
                        <span>방명록</span>
                    </S.GuestBookTitle>
                        <span>|</span>
                    <S.GuestBookWriteCount>
                        <span>{guestBookCount}</span>
                    </S.GuestBookWriteCount>
                </S.GuestBookTitleContainer>
                {/* 방명록 인풋 영역 */}
                <S.GuestBookInputContainer>
                    <S.GuestBookInput
                        maxLength={500} 
                        placeholder='방명록을 남겨보세요, 바르고 고운말을 사용합시다.'
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
                            onClick={() => handleConfrmModal(true)}
                        >
                            <span>등록</span>
                        </S.GuestBookInputButton>
                    </S.GuestBookInputBottomContainer>
                </S.GuestBookInputContainer>
                {/* 게스트북 리스트 영역*/}
                <S.GuestBookListContainer>
                    {guestBooks.map((item, i) => (
                        <GuestItem 
                            key={i}
                            item={item}
                            memberId={memberId}
                            onAskDelete={handleAskDelete}
                        />
                    ))}
                </S.GuestBookListContainer>
                <Pagination 
                    currentPage={currentPage}
                    totalPages={Math.ceil(guestBookCount / itemsPerPage)}
                    onPageChange={setCurrentPage}
                />
                {/* 컨펌 모달 */}
                <ConfirmModal
                    handleConfrmModal={showConfrmModal}
                    title="방명록 등록"
                    message="방명록을 등록 하시겠습니까?"
                    onConfirm={handleRegister}
                    onCancel={() => handleConfrmModal(false)}
                    confirmBtnMsg="등록"
                    cancelBtnMsg="취소"
                />
                {/* 삭제 컨펌 모달 */}
                <ConfirmDeleteModal
                    handleConfrmDeleteModal={showDeleteModal}
                    title="방명록 삭제"
                    message="방명록을 삭제 하시겠습니까?"
                    onConfirmDelete={handleConfirmDelete}
                    onCancel={() => setShowDeleteModal(false)}
                />
            </S.MainContainer>
        </>
    );
};

export default MyPageMain;