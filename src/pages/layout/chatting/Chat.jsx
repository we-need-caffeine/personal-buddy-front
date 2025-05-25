import React, { useContext, useState } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';

const Chat = ({ onCancel }) => {

  // 프로필 카드 상태
  const [showProfileCard, setShowProfileCard] = useState(false);
  // 텍스트에리어값
  const [inputText, setInputText] = useState("");
  // 필터 조건
  const [followFilter, setFollowFilter] = useState("");
  // 채팅방 목록
  const [chatRoomList, setChatRoomList] = useState([]);

  // 텍스트에리어에서 값을 입력할 때 마다 잡아서 상태변경
  const handleTextareaChange = (e) => {
      setInputText(e.target.value);
  };


  return (
    <S.ChatRoomContainer>
      {/* 메세지 타이틀 / 닫기 버튼 */}
      <S.TitleContainer>
        <S.Title>메세지</S.Title>
        <S.CloseButton src='/assets/images/modal/close-button.png' alt='x버튼' onClick={onCancel}/>
      </S.TitleContainer>
      <S.TopContainer>
        <S.SearchBox>
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
        <S.SelectBox onChange={(e) => setFollowFilter(e.target.value)}>
          <option value="">전체</option>
          <option value="follow">팔로잉</option>
          <option value="favorite">즐겨찾기</option>
        </S.SelectBox>
      </S.TopContainer>
      <S.ListContainer>
        {chatRoomList.map((item) => (
          <S.ItemContainer key={item.chatRoomId}>
            <S.MemberInfoContainer>
              <S.MemberImg
                src={`http://localhost:10000/images/profile/${item.memberImgName}`}
                alt='멤버 프로필 이미지'
                onClick={() => {
                }}
                onError={e => {
                  e.target.src = "/assets/images/header/default-member-img.png";
                }}
                />
              <S.MemberInfoTextContainer>
                <S.MemberStatusContainer>
                  <S.MemberNickName>{item.memberNickName}</S.MemberNickName>
                  {item.unReadCount > 0 && (
                    <S.UnReadCount>
                      {item.unReadCount > 999 ? "999+" : item.unReadCount}
                    </S.UnReadCount>
                  )}
                </S.MemberStatusContainer>
                <S.MemberStatusMessage>
                  {item.chatRoomLastChat || '메세지가 없습니다.'}
                </S.MemberStatusMessage>
              </S.MemberInfoTextContainer>
            </S.MemberInfoContainer>
            <S.RightContainer>
              <S.LastChatDate>오전 11:20</S.LastChatDate>
              <S.OutChatRoom>채팅방 나가기</S.OutChatRoom>
            </S.RightContainer>
            {/* {item.chatRoomLastChatDate && (
              <S.LastChatDate>{item.chatRoomLastChatDate}</S.LastChatDate>
            )} */}
          </S.ItemContainer>
        ))}
      </S.ListContainer>
    </S.ChatRoomContainer>
  );
};

export default Chat;