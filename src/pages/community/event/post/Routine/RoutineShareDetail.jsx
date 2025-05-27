import React, { useState } from 'react';
import S from './style';
import { useParams } from 'react-router-dom';

const RoutineShareDetail = () => {
  const { id } = useParams(); // 현재 URL에서 이벤트 ID ( /event/post/:id)

  // 좋아요 수 상태
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);  // 좋아요 여부

   // 댓글 입력값 상태
  const [commentText, setCommentText] = useState('');
  const [joined, setJoined] = useState(false); // 댓글 등록 상태

  // 댓글 작성 버튼 클릭 시 
  const handleCommentSubmit = async () => {

    // 공백만 입력한 경우는 무시한다
  if (commentText.trim().length === 0) return;
  try {
    // 댓글 작성 요청
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/write`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: Number(id), // 현재 이벤트 ID
        memberId: 1, // 일단 고정
        eventCommentContent: commentText, // 입력한 댓글 내용
      }),
    });
        if (response.ok) {
            alert('댓글 등록 완료');
            setCommentText(''); // 댓글 입력창 초기화
            setJoined(true); // 상태를 true로
        } else {
            alert('등록 실패ㅠ0ㅠ');
        }
    } catch (err) {
        console.error(err);
            alert('오류 발생~~~~');
        }
        };


  return (
    <S.Container>
      <S.ImageWrapper>
        <img src="/assets/images/event/routine.png" alt="루틴 이벤트" />
        
        {/* 댓글 입력이 존재하면 박스가 파란색으로 바뀌고 문구도 변경됨 */}
        <S.IsSuccess $joined={commentText.trim().length > 0}>
            {commentText.trim().length > 0 ? '이벤트 도전중...' : '성공시 1000P 획득!'}
        </S.IsSuccess>
        </S.ImageWrapper>

        {/* 댓글 입력창 */}
              <S.CommentInputBox>
                <S.Textarea
                  placeholder="댓글을 입력해주세요"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  maxLength={500}
                />
                <S.InputBottom>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <S.CharCount>{commentText.length}</S.CharCount>
                    <span>/ 500</span>
                  </div>
                  <S.SubmitButton
                    active={commentText.length > 0}
                    disabled={commentText.length === 0}
                    onClick={handleCommentSubmit}
                  >
                    <span>등록</span>
                  </S.SubmitButton>
                </S.InputBottom>
              </S.CommentInputBox>
    </S.Container>
  );
};



export default RoutineShareDetail;
