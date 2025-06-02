import React, { useEffect, useState } from 'react';
import S from './style';
import { NavLink, useParams } from 'react-router-dom';
import FormatDate from '../../../utils/formatDate/FormatDate'
import Pagination from '../../../hooks/pagenation/Pagination';

const MyPageComments = () => {

  // 마이페이지 파람에서 id값을 가져오는 훅함수
  const { id } = useParams();
  // 아이디 값을 저장
  const memberId = id;
  // 가져온 나의 포스팅을 조회
  const [myComments, setMyComments] = useState([]);
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = myComments.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(() => {
    const getMyCommnets = async () => {
      const response = await fetch(`http://localhost:10000/boards/api/mypage/comments/${memberId}`)
      const datas = await response.json()
      setMyComments(datas)
    }
    getMyCommnets()
  }, [memberId])

  return (
    <>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>커뮤니티에서 내가 쓴 모든 댓글을 확인할 수 있습니다.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>내가 쓴 댓글</span>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        <S.BodyContainer>
          {/* 아이템 리스트 컨테이너 */}
          {currentItems.map((item) => (
            <NavLink to={`/main/community/board/post/${item.boardId}`}>
              <S.ItemContainer key={item.id}>
                <S.ItemContentContainer>
                  <S.ItemCreateTime>{FormatDate(item.boardCommentCreateDate)}</S.ItemCreateTime>
                  <S.ItemTitle>게시글 | {item.boardTitle}</S.ItemTitle>
                  <S.ItemContent>
                    {item.boardCommentContent}
                  </S.ItemContent>
                </S.ItemContentContainer>
                <S.ItemInfo>
                  <S.ItemIconImg src="/assets/images/board/icon/like-icon.png" className="icon" alt="like" />
                  <S.ItemInfoCount>{item.boardCommentLikeCount}</S.ItemInfoCount>
                </S.ItemInfo>
              </S.ItemContainer>
            </NavLink>
          ))}
          <Pagination 
            currentPage={currentPage}
            totalPages={Math.ceil(myComments.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </S.BodyContainer>
      </S.MainContainer>
    </>
  );
};

export default MyPageComments;