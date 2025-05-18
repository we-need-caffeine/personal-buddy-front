import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import S from './style';

const BoardPost = () => {
  const { postLists } = useOutletContext() || {};
  const { id } = useParams();

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // 게시글 조회
  const post = postLists?.find((p) => String(p.id) === id);

  // 댓글 더미
  useEffect(() => {
    const dummyComments = [
      {
        id: 1,
        writer: '플랜A',
        content: '와우 저와 같은 일정이 있으시군요!',
        createdDate: '2025.02.13 10:30',
        like: 43,
      },
      {
        id: 2,
        writer: '장타치',
        content: '로그인 어렵다 엉엉',
        createdDate: '2025.05.17 23:00',
        like: 117,
      },
      {
        id: 3,
        writer: '김엄수',
        content: '엄 엄엄엄 엄엄엄엄엄 엄엄엄엄엄엄엄엄 엄엄엄엄엄엄엄엄엄엄엄엄ㅇ멍멍멍멍멍멍멍멍',
        createdDate: '2025.03.08 01:20',
        like: 85,
      },
      {
        id: 4,
        writer: '갓제이슨',
        content: '즐겁다 즐거워',
        createdDate: '2025.05.18 17:35',
        like: 120,
      },
      {
        id: 5,
        writer: '양꼬치',
        content: '냠냠뇸뇸 양꼬치 칭따오 소주 노노 고량주',
        createdDate: '2025.04.08 19:27',
        like: 520,
      }
    ];
    setComments(dummyComments);
  }, []);

  useEffect(() => {
    if (post) {
      setLikeCount(post.likeCount);
    }
  }, [post]);

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        writer: '홍길동',
        content: commentText,
        createdDate: new Date().toLocaleString(),
        like: 0,
      };
      setComments((prev) => [newComment, ...prev]);
      setCommentText('');
    }
  };

  if (!postLists) return <div>로딩 중입니다...</div>;
  if (!post) return <div>해당 게시글을 찾을 수 없습니다.</div>;

  return (
    <S.Container>
      <S.Title>{post.title}</S.Title>

      <S.MetaTop>
        <S.AuthorBox>
          <S.ProfileImg src={post.profileImgUrl} />
          <S.Nickname>{post.nickname}</S.Nickname>
        </S.AuthorBox>
        <S.Date>{post.createdDate}</S.Date>
      </S.MetaTop>

      <S.Image src={post.thumbnailUrl || '/assets/images/board/default/default-img.png'} alt="thumbnail" />
      <S.Content>본문 내용</S.Content>

      <S.LikeBox>
        <S.LikeButton liked={isLiked} onClick={handleLike}>
          좋아요 {likeCount}
        </S.LikeButton>
      </S.LikeBox>

      <S.CommentTitleBox>
        <span>댓글</span>
        <S.CommentCount>{comments.length}</S.CommentCount>
      </S.CommentTitleBox>

      <S.CommentInputBox>
        <S.Textarea
          placeholder="댓글을 입력해주세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          maxLength={500}
        />
        <S.InputBottom>
          <S.CharCount>{commentText.length} / 500</S.CharCount>
          <S.SubmitButton onClick={handleCommentSubmit}>등록</S.SubmitButton>
        </S.InputBottom>
      </S.CommentInputBox>

      <S.CommentList>
        {comments.map((c) => (
          <S.CommentItem key={c.id}>
            <S.CommentTop>
                <S.CommentUser>
                <S.ProfileImg src="/assets/images/header/memberProfile.png" />
                <S.Nickname>{c.writer}</S.Nickname>
                </S.CommentUser>
                <S.RightMeta>
                <S.CommentDate>{c.createdDate}</S.CommentDate>
                <S.LikeBox>
                    <img src="" />
                    <span>{c.like}</span>
                </S.LikeBox>
                </S.RightMeta>
            </S.CommentTop>
            <S.CommentContent>{c.content}</S.CommentContent>
            </S.CommentItem>

        ))}
      </S.CommentList>
    </S.Container>
  );
};

export default BoardPost;
