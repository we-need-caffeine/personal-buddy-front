import React from 'react';
import S from './style';

const BoardBannerContainer = () => {
  return (
    <S.HotWrapper>
      <S.SubTitle>TOP10</S.SubTitle>
      <S.MainTitle>버디들의 HOT 🔥</S.MainTitle>

      <S.HotContainer>
        <S.HotBtnLeft>
          <img alt="left" />
        </S.HotBtnLeft>

        <S.Hot>
          <S.HotSlider>
            {[1, 2, 3].map((num) => (
              <S.HotContent key={num}>
                <S.HotImageBox>
                  <img
                    className="img"
                    alt={`hot${num}`}
                  />
                  <S.NumberBox>{num}</S.NumberBox>
                </S.HotImageBox>
                <S.HotTag>자유 게시글</S.HotTag>
                <S.HotTitle>자바 껌이죠</S.HotTitle>
                <S.HotUserBox>
                  <S.UserProfile src="https://placehold.co/24x24" />
                  <S.UserNickname>따자하오영수</S.UserNickname>
                </S.HotUserBox>
                <S.HotDate>2025.02.01 게시</S.HotDate>
                <S.HotMetaBox>
                  <span>
                    <img
                      src=""
                      className="icon"
                      alt="like"
                    />600
                  </span>
                  <span>
                    <img
                      src=""
                      className="icon"
                      alt="view"
                    />9999+
                  </span>
                  <span>
                    <img
                      src=""
                      className="icon"
                      alt="comment"
                    />78
                  </span>
                </S.HotMetaBox>
              </S.HotContent>
            ))}
          </S.HotSlider>
        </S.Hot>

        <S.HotBtnRight>
          <img alt="right" />
        </S.HotBtnRight>
      </S.HotContainer>
    </S.HotWrapper>
  );
};

export default BoardBannerContainer;