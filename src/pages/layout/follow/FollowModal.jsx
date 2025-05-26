import React, { useContext, useEffect, useState } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';
import { ProfileCardContext } from '../../../context/ProfileCardContext';
import ProfileCard from '../profile/ProfileCard';

const FollowModal = ({ memberId, profileMemberId, handleFollowerList, onCancel }) => {

  // 헤더 이벤트 콘텍스트
  const { setHeaderScroll } = useContext(HeaderContext);
  // 프로필 카드 상태
  const [showProfileCard, setShowProfileCard] = useState(false);
  // 프로필 카드 콘텍스트
  const { unfollow } = useContext(ProfileCardContext);
  // 필터 조건
  const [followFilter, setFollowFilter] = useState("");
  // 텍스트에리어값
  const [inputText, setInputText] = useState("");
  // 팔로우우 리스트
  const [followList, setFollowList] = useState([]);

  // 텍스트에리어에서 값을 입력할 때 마다 잡아서 상태변경
  const handleTextareaChange = (e) => {
      setInputText(e.target.value);
  };

  // 프로필 카드를 열고 닫는 함수
  const handleProfileCard = (state) => {
      setShowProfileCard(state)
  }

  //팔로워 리스트를 가져오는 함수
  useEffect(() => {
    let url = "http://localhost:10000/follows/api/follow/list";
    let checkInputText = inputText.trim();
    const getFollower = async() => {
      if (checkInputText === "") {
        url = url + `?myId=${profileMemberId}&filterType=${followFilter}`
      } else {
        url = url + `?myId=${profileMemberId}&filterType=${followFilter}&searchNickname=${checkInputText}`
      }
      const response = await fetch(url)
      const datas = await response.json()
      console.log(datas);
      
      setFollowList(datas);
    }
    getFollower()
  }, [followFilter, inputText, profileMemberId])

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
            <S.SearchBox
              $memberId={memberId}
              $profileMemberId={profileMemberId}
            >
              <S.SearchIcon 
                src='/assets/images/follow/search-icon.png'
                alt='돋보기 아이콘'
              />
              <S.SearchInput
                maxLength={14} 
                placeholder='닉네임 검색'
                onChange={handleTextareaChange}
                value={inputText}
                spellCheck={false}
                onDrop={e => e.preventDefault()}
                onDragOver={e => e.preventDefault()}
              >
              </S.SearchInput>
            </S.SearchBox>
            {memberId === profileMemberId && (
              <S.SelectBox onChange={(e) => setFollowFilter(e.target.value)}>
                <option value="">전체</option>
                <option value="favorite">즐겨찾기</option>
              </S.SelectBox>
            )}
          </S.TopContainer>
          <S.ListContainer>
            {followList.map((item) => (
              <S.ItemContainer key={item.id}>
                <S.MemberInfoContainer>
                  <S.MemberImg
                    src={`http://localhost:10000/images/profile/${item.memberImgName}`}
                    alt='멤버 프로필 이미지'
                    onClick={() => {
                      handleProfileCard(true)
                    }}
                    onError={e => {
                      e.target.src = "/assets/images/header/default-member-img.png";
                    }}
                    />
                    {/* 프로필 카드 영역 */}
                    {showProfileCard && (
                      <S.ProfileCardDropdown>
                        <ProfileCard
                            memberId={memberId}
                            profileCardMemberId={item.id}
                            handleProfileCard={showProfileCard}
                            onCancel={() => {
                              handleProfileCard(false)
                              onCancel();
                            }}
                        />
                      </S.ProfileCardDropdown>
                    )}
                    {showProfileCard && (
                      <S.CardBG 
                          onClick={() => {handleProfileCard(false)}}
                      />
                    )}
                  <S.MemberInfoTextContainer>
                    <S.MemberStatusContainer>
                      <S.MemberNickName>{item.memberNickname}</S.MemberNickName>
                      {memberId === profileMemberId && item.favorite === 1 && (
                        <S.MemberFavoriteImg src='/assets/images/follow/star-on.png' alt='즐겨찾기 활성화'/>
                      )}
                    </S.MemberStatusContainer>
                    <S.MemberStatusMessage>{item.memberStatusMessage}</S.MemberStatusMessage>
                  </S.MemberInfoTextContainer>
                </S.MemberInfoContainer>
                {memberId === profileMemberId && (
                  <S.UnFollowBtn onClick={() => unfollow(memberId, item.id)}>
                    팔로잉
                  </S.UnFollowBtn>
                )}
              </S.ItemContainer>
            ))}
          </S.ListContainer>
        </S.ModalContainer>
      </S.Backdrop>
    </>
  );
};

export default FollowModal;