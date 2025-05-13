import React, { useEffect, useState } from 'react';
import S from './style';
import { Link } from 'react-router-dom';

const BoardPostListContainer = () => {
  const [postLists, setPostLists] = useState([]);

  useEffect(() => {
    const fetchBoardLists = async () => {
      try {
        const response = await fetch('/boards/api/list');
        const datas = await response.json();
        if (datas?.length) {
          setPostLists(datas);
      } 
      } catch{
        console.error("프론트 더미 데이터 사용");

        // 임시 더미 데이터
        const dummyData = [
          {
            id: 1,
            title: '⚽ 2025 토트넘 경기 일정',
            hashtag: '#관심 일정',
            thumbnailUrl: '/assets/images/board/default/default-img.png',
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
            thumbnailUrl: '/assets/images/board/default/default-img.png',
            thumbnailName: '',
            nickname: '내자리내놔',
            profileImgUrl: '/assets/images/board/default/default-img.png',
            createdDate: '2025.05.12 08:20',
            likeCount: 45,
            viewCount: 302,
            commentCount: 12,
          },
          {
            id: 3,
            title: '2025 임용고시 일정',
            hashtag: '#관심 일정',
            thumbnailUrl: '/assets/images/board/default/default-img.png',
            thumbnailName: '',
            nickname: '넌학생이고난선생이야',
            profileImgUrl: '/assets/images/board/default/default-img.png',
            createdDate: '2025.05.12 05:15',
            likeCount: 45,
            viewCount: 302,
            commentCount: 12,
          },
          {
            id: 4,
            title: 'JAVA 공부해요~',
            hashtag: '#자유 게시글',
            thumbnailUrl: '/assets/images/board/default/default-img.png',
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
            thumbnailUrl: '/assets/images/board/default/default-img.png',
            thumbnailName: '',
            nickname: '따자하오영수',
            profileImgUrl: '/assets/images/board/default/default-img.png',
            createdDate: '2025.05.12 22:25',
            likeCount: 45,
            viewCount: 302,
            commentCount: 12,
          },
          {
            id: 6,
            title: '자바껌이죠',
            hashtag: '#자유 게시글',
            thumbnailUrl: '/assets/images/board/default/default-img.png',
            thumbnailName: '',
            nickname: '따자하오영수',
            profileImgUrl: '/assets/images/board/default/default-img.png',
            createdDate: '2025.05.12 20:08',
            likeCount: 45,
            viewCount: 302,
            commentCount: 12,
          },         
        ];

        setPostLists(dummyData);
      }
    };

    fetchBoardLists();
  }, []);

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
          <S.TagButton>#관심 일정</S.TagButton>
          <S.TagButton>#자유 게시글</S.TagButton>
          <S.TagButton>#공유 일정</S.TagButton>
        </S.TagArea>
      </S.SearchArea>

      <S.BoardTitle>버디들의 자유 게시판 ✨</S.BoardTitle>
        <S.WriteBtn to="/main/community/board/write">글쓰기</S.WriteBtn>
    </S.BoardHeader>

    <S.PostGrid>
      {postLists.length === 0 ? (
        <div>게시글이 없습니다.</div>
      ) : (
        postLists.map((post) => (
          <Link to={`post/${post.id}`} key={post.id}>
            <S.PostCard>
              <S.Thumbnail
                src={ post.thumbnailUrl ? post.thumbnailUrl : '/assets/images/board/default/default-img.png'} alt='default-img'
              />
              <S.Tag>{post.hashtag}</S.Tag>
              <S.Title>{post.title}</S.Title>
              <S.UserInfo>
                <S.ProfileImg src={post.profileImgUrl} />
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
