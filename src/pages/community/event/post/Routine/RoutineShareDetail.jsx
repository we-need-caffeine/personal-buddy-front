// RoutineShareDetail 정리된 구조
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";
import Pagination from "../../../../../hooks/pagenation/Pagination";

const RoutineShareDetail = () => {
  const { id } = useParams(); // URL에서 이벤트 ID 추출
  const { currentUser } = useSelector((state) => state.member); // 로그인한 유저 정보
  const memberId = currentUser?.id || 1; // 로그인 안 했을 경우 기본값 1

  // 상태 관리
  const [commentText, setCommentText] = useState(""); // 댓글 입력창 텍스트
  const [comments, setComments] = useState([]); // 전체 댓글 목록
  const [likedCommentIds, setLikedCommentIds] = useState([]); // 좋아요 누른 댓글 ID 목록
  const [currentPage, setCurrentPage] = useState(1); // 댓글 페이지네이션 현재 페이지
  const [joined, setJoined] = useState(false); // 참여 여부 (댓글 작성 여부)
  const [likeCount, setLikeCount] = useState(0); // 게시글 좋아요 수
  const [isLiked, setIsLiked] = useState(false); // 현재 사용자가 좋아요 눌렀는지 여부
  const [views, setViews] = useState(0); // 게시글 조회수
  const [bestComments, setBestComments] = useState([]); // BEST 댓글 목록
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const paginatedComments = comments.slice(
    (currentPage - 1) * 7,
    currentPage * 7
  ); // 페이지네이션 처리

  // 초기 데이터 불러오기 (게시글, 좋아요 여부, 참여 여부, 댓글 등)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          detailRes,
          likeCheckRes,
          likeCountRes,
          joinCheckRes,
          commentRes,
          bestRes,
        ] = await Promise.all([
          fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/detail/${id}`),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/like-check`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventId: id, memberId }),
          }),
          fetch(
            `${process.env.REACT_APP_BACKEND_URL}/events/api/like-count/${id}`
          ),
          fetch(
            `${process.env.REACT_APP_BACKEND_URL}/events/api/join-check?eventId=${id}&memberId=${memberId}`
          ),
          fetch(
            `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`
          ),
          fetch(
            `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/best/${id}`
          ),
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
        console.error("초기 데이터 로딩 실패", err);
      }
    };

    fetchInitialData();
  }, [id]);

  // 댓글 중복 작성 체크 API 호출
  const checkAlreadyCommented = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/check`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: Number(id), memberId }),
      }
    );
    return res.json();
  };

  // 댓글 조건 유효성 검사 함수
  const validateRoutineComment = (text) => {
    const hasKeyword = /루틴|routine/i.test(text);
    const trimmed = text.trim();
    const isLongEnough = trimmed.length >= 20;
    const containsKeyword = trimmed.includes("루틴");
    const isMeaningful = !/(.)\1{4,}/.test(text) && !/^.{1,5}$/.test(text); // 예시: "ㅋㅋㅋㅋ", "ㅎ" 등 제외
    return isLongEnough && containsKeyword && hasKeyword && isMeaningful;
  };

  // 댓글 작성 처리
  const handleCommentSubmit = async () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;

    const isDuplicated = await checkAlreadyCommented();
    if (isDuplicated) {
      alert("이미 참여한 이벤트입니다.");
      setJoined(true);
      return;
    }

    // 조건 검사
    if (!validateRoutineComment(trimmed)) {
      alert(
        "루틴 키워드를 포함하고, 20자 이상 의미있는 문장을 작성해야 참여할 수 있습니다."
      );
      return;
    }

    try {
      // 댓글 작성
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/write`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: Number(id),
            memberId,
            eventCommentDescription: trimmed,
          }),
        }
      );

      if (!response.ok) {
        alert("댓글 등록 실패");
        return;
      }

      // 포인트 지급 요청
      const reward = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/reward`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId: Number(id), memberId }),
        }
      );

      if (reward.ok) {
        alert("포인트가 지급되었습니다!");
        setJoined(true);
      }

      // 댓글창 초기화 + 목록 새로고침
      setCommentText("");
      const refreshed = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`
      );
      const data = await refreshed.json();
      setComments(data);
    } catch (err) {
      console.error("댓글 등록 에러", err);
    }
  };

  // 댓글 좋아요 처리
  const handleCommentLike = async (commentId) => {
    if (!memberId) return alert("로그인 후 이용해주세요");

    const alreadyLiked = likedCommentIds.includes(commentId);
    const url = alreadyLiked
      ? `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/un-like`
      : `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/like`;

    try {
      await fetch(url, {
        method: alreadyLiked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventCommentId: commentId,
          memberId: memberId,
        }),
      });

      const [commentRes, bestRes] = await Promise.all([
        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`
        ),
        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/best/${id}`
        ),
      ]);

      const commentData = await commentRes.json();
      const bestData = await bestRes.json();

      setComments(commentData);
      setBestComments(bestData);
      setLikedCommentIds((prev) =>
        alreadyLiked
          ? prev.filter((id) => id !== commentId)
          : [...prev, commentId]
      );
    } catch (err) {
      console.error("댓글 좋아요 실패", err);
    }
  };

  const handleCommentUpdate = async (commentId) => {
    if (!editedCommentText.trim()) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/edit`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: commentId,
            eventCommentDescription: editedCommentText,
          }),
        }
      );

      if (res.ok) {
        const refreshed = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`
        );
        const data = await refreshed.json();
        setComments(data);

        const bestRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/best/${id}`
        );
        const bestData = await bestRes.json();
        setBestComments(bestData);

        setEditingCommentId(null);
        setEditedCommentText("");
      } else {
        alert("댓글 수정 실패");
      }
    } catch (err) {
      console.error("댓글 수정 에러", err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/delete/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        const refreshed = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/list?eventId=${id}`
        );
        const data = await refreshed.json();
        setComments(data);

        const bestRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/events/api/comment/best/${id}`
        );
        const bestData = await bestRes.json();
        setBestComments(bestData);
      } else {
        alert("댓글 삭제 실패");
      }
    } catch (err) {
      console.error("댓글 삭제 에러", err);
    }
  };

  // 게시글 좋아요 처리
  const handlePostLike = async () => {
    try {
      const url = isLiked
        ? `${process.env.REACT_APP_BACKEND_URL}/events/api/un-like`
        : `${process.env.REACT_APP_BACKEND_URL}/events/api/like`;

      await fetch(url, {
        method: isLiked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: id, memberId }),
      });

      setLikeCount((c) => (isLiked ? c - 1 : c + 1));
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("이벤트 좋아요 처리 실패", err);
    }
  };

  return (
    <S.Container>
      {/* 제목 및 작성일 */}
      <S.MetaBox>
        <S.TitleRow>
          <S.Title>나의 일정 공유하기</S.Title>
          {/* <S.Date>2025.04.20 게시</S.Date> */}
        </S.TitleRow>
      </S.MetaBox>

      {/* 프로필 및 통계 */}
      <S.MetaBottom>
        <S.Author>
          <S.ProfileImg
            src="/assets/images/header/default-member-img.png"
            alt="운영자"
          />
          <span>운영자</span>
        </S.Author>
        <S.StatBox>
          조회수 <strong>{views}</strong> | 댓글{" "}
          <strong>{comments.length}</strong>
        </S.StatBox>
      </S.MetaBottom>

      {/* 이벤트 배너 및 상태 */}
      <S.ImageWrapper>
        <img src="/assets/images/event/routine.png" alt="루틴 이벤트" />
        <S.IsSuccess $joined={joined || commentText.length > 0}>
          {joined
            ? "미션 컴플리트!"
            : commentText.length > 0
            ? "이벤트 도전중..."
            : "성공시 1000🪙 획득!"}
        </S.IsSuccess>
      </S.ImageWrapper>

      <S.Refer>
        ※ 이벤트 및 챌린지 댓글은 수정및 삭제가 불가하므로 참고하여 주시기
        바랍니다.
      </S.Refer>

      {/* 댓글 입력창 */}
      <S.CommentInputBox>
        <S.Textarea
          placeholder="댓글을 입력해주세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          maxLength={500}
        />
        <S.InputBottom>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <S.CharCount>{commentText.length}</S.CharCount>
            <span>/ 500</span>
          </div>
          <S.SubmitButton
            active={commentText.length > 0 && !joined}
            disabled={commentText.length === 0 || joined}
            onClick={handleCommentSubmit}
          >
            <span>{joined ? "참여 완료" : "등록"}</span>
          </S.SubmitButton>
        </S.InputBottom>
      </S.CommentInputBox>

      {/* BEST 댓글 */}
      <S.BestCommentSection>
        {bestComments.map((c, i) => (
          <S.BestCommentItem key={c.id}>
            <S.BestBadge>✨ BEST {i + 1}</S.BestBadge>
            <S.CommentTop>
              <S.CommentUser>
                <S.ProfileWrap>
                  <S.ProfileImg
                    src={
                      c.memberImgPath && c.memberImgName
                        ? `${
                            process.env.REACT_APP_BACKEND_URL
                          }/files/api/display?filePath=${encodeURIComponent(
                            c.memberImgPath
                          )}&fileName=${encodeURIComponent(c.memberImgName)}`
                        : "/assets/images/header/default-member-img.png"
                    }
                    onError={(e) => {
                      e.target.src =
                        "/assets/images/header/default-member-img.png";
                    }}
                    alt="작성자 프로필"
                  />
                  <S.Nickname>{c.memberNickName}</S.Nickname>
                </S.ProfileWrap>
                <S.LeftCommentWrapper>
                  <S.CommentContents>
                    {c.eventCommentDescription}
                  </S.CommentContents>

                  <S.CommentLikeCount>
                    {/* <img src="/assets/images/board/icon/like-icon.png" alt="like" /> */}
                   
                  </S.CommentLikeCount>
                </S.LeftCommentWrapper>
              </S.CommentUser>
              <S.Right>
                <S.CommentLikeButton
                  liked={likedCommentIds.includes(c.id)}
                  onClick={() => handleCommentLike(c.id)}
                >
                  ♥ {c.eventCommentLikeCount} 
                </S.CommentLikeButton>
                
              </S.Right>
            </S.CommentTop>
            <S.CommentDate>{c.eventCommentCreateDate}</S.CommentDate>
          </S.BestCommentItem>
        ))}
      </S.BestCommentSection>

      <S.CommentList>
        {paginatedComments.map((c) => (
          <S.CommentItem key={c.id}>
            <S.CommentTop>
              <S.CommentUser>
                <S.ProfileWrap>
                  <S.ProfileImg
                    src={
                      c.memberImgPath && c.memberImgName
                        ? `${
                            process.env.REACT_APP_BACKEND_URL
                          }/files/api/display?filePath=${encodeURIComponent(
                            c.memberImgPath
                          )}&fileName=${encodeURIComponent(c.memberImgName)}`
                        : "/assets/images/header/default-member-img.png"
                    }
                    onError={(e) => {
                      e.target.src =
                        "/assets/images/header/default-member-img.png";
                    }}
                    alt="작성자 프로필"
                  />
                  <S.Nickname>{c.memberNickName}</S.Nickname>
                </S.ProfileWrap>
                <S.LeftCommentWrapper>
                  <S.CommentDate>{c.eventCommentCreateDate}</S.CommentDate>
                  <S.CommentLikeCount>
                    {/* <img src="/assets/images/board/icon/like-icon.png" alt="like" /> */}
                    
                  </S.CommentLikeCount>
                </S.LeftCommentWrapper>
              </S.CommentUser>
              <S.Right>
                <S.CommentLikeButton
                  liked={likedCommentIds.includes(c.id)}
                  onClick={() => handleCommentLike(c.id)}
                >
                  ♥ {c.eventCommentLikeCount}
                </S.CommentLikeButton>
              </S.Right>
            </S.CommentTop>
            {editingCommentId === c.id ? (
              <>
                <S.Textarea
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                  maxLength={500}
                />
                <S.InputBottom>
                  <S.SaveButton onClick={() => handleCommentUpdate(c.id)}>
                    저장
                  </S.SaveButton>
                  <S.CancelButton onClick={() => setEditingCommentId(null)}>
                    취소
                  </S.CancelButton>
                </S.InputBottom>
              </>
            ) : (
              <S.CommentContents>{c.eventCommentDescription}</S.CommentContents>
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

export default RoutineShareDetail;
