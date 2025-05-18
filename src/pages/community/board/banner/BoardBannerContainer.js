import React, { useEffect, useState } from 'react';
import S from './style';
import { Link } from 'react-router-dom';

const BoardBannerContainer = ({ dummyData }) => {
  const [hotPosts, setHotPosts] = useState([]); // Hot 게시글 리스트 상태
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이더의 첫 번째 인덱스

  // 컴포넌트가 마운트되거나 dummyData가 변경될 때 실행
  useEffect(() => {
    // console.log('useEffect 실행', dummyData?.length);
    if (!dummyData || dummyData.length === 0) return;  // 더미데이터 없으면 종료

    const fetchHotPosts = async () => {
      try {
        // console.log('HOT 게시글 불러오기');
        // 백단에서 HOT 게시글 목록 가져오기
        const response = await fetch('/boards/api/hot');
        const data = await response.json();

        if (data?.length > 0) {
          // console.log('응답 성공')
          setHotPosts(data); //받아왔으면 저장
        } else {
          throw new Error('HOT 비었음'); // 데이터 없을 경우 에러 강제 발생
        }
      } catch {
        // 백 요청 실패 시,
        // dummyData를 좋아요 수 기준으로 정렬 후 상위 10개만 사용
        console.error('HOT 게시글 조회 실패, 더미 데이터 사용');
        const sorted = [...dummyData].sort((a, b) => b.likeCount - a.likeCount);
        setHotPosts(sorted.slice(0, 10)); // 좋아요 순으로 top10 정렬
      }
    };

    fetchHotPosts();
  }, [dummyData]); // dummyData가 바뀔 때마다 재실행

  const visibleCount = 3; // 한 번에 보여줄 게시글 수

  // 왼쪽 화살표 클릭 시 인덱스 감소 (0보다 작아지지 않게 조건)
  const handleLeft = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // 오른쪽 화살표 클릭 시 인덱스 증가 (범위 초과하지 않도록 조건)
  const handleRight = () => {
    if (currentIndex < hotPosts.length - visibleCount)
      setCurrentIndex((prev) => prev + 1);
  };

  // 현재 인덱스를 기준으로 슬라이더의 X축 이동값 계산 (320px 너비 + 100px 간격)
  const translateX = -(currentIndex * (320 + 100));

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
            {hotPosts.map((post, index) => (
              <S.HotContent key={post.id}>
                <Link to={`post/${post.id}`}>
                  <S.HotImageBox>
                    <img
                      className="img"
                      src={
                        post.thumbnailUrl || '/assets/images/board/default/default-img.png'
                      }
                      alt={`hot-${index}`}
                    />
                    <S.NumberBox>{index + 1}</S.NumberBox> {/* 순위 번호 */}
                  </S.HotImageBox>
                  <S.HotTag>{post.hashtag}</S.HotTag>
                  <S.HotTitle>{post.title}</S.HotTitle>
                  <S.HotUserBox>
                    <S.UserProfile src={post.profileImgUrl} />
                    <S.UserNickname>{post.nickname}</S.UserNickname>
                  </S.HotUserBox>
                  <S.HotDate>{post.createdDate}</S.HotDate>
                  <S.HotMetaBox>
                    <span>
                      <img
                        src="/assets/images/board/icon/like-icon.png"
                        className="icon"
                        alt="like"
                      />
                      {post.likeCount}
                    </span>
                    <span>
                      <img
                        src="/assets/images/board/icon/view-icon.png"
                        className="icon"
                        alt="view"
                      />
                      {post.viewCount}
                    </span>
                    <span>
                      <img
                        src="/assets/images/board/icon/chat-icon.png"
                        className="icon"
                        alt="chat"
                      />
                      {post.commentCount}
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
