import React, { useEffect, useState } from 'react';
import S from './style';
import { data, Link } from 'react-router-dom';
import FormatDate from '../../../../utils/formatDate/FormatDate';
import ProfileCard from '../../../layout/profile/ProfileCard';
import { useSelector } from 'react-redux';


const BoardPostListContainer = ({
    boards, isUpdate, setIsUpdate, setOrder, setBoardHashtag, setSearchKeyword
  }) => {

  const [activeOrder, setActiveOrder] = useState("최신순");
  const [activeTag, setActiveTag] = useState("전체일정");

  const { currentUser } = useSelector((state) => state.member); // Redux에서 로그인된 사용자 정보 가져오기
  const currentMemberId = currentUser?.id;
  const [profileCardPosition, setProfileCardPosition] = useState({x:0, y:0});
  const handleOrder = (e) => {
    const orderText = e.target.innerText.replaceAll(" ", "");
    setOrder(orderText);
    setActiveOrder(orderText); 
  };
  
  const handleHashtag = (e) => {
    const tagText = e.target.innerText.replaceAll(" ", "").replaceAll("#", "");
    setBoardHashtag(tagText);
    setActiveTag(tagText); 
  };

  // 프로필 카드 상태
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // 프로필 카드를 열고 닫는 함수
  const handleProfileCard = (state, user = null) => {
    if(user != selectedUser){
      setSelectedUser(user)
      setShowProfileCard(prev => !prev);
    }else{
      setShowProfileCard(false);
      setSelectedUser(null)
    }
  }

  useEffect(() => {
    // console.log("selectedUser 변경?", selectedUser);
}, [selectedUser]);


  useEffect(() => {
    // console.log("boards:", boards); 
  }, [boards]);



  return (
    <>
    <S.SortBox>
      <S.SortButton onClick={handleOrder} $active={activeOrder === "최신순"}>최신순</S.SortButton>
      <p>|</p>
      <S.SortButton onClick={handleOrder} $active={activeOrder === "좋아요순"}>좋아요순</S.SortButton>
      <p>|</p>
      <S.SortButton onClick={handleOrder} $active={activeOrder === "조회순"}>조회순</S.SortButton>
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
          <S.TagButton onClick={handleHashtag} $active={activeTag === "전체일정"}>#전체 일정</S.TagButton>
          <S.TagButton onClick={handleHashtag} $active={activeTag === "관심일정"}>#관심 일정</S.TagButton>
          <S.TagButton onClick={handleHashtag} $active={activeTag === "자유게시글"}>#자유 게시글</S.TagButton>
          <S.TagButton onClick={handleHashtag} $active={activeTag === "공유일정"}>#공유 일정</S.TagButton>
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
          boardContentViews, boardHashtag, boardLikeCount, boardTitle, boardCommentCount, boardImgName, boardImgPath,
          memberEmail, memberId, memberImgName, memberImgPath, memberNickname
          }) => ( // 필터링된 게시글만 렌더링
          <Link to={`post/${id}`} state={boards} key={id}>
            <S.PostCard>
              <S.Thumbnail
                src={
                  boardImgName && boardImgPath
                    ? `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(boardImgPath.replace("C:/personalbuddy/", ""))}&fileName=${encodeURIComponent(boardImgName)}`
                    : '/assets/images/board/default/default-img.png'
                }
                alt="thumbnail"
              />
              <S.Tag>{boardHashtag}</S.Tag>
              <S.Title>{boardTitle}</S.Title>
              <S.UserInfo>
                <S.ProfileImg 
                  src={
                    memberImgPath && memberImgName
                    ? `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(memberImgPath)}&fileName=${encodeURIComponent(memberImgName)}`
                    : '/assets/images/header/default-member-img.png'
                  }  
                    onError={(e) => {
                    e.target.src = '/assets/images/header/default-member-img.png';
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // 부모인 <Link> 클릭 방지 (기본 동작(링크 이동) 막기)
                    e.stopPropagation(); // 이벤트가 상위 요소로 전달되지 않게 막기
                    // console.log(`닉네임 ${memberNickname}의 프로필 클릭`);  
                    // console.log("x : ", e.clientX)
                    // console.log("y : ", e.clientY)
                    handleProfileCard(showProfileCard, memberId);
                      setProfileCardPosition({x: e.clientX, y: e.clientY})
                  }} 
                  
                />
                <S.Nickname>{memberNickname}</S.Nickname>
              </S.UserInfo>
              <S.Date>{FormatDate(boardContentCreateDate)}</S.Date>
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
      {
        showProfileCard && (
        <S.CardBG onClick={(e) => handleProfileCard(showProfileCard, selectedUser)} >
           <S.ProfileCardDropdown
            xLocation={profileCardPosition.x}
            yLocation={profileCardPosition.y}
          >
             <ProfileCard
               memberId={currentMemberId}
               profileCardMemberId={selectedUser}
               handleProfileCard={showProfileCard}
             />
           </S.ProfileCardDropdown>
        </S.CardBG>
      )}
        
    </>
  );
};

export default BoardPostListContainer;
