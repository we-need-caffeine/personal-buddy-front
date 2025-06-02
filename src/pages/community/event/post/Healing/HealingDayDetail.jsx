import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';
import Pagination from '../../../../../hooks/pagenation/Pagination';

const HealingDayDetail = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.member);
  const memberId = currentUser?.id || 1;

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [likedCommentIds, setLikedCommentIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [joined, setJoined] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [views, setViews] = useState(0);
  const [bestComments, setBestComments] = useState([]);

  const paginatedComments = comments.slice((currentPage - 1) * 7, currentPage * 7);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [detailRes, likeCheckRes, likeCountRes, joinCheckRes, commentRes ,bestRes] = await Promise.all([
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

        console.log("배댓",bestComments);

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

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    // 댓글 중복 확인
    const isDuplicated = await checkAlreadyCommented();
    if (isDuplicated) {
      alert('이미 참여한 이벤트입니다.');
      setJoined(true);
      return;
    }

    // 정상 등록 로직
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

    const checkAlreadyCommented = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: Number(id), memberId }),
      });
      return res.json(); // true 또는 false
    };

    // 좋아요 버튼 누른 후 → fetch로 최신 데이터 받아오기
    const handleCommentLike = async (commentId) => {
      if (!memberId) return alert('로그인 후 이용해주세요');

      const alreadyLiked = likedCommentIds.includes(commentId);
      const url = alreadyLiked
        ? `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/un-like`
        : `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/like`;

      try {
        await fetch(url, {
          method: alreadyLiked ? 'DELETE' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ commentId, memberId }),
        });

        // 최신 댓글 리스트 가져오기
        const commentRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`);
        const commentData = await commentRes.json();
        setComments(commentData); // 이걸로 최신 likeCount 반영됨

        const bestRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/comment/best/${id}`);
        const bestData = await bestRes.json();
        setBestComments(bestData);

        setLikedCommentIds((prev) =>
          alreadyLiked ? prev.filter((id) => id !== commentId) : [...prev, commentId]
        );
      } catch (err) {
        console.error('댓글 좋아요 실패', err);
      }
    };

  // console.log("야야야 정신차려",  comments);

  return (
    <S.Container>
      <S.MetaBox>
        <S.TitleRow>
          <S.Title>오늘 하루는 힐링 데이</S.Title>
          {/* <S.Date>2025.04.20 게시</S.Date> */}
        </S.TitleRow>
      </S.MetaBox>
        <S.MetaBottom>
          <S.Author>
            <S.ProfileImg src="/assets/images/header/default-member-img.png" alt="운영자" />
            <span>운영자</span>
          </S.Author>
          <S.StatBox>
            조회수 <strong>{views}</strong> | 댓글 <strong>{comments.length}</strong>
          </S.StatBox>
        </S.MetaBottom>
      <S.ImageWrapper>
        <img src="/assets/images/event/healing-day.png" alt="루틴 이벤트" />
        <S.IsSuccess $joined={joined || commentText.length > 0}>
        {joined
          ? '참여 완료! 800🪙의 주인공은?'
          : commentText.length > 0
          ? '이벤트 도전중...'
          : '성공시 800🪙 획득!'}
      </S.IsSuccess>

      <S.Refer>
        ※ 이벤트 및 챌린지 댓글은 수정및 삭제가 불가하므로 참고하여 주시기 바랍니다.
      </S.Refer>

      </S.ImageWrapper>
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
            $active={commentText.length > 0 && !joined} 
            disabled={commentText.length === 0 || joined}
            onClick={handleCommentSubmit}
          >
            <span>{joined ? '참여 완료' : '등록'}</span>
          </S.SubmitButton>
        </S.InputBottom>
      </S.CommentInputBox>

    <S.BestCommentSection>
      {bestComments.map((c, i) => (
        <S.CommentItem key={c.id}>
          <S.BestBadge>⭐ BEST {i + 1}</S.BestBadge>

          <S.CommentTopRow>
            <S.CommentLeftBox>
              <S.ProfileImg
                src={
                  c.memberImgPath && c.memberImgName
                    ? `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(c.memberImgPath)}&fileName=${encodeURIComponent(c.memberImgName)}`
                    : '/assets/images/header/default-member-img.png'
                }
                onError={(e) => {
                  e.target.src = '/assets/images/header/default-member-img.png';
                }}
                alt="작성자 프로필"
              />
              <S.Nickname>{c.memberNickName}</S.Nickname>
            </S.CommentLeftBox>

            <S.CommentRightBox>
              <S.CommentLikeButton
                liked={likedCommentIds.includes(c.id)}
                onClick={() => handleCommentLike(c.id)}
              >
                ♥
              </S.CommentLikeButton>
            </S.CommentRightBox>
          </S.CommentTopRow>

          <S.CommentBottomRow>
            <S.CommentContents>{c.eventCommentDescription}</S.CommentContents>
            <S.CommentMetaBox>
              <S.CommentDate>{c.eventCommentCreateDate}</S.CommentDate>
              <S.LikeCount>
                <img src="/assets/images/board/icon/like-icon.png" alt="like" />
                <span>{c.eventCommentLikeCount}</span>
              </S.LikeCount>
            </S.CommentMetaBox>
          </S.CommentBottomRow>
        </S.CommentItem>
      ))}
    </S.BestCommentSection>


 
      <S.CommentList>
        {paginatedComments.map((c) => (
          <S.CommentItem key={c.id}>
            <S.CommentTopRow>
              <S.CommentLeftBox>
                <S.ProfileImg
                  src={
                    c.memberImgPath && c.memberImgName
                      ? `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(c.memberImgPath)}&fileName=${encodeURIComponent(c.memberImgName)}`
                      : '/assets/images/header/default-member-img.png'
                  }
                  onError={(e) => {
                    e.target.src = '/assets/images/header/default-member-img.png';
                  }}
                  alt="작성자 프로필"
                />
                <S.Nickname>{c.memberNickName}</S.Nickname>
              </S.CommentLeftBox>
              <S.CommentRightBox>
                <S.CommentLikeButton
                  liked={likedCommentIds.includes(c.id)}
                  onClick={() => handleCommentLike(c.id)}
                >
                  ♥
                </S.CommentLikeButton>
              </S.CommentRightBox>
            </S.CommentTopRow>

            <S.CommentBottomRow>
              <S.CommentContents>{c.eventCommentDescription}</S.CommentContents>
              <S.CommentMetaBox>
                <S.CommentDate>{c.eventCommentCreateDate}</S.CommentDate>
                <S.LikeCount>
                  <img src="/assets/images/board/icon/like-icon.png" alt="like" />
                  <span>{c.eventCommentLikeCount}</span>
                </S.LikeCount>
              </S.CommentMetaBox>
            </S.CommentBottomRow>
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

export default HealingDayDetail;