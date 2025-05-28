import React from 'react';
import S from './style';

const RecommendInformation = () => {
    return (
        <S.RecommendWrapper>
            <p>오늘 점심 이런 메뉴 어때요?!!</p>
            <S.RecommendList>
                <S.RecommendInfo>
                    <S.RecommendImg></S.RecommendImg>
                    <span>식당명 머시기</span>
                </S.RecommendInfo>
            </S.RecommendList>
        </S.RecommendWrapper>
    );
};

export default RecommendInformation;