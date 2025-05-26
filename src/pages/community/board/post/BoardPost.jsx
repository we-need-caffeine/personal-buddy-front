import React, { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';


const BoardPost = () => {
  const { id } = useParams(); // 현재 URL의 게시글 ID 가져오기
  const { currentUser } = useSelector((state) => state.member); // Redux에서 로그인된 사용자 정보 가져오기
  const memberId = currentUser?.id;

  const [commentText, setCommentText] = useState(''); // 댓글 입력값
  const [comments, setComments] = useState([]); // 댓글 목록
  const [likeCount, setLikeCount] = useState(0); // 게시글 좋아요 수
  const [isLiked, setIsLiked] = useState(false); // 현재 사용자의 좋아요 여부
  const [likedCommentIds, setLikedCommentIds] = useState([]); // 댓글 좋아요

  // 게시글을 업데이트 시키는 상태
  const [isUpdate, setIsUpdate] = useState(true); // 게시글이 업데이트 되었는지 여부
  const [isError, setIsError] = useState(false); // 데이터 로딩 에러 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 중 여부

  // 게시글 상태
  const [post, setPost] = useState({}) // 게시글 상세

  // 전체 데이터를 요청해서 불러온다.
  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/${id}`)
      if(!response.ok) throw new Error(`getPosts Error : ${response.status}`)
      const datas = await response.json();
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
        .then(() => console.log('조회수 증가 완료'))
        .catch(err => console.error('조회수 증가 실패 ', err));
      }
    }, [id]);

  if(isLoading) return <div>로딩중... 😅</div>
  if(isError) return <div>알 수 없는 오류 발생... 😥</div>

  return (
    
    <S.Container>   
      <S.Title>{post.boardTitle}</S.Title>
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
          <S.CommentCount>댓글 {post.boardCommentCount}</S.CommentCount>
        </S.Right>
      </S.TopInfoBox>
        {post.boardImgPath && post.boardImgName && (
          <S.Image
            src={`${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(post.boardImgPath)}&fileName=${encodeURIComponent(post.boardImgName)}`}
            alt="본문 이미지"
             onError={(e) => {
              e.target.src = ''; // 깨진 이미지도 표시되지 않게
            }}
          />
        )}

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
        {comments.map((c) => (
          <S.CommentItem key={c.id}>
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

              <S.Right>
                <S.CommentLikeButton liked={likedCommentIds.includes(c.id)} onClick={() => handleCommentLike(c.id)}>
                  ♥</S.CommentLikeButton>
              </S.Right>

            </S.CommentTop>
            <S.CommentContents>{c.boardCommentContent}</S.CommentContents>
          </S.CommentItem>
        ))}
      </S.CommentList>
    </S.Container>
  );
};

export default BoardPost;
