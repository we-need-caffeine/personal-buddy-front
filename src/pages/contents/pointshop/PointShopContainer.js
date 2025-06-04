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
  const [cartAddResultMsg, setCartAddResultMsg] = useState("");
  const [showAlertModal, setShowAlertModal] = useState();

  // 컨펌 모달 상태를 변경하는 함수
  const handleConfirmModal = (state) => {
      setCartShow(state)
  }

  // 컨펌 모달 상태를 변경하는 함수
  const handleAlertModal = (state) => {
      setShowAlertModal(state)
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
    console.log("포인트 변경")
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
          cartAddResultMsg={cartAddResultMsg} 
          setCartAddResultMsg={setCartAddResultMsg}
          showAlertModal={showAlertModal} 
          setShowAlertModal={setShowAlertModal}
        />
        <div>
          {
            cartShow && (
              <CartViewModal 
                handleConfrmModal={cartShow}
                onCancel={() => handleConfirmModal(false)} 
              />
            )
          }
          {
            showAlertModal && (
              <ConfirmModal 
                handleConfrmModal={showAlertModal}
                title="장바구니 담기"
                message={cartAddResultMsg}
                onCancel={() => handleAlertModal(false)}
                cancelBtnMsg={"확인"}
              />
            )
          }
          <S.ItemTabBox>
            <S.ItemTabLink selected={getSeleted(pathName) === 'all'} to={""}>전체</S.ItemTabLink>
            <S.ItemTabLink selected={getSeleted(pathName) === 'background'} to={"background"}>배경</S.ItemTabLink>
            <S.ItemTabLink selected={getSeleted(pathName) === 'sticker'} to={"sticker"}>스티커</S.ItemTabLink>
            <S.ItemTabLink selected={getSeleted(pathName) === 'tree'} to={"tree"}>나무</S.ItemTabLink>
          </S.ItemTabBox>
          <Outlet context={{member, selectItems, setSelectItems}}/>
        </div>
      </div>
    );
};

export default PointShopContainer;