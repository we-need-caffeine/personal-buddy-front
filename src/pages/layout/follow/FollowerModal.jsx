import React, { useContext, useEffect, useState } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';
import { ProfileCardContext } from '../../../context/ProfileCardContext';
import ProfileCard from '../profile/ProfileCard';
import FollowerItem from './FollowerItem';

const FollowerModal = ({ memberId, profileMemberId, handleFollowerList, onCancel }) => {

  // 헤더 스크롤을 막는 상태값
  const { lockScroll, unlockScroll } = useContext(HeaderContext);
  // 프로필 카드 상태
  const [showProfileCard, setShowProfileCard] = useState(false);
  // 프로필 카드 콘텍스트
  const { unfollow } = useContext(ProfileCardContext);
  // 필터 조건
  const [followFilter, setFollowFilter] = useState("");
  // 텍스트에리어값
  const [inputText, setInputText] = useState("");
  // 팔로워 리스트
  const [followerList, setFollowerList] = useState([]);
  
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
    let url = "http://localhost:10000/follows/api/follower/list";
    let checkInputText = inputText.trim();
    const getFollower = async() => {
      if (checkInputText === "") {
        url = url + `?myId=${profileMemberId}&filterType=${followFilter}`
      } else {
        url = url + `?myId=${profileMemberId}&filterType=${followFilter}&searchNickname=${checkInputText}`
      }
      const response = await fetch(url)
      const datas = await response.json()
      setFollowerList(datas);
    }
    getFollower()
  }, [followFilter, inputText, profileMemberId])

  useEffect(() => {
      if (handleFollowerList) lockScroll();
      return () => unlockScroll();
  }, [handleFollowerList]);
  
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
                  <option value="follow">팔로잉</option>
                  <option value="favorite">즐겨찾기</option>
                </S.SelectBox>
              )}
            </S.TopContainer>
            <S.ListContainer>
              {followerList.map((item, i) => (
                <FollowerItem
                  key={i}
                  item={item}
                  handleProfileCard={handleProfileCard}
                  showProfileCard={showProfileCard}
                  memberId={memberId}
                  onCancel={onCancel}
                  profileMemberId={profileMemberId}
                  unfollow={unfollow}
                />
              ))}
            </S.ListContainer>
        </S.ModalContainer>
    </S.Backdrop>
    </>
  );
};

export default FollowerModal;