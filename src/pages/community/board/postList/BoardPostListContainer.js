import React, { useEffect, useState } from 'react';
import S from './style';
import { Link } from 'react-router-dom';

const BoardPostListContainer = ({setPostLists }) => {
  const [localPosts, setLocalPosts] = useState([]);  // 현재 컴포넌트에서 보여줄 게시글 리스트

  const [selectedTag, setSelectedTag] = useState(null); // 선택된 해시태그 상태 (null이면 전체 보기)

  // 선택된 해시태그에 따라 게시글을 필터링해서 보여줌
  const filteredPosts = selectedTag
  ? localPosts.filter((post) => post.hashtag === selectedTag)
  : localPosts;

  // 게시글 목록을 백엔드에서 가져오거나, 실패 시 더미 데이터를 사용
  useEffect(() => {
    const fetchBoardLists = async () => {
      try {
        const response = await fetch('/boards/api/list');
        const datas = await response.json();
        if (datas?.length) {
          setLocalPosts(datas); // 로컬 상태로 저장
          setPostLists(datas); // 부모 컴포넌트의 상태에도 저장
      } 
      } catch{
        console.error("프론트 더미 데이터 사용");

        // 임시 더미 데이터
        const dummyData = [
          {
            id: 1,
            title: '⚽ 2025 토트넘 경기 일정',
            hashtag: '#관심 일정',
            thumbnailUrl: '/assets/images/board/posts/1.jpg',
            thumbnailName: '',
            nickname: '슛돌이',
            profileImgUrl: '/assets/images/board/default/default-img.png',
            createdDate: '2025.05.13 12:30',
            likeCount: 120,
            viewCount: 999,
            commentCount: 23,
          },
          {
            id: 2,
            title: '2025 고척돔 2월 일정',
            hashtag: '#관심 일정',
            thumbnailUrl: '/assets/images/board/posts/2.jpg',
            thumbnailName: '',
            nickname: '내자리내놔',
            profileImgUrl: '/assets/images/board/default/default-img.png',
            createdDate: '2025.05.12 08:20',
            likeCount: 145,
            viewCount: 302,
            commentCount: 12,
          },
          {
            id: 3,
            title: '2025 임용고시 일정',
            hashtag: '#관심 일정',
            thumbnailUrl: '/assets/images/board/posts/3.jpg',
            thumbnailName: '',
            nickname: '넌학생이고난선생이야',
            profileImgUrl: '/assets/images/board/default/default-img.png',
            createdDate: '2025.05.12 05:15',
            likeCount: 52,
            viewCount: 302,
            commentCount: 12,
          },
          {
            id: 4,
            title: 'JAVA 공부해요~',
            hashtag: '#자유 게시글',
            thumbnailUrl: '/assets/images/board/posts/4.jpg',
            thumbnailName: '',
            nickname: '내손을JAVA',
            profileImgUrl: '/assets/images/board/default/default-img.png',
            createdDate: '2025.05.12 10:30',
            likeCount: 45,
            viewCount: 302,
            commentCount: 12,
          },
          {
            id: 5,
            title: '가지마연휴야',
            hashtag: '#자유 게시글',
            thumbnailUrl: '/assets/images/board/posts/5.jpg',
            thumbnailName: '',
            nickname: '따자하오영수',
            profileImgUrl: '/assets/images/board/default/default-img.png',
            createdDate: '2025.05.12 22:25',
            likeCount: 88,
            viewCount: 302,
            commentCount: 12,
          },
          {
            id: 6,
            title: '자바껌이죠',
            hashtag: '#공유 일정',
            thumbnailUrl: null,
            thumbnailName: '',
            nickname: '따자하오영수',
            profileImgUrl: '/assets/images/board/default/default-img.png',
            createdDate: '2025.05.12 20:08',
            likeCount: 12,
            viewCount: 302,
            commentCount: 12,
          },         
        ];

        setLocalPosts(dummyData);
        setPostLists(dummyData);
      }
    };

    fetchBoardLists();
  }, [setPostLists]); // setPostLists가 변경될 때만 실행

  return (
    <>
    <S.SortBox>
      <button>최신순</button>
      <p>|</p>
      <button>좋아요순</button>
      <p>|</p>
      <button>조회순</button>
    </S.SortBox>
    
    <S.BoardHeader>
      <S.SearchArea>
        <S.SearchInput type="text" placeholder="검색어를 입력해주세요." />
        <S.TagArea>
          <S.TagButton onClick={() => setSelectedTag(null)}>#전체 일정</S.TagButton>
          <S.TagButton onClick={() => setSelectedTag('#관심 일정')}>#관심 일정</S.TagButton>
          <S.TagButton onClick={() => setSelectedTag('#자유 게시글')}>#자유 게시글</S.TagButton>
          <S.TagButton onClick={() => setSelectedTag('#공유 일정')}>#공유 일정</S.TagButton>
        </S.TagArea>
      </S.SearchArea>

      <S.BoardTitle>버디들의 자유 게시판 ✨</S.BoardTitle>
        <S.WriteBtn to="/main/community/board/write">글쓰기</S.WriteBtn>
    </S.BoardHeader>

    <S.PostGrid>
      {localPosts.length === 0 ? (
        <div>게시글이 없습니다.</div>
      ) : (
        filteredPosts.map((post) => ( // 필터링된 게시글만 렌더링
          <Link to={`post/${post.id}`} key={post.id}>
            <S.PostCard>
              <S.Thumbnail
                src={ post.thumbnailUrl 
                  ? `${post.thumbnailUrl}` 
                  :  `/assets/images/board/default/default-img.png` } alt='default-img' // 썸네일 없을 경우 기본 이미지
              />
              <S.Tag>{post.hashtag}</S.Tag>
              <S.Title>{post.title}</S.Title>
              <S.UserInfo>
                <S.ProfileImg 
                  src={`${post.profileImgUrl}`}  
                  onClick={(e) => {
                    e.preventDefault(); // 부모인 <Link> 클릭 방지 (기본 동작(링크 이동) 막기)
                    e.stopPropagation(); // 이벤트가 상위 요소로 전달되지 않게 막기
                    console.log(`닉네임 ${post.nickname}의 프로필 클릭`);  
                    // 프로필 모달 호출 로직               
                  }} 
                />
                <S.Nickname>{post.nickname}</S.Nickname>
              </S.UserInfo>
              <S.Date>{post.createdDate}</S.Date>
              <S.MetaInfo>
                <span>
                  <img src="/assets/images/board/icon/like-icon.png" className="icon" alt="like" />
                  {post.likeCount}
                </span>
                <span>
                  <img src="/assets/images/board/icon/view-icon.png" className="icon" alt="view" />
                  {post.viewCount}
                </span>
                <span>
                  <img src="/assets/images/board/icon/chat-icon.png" className="icon" alt="chat" />
                  {post.commentCount}
                </span>
              </S.MetaInfo>
            </S.PostCard>
          </Link>
        ))
      )}
    </S.PostGrid>
    </>
  );
};

export default BoardPostListContainer;
