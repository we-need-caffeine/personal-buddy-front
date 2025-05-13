import { Link } from 'react-router-dom';
import S from './style';

const dummyPosts = [
  {
    id: 1,
    title: '자바 껌이죠',
    tag: '자유 게시글',
    nickname: '따자하오영수',
    profileImg: '',
    thumbnail: '',
    createdDate: '2025.02.01',
    likes: 600,
    views: '9999+',
    comments: 78,
  },
  {
    id: 2,
    title: '루틴 공유합니다',
    tag: '관심 일정',
    nickname: '파워제이',
    profileImg: '',
    thumbnail: '',
    createdDate: '2025.02.01',
    likes: 124,
    views: 355,
    comments: 12,
  },
  {
    id: 3,
    title: '자바 껌이죠',
    tag: '자유 게시글',
    nickname: '따자하오영수',
    profileImg: '',
    thumbnail: '',
    createdDate: '2025.02.01',
    likes: 600,
    views: '9999+',
    comments: 78,
  },
  {
    id: 4,
    title: '루틴 공유합니다',
    tag: '관심 일정',
    nickname: '파워제이',
    profileImg: '',
    thumbnail: '',
    createdDate: '2025.02.01',
    likes: 124,
    views: 355,
    comments: 12,
  },
];

const BoardPostListContainer = () => {
  return (
    <S.PostGrid>
      {dummyPosts.map((post) => (
        <Link to={`post/${post.id}`} key={post.id}>
          <S.PostCard>
            <S.Thumbnail src={post.thumbnail} alt="썸네일" />
            <S.Tag>{post.tag}</S.Tag>
            <S.Title>{post.title}</S.Title>

            <S.UserInfo>
              <S.ProfileImg src={post.profileImg} />
              <S.Nickname>{post.nickname}</S.Nickname>
            </S.UserInfo>

            <S.Date>{post.createdDate} 게시</S.Date>

            <S.MetaInfo>
              
              <span>❤️ {post.likes}</span>
              <span>👁 {post.views}</span>
              <span>💬 {post.comments}</span>
            </S.MetaInfo>
          </S.PostCard>
        </Link>
      ))}
    </S.PostGrid>
  );
};

export default BoardPostListContainer;
