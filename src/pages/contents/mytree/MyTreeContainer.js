import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import S from './style';
import { useSelector } from 'react-redux';
import Sticker from './display/Sticker';
import ConfirmModal from '../../layout/modal/ConfirmModal';

const MyTreeContainer = () => {
  
    const location = useLocation();
    const pathName = location.pathname;

    // 로그인된 유저정보
    const {currentUser} = useSelector((state) => state.member)
    // 로그인된 유저의 아이디
    const memberId = currentUser.id;
    const [memberItems, setMemberItems] = useState([]);
    const [memberCustomizingList, setMemberCustomizingList] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

  //   // 서버에 요청한 회원의 나무 적용 정보
    const [memberAppliedItemBackground, setMemberAppliedItemBackground] = useState({});
    const [memberAppliedItemTree, setMemberAppliedItemTree] = useState({});
    const [memberAppliedItemsSticker, setMemberAppliedItemSticker] = useState([]);

    const backgroundRef = useRef(null);

  const getSeleted = (pathName) => {
    if(pathName == "/main/contents/mytree") {
      return 'all'
    } else if(pathName == "/main/contents/mytree/background") {
      return 'background'
    } else if(pathName == "/main/contents/mytree/sticker"){
      return 'sticker'
    } else if(pathName == "/main/contents/mytree/tree"){
      return 'tree'
    }
  }

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-tree/api/tree/list`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "memberId": memberId,
          "itemType": null
        })
      })

      const data = await response.json();
      setMemberItems(data.memberTreeItemList);
    }

    const getAppliedItems = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-tree/api/tree/list/applied/${memberId}`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json();

      data.memberAppliedTrees.map((item) => {
        switch(item.itemType){
          case "스티커":
            setMemberAppliedItemSticker(prev => [...prev, item])
            break;
          case "배경":
            setMemberAppliedItemBackground(item);
            break;
          case "나무":
            setMemberAppliedItemTree(item);
            break;
        }
      })
    }

    const getCustomizingList = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-tree/api/tree/customizing-list/${memberId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json();
        setMemberCustomizingList(data.memberCustomizingList);
    }

    getItems();
    getAppliedItems();
    getCustomizingList();
  }, [memberId])

  const handleSave = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-tree/api/tree/edit`,{
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberCustomizingList)
    })

    const data = await response.json();
    setShowConfirmModal(false);
  }

  // 컨펌 모달 상태를 변경하는 함수
  const handleConfirmModal = (state) => {
      setShowConfirmModal(state)
  }

  return (
    <div>
      <S.SubTitle>언젠가는 아름다워질 나의 나무 ✨</S.SubTitle>
      <S.MainTitle>나의 성장 나무 🌳</S.MainTitle>
      <S.MyTreeWrapper>
        <S.MyTreeBackGround 
          url={
            memberAppliedItemBackground && memberAppliedItemBackground.itemImgPath && memberAppliedItemBackground.itemImgName ? 
            `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${memberAppliedItemBackground.itemImgPath}&fileName=${memberAppliedItemBackground.itemImgName}`
            :
            `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=images/tree/background&fileName=default-background.png`
            } 
          ref={backgroundRef}
          >
          {
            memberAppliedItemsSticker.map((sticker) => (
              <Sticker 
                key={sticker.treeCustomizingId} sticker={sticker}
                memberAppliedItemsSticker={memberAppliedItemsSticker}
                setMemberAppliedItemSticker={setMemberAppliedItemSticker}
                memberCustomizingList={memberCustomizingList}
                setMemberCustomizingList={setMemberCustomizingList}
                backgroundRef={backgroundRef}
              />
              )
            )
          }
          <S.MyTreeItemTreeIcon 
            url={ 
                memberAppliedItemTree && memberAppliedItemTree.itemImgPath && memberAppliedItemTree.itemImgName  ? 
                `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${memberAppliedItemTree.itemImgPath}&fileName=${memberAppliedItemTree.itemImgName}`
                :
                `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=images/tree/tree&fileName=default.png`
            }
          />
        </S.MyTreeBackGround>
        <S.ButtonWrapper>
          <S.SaveButton onClick={() => handleConfirmModal(!showConfirmModal)}>저장</S.SaveButton>
          <S.CancelButton onClick={() => window.location.reload()}>취소</S.CancelButton>
        </S.ButtonWrapper>
      </S.MyTreeWrapper>
      <S.SubTitle>아이템을 직접 적용 시켜봐요 😎</S.SubTitle>
      <S.MainTitle>아이템 목록 💼</S.MainTitle>
      <div>
        <S.ItemTabBox>
          <S.ItemTabLink selected={getSeleted(pathName) === 'all'} to={""}>전체</S.ItemTabLink>
          <S.ItemTabLink selected={getSeleted(pathName) === 'background'} to={"background"}>배경</S.ItemTabLink>
          <S.ItemTabLink selected={getSeleted(pathName) === 'sticker'} to={"sticker"}>스티커</S.ItemTabLink>
          <S.ItemTabLink selected={getSeleted(pathName) === 'tree'} to={"tree"}>나무</S.ItemTabLink>
        </S.ItemTabBox>
        <ConfirmModal
            handleConfrmModal={showConfirmModal}
            title="변경사항 적용"
            message="성장나무 변경사항을 저장하시겠습니까?"
            onConfirm={handleSave}
            onCancel={() => handleConfirmModal(false)}
        />
        <Outlet context={{
            memberId,
            memberItems,
            setMemberItems,
            memberAppliedItemsSticker,
            setMemberAppliedItemSticker, 
            memberAppliedItemBackground,
            setMemberAppliedItemBackground, 
            memberAppliedItemTree,
            setMemberAppliedItemTree,
            memberCustomizingList, 
            setMemberCustomizingList
          }}
        />
      </div>
    </div>
  );
};

export default MyTreeContainer;