import React, { useEffect, useState } from 'react';
import S from './style';
import { NavLink, useParams } from 'react-router-dom';
import FormatDate from '../../../utils/formatDate/FormatDate'

const MyPagePosts = () => {

  // 마이페이지 파람에서 id값을 가져오는 훅함수
  const { id } = useParams();
  // 아이디 값을 저장
  const memberId = id;
  // 가져온 나의 포스팅을 조회
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const getMyPosts = async () => {
      const response = await fetch(`http://localhost:10000/boards/api/mypage/posts/${memberId}`)
      const datas = await response.json()
      setMyPosts(datas)
    }
    getMyPosts()
  }, [memberId])

  return (
    <>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>내가 커뮤니티에 등록한 게시물을 확인할 수 있습니다.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>내 게시물</span>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        <S.BodyContainer>
          {/* 아이템 리스트 컨테이너 */}
          {myPosts.map((item) => (
            <NavLink to={`/main/community/board/post/${item.id}`}>
              <S.ItemContainer key={item.id}>
                <S.ItemImg
                  src={
                    item.boardImgName && item.boardImgPath
                    ? `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(item.boardImgPath.replace("C:/personalbuddy/", ""))}&fileName=${encodeURIComponent(item.boardImgName)}`
                    : '/assets/images/board/default/default-img.png'
                  }
                  alt="thumbnail"
                />
                <S.ItemContentContainer>
                  <S.ItemCreateTime>{FormatDate(item.boardCreateDate)}</S.ItemCreateTime>
                  <S.ItemTitle>{item.boardTitle}</S.ItemTitle>
                  <S.ItemContent>
                    {item.boardContent}
                  </S.ItemContent>
                </S.ItemContentContainer>
                <S.ItemInfoContainer>
                  <S.ItemInfo>
                    <S.ItemIconImg src="/assets/images/board/icon/like-icon.png" className="icon" alt="like" />
                    <S.ItemInfoCount>{item.boardLikeCount}</S.ItemInfoCount>
                  </S.ItemInfo>
                  <S.ItemInfo>
                    <S.ItemIconImg src="/assets/images/board/icon/view-icon.png" className="icon" alt="view" />
                    <S.ItemInfoCount>{item.boardContentViews}</S.ItemInfoCount>
                  </S.ItemInfo>
                  <S.ItemInfo>
                    <S.ItemIconImg src="/assets/images/board/icon/chat-icon.png" className="icon" alt="chat" />
                    <S.ItemInfoCount>{item.boardCommentCount}</S.ItemInfoCount>
                  </S.ItemInfo>
                </S.ItemInfoContainer>
              </S.ItemContainer>
            </NavLink>
          ))}
        </S.BodyContainer>
      </S.MainContainer>
    </>
  );
};

export default MyPagePosts;