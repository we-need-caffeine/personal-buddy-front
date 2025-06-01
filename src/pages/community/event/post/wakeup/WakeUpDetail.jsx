// WakeUpDetail.jsx 및 style.js 전체 통합 코드입니다. 
// 본문이 길기 때문에 style.js는 다음 메시지에 분리 제공할게요.

// WakeUpDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';
import Pagination from '../../../../../hooks/pagenation/Pagination';

const WakeUpDetail = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.member);
  const memberId = currentUser?.id || 1;

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [bestComments, setBestComments] = useState([]);
  const [likedCommentIds, setLikedCommentIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [views, setViews] = useState(0);

  const [time, setTime] = useState('00:00:00');
  const [currentTime, setCurrentTime] = useState('');
  const [isAfterSix, setIsAfterSix] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [joined, setJoined] = useState(false);
  const [give, setGive] = useState(false);

  

  const paginatedComments = comments.slice((currentPage - 1) * 7, currentPage * 7);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setCurrentTime(timeStr);
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setIsAfterSix(hours > 6 || (hours === 6 && minutes >= 0));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let intervalId;
    const fetchTime = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/routine/time-left`);
        const data = await res.json();
        let seconds = data.secondsLeft;

        intervalId = setInterval(() => {
          if (seconds <= 0) {
            clearInterval(intervalId);
            setTime('00:00:00');
            return;
          }
          const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
          const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
          const secs = String(seconds % 60).padStart(2, '0');
          setTime(`${hrs}:${mins}:${secs}`);
          seconds--;
        }, 1000);
      } catch (e) {
        console.error('시간 불러오기 실패', e);
      }
    };

    fetchTime();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [detailRes, likeCheckRes, likeCountRes, joinCheckRes, commentRes, bestRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/detail/${id}`),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/like-check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId: id, memberId })
          }),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/like-count/${id}`),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/join-check?eventId=${id}&memberId=${memberId}`),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/best/${id}`)
        ]);

        setViews((await detailRes.json()).eventViews || 0);
        setIsLiked(await likeCheckRes.json());
        setLikeCount(await likeCountRes.json());
        setJoined(await joinCheckRes.json());
        setComments(await commentRes.json());
        setBestComments(await bestRes.json());
      } catch (err) {
        console.error('초기 데이터 로딩 실패', err);
      }
    };

    fetchInitialData();
  }, [id]);

  const handleChallengeClick = () => {
    const now = new Date();
    if (now.getHours() === 5) {
      setChallengeStarted(true);
    } else {
      alert('이벤트 참여 시간은 AM 05:00:00 ~ AM 05:59:59입니다.');
    }
  };

  const handleCommentSubmit = async () => {
    if (!challengeStarted) return;
    setGive(true);
    const isDuplicated = await checkAlreadyCommented();
    if (isDuplicated) {
      alert('이미 참여한 이벤트입니다.');
      setJoined(true);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/write`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: Number(id),
          memberId,
          eventCommentDescription: commentText
        })
      });

      if (res.ok) {
        setCommentText('');
        setJoined(true);
        const refreshed = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`);
        setComments(await refreshed.json());
      } else {
        alert('댓글 등록 실패');
      }
    } catch (err) {
      console.error('댓글 등록 에러', err);
    }
  };

  const checkAlreadyCommented = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: Number(id), memberId }),
    });
    return res.json();
  };

  const handleCommentLike = async (commentId) => {
  if (!memberId) return alert('로그인 후 이용해주세요');

  const alreadyLiked = likedCommentIds.includes(commentId);

  await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/${alreadyLiked ? 'un-like' : 'like'}`, {
    method: alreadyLiked ? 'DELETE' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ commentId, memberId })
  });

  // 댓글 리스트 새로고침
  const updated = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`);
  const data = await updated.json();
  setComments(data);

  // 베스트 댓글도 새로고침
  // const best = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/best/${id}`);
  // const bestData = await best.json();
  // setBestComments(bestData);

  // 상태 업데이트
  setLikedCommentIds((c) =>
    alreadyLiked ? c.filter((id) => id !== commentId) : [...c, commentId]
  );
};


  const handleCommentUpdate = async (commentId) => {
  if (!editedCommentText.trim()) return;

  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: commentId,
        eventCommentDescription: editedCommentText,
      }),
    });

    if (res.ok) {
      const refreshed = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`);
      const data = await refreshed.json();
      setComments(data);

      const bestRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/best/${id}`);
      const bestData = await bestRes.json();
      setBestComments(bestData);

      setEditingCommentId(null);
      setEditedCommentText('');
    } else {
      alert('댓글 수정 실패');
    }
    } catch (err) {
      console.error('댓글 수정 에러', err);
    }
  };


  const handleCommentDelete = async (commentId) => {
  const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
  if (!confirmDelete) return;

  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/delete/${commentId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      const refreshed = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`);
      const data = await refreshed.json();
      setComments(data);

      const bestRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/best/${id}`);
      const bestData = await bestRes.json();
      setBestComments(bestData);
    } else {
      alert('댓글 삭제 실패');
    }
    } catch (err) {
      console.error('댓글 삭제 에러', err);
    }
  };


  const handlePostLike = async () => {
    try {
      if (isLiked) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/un-like`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: id, memberId })
        });
        setLikeCount(c => c - 1);
      } else {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/like`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: id, memberId })
        });
        setLikeCount(c => c + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('좋아요 처리 실패', err);
    }
  };

  return (
    <S.Container>
      <S.MetaBox>
        <S.TitleRow>
          <S.Title>오늘의 미션 : 오전6시 기상</S.Title>
          {/* <S.Date>2025.06.12 게시</S.Date> */}
        </S.TitleRow>
      </S.MetaBox> 
        <S.MetaBottom>
          <S.Author>
            <S.ProfileImg src="/assets/images/header/default-member-img.png" alt="운영자" />
            <span>운영자</span>
          </S.Author>
          <S.StatBox>
            조회수 <strong>{views}</strong>  | 댓글 <strong>{comments.length}</strong>
          </S.StatBox>
        </S.MetaBottom>

      {/* 이벤트 이미지 + 시계 */}
      <S.ImageWrapper>
        <img src="/assets/images/event/morning.png" alt="이벤트" />
        <S.Background>
          <S.EventClock>
            <img src='/assets/images/event/moring-clock.png' alt="시계" />
            {!challengeStarted && !give && (
              <S.ChallengeButton onClick={handleChallengeClick}>도전!</S.ChallengeButton>
            )}
          </S.EventClock>
          <S.TimerContainer>
            <S.Div>현재 시간: {currentTime}</S.Div>
            <S.Div>남은 시간: {time}</S.Div>
          </S.TimerContainer>
          <S.StatusBanner status={give 
            ? 'completed' : challengeStarted 
            ? 'challenging' : 'default'}>
            {give 
            ? '600P 획득 성공! 내일 아침에 다시 만나요!'
             : challengeStarted ? '이벤트 도전중...' : '성공시 600🪙 획득!'}
          </S.StatusBanner>
        </S.Background>
      </S.ImageWrapper>

      <S.Refer>
        ※ 이벤트 및 챌린지 댓글은 수정및 삭제가 불가하므로 참고하여 주시기 바랍니다.
      </S.Refer>

      {/* 댓글 입력 */}
      <S.CommentInputBox>
        <S.Textarea
          placeholder={isAfterSix ? "이벤트 참여 시간이 아닙니다." : "댓글을 입력해주세요"}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={!challengeStarted || joined}
          maxLength={500}
        />
        <S.InputBottom>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <S.CharCount>{commentText.length}</S.CharCount>
            <span>/ 500</span>
          </div>
          <S.SubmitButton
            active={commentText.length > 0 && !joined}
            disabled={commentText.length === 0 || joined}
            onClick={handleCommentSubmit}
          >
            <span>{joined ? '참여 완료' : '등록'}</span>
          </S.SubmitButton>
        </S.InputBottom>
      </S.CommentInputBox>

      {/* BEST 댓글 */}
      {/* <S.BestCommentSection>
        {bestComments.map((c, i) => (
          <S.BestCommentItem key={c.id}>
            <S.BestBadge>⭐ BEST {i + 1}</S.BestBadge>
            <S.CommentTop>
              <S.CommentUser>
                <S.ProfileImg src={c.memberImgPath || '/assets/images/header/default-member-img.png'} />
                <S.Nickname>{c.memberNickName}</S.Nickname>
              </S.CommentUser>
            </S.CommentTop>
            <S.CommentContents>{c.eventCommentDescription}</S.CommentContents>
          </S.BestCommentItem>
  
  ))}
      </S.BestCommentSection> */}

      {/* 일반 댓글 */}
      <S.CommentList>
        
        {paginatedComments.map((c) => (
          <S.CommentItem key={c.id}>
            <S.CommentTop>
              <S.CommentUser>
                <S.ProfileImg src={c.memberImgPath || '/assets/images/header/default-member-img.png'} />
                <S.Nickname>{c.memberNickName}</S.Nickname>

                <S.LeftCommentWrapper>
                  <S.CommentDate>{c.eventCommentCreateDate}</S.CommentDate>
                  <S.CommentLikeCount>
                    <img src="/assets/images/board/icon/like-icon.png" alt="like" />
                    <span>{c.eventCommentLikeCount}</span>
                  </S.CommentLikeCount>
                </S.LeftCommentWrapper>
              </S.CommentUser>

              <S.Right>
                <S.CommentLikeButton
                  liked={likedCommentIds.includes(c.id)}
                  onClick={() => handleCommentLike(c.id)}
                >
                  ♥
                </S.CommentLikeButton>
              </S.Right>
            </S.CommentTop>

            {/* 수정 중일 때는 Textarea, 아닐 때는 본문 보여주기 */}
            {editingCommentId === c.id ? (
              <>
                <S.Textarea
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                  maxLength={500}
                />
                <S.InputBottom>
                  <S.SaveButton onClick={() => handleCommentUpdate(c.id)}>저장</S.SaveButton>
                  <S.CancelButton onClick={() => setEditingCommentId(null)}>취소</S.CancelButton>
                </S.InputBottom>
              </>
            ) : (
              <>
                <S.CommentContents>{c.eventCommentDescription}</S.CommentContents>

                {memberId === c.memberId && (
                  <S.EditDeleteBox>
                    <S.CommentEditButton onClick={() => {
                      setEditingCommentId(c.id);
                      setEditedCommentText(c.eventCommentDescription);
                    }}>
                      수정
                    </S.CommentEditButton>
                    <S.CommentSeparator>|</S.CommentSeparator>
                    <S.CommentDeleteButton onClick={() => handleCommentDelete(c.id)}>
                      삭제
                    </S.CommentDeleteButton>
                  </S.EditDeleteBox>
                )}
              </>
            )}
          </S.CommentItem>
        ))}
      </S.CommentList>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(comments.length / 7)}
        onPageChange={setCurrentPage}
      />
    </S.Container>
  );
};

export default WakeUpDetail;
