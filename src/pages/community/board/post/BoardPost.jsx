import React, { useState, useEffect } from 'react';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import S from './style';

const BoardPost = () => {
  // Outlet을 통해 상위에서 전달된 postLists 가져온다.
  const { postLists } = useOutletContext() || {};
  console.log("postLists", postLists)
  // 게시글 id
  
  const [commentText, setCommentText] = useState(''); // 댓글 입력창의 텍스트 상태
  const [comments, setComments] = useState([]); // 댓글 목록 상태 (배열)
  const [likeCount, setLikeCount] = useState(0); // 게시글 좋아요 수 상태
  const [isLiked, setIsLiked] = useState(false); // 내가 좋아요 눌렀는지 여부
  
  const { id } = useParams(); // 문자열 sting
  // 현재 게시글 객체 찾기

  const post = postLists?.find((p) => String(p.id) === id); // 전체 게시글 배열이 있으면 find실행 없으면 undefined
  // const post = postLists?.find((p) => p.id === id);

  // 게시글이 존재할 때 좋아요 수 초기값 
  //  선택한 게시글의 좋아요 수를 초기값으로 설정함
  useEffect(() => {
    if (post) setLikeCount(post.likeCount);
  }, [post]);
  
  if (!postLists || postLists.length === 0) {
    return <div>로딩 중입니다...</div>;
  }

  if (!post) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>;
  }

  // 게시글 좋아요 버튼 클릭 시 
  const handleLike = () => {
    if(!isLiked) {
      // 좋아요 누르지 않은 상태 +1
      setLikeCount((like) => like + 1 );
      setIsLiked(true);
      // console.log("좋아요 추가", likeCount +1);
    } else {
      // 이미 누른 상태. 취소하면 -1
      setLikeCount((like) => like - 1 );
      setIsLiked(false);
      // console.log("좋아요 삭제", likeCount - 1);
    }
  };

  // 댓글 등록 버튼 클릭 
  const handleCommentSubmit = () => {
    if (commentText) {
      const newComment = {
        id: Date.now(), // 중복되지 않는 고유 ID값을 만들기 위해 사용. Date.now()는 언제 실행하든 항상 다른 값의 정수를 반환함
        writer: '홍길동',
        content: commentText, // 현재 입력한 댓글
        createdDate: new Date().toLocaleString(), // 작성 시각
        like: 0,
      };
      setComments((comments) => [newComment, ...comments]); // 새 댓글을 배열 맨 앞에 추가. 새 댓글이 위에 뜨게 하려고
      setCommentText('');  // 입력창 비우기
      // console.log('댓글 등록', newComment);
    }
  };

  // 베스트 댓글 3개
  // comments는 useState로 만든 상태값이므로 직접 sort할 수 없다.(원본이 파괴됨)
  const bestComments = [...comments] // 복사본을 만들어서 안전하게 정렬하려고 스프레드 연산자를 사용한다.
    .sort((a, b) => b.like - a.like || new Date(b.createdDate) - new Date(a.createdDate)) // 만약 좋아요 수가 같다면 최신순
    .slice(0, 3);
  const normalComments = comments;

  // console.log('BEST 댓글', bestComments);
  // console.log( '전체 댓글', comments);

  return (
    <S.Container>
      <S.Title>{post.boardTitle}</S.Title>
      <hr />
      <S.TopInfoBox>
        <S.Left>
          <S.ProfileImg src={post.profileImgUrl} />
          <S.Nickname>{post.nickname}</S.Nickname>
          <S.Date>{post.createdDate}</S.Date>
        </S.Left>
      </S.TopInfoBox>
      {/* 썸네일이 있을 때만 이미지 렌더링(alt도 같이 사라짐) */}
      {post.thumbnailUrl && post.thumbnailUrl !== '' && (
        <S.Image src={post.thumbnailUrl} alt="thumbnail" />
      )}
      {/* 게시글 본문 내용 (현재는 더미 텍스트, post.content로 교체 예정) */}
      <S.Content>본문 내용</S.Content>

      <S.LikeButton liked = {isLiked} onClick={handleLike}>
        ♥{likeCount}
      </S.LikeButton>

      {/* 댓글 제목 + 총 댓글 수 */}
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
          <S.CharCount>{commentText.length} / 500</S.CharCount>
          {/* 등록 버튼 (입력 내용 있을 때만 활성화) */}
          <S.SubmitButton active={commentText.length > 0} onClick={handleCommentSubmit}>
            등록
          </S.SubmitButton>
        </S.InputBottom>
      </S.CommentInputBox>

      {/* 좋아요 순으로 정렬된 BEST 댓글 3개가 있을 경우만 보여준다ㅏ. */}
      {bestComments.length > 0 && (
        <S.BestCommentSection>
          {bestComments.map((comments) => (
            <S.BestCommentItem key={comments.id}>
              <S.BestBadge>BEST</S.BestBadge>
              <S.CommentTop>
                <S.CommentUser>
                  <S.ProfileImg src="/assets/images/header/memberProfile.png" />
                  <S.Nickname>{comments.writer}</S.Nickname>
                </S.CommentUser>
                <S.Right>
                  <S.CommentDate>{comments.createdDate}</S.CommentDate>
                  <S.CommentLikeCount>
                    <img src="/assets/images/board/icon/like-icon.png" alt="like" />
                    <span>{comments.like}</span>
                  </S.CommentLikeCount>
                </S.Right>
              </S.CommentTop>
              <S.CommentContent>{comments.content}</S.CommentContent>
            </S.BestCommentItem>
          ))}
        </S.BestCommentSection>
      )}

      {/* 일반 댓글 리스트 (BEST 포함한 전체) */}
      <S.CommentList>
        {normalComments.map((comments) => (
          <S.CommentItem key={comments.id}>
            <S.CommentTop>
              <S.CommentUser>
                <S.ProfileImg src="/assets/images/header/memberProfile.png" />
                <S.Nickname>{comments.writer}</S.Nickname>
              </S.CommentUser>
              <S.Right>
                <button>♥</button>
                <S.CommentDate>{comments.createdDate}</S.CommentDate>
                <S.CommentLikeCount>
                  <img src="/assets/images/board/icon/like-icon.png" alt="like" />
                  <span>{comments.like}</span>
                </S.CommentLikeCount>
              </S.Right>
            </S.CommentTop>
            <S.CommentContent>{comments.content}</S.CommentContent>
          </S.CommentItem>
        ))}
      </S.CommentList>
    </S.Container>
  );
};

export default BoardPost;
