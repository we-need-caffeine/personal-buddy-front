import React, { useEffect, useState } from 'react';
import S from './style';
import { Link } from 'react-router-dom';

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
          <S.HotSlider style={{ transform: `translateX(${translateX}px)` }}> {/* 슬라이더 내부 컨텐츠들을 감싸고, transform으로 이동 처리 */}
            {hot.map(({
              boardCommentCount,
              boardContent,
              boardContentCreateDate,
              boardContentUpdateDate,
              boardContentViews,
              boardHashtag,
              boardLikeCount,
              boardTitle,
              id,
              memberEmail,
              memberId,
              memberImgName,
              memberImgPath,
              memberNickname,
            }, index) => (
              <S.HotContent key={id}>
                <Link to={`post/${id}`}>
                  <S.HotImageBox>
                    <img
                      className="img"
                      src={
                        memberImgPath + '/' + memberImgName || '/assets/images/board/default/default-img.png'
                      }
                      onError={(e) => {
                      e.target.onerror = null; // 무한 루프 방지
                      e.target.src = '/assets/images/board/default/default-img.png'; // 디폴트 이미지 강제 세팅
                    }}
                      alt={`hot-${index}`}
                    />
                    <S.NumberBox>{index + 1}</S.NumberBox> {/* 순위 번호 */}
                  </S.HotImageBox>
                  <S.HotTag>{boardHashtag}</S.HotTag>
                  <S.HotTitle>{boardTitle}</S.HotTitle>
                  <S.HotUserBox>
                    <S.UserProfile 
                    src={memberImgPath + "/" + memberImgName || '/assets/images/member/profile-default.png' }
                    onError={(e) => {
                      e.target.onerror = null; // 무한 루프 방지
                      e.target.src = '/assets/images/member/profile-default.png'; // 디폴트 이미지 강제 세팅
                    }}  
                    />
                    <S.UserNickname>{memberNickname}</S.UserNickname>
                  </S.HotUserBox>
                  <S.HotDate>{boardContentCreateDate}</S.HotDate>
                  <S.HotMetaBox>
                    <span>
                      <img
                        src="/assets/images/board/icon/like-icon.png"
                        className="icon"
                        alt="like"
                      />
                      {boardLikeCount}
                    </span>
                    <span>
                      <img
                        src="/assets/images/board/icon/view-icon.png"
                        className="icon"
                        alt="view"
                      />
                      {boardContentViews}
                    </span>
                    <span>
                      <img
                        src="/assets/images/board/icon/chat-icon.png"
                        className="icon"
                        alt="chat"
                      />
                      {boardCommentCount}
                    </span>
                  </S.HotMetaBox>
                </Link>
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
