import React, { useEffect, useState } from 'react';
import S from './style';
import { useNavigate, useParams } from 'react-router-dom';
import FormatDate from '../../../utils/formatDate/FormatDate'
import Pagination from '../../../hooks/pagenation/Pagination';
import { useSelector } from 'react-redux';

const MyPagePointLog = () => {
  // 마이페이지 파람에서 id값을 가져오는 훅함수
  const { id } = useParams();
  // 아이디 값을 저장
  const ownerId = id;
  // 로그인된 유저정보
  const {currentUser} = useSelector((state) => state.member)
  // 로그인된 유저의 아이디
  const memberId = currentUser.id;
  // 포인트 기록을 저장하는 변수
  const [pointLog, setPointLog] = useState([]);
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pointLog.slice(indexOfFirstItem, indexOfLastItem);

  const navigate = useNavigate();

  useEffect(() => {
    // currentUser가 아직 undefined일 때 렌더 보호
    if (!currentUser) return;
    // 타입 통일 (둘 다 string으로)
    if (String(ownerId) !== String(memberId)) {
      navigate(`/main/mypage/${ownerId}`, { replace: true });
    }
  }, [memberId, navigate, ownerId, currentUser]);

  useEffect(() => {
    const getPointLog = async () => {
      const response = await fetch(`http://localhost:10000/mypages/api/point/log/${ownerId}`)
      const datas = await response.json()
      setPointLog(datas)
    }
    getPointLog()
  }, [ownerId])


  return (
    <div>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>포인트 내역을 확인할 수 있습니다.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>포인트 이용내역</span>
              <S.TitleMemberPoint>
                나의 포인트 : <span>{currentUser.memberPoint} 🪙</span>
              </S.TitleMemberPoint>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        <S.BodyContainer>
          {/* 포인트 로그 */}
          {currentItems.map((item) => (
            <S.ListContainer key={item.id}>
              <S.ListLeftContainer>
                <h1>{item.memberPointChangeAmount > 0 ? '획득' : '구매'}</h1>
                <S.PointAmount $isPositive={item.memberPointChangeAmount > 0}>
                  {Math.abs(item.memberPointChangeAmount)}P
                </S.PointAmount>
                <h3>{item.memberPointReason}</h3>
              </S.ListLeftContainer>
              <S.ListRightContainer>
                {FormatDate(item.memberPointChangeDate).split(" ").join(" ")}
              </S.ListRightContainer>
            </S.ListContainer>
          ))}
        </S.BodyContainer>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(pointLog.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </S.MainContainer>
    </div>
  );
};

export default MyPagePointLog;