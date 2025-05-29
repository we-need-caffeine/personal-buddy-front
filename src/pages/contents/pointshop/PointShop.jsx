import React from 'react';
import S from './style';

const PointShop = ({member}) => {
    const memberId = member.id;
    return (
        <div>
            <S.SubTitle>마음에 드는 아이템을 골라보세요 👁️</S.SubTitle>
            <S.MainTitle>포인트 샵 💸</S.MainTitle>
            <S.SubTitle>보유 포인트 : <S.DescriptionPoint>{member.memberPoint}</S.DescriptionPoint> 🪙 </S.SubTitle>
            <S.Link to={`/main/mypage/${memberId}/point-log`}>포인트 이용내역 확인하기 🧾 </S.Link>
        </div>
    );
};

export default PointShop;