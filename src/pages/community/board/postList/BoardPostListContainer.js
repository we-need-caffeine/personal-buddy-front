import React, { useEffect, useState } from 'react';
import S from './style';
import { data, Link } from 'react-router-dom';


const BoardPostListContainer = ({
    boards, isUpdate, setIsUpdate, setOrder, setBoardHashtag, setSearchKeyword
  }) => {
  
  const handleOrder = (e) => {
    setOrder(e.target.innerText.replaceAll(" ", ""))
  }
  
  const handleHashtag = (e) => {
    setBoardHashtag(e.target.innerText.replaceAll(" ", "").replaceAll("#", ""))
  }
  
  return (
    <>
    <S.SortBox>
      <S.SortButton onClick={handleOrder}>최신순</S.SortButton>
      <p>|</p>
      <S.SortButton onClick={handleOrder}>좋아요순</S.SortButton>
      <p>|</p>
      <S.SortButton onClick={handleOrder}>조회순</S.SortButton>
    </S.SortBox>
    
    <S.BoardHeader>
      <S.SearchArea>
        <S.SearchInput type="text" placeholder="검색어를 입력해주세요." 
          onChange={(e) => {
            setSearchKeyword(e.target.value)}
          }
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              setIsUpdate(!isUpdate)
            }
          }}
        />
        <S.TagArea>
          <S.TagButton onClick={handleHashtag}>#전체 일정</S.TagButton>
          <S.TagButton onClick={handleHashtag}>#관심 일정</S.TagButton>
          <S.TagButton onClick={handleHashtag}>#자유 게시글</S.TagButton>
          <S.TagButton onClick={handleHashtag}>#공유 일정</S.TagButton>
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
      {boards.length === 0 ? (
        <div>게시글이 없습니다.</div>
      ) : (
        boards.map(({
          id, boardContent, boardContentCreateDate, boardContentUpdateDate, 
          boardContentViews, boardHashtag, boardLikeCount, boardTitle, boardCommentCount,
          memberEmail, memberId, memberImgName, memberImgPath, memberNickname
          }) => ( // 필터링된 게시글만 렌더링
          <Link to={`post/${id}`} key={id}>
            <S.PostCard>
              <S.Thumbnail
                src={ "" 
                  ? "" 
                  :  `/assets/images/board/default/default-img.png` } alt='default-img' // 썸네일 없을 경우 기본 이미지
              />
              <S.Tag>{boardHashtag}</S.Tag>
              <S.Title>{boardTitle}</S.Title>
              <S.UserInfo>
                <S.ProfileImg 
                  src={`${memberImgPath}/${memberImgName}`}  
                  onClick={(e) => {
                    e.preventDefault(); // 부모인 <Link> 클릭 방지 (기본 동작(링크 이동) 막기)
                    e.stopPropagation(); // 이벤트가 상위 요소로 전달되지 않게 막기
                    console.log(`닉네임 ${memberNickname}의 프로필 클릭`);  
                    // 프로필 모달 호출 로직               
                  }} 
                />
                <S.Nickname>{memberNickname}</S.Nickname>
              </S.UserInfo>
              <S.Date>{boardContentCreateDate}</S.Date>
              <S.MetaInfo>
                <span>
                  <img src="/assets/images/board/icon/like-icon.png" className="icon" alt="like" />
                  {boardLikeCount}
                </span>
                <span>
                  <img src="/assets/images/board/icon/view-icon.png" className="icon" alt="view" />
                  {boardContentViews}
                </span>
                <span>
                  <img src="/assets/images/board/icon/chat-icon.png" className="icon" alt="chat" />
                  {boardCommentCount}
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
