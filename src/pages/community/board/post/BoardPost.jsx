import React, { useState, useEffect  } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';
import Pagination from '../../../../hooks/pagenation/Pagination';


const BoardPost = () => {
  const { id } = useParams(); // 현재 URL의 게시글 ID 가져오기
  const { currentUser } = useSelector((state) => state.member); // Redux에서 로그인된 사용자 정보 가져오기
  const memberId = currentUser?.id;

  const [commentText, setCommentText] = useState(''); // 댓글 입력값
  const [comments, setComments] = useState([]); // 댓글 목록
  const [likeCount, setLikeCount] = useState(0); // 게시글 좋아요 수
  const [isLiked, setIsLiked] = useState(false); // 현재 사용자의 좋아요 여부
  const [likedCommentIds, setLikedCommentIds] = useState([]); // 댓글 좋아요

  // 댓글 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedComments = comments.slice(
    (currentPage - 1) * 7,
    currentPage * 7
  );

  // 게시글을 업데이트 시키는 상태
  const [isUpdate, setIsUpdate] = useState(true); // 게시글이 업데이트 되었는지 여부
  const [isError, setIsError] = useState(false); // 데이터 로딩 에러 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 중 여부

  // 게시글 상태
  const [post, setPost] = useState({}) // 게시글 상세

  // 수정
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editedCommentText, setEditedCommentText] = useState(''); // 수정할 내용

  // 삭제
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const handleDeletePost = async () => {
  const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/delete/${id}`, {
      method: 'DELETE',
    });
      if (res.ok) {
        alert('게시글이 삭제되었습니다.');
        Navigate('/main/community/board'); // 삭제 후 게시판 리스트로 이동
      } else {
        alert('게시글 삭제에 실패했습니다.');
      }
    } catch (err) {
      console.error('게시글 삭제 에러:', err);
      alert('서버 오류로 게시글 삭제에 실패했습니다.');
    }
  };


  const handleAskDeleteComment = (id) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const handleCommentUpdate = async (commentId) => {
    if (!editedCommentText.trim()) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: commentId,
          boardCommentContent: editedCommentText,
        }),
      });
      if (res.ok) {
        const refreshed = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/list?boardId=${id}`);
        const data = await refreshed.json();
        setComments(data);
        setEditingCommentId(null);
        setEditedCommentText('');
      } else {
        alert('댓글 수정 실패ㅠㅠ');
      }
    } catch (err) {
      console.error('댓글 수정 에러 발생!', err);
    }
  };

  // 삭제
  const handleConfirmDeleteComment = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/delete/${deleteTargetId}`, {
      method: "DELETE"
    });
      
      if (res.ok) {
        setShowDeleteModal(false);
        setDeleteTargetId(null);
        // 새로 고침
        const refreshed = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/list?boardId=${id}`);
        const data = await refreshed.json();
        setComments(data);
      } else {
        alert("댓글 삭제 실패");
      }
    } catch (err) {
      console.error("삭제 중 오류 발생", err);
    }
  };

  // 전체 데이터를 요청해서 불러온다.
  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/${id}`)
      if(!response.ok) throw new Error(`getPosts Error : ${response.status}`)
      const datas = await response.json();
      console.log(datas)
      setPost(datas.board); // 게시글 저장
      setLikeCount(datas.board.boardLikeCount);  // 좋아요 수 저장
      setIsLoading(false);
      // console.log("게시글 확인",datas)
      setIsLoading(false);
      // return datas;
    }
    
    // 댓글 목록 조회
  const getComments = async () => {
    const response = await fetch((`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/list?boardId=${id}`));
    if(!response.ok) throw new Error(`댓글 조회 실패`)
    const data = await response.json();
  //  console.log("댓글",data)
    setComments(data); // 댓글 저장
  }

  getPost()
    .then(() => getComments())
    .catch((err) => {
      setIsError(true);
      console.error(`getPost fetching error: ${err}`);
    });

  }, [id,isUpdate])

  // 좋아요 수 기준으로 댓글 정렬 후 TOP3만 자르기
  const bestComments = [...comments]
  .sort((a, b) => b.boardCommentLikeCount - a.boardCommentLikeCount)
  .slice(0, 3);

  
  // 댓글 등록
  const handleCommentSubmit = async () => {
    if (!commentText) return; // 댓글이 없으면 안 됨

    if (!memberId) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return;
    }

    // 등록할 댓글에 포함된 정보
    const commentVO = {
      boardId: Number(id),
      memberId,
      boardCommentContent: commentText,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/write`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentVO),
      });

      if (response.ok) {
        setCommentText('');  // 등록 후 입력창 초기화
        const refreshed = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/list?boardId=${id}`);
        const data = await refreshed.json();
        setComments(data); // 댓글 목록 새고
        // console.log("좋아요 반영 후 댓글 전체", data);
      } else {
        alert('댓글 등록 실패');
      }
    } catch (err) {
      console.error('댓글 등록 에러!', err);
    }
  };

  // 댓글 좋아요
  const handleCommentLike = async (commentId) => {
  if (!memberId) {
    alert('로그인 후 이용 가능합니다.');
    return;
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/like`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, commentId })
    });

    if (response.ok) {
      // liked 상태 
      setLikedCommentIds((c) =>
        c.includes(commentId)
          ? c.filter(id => id !== commentId)
          : [...c, commentId]
      );

      // 좋아요 수 반영을 위해 댓글 새로고침
      const refreshed = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/list?boardId=${id}`);
      const data = await refreshed.json();
      setComments(data);
    } else {
      alert('댓글 좋아요 실패');
    }
  } catch (err) {
    console.error('댓글 좋아요 에러', err);
  }
};

// 게시글 좋아요 여부
const checkLiked = async () => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/like-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardId: post.id, memberId }),
    });
    const result = await res.json();
    setIsLiked(result === 1); // 1이면 좋아요 누른 것
  };

   // 좋아요 여부 확인
  useEffect(() => {
    if(post.id) {
      checkLiked(); // 로그인한 사용자가 이미 좋아요를 눌렀는지 
    }
  },[post.id])
  
  // 게시글 좋아요 추가
  const likePost = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardId: post.id, memberId }),
    });
  };

  // 게시글 좋아요 취소
  const unlikePost = async () => {
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/unLike`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardId: post.id, memberId }),
    });
  };

  // 게시글 좋아요 버튼 클릭 시 처리 함수
  const handlePostLike = async () => {
    // 로그인 안 된 경우 알림
    if (!memberId) {
      alert("로그인 후 이용해주세요");
      return;
    }
    try {
      if (isLiked) {
        // 이미 좋아요 누른 상태라면 취소
        await unlikePost();
        setLikeCount((c) => c - 1);
      } else {
        // 좋아요 추가
        await likePost();
        setLikeCount((c) => c + 1);
      }
      // 좋아요 상태
      setIsLiked((c) => !c);
    } catch (err) {
      console.error("좋아요 처리 실패", err)
    }
  };

  // 조회수 증가
  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/increase/${id}`, {
        method: 'PATCH',
      })
        .then(() => 
          console.log('조회수 증가 완료')
      )
        .catch(err => console.error('조회수 증가 실패 ', err));
      }
    }, [id]);

  if(isLoading) return <div>로딩중... 😅</div>
  if(isError) return <div>알 수 없는 오류 발생... 😥</div>

  return (
    
    <S.Container>   
      <S.TitleRow>
        <S.Title>{post.boardTitle}</S.Title>
        {memberId === post.memberId && (
          <S.EditDeleteBox>
            <S.EditButton to={`/main/community/board/edit/${post.id}`}>수정</S.EditButton>
            <S.Separator>|</S.Separator>
            {post.memberId === memberId && (
            <S.DeleteButton onClick={handleDeletePost}>삭제</S.DeleteButton>
          )}

          </S.EditDeleteBox>
        )}
      </S.TitleRow>
      <hr />
      <S.TopInfoBox>
        <S.Left>
          <S.ProfileImg
            src={
              post.memberImgPath && post.memberImgName
                ? `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(post.memberImgPath)}&fileName=${encodeURIComponent(post.memberImgName)}`
                : '/assets/images/header/default-member-img.png'
            }
            onError={(e) => {
              e.target.src = '/assets/images/header/default-member-img.png';
            }}
            alt="작성자 프로필"
          />
          <S.Nickname>{post.memberNickName}</S.Nickname>
          <S.Date>{post.boardContentCreateDate?.slice(0, 10)}</S.Date>
        </S.Left>
        <S.Right>
          <S.ViewCount>조회수 {post.boardContentViews}</S.ViewCount>
          <S.LikeCount>좋아요 {post.boardLikeCount}</S.LikeCount>
          <S.CommentCount>댓글 {comments.length}</S.CommentCount>
        </S.Right>
      </S.TopInfoBox>

      {/* 본문 이미지 */}
      {/* {post.boardImgPath && post.boardImgName && (
        <S.Image
          src={`${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(post.boardImgPath)}&fileName=${encodeURIComponent(post.boardImgName)}`}
          alt="본문 이미지"
           onError={(e) => {
            e.target.src = ''; // 깨진 이미지도 표시되지 않게
          }}
        />
      )} */}

      {/* 본문 이미지 (여러 장 ) */}
      {post.boardImages && post.boardImages.length > 0 && post.boardImages.map((img, i) => (
        console.log(post),
        <S.Image
          key={i}
          src={`${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(img.boardImgPath)}&fileName=${encodeURIComponent(img.boardImgName)}`}
          alt={`본문 이미지 ${i + 1}`}
          onError={(e) => {
            e.target.src = ''; // 깨진 이미지 숨기기
          }}
        />
      ))}

      <S.Content>{post.boardContent}</S.Content>

      <S.LikeButton liked={isLiked} onClick={handlePostLike}>
        ♥{likeCount}
      </S.LikeButton>

      <S.CommentTitleBox>
        <span>댓글</span>
        <S.CommentCountText>{comments.length}</S.CommentCountText>
      </S.CommentTitleBox>

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

      {/* Best댓글  */}
      <S.BestCommentSection>
        {bestComments.map((c, index) => (
          <S.BestCommentItem key={c.id}>
            <S.BestBadge>⭐ BEST {index + 1}</S.BestBadge>
            <S.CommentTop>
              <S.CommentUser>
                <S.ProfileImg
                  src={
                    c.memberImgPath && c.memberImgName
                      ? `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(c.memberImgPath)}&fileName=${encodeURIComponent(c.memberImgName)}`
                      : '/assets/images/header/default-member-img.png'
                  }
                  onError={(e) => {
                    e.target.src = '/assets/images/header/default-member-img.png';
                  }}
                  alt="댓글 작성자 프로필"
                />
                <S.Nickname>{c.memberNickName}</S.Nickname>
                <S.LeftCommentWrapper>
                  <S.CommentDate>{c.boardCommentCreateDate}</S.CommentDate>
                  <S.CommentLikeCount>
                    <img src="/assets/images/board/icon/like-icon.png" alt="like" />
                    <span>{c.boardCommentLikeCount}</span>
                  </S.CommentLikeCount>
                </S.LeftCommentWrapper>
              </S.CommentUser>
            </S.CommentTop>
            <S.CommentContents>{c.boardCommentContent}</S.CommentContents>
          </S.BestCommentItem>
        ))}
      </S.BestCommentSection>

      {/* 일반 댓글 */}
      <S.CommentList>
        {paginatedComments.map((c) => (
          <S.CommentItem key={c.id}>
            <S.CommentTop>
              <S.CommentUser>
                <S.ProfileImg
                  src={c.memberImgPath && c.memberImgName
                    ? `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(c.memberImgPath)}&fileName=${encodeURIComponent(c.memberImgName)}`
                    : '/assets/images/header/default-member-img.png'}
                  alt="댓글 작성자 프로필"
                />
                <S.Nickname>{c.memberNickName}</S.Nickname>
                <S.LeftCommentWrapper>
                  <S.CommentDate>{c.boardCommentCreateDate}</S.CommentDate>
                  <S.CommentLikeCount>
                    <img src="/assets/images/board/icon/like-icon.png" alt="like" />
                    <span>{c.boardCommentLikeCount}</span>
                  </S.CommentLikeCount>
                </S.LeftCommentWrapper>
              </S.CommentUser>

              <S.Right>
                <S.CommentLikeButton liked={likedCommentIds.includes(c.id)} onClick={() => handleCommentLike(c.id)}>
                  ♥
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
                  <S.SaveButton onClick={() => handleCommentUpdate(c.id)}>저장</S.SaveButton>
                  <S.CancelButton onClick={() => setEditingCommentId(null)}>취소</S.CancelButton>
                </S.InputBottom>
              </>
            ) : (
              <>
                <S.CommentContents>{c.boardCommentContent}</S.CommentContents>
                {memberId === c.memberId && (
                <S.EditDeleteBox>
                  <S.CommentEditButton onClick={() => {
                    setEditingCommentId(c.id);
                    setEditedCommentText(c.boardCommentContent);
                  }}>
                    수정
                  </S.CommentEditButton>
                  <S.CommentSeparator>|</S.CommentSeparator>
                  <S.CommentDeleteButton onClick={() => handleAskDeleteComment}>
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

export default BoardPost;
