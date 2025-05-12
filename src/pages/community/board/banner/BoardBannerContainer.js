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
            {[1,2,3,4,5,6,7,8,9,10].map((num) => (
              <S.HotContent key={num}>
                <S.HotImageBox>
                  <img className="img" alt={`hot${num}`}/>
                  <S.NumberBox>{num}</S.NumberBox>
                </S.HotImageBox>
                <S.HotTitle>board Title</S.HotTitle>
                <S.HotUserBox>
                  <S.UserProfile src="" />
                  <S.UserNickname>userID</S.UserNickname>
                </S.HotUserBox>
                <S.HotDate>createDate</S.HotDate>
                <S.HotMetaBox>
                  <span>
                    <img src="" className = "icon" alt="like"/>
                  </span>
                  <span>
                    <img src=""className="icon"alt="view"/>
                  </span>
                  <span>
                    <img src="" className="icon" alt="comment"/>
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