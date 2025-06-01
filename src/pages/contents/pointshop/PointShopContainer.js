import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import PointShop from './PointShop';
import { useSelector } from 'react-redux';
import S from './style';
import CartViewModal from './modal/CartViewModal';

const PointShopContainer = () => {
  // 로그인된 유저정보
  const {currentUser} = useSelector((state) => state.member)
  const member = currentUser;
  const [cartShow, setCartShow] = useState(false);

  // 컨펌 모달 상태를 변경하는 함수
  const handleConfirmModal = (state) => {
      setCartShow(state)
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

    return (
        <div>
          <PointShop member={member} cartShow={cartShow} setCartShow={setCartShow}/>
          <div>
            {
              cartShow && (
                <CartViewModal handleConfrmModal={cartShow} onCancel={() => handleConfirmModal(false)} />
              )
            }
            <S.ItemTabBox>
              <S.ItemTabLink selected={getSeleted(pathName) === 'all'} to={""}>전체</S.ItemTabLink>
              <S.ItemTabLink selected={getSeleted(pathName) === 'background'} to={"background"}>배경</S.ItemTabLink>
              <S.ItemTabLink selected={getSeleted(pathName) === 'sticker'} to={"sticker"}>스티커</S.ItemTabLink>
              <S.ItemTabLink selected={getSeleted(pathName) === 'tree'} to={"tree"}>나무</S.ItemTabLink>
            </S.ItemTabBox>
            <Outlet context={{member}}/>
          </div>
        </div>
      );
};

export default PointShopContainer;