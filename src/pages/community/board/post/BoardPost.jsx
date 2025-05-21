import React, { useState, useEffect, use } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
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

  // 게시글을 업데이트 시키는 상태
  const [isUpdate, setIsUpdate] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 게시글 상태
  const [post, setPost] = useState({})

  // 전체 데이터를 요청해서 불러온다.
  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/${id}`)
      if(!response.ok) throw new Error(`getPosts Error : ${response}`)
      const datas = await response.json()
      return datas;
    }

    getPost()
      .then((res) => {
        setPost(res.board)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsError(true)
        console.err(`getPost fetching error: ${err}`)
      })
 
  }, [isUpdate])


  // 댓글 등록
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

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
        setCommentText('');  // 입력창 비우기
        const refreshed = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/list?boardId=${id}`);
        const data = await refreshed.json();
        setComments(data);
      } else {
        alert('댓글 등록 실패');
      }
    } catch (err) {
      console.error('댓글 등록 에러!', err);
    }
  };


  if(isLoading) return <div>로딩중... 😅</div>
  if(isError) return <div>알 수 없는 오류 발생... 😥</div>

  return (
    <S.Container>
      <S.Title>{post.boardTitle}</S.Title>
      <hr />
      <S.TopInfoBox>
        <S.Left>
          <S.ProfileImg
            src={post.profileImgUrl || '/assets/images/header/default-member-img.png'}
            onError={(e) => {
              e.target.src = '/assets/images/header/default-member-img.png';
            }}
            alt="작성자 프로필"
          />
          <S.Nickname>{post.nickname}</S.Nickname>
          <S.Date>{post.createdDate}</S.Date>
        </S.Left>
      </S.TopInfoBox>

      {/* 썸네일 이미지가 있을 때만 출력 */}
      {post.thumbnailUrl && <S.Image src={post.thumbnailUrl} alt="thumbnail" />}

      <S.Content>{post.boardContent}</S.Content>

      <S.LikeButton liked={isLiked}>
        ♥{likeCount}
      </S.LikeButton>

      <S.CommentTitleBox>
        <span>댓글</span>
        <S.CommentCountText>{comments.length}</S.CommentCountText>
      </S.CommentTitleBox>

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

      <S.CommentList>
        {comments.map((c) => (
          <S.CommentItem key={c.id}>
            <S.CommentTop>
              <S.CommentUser>
                <S.ProfileImg
                  src={c.memberImgPath || '/assets/images/header/default-member-img.png'}
                  onError={(e) => {
                    e.target.src = '/assets/images/header/default-member-img.png';
                  }}
                  alt="댓글 작성자 프로필"

                />
                <S.Nickname>{c.memberNickname}</S.Nickname>
              </S.CommentUser>
              <S.Right>
                <S.CommentDate>{c.boardCommentCreateDate}</S.CommentDate>
                <S.CommentLikeCount>
                  <img src="/assets/images/board/icon/like-icon.png" alt="like" />
                  <span>{c.likeCount}</span>
                </S.CommentLikeCount>
              </S.Right>
            </S.CommentTop>
            <S.CommentContent>{c.boardCommentContent}</S.CommentContent>
          </S.CommentItem>
        ))}
      </S.CommentList>
    </S.Container>
  );
};

export default BoardPost;
