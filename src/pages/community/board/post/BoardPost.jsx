import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';

const BoardPost = () => {
  const { postLists } = useOutletContext() || {};
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.member);
  const memberId = currentUser?.id;

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const post = postLists?.find((p) => String(p.id) === id);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/list?boardId=${id}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('댓글 가져오기 실패:', error);
      }
    };

    if (id) fetchComments();
  }, [id]);

  useEffect(() => {
    if (post) setLikeCount(post.likeCount);
  }, [post]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((l) => l + (isLiked ? -1 : 1));
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    if (!memberId) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return;
    }

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
        setCommentText('');
        const refreshed = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/comment/list?boardId=${id}`);
        const data = await refreshed.json();
        setComments(data);
      } else {
        alert('댓글 등록 실패');
      }
    } catch (err) {
      console.error('댓글 등록 에러:', err);
    }
  };

  if (!postLists?.length) return <div>로딩 중...</div>;
  if (!post) return <div>해당 게시글을 찾을 수 없습니다.</div>;

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

      {post.thumbnailUrl && <S.Image src={post.thumbnailUrl} alt="thumbnail" />}

      <S.Content>{post.boardContent}</S.Content>

      <S.LikeButton liked={isLiked} onClick={handleLike}>
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
