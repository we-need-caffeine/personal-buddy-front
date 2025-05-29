// RoutineShareDetail 정리된 구조
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';
import Pagination from '../../../../../hooks/pagenation/Pagination';

const RoutineShareDetail = () => {
  const { id } = useParams(); // URL에서 이벤트 ID 추출
  const { currentUser } = useSelector((state) => state.member); // 로그인한 유저 정보
  const memberId = currentUser?.id || 1; // 로그인 안 했을 경우 기본값 1

  // 상태 관리
  const [commentText, setCommentText] = useState(''); // 댓글 입력창 텍스트
  const [comments, setComments] = useState([]); // 전체 댓글 목록
  const [likedCommentIds, setLikedCommentIds] = useState([]); // 좋아요 누른 댓글 ID 목록
  const [currentPage, setCurrentPage] = useState(1); // 댓글 페이지네이션 현재 페이지
  const [joined, setJoined] = useState(false); // 참여 여부 (댓글 작성 여부)
  const [likeCount, setLikeCount] = useState(0); // 게시글 좋아요 수
  const [isLiked, setIsLiked] = useState(false); // 현재 사용자가 좋아요 눌렀는지 여부
  const [views, setViews] = useState(0); // 게시글 조회수
  const [bestComments, setBestComments] = useState([]); // BEST 댓글 목록

  const paginatedComments = comments.slice((currentPage - 1) * 7, currentPage * 7); // 페이지네이션 처리

  // 초기 데이터 불러오기 (게시글, 좋아요 여부, 참여 여부, 댓글 등)
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

        const detailData = await detailRes.json();
        const isLikedData = await likeCheckRes.json();
        const likeCountData = await likeCountRes.json();
        const joinData = await joinCheckRes.json();
        const commentData = await commentRes.json();
        const bestData = await bestRes.json();

        // 상태 업데이트
        setViews(detailData.eventViews || 0);
        setIsLiked(isLikedData);
        setLikeCount(likeCountData);
        setJoined(joinData);
        setComments(commentData);
        setBestComments(bestData);
      } catch (err) {
        console.error('초기 데이터 로딩 실패', err);
      }
    };

    fetchInitialData();
  }, [id]);

  // 댓글 중복 작성 체크 API 호출
  const checkAlreadyCommented = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: Number(id), memberId })
    });
    return res.json();
  };

  // 댓글 작성 처리
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return; // 빈 문자열 방지

    const isDuplicated = await checkAlreadyCommented();
    if (isDuplicated) {
      alert('이미 참여한 이벤트입니다.');
      setJoined(true);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/write`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: Number(id), memberId, eventCommentDescription: commentText })
      });

      if (response.ok) {
        setCommentText('');
        setJoined(true);
        const refreshed = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`);
        const data = await refreshed.json();
        setComments(data);
      } else {
        alert('댓글 등록 실패');
      }
    } catch (err) {
      console.error('댓글 등록 에러', err);
      alert('오류 발생');
    }
  };

  // 댓글 좋아요 처리
  const handleCommentLike = async (commentId) => {
    if (!memberId) return alert('로그인 후 이용해주세요');

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId, memberId })
    });

    const updated = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`);
    const data = await updated.json();
    const best = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/best/${id}`);
    const bestData = await best.json();

    setBestComments(bestData);
    setComments(data);
    setLikedCommentIds((c) =>
      c.includes(commentId) ? c.filter(id => id !== commentId) : [...c, commentId]
    );
  };

  // 게시글 좋아요 처리
  const handlePostLike = async () => {
    try {
      const url = isLiked
        ? `${process.env.REACT_APP_BACKEND_URL}/events/api/un-like`
        : `${process.env.REACT_APP_BACKEND_URL}/events/api/like`;

      await fetch(url, {
        method: isLiked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: id, memberId })
      });

      setLikeCount((c) => isLiked ? c - 1 : c + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('이벤트 좋아요 처리 실패', err);
    }
  };

  return (
    <S.Container>
      {/* 제목 및 작성일 */}
      <S.MetaBox>
        <S.TitleRow>
          <S.Title>나의 일정 공유하기</S.Title>
          <S.Date>2025.04.20 게시</S.Date>
        </S.TitleRow>
      </S.MetaBox>

      {/* 프로필 및 통계 */}
      <S.MetaBottom>
        <S.Author>
          <S.ProfileImg src="/assets/images/header/default-member-img.png" alt="운영자" />
          <span>운영자</span>
        </S.Author>
        <S.StatBox>
          조회수 <strong>{views}</strong> | 좋아요 <strong>{likeCount}</strong> | 댓글 <strong>{comments.length}</strong>
        </S.StatBox>
      </S.MetaBottom>

      {/* 이벤트 배너 및 상태 */}
      <S.ImageWrapper>
        <img src="/assets/images/event/routine.png" alt="루틴 이벤트" />
        <S.IsSuccess $joined={joined || commentText.trim().length > 0}>
          {joined ? '미션 컴플리트!' : commentText.trim().length > 0 ? '이벤트 도전중...' : '성공시 1000P 획득!'}
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
            active={commentText.length > 0 && !joined}
            disabled={commentText.length === 0 || joined}
            onClick={handleCommentSubmit}
          >
            <span>{joined ? '참여 완료' : '등록'}</span>
          </S.SubmitButton>
        </S.InputBottom>
      </S.CommentInputBox>

      {/* BEST 댓글 */}
      <S.BestCommentSection>
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
      </S.BestCommentSection>

      {/* 일반 댓글 리스트 */}
      <S.CommentList>
        {paginatedComments.map((c) => (
          <S.CommentItem key={c.id}>
            <S.CommentTop>
              <S.CommentUser>
                <S.ProfileImg src={c.memberImgPath || '/assets/images/header/default-member-img.png'} />
                <S.Nickname>{c.memberNickName}</S.Nickname>
              </S.CommentUser>
              <S.CommentLikeButton liked={likedCommentIds.includes(c.id)} onClick={() => handleCommentLike(c.id)}>
                ♥ {c.eventCommentLikeCount}
              </S.CommentLikeButton>
            </S.CommentTop>
            <S.CommentContents>{c.eventCommentDescription}</S.CommentContents>
          </S.CommentItem>
        ))}
      </S.CommentList>

      {/* 페이지네이션 */}
      <Pagination currentPage={currentPage} totalPages={Math.ceil(comments.length / 7)} onPageChange={setCurrentPage} />
    </S.Container>
  );
};

export default RoutineShareDetail;
