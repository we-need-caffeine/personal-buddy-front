import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import PointShop from './PointShop';
import { useSelector } from 'react-redux';
import S from './style';
import CartViewModal from './modal/CartViewModal';
import ConfirmModal from '../../layout/modal/ConfirmModal';

const PointShopContainer = () => {
  // 로그인된 유저정보
  const member = useSelector((state) => state.member.currentUser);
  const memberPoint = useSelector((state) => state.member.currentUser.memberPoint);
  
  const [selectItems, setSelectItems] = useState([]);
  const [cartShow, setCartShow] = useState(false);
  const [modal, setModal] = useState({
    showModal: false, 
    modalTitleMsg: "",
    modalDescriptionMsg: "",
    modalOkBtnMsg: "",
    onConfirm: null,
    modalCancelBtnMsg: "",
  });

  // 컨펌 모달 상태를 변경하는 함수
  const handleConfirmModal = (state) => {
      setCartShow(state)
  }

  // 컨펌 모달 상태를 변경하는 함수
  const handleModalState = (state) => {
      setModal((modal) => ({
        ...modal,
        showModal: state, 
      }))
  }

  const handleModal = (modal) => {
    setModal(modal);
  }

  const location = useLocation();
  const pathName = location.pathname;

  const getSeleted = (pathName) => {
    if(pathName == "/main/contents/point-shop") {
      return 'all'
    } else if(pathName == "/main/contents/point-shop/background") {
      return 'background'
    } else if(pathName == "/main/contents/point-shop/sticker"){
      return 'sticker'
    } else if(pathName == "/main/contents/point-shop/tree"){
      return 'tree'
    }
  }

  useEffect(() => {

  }, [member, memberPoint])

  return (
      <div>
        <PointShop 
          member={member}
          memberPoint={memberPoint}
          cartShow={cartShow} 
          setCartShow={setCartShow} 
          selectItems={selectItems} 
          setSelectItems={setSelectItems}
          modal={modal}
          setModal={setModal}
        />
        <div>
          {
            cartShow && (
              <CartViewModal 
                handleConfrmModal={cartShow}
                onCancel={() => handleConfirmModal(false)}
                setConfirmModal={setModal}
              />
            )
          }
          {
            modal.showModal && (
              <ConfirmModal 
                handleConfrmModal={modal.showModal}
                title={modal.modalTitleMsg}
                message={modal.modalDescriptionMsg}
                onConfirm={modal.onConfirm}
                onCancel={() => setModal((modal) => ({
                      ...modal,
                      showModal: false, 
                    }))
                }
                confirmBtnMsg={modal.modalOkBtnMsg}
                cancelBtnMsg={modal.modalCancelBtnMsg}
              />
            )
          }
          <S.ItemTabBox>
            <S.ItemTabLink selected={getSeleted(pathName) === 'all'} to={""}>전체</S.ItemTabLink>
            <S.ItemTabLink selected={getSeleted(pathName) === 'background'} to={"background"}>배경</S.ItemTabLink>
            <S.ItemTabLink selected={getSeleted(pathName) === 'sticker'} to={"sticker"}>스티커</S.ItemTabLink>
            <S.ItemTabLink selected={getSeleted(pathName) === 'tree'} to={"tree"}>나무</S.ItemTabLink>
          </S.ItemTabBox>
          <Outlet context={{member, selectItems, setSelectItems, modal, setModal}}/>
        </div>
      </div>
    );
};

export default PointShopContainer;