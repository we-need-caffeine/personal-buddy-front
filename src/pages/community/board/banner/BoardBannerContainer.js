import React, { use, useEffect, useState } from 'react';
import S from './style';
import { Link, useParams } from 'react-router-dom';
import FormatDate from '../../../../utils/formatDate/FormatDate';

const BoardBannerContainer = ({ hot }) => {
  const [hotPosts, setHotPosts] = useState([]); // Hot 게시글 리스트 상태
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이더의 첫 번째 인덱스

  const visibleCount = 3; // 한 번에 보여줄 게시글 수

  // 왼쪽 화살표 클릭 시 인덱스 감소 (0보다 작아지지 않게 조건)
  const handleLeft = () => {
    if (currentIndex > 0) setCurrentIndex((move) => move - 1);
  };

  // 오른쪽 화살표 클릭 시 인덱스 증가 (범위 초과하지 않도록 조건)
  const handleRight = () => {
    if (currentIndex < hotPosts.length - visibleCount)
      setCurrentIndex((move) => move + 1);
  };


  // 현재 인덱스를 기준으로 슬라이더의 X축 이동값 계산 (320px 너비 + 100px 간격)
  const translateX = -(currentIndex * (320 + 100));

  const hotSlider = useEffect(()=>{
    if( hot?.length) { // hot이 존재하면 그 길이를 가져와라
      setHotPosts(hot);
    }
  }, [hot]);

  
  return (
    <S.HotWrapper>
      <S.SubTitle>TOP10</S.SubTitle>
      <S.MainTitle>버디들의 HOT 🔥</S.MainTitle>

      <S.HotContainer>
        <S.HotBtnLeft onClick={handleLeft}>
          <img
            src={
              currentIndex === 0
                ? '/assets/images/board/btn/left-btn.png'
                : '/assets/images/board/btn/left-btn-hover.png'
            }
            alt="left"
          />
        </S.HotBtnLeft>

        <S.Hot>
          <S.HotSlider style={{ transform: `translateX(${translateX}px)` }}>
            {hotPosts.map((post, index) => (
              <S.HotContent key={post.id}>
                <Link to={`post/${post.id}`}>
                  {/* 썸네일 이미지 */}
                  <S.HotImageBox>
                    <img
                      className="img"
                      src={
                        post.boardImgPath && post.boardImgName
                          ? `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(post.boardImgPath)}&fileName=${encodeURIComponent(post.boardImgName)}`
                          : '/assets/images/board/default/default-img.png'
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/images/board/default/default-img.png';
                      }}
                      alt={`hot-${index}`}
                    />
                    <S.NumberBox>{index + 1}</S.NumberBox>
                  </S.HotImageBox>

                  {/* 해시태그 */}
                  <S.HotTagWrap>
                    <S.HotTag>{post.boardHashtag}</S.HotTag>
                  </S.HotTagWrap>
                  
                  {/* 제목 */}
                  <S.HotTitle>{post.boardTitle}</S.HotTitle>

                  {/* 유저 정보 */}
                  <S.HotUserBox>
                    <S.UserProfile
                      src={
                        post.memberImgPath && post.memberImgName
                          ? `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(post.memberImgPath)}&fileName=${encodeURIComponent(post.memberImgName)}`
                          : '/assets/images/member/profile-default.png'
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/images/member/profile-default.png';
                      }}
                    />
                    <S.UserNickname>{post.memberNickname}</S.UserNickname>
                  </S.HotUserBox>

                </Link>
                  <S.HotMetaBoxWrap>
                    {/* 좋아요 / 조회수 / 댓글 */}
                    <S.HotMetaBox>
                      <span>
                        <img src="/assets/images/board/icon/like-icon.png" className="icon" alt="like" />
                        {post.boardLikeCount}
                      </span>
                      <span>
                        <img src="/assets/images/board/icon/view-icon.png" className="icon" alt="view" />
                        {post.boardContentViews}
                      </span>
                      <span>
                        <img src="/assets/images/board/icon/chat-icon.png" className="icon" alt="chat" />
                        {post.boardCommentCount}
                      </span>
                    </S.HotMetaBox>
                    {/* 게시일 */}
                    <S.HotDate>{FormatDate(post.boardContentCreateDate).split(" ")[0].replaceAll(".", "-")}</S.HotDate>
                  </S.HotMetaBoxWrap>
              </S.HotContent>
            ))}
          </S.HotSlider>
        </S.Hot>

        <S.HotBtnRight onClick={handleRight}>
          <img
            src={
              currentIndex >= hotPosts.length - visibleCount
                ? '/assets/images/board/btn/right-btn.png'
                : '/assets/images/board/btn/right-btn-hover.png'
            }
            alt="right"
          />
        </S.HotBtnRight>
      </S.HotContainer>
    </S.HotWrapper>
  );
};

export default BoardBannerContainer;
