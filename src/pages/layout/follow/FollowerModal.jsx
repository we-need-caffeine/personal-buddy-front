import React, { useContext, useEffect, useState } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';

const FollowerModal = ({ memberId, profileMemberId, handleFollowerList, onCancel }) => {

  // 헤더 이벤트 콘텍스트
  const { setHeaderScroll } = useContext(HeaderContext);

  // 필터 조건
  const [followFilter, setFollowFilter] = useState("");
  // 텍스트에리어값
  const [inputText, setInputText] = useState("");
  // 팔로워 리스트
  const [followerList, setFollowerList] = useState([]);

  const dummyFollowerList = [
  {
    id: 1,
    memberNickname: "코딩왕",
    memberImgName: "dummy1.jpg",
    memberStatusMessage: "프론트엔드 마스터",
    isFollow: 1,
    favorite: 1,
  },
  {
    id: 2,
    memberNickname: "야무진개발자",
    memberImgName: "dummy2.jpg",
    memberStatusMessage: "풀스택 도전중",
    isFollow: 1,
    favorite: 0,
  },
  {
    id: 3,
    memberNickname: "코테의신",
    memberImgName: "dummy3.jpg",
    memberStatusMessage: "알고리즘 좋아요",
    isFollow: 0,
    favorite: 0,
  },
  {
    id: 4,
    memberNickname: "디자인짱",
    memberImgName: "dummy4.jpg",
    memberStatusMessage: "UI/UX 디자이너",
    isFollow: 1,
    favorite: 1,
  },
  {
    id: 5,
    memberNickname: "DB관리자",
    memberImgName: "dummy5.jpg",
    memberStatusMessage: "DB는 내 운명",
    isFollow: 0,
    favorite: 0,
  },
  {
    id: 6,
    memberNickname: "슬기로운개발자",
    memberImgName: "dummy6.jpg",
    memberStatusMessage: "슬기롭게~",
    isFollow: 1,
    favorite: 0,
  },
  {
    id: 7,
    memberNickname: "백엔드수호자",
    memberImgName: "dummy7.jpg",
    memberStatusMessage: "REST API 좋아함",
    isFollow: 0,
    favorite: 0,
  },
  {
    id: 8,
    memberNickname: "UI천재",
    memberImgName: "dummy8.jpg",
    memberStatusMessage: "트렌디한 UI제작",
    isFollow: 1,
    favorite: 1,
  },
  {
    id: 9,
    memberNickname: "FE캡틴",
    memberImgName: "dummy9.jpg",
    memberStatusMessage: "프론트는 나야",
    isFollow: 1,
    favorite: 0,
  },
  {
    id: 10,
    memberNickname: "기획좋아",
    memberImgName: "dummy10.jpg",
    memberStatusMessage: "기획이 전부!",
    isFollow: 0,
    favorite: 0,
  },
];


  // 텍스트에리어에서 값을 입력할 때 마다 잡아서 상태변경
  const handleTextareaChange = (e) => {
      setInputText(e.target.value);
  };

  //팔로워 리스트를 가져오는 함수
  useEffect(() => {
    const getFollower = async() => {
      const response = await fetch(`http://localhost:10000/follows/api/follower/list?myId=${profileMemberId}`)
      const datas = await response.json()
      setFollowerList(datas);
      console.log(datas);
      console.log(profileMemberId);
      
      
    }
    getFollower()
  }, [profileMemberId])

  // 외부 요소 스크롤을 막는 함수
  useEffect(() => {
      if (handleFollowerList) {
          document.body.style.overflow = 'hidden';
          setHeaderScroll(false)
      }
      return () => {
          document.body.style.overflow = 'auto';
          setHeaderScroll(true)
      };
  }, [handleFollowerList, setHeaderScroll]);

  return (
    <>
      <S.Backdrop onClick={onCancel}>
        <S.ModalContainer onClick={(e) => e.stopPropagation()}>
            <S.TitleContainer>
              <S.Title>팔로워</S.Title>
              <S.CloseButton 
                src='/assets/images/modal/close-button.png' 
                alt='x버튼' 
                onClick={onCancel}/>
            </S.TitleContainer>
            <S.TopContainer>
              <S.SearchBox>
                <S.SearchIcon 
                  src='/assets/images/follow/search-icon.png'
                  alt='돋보기 아이콘'
                />
                <S.SearchInput
                  maxLength={20} 
                  placeholder='검색'
                  onChange={handleTextareaChange}
                  value={inputText}
                  spellCheck={false}
                  onDrop={e => e.preventDefault()}
                  onDragOver={e => e.preventDefault()}
                >
                </S.SearchInput>
              </S.SearchBox>
              <S.SelectBox onChange={(e) => setFollowFilter(e.target.value)}>
                  <option value="">전체</option>
                  <option value="follow">팔로잉</option>
                  <option value="favorite">즐겨찾기</option>
              </S.SelectBox>
            </S.TopContainer>
            <S.ListContainer>
              {dummyFollowerList.map((item) => (
                <S.ItemContainer key={item.id}>
                  <S.MemberInfoContainer>
                    <S.MemberImg
                      src={`http://localhost:10000/images/profile/${item.memberImgName}`}
                      alt='멤버 프로필 이미지'
                      onError={e => {
                        e.target.src = "/assets/images/header/default-member-img.png";
                      }}
                      />
                    <S.MemberInfoTextContainer>
                      <S.MemberStatusContainer>
                        <S.MemberNickName>{item.memberNickname}</S.MemberNickName>
                        {item.isFollow === 1 &&
                          (item.favorite === 1 ? (
                            <S.MemberFavoriteImg src='/assets/images/follow/star-on.png' alt='즐겨찾기 활성화'/>
                          ) : (
                            <S.MemberStatusFollow>팔로잉</S.MemberStatusFollow>
                          ))  
                        }
                      </S.MemberStatusContainer>
                      <S.MemberStatusMessage>{item.memberStatusMessage}</S.MemberStatusMessage>
                    </S.MemberInfoTextContainer>
                  </S.MemberInfoContainer>
                  <S.UnFollowBtn>
                    삭제
                  </S.UnFollowBtn>
                </S.ItemContainer>
              ))}
            </S.ListContainer>
        </S.ModalContainer>
    </S.Backdrop>
    </>
  );
};

export default FollowerModal;