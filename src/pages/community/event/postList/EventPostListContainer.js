import React from 'react';
import S from './style';

const EventPostListContainer = () => {
  return (
    <S.PostSection>

      <div>
        <S.SubTitle>BUDDYGROUND</S.SubTitle>
        <S.MainTitle>버디들의 챌린지</S.MainTitle>
      </div>

      <S.PostListWrapper>
      <div>
        <S.PostCard />
          <div>
            <div>title</div>
            <div>time</div>
          </div>
      </div>  

      <div>
        <S.PostCard />
          <div>
            <div>title</div>
            <div>time</div>
          </div>
      </div> 

      <div>
        <S.PostCard />
          <div>
            <div>title</div>
            <div>time</div>
          </div>
      </div> 

      <div>
        <S.PostCard />
          <div>
            <div>title</div>
            <div>time</div>
          </div>
      </div> 

      <div>
        <S.PostCard />
          <div>
            <div>title</div>
            <div>time</div>
          </div>
      </div> 

      <div>
        <S.PostCard />
          <div>
            <div>title</div>
            <div>time</div>
          </div>
      </div>   

        

      </S.PostListWrapper>
    </S.PostSection>
  );
};

export default EventPostListContainer;
