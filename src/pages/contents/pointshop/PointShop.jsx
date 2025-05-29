import React from 'react';
import S from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const PointShop = ({member, cartShow, setCartShow}) => {
    console.log(member);
    return (
        <>
            <S.SubTitle>마음에 드는 아이템을 골라보세요 👁️</S.SubTitle>
            <S.MainTitle>포인트 샵 💸</S.MainTitle>
            <S.PointShopInfoContainer>
                <S.MemberInfoWrapper>
                    <S.InfoTitleText>{member.memberNickName} 님</S.InfoTitleText>
                    <S.InfoDescText>보유 포인트 : <S.DescriptionPoint>{member.memberPoint}</S.DescriptionPoint> 🪙 </S.InfoDescText>
                    <S.Link to={`/main/mypage/${member.id}/point-log`}>포인트 이용내역 확인하기</S.Link>
                </S.MemberInfoWrapper>
                <S.CartButtonWrapper>
                    <S.ShowCartButton onClick={ () => setCartShow(true) }>장바구니 보기</S.ShowCartButton>
                    <S.CartAddAllButton>선택 아이템<br />모두담기</S.CartAddAllButton>
                </S.CartButtonWrapper>
                <S.SelectedItemInfoWrapper>
                    <S.InfoTitleText>선택 아이템 목록</S.InfoTitleText>
                    <div style={{position:'relative', display:'flex', width:'100%'}}>
                        <S.PrevButton className="custom-prev" />
                        <S.SelectedItemList
                            modules={[Navigation]}
                            navigation={{
                                prevEl: ".custom-prev",
                                nextEl: ".custom-next",
                            }}
                            spaceBetween={35}  // 🔹 슬라이드 사이 간격
                            slidesPerView='auto'
                            grabCursor={true}
                        >
                            <S.SelectItemInfo>
                                <S.SelectItemCancelButton />
                                <S.SelectItemCard>
                                    <img width={'30px'} height={'30px'} src='/assets/images/contents/tree/item/sticker/minipin.png' />
                                    <S.InfoDescText>미니핀</S.InfoDescText>
                                </S.SelectItemCard>
                                <S.SelectItemCount>2</S.SelectItemCount>
                            </S.SelectItemInfo>
                        </S.SelectedItemList>
                        <S.NextButton className="custom-next" />
                    </div>
                </S.SelectedItemInfoWrapper>
            </S.PointShopInfoContainer>
        </>
    );
};

export default PointShop;