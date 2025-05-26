
import React from 'react';
import S from './style';

// Props:
// - currentPage: 현재 페이지 번호
// - totalPages: 전체 페이지 수
// - onPageChange: 페이지 클릭 시 호출되는 함수
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <S.PaginationWrapper>
       {/* 왼쪽 화살표 - 첫 페이지면 비활성화 */}
      <S.ArrowButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;  {/* "<" 기호 엔터티 표기*/}
      </S.ArrowButton>

      {/* 페이지 번호들 */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <S.PageButton
          key={pageNum}
          isActive={pageNum === currentPage} // 현재 페이지일 경우 스타일 다르게 적용
          onClick={() => onPageChange(pageNum)} // 클릭 시 해당 페이지로 이동
        >
          {pageNum}
        </S.PageButton>
      ))}

      {/* 오른쪽 화살표 - 마지막 페이지면 비활성화 */}
      <S.ArrowButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt; {/* ">" 기호 */}
      </S.ArrowButton>
    </S.PaginationWrapper>
  );
};

export default Pagination;


// 사용 방법
// [state 선언]
// const [currentPage, setCurrentPage] = useState(1);
// const itemsPerPage = 7;

// [데이터 슬라이싱]
// const currentItems = totalItems.slice(...);

// [컴포넌트 사용]
// <Pagination currentPage={currentPage} totalPages={...} onPageChange={setCurrentPage} />


// 상세 설명
// --- 1. 필요한 상태 선언 ---

// 현재 페이지를 저장하는 state
// const [currentPage, setCurrentPage] = useState(1);

// 한 페이지당 보여줄 항목 수 (예: 댓글 7개씩)
// const itemsPerPage = 7;

// 전체 데이터 (예: 댓글 전체 배열)
// const comments = [...]; // 서버에서 가져온 전체 댓글 배열


// --- 2. 현재 페이지에 맞는 데이터 추출 ---

// const indexOfLast = currentPage * itemsPerPage;
// const indexOfFirst = indexOfLast - itemsPerPage;
// const currentItems = comments.slice(indexOfFirst, indexOfLast);


// --- 3. 목록 렌더링 (예: 댓글 리스트) ---

// {currentItems.map(item => (
//   <CommentItem key={item.id} item={item} />
// ))}


// --- 4. Pagination 컴포넌트 추가 ---

// <Pagination
//   currentPage={currentPage} // 현재 페이지 번호
//   totalPages={Math.ceil(comments.length / itemsPerPage)} // 총 페이지 수
//   onPageChange={setCurrentPage} // 페이지 번호 클릭 시 호출할 함수
// />


// --- 5. 디자인은 PaginationStyle.js에서 수정 가능 ---
// - 현재 페이지 버튼은 강조 색상 (ex: 초록 배경, 흰색 글씨)
// - 나머지는 회색 배경
// - 화살표 버튼은 둥글게 처리되며, 첫/마지막 페이지에서는 비활성화됨


