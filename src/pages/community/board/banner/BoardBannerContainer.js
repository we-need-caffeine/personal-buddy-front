import React, { useEffect, useState } from 'react';
import S from './style';

const BoardBannerContainer = () => {

  const [hotPosts, setHotPosts] = useState([]);

  useEffect(()=>{
    const fetchHotPosts = async () => {
      try{
        const response = await fetch("/boards/api/hot")
        const data = await response.json();
        console.log("HOT 응답 데이터:", data);
        setHotPosts(data);
      } catch {
      console.error("HOT 게시글 조회 실패")
    }
  };
    fetchHotPosts();
  }, []);
  
    
  return (
      <S.HotWrapper>
        <S.SubTitle>TOP10</S.SubTitle>
        <S.MainTitle>버디들의 HOT 🔥</S.MainTitle>

        <S.HotContainer>
            <S.HotBtnLeft>
              <img src='/assets/images/board/btn/left-btn.png' alt='left'/>
            </S.HotBtnLeft>

            <S.Hot>
              <S.HotSlider>
                {hotPosts.map((post, i)=> (
                  <S.HotContent key = {post.id}>
                    <S.HotImageBox>
                      <img className='img' src={post.thumbnailUrl} alt={post.title} />
                      <S.NumberBox>{i + 1}</S.NumberBox>
                    </S.HotImageBox>

                    <S.HotTitle>{post.title}</S.HotTitle>
                    <S.HotUserBox>
                      <S.UserProfile src={post.profileImgUrl} />
                      <S.UserNickname>{post.nickname}</S.UserNickname>
                    </S.HotUserBox>

                    <S.HotDate>{post.createdDate} 게시</S.HotDate>

                    <S.HotMetaBox>
                      <span>
                        <img src='/assets/images/board/icon/like-icon.png' className='icon' alt='like' />
                        {post.likeCount}
                      </span>
                      <span>
                        <img src='/assets/images/board/icon/chat-icon.png' className='icon' alt='chat' />
                        {post.viewCount}
                      </span>
                      <span>
                        <img src='/assets/images/board/icon/view-icon.png' className='icon' alt='view' />
                        {post.commentCount}
                      </span>
                    </S.HotMetaBox>
                  </S.HotContent>
                ))}
              </S.HotSlider>
            </S.Hot>

            <S.HotBtnRight>
              <img src='/assets/images/board/btn/right-btn-hover.png' alt='right' />
            </S.HotBtnRight>
        </S.HotContainer>
      </S.HotWrapper>
  );
};

export default BoardBannerContainer;