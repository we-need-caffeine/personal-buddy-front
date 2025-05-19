import React, { useState } from 'react';
import S from './style';
import { Link } from 'react-router-dom';

const BoardPostListContainer = ({
  boards,
  setIsUpdate,
  setOrder,
  isUpdate,
  setBoardHashtag,
  setSearchKeyword
}) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchKeyword, setSearchKeywordState] = useState('');

  const filteredPosts = boards.filter((post) => {
    const matchTag =
    selectedTag && post.hashtag
    ? post.hashtag.trim() === selectedTag.trim()
    : true;

    const matchKeyword =
      searchKeyword === '' ||
      (post.title?.includes(searchKeyword) || post.nickname?.includes(searchKeyword)); // 옵셔널 체이닝으로 방어
    return matchTag && matchKeyword;
  });

  console.log("boards", boards);
  boards.forEach((post) => console.log("hashtag:", post.hashtag));

  return (
    <>
      <S.SortBox>
        <S.SortButton onClick={() => {
          setOrder('');
          setIsUpdate(prev => !prev);
        }} $active={!isUpdate}>최신순</S.SortButton>
        <p>|</p>
        <S.SortButton onClick={() => {
          setOrder('좋아요순');
          setIsUpdate(prev => !prev);
        }} $active={false}>좋아요순</S.SortButton>
        <p>|</p>
        <S.SortButton onClick={() => {
          setOrder('조회순');
          setIsUpdate(prev => !prev);
        }} $active={false}>조회순</S.SortButton>
      </S.SortBox>

      <S.BoardHeader>
        <S.SearchArea>
          <S.SearchInput
            type="text"
            placeholder="검색어를 입력해주세요."
            onChange={(e) => {
              setSearchKeywordState(e.target.value);
              setSearchKeyword(e.target.value);
              setIsUpdate(prev => !prev);
            }}
          />
          <S.TagArea>
            <S.TagButton onClick={() => {
              setSelectedTag(null);
              setBoardHashtag('');
              setIsUpdate(prev => !prev);
            }} $active={selectedTag === null}>#전체 일정</S.TagButton>

            <S.TagButton onClick={() => {
              setSelectedTag('#관심 일정');
              setBoardHashtag('관심일정');
              setIsUpdate(prev => !prev);
            }} $active={selectedTag === '#관심 일정'}>#관심 일정</S.TagButton>

            <S.TagButton onClick={() => {
              setSelectedTag('#자유 게시글');
              setBoardHashtag('자유게시글');
              setIsUpdate(prev => !prev);
            }} $active={selectedTag === '#자유 게시글'}>#자유 게시글</S.TagButton>

            <S.TagButton onClick={() => {
              setSelectedTag('#공유 일정');
              setBoardHashtag('공유일정');
              setIsUpdate(prev => !prev);
            }} $active={selectedTag === '#공유 일정'}>#공유 일정</S.TagButton>

            
          </S.TagArea>
        </S.SearchArea>

        <S.TitlesAndWriteBtn>
          <S.Titles>
            <S.SubTitle>어디에도 풀지 못했던 은밀한 TMI</S.SubTitle>
            <S.BoardTitle>버디들의 자유 게시판 ✨</S.BoardTitle>
          </S.Titles>
          <S.WriteBtn to="/main/community/board/write">글쓰기</S.WriteBtn>
        </S.TitlesAndWriteBtn>
      </S.BoardHeader>

      <S.PostGrid>
        {filteredPosts.length === 0 ? (
          <div>게시글이 없습니다.</div>
        ) : (
          filteredPosts.map((post) => (
            <Link to={`post/${post.boardId}`} key={post.boardId}>
              <S.PostCard>
                <S.Thumbnail
                  src={
                      post.boardImgPath && post.boardImgName
                        ? `${post.boardImgPath}/${post.boardImgName}`
                        : '/assets/images/board/default/default-img.png'
                    }
                  alt="썸네일"
                />
                <S.Tag>{post.boardHashtag}</S.Tag>
                <S.Title>{post.boardTitle}</S.Title>
                <S.UserInfo>
                  <S.ProfileImg
                    src={
                      post.memberImgPath && post.memberImgName
                        ? `${post.memberImgPath}/${post.memberImgName}`
                        : '/assets/images/member/profile-default.png'
                    }
                    onError={(e) => {
                    e.target.onerror = null; // 무한 루프 방지
                    e.target.src = '/assets/images/member/profile-default.png'; // 디폴트 이미지 강제 세팅
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(`닉네임 ${post.memberNickname}의 프로필 클릭`);
                    }}
                  />
                  <S.Nickname>{post.memberNickname}</S.Nickname>
                </S.UserInfo>
                <S.Date>{post.boardContentCreateDate}</S.Date>
                <S.MetaInfo>
                  <span>
                    <img src="/assets/images/board/icon/like-icon.png" alt="like" />
                    {post.boardLikeCount}
                  </span>
                  <span>
                    <img src="/assets/images/board/icon/view-icon.png" alt="view" />
                    {post.boardContentViews}
                  </span>
                  <span>
                    <img src="/assets/images/board/icon/chat-icon.png" alt="chat" />
                    {post.boardCommentCount}
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
