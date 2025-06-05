import { Stomp } from '@stomp/stompjs';
import { createContext, useRef, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider  = ({ children }) => {

  // 채팅방 목록을 저장하는 변수
  const [chatNotReadCount, setchatNotReadCount] = useState(0);
  // 채팅방 목록을 저장하는 변수
  const [chatRoomList, setChatRoomList] = useState([]);
  // 채팅 로그를 저장하는 변수
  const [chatList, setChatList] = useState([]);
  // 채팅방 모달 리스트 활성화
  const [showChatRoom, setShowChatRoom] = useState(false);
  // 채팅 모달 리스트 활성화
  const [showChat, setShowChat] = useState(false);
  // 활성화된 채팅방의 아이디를 담는 변수
  const [chatRoomId, setChatRoomId] = useState(0);
  // 활성화된 채팅방의 멤버정보
  const [chatOtherUserInfo, setchatOtherUserInfo] = useState({});
  // 사용자의 채팅 입력값을 받는 변수
  const [inputChat, setInputChat] = useState("");
  // 유저 검색용 텍스트정보를 저장할 변수
  const [inputSearch, setInputSearch] = useState("");
  // 유저 검색용 필터정보를 담는 변수
  const [filterSearch, setFilterSearch] = useState("");
  // 컴포넌트가 리렌더링되어도 값이 초기화 되지 않도록 참조 객체를 생성
  const stompClient = useRef(null);
  // 메세지를 받을때마다 상태들을 리랜더링하는 스위치
  const [isNewMessage, setIsNewMessage] = useState(false);

  // 메세지 스위치를 토글하는 함수
  const toggleIsNewMessage = () => {
    setIsNewMessage(prev => !prev)
  }

  // 채팅창에서 값을 입력할 때 마다 잡아서 상태변경
  const handleChatChange = (e) => {
    setInputChat(e.target.value);
  };

  // 유저 정보 검색 텍스트 값을 입력할 때 마다 잡아서 상태변경
  const handleTextareaChange = (e) => {
    setInputSearch(e.target.value);
  };

  // 채팅방 모달의 상태를 바꿔주는 함수
  const handleChatRoom = (state) => {
    setShowChatRoom(state)
    toggleIsNewMessage()
  }

  // 채팅 모달의 상태를 바꿔주는 함수
  const handleChat = (state) => {
    setShowChat(state)
    toggleIsNewMessage()
  }

  // 읽지 않은 채팅의 수를 조회하는 함수
  const getNotReadChatting = async (memberId) => {
    const response = await fetch(`http://localhost:10000/chats/api/chat/not-read/${memberId}`)
    const data = await response.json()
    setchatNotReadCount(data);
  }

  // 메세지를 시작하는 함수 상대의 정보를 불러온다
  const startChatting = async (memberId, profileMemberId) => {
    const response = await fetch(`http://localhost:10000/chats/api/chat-room/register?memberId=${memberId}&secondMemberId=${profileMemberId}`, {
        method: "POST"
    })
    const data = await response.json()
    setchatOtherUserInfo(data)
    setChatRoomId(data.chatRoomId)
  }

  // 채팅방의 리스트를 가져오는 함수
  const getChatRoomList = async(memberId) => {
    let url = "http://localhost:10000/chats/api/chat-room/list";
    let checkInputText = inputSearch.trim();
    if (checkInputText === "") {
      url = url + `?memberId=${memberId}&filterType=${filterSearch}`
    } else {
      url = url + `?memberId=${memberId}&filterType=${filterSearch}&searchNickname=${checkInputText}`
    }
    const response = await fetch(url) 
    const datas = await response.json()
    setChatRoomList(datas)
  }

  // 채팅 목록을 가져오는 함수
  const getChatList = async(memberId, chatRoomId) => {
    const response = await fetch(`http://localhost:10000/chats/api/chat/list?memberId=${memberId}&chatRoomId=${chatRoomId}`);
    const data = await response.json();
    setChatList(data)
  }

  // 채팅방을 숨김처리하는 함수
  const hideChatRoom = async(memberId, chatRoomId) => {
    await fetch(`http://localhost:10000/chats/api/chat-room/hide?chatRoomId=${chatRoomId}&memberId=${memberId}`, {
      method: "PUT"
    })
    getChatRoomList(memberId)
  }

  // 채팅을 숨김처리하는 함수
  const hideChat = async(chatId, memberId) => {
    await fetch(`http://localhost:10000/chats/api/chat/hide?chatId=${chatId}&memberId=${memberId}`, {
      method: "PUT"
    })
    getChatList(memberId, chatRoomId)
  }

  // 웹소켓 연결 설정
  const connect = (chatRoomList) => {
    stompClient.current = Stomp.over(() => new WebSocket("ws://localhost:10000/ws"));
    stompClient.current.connect({}, () => {
      chatRoomList.forEach((chatRoom) => {
        stompClient.current.subscribe(`/sub/chatroom/${chatRoom.chatRoomId}`, (message) => {
          // const newMessage = JSON.parse(message.body);
          // setChatList(prev => [...prev, newMessage]);
          setIsNewMessage(prev => !prev)
        });
      });
    });
  };

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  // 웹소켓으로 STOMP 메세지를 보내는 함수
  const sendMessage = (chatRoomId, chatWriterMemberId, chatContent) => {
    if (stompClient.current && stompClient.current.connected && chatContent) {
      const body = {
        chatRoomId : chatRoomId,
        chatWriterMemberId : chatWriterMemberId,
        chatContent : chatContent
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      setIsNewMessage(prev => !prev)
      setInputChat('');
    }
  };

  return (
    <ChatContext.Provider value={{
      getNotReadChatting, chatNotReadCount,
      connect, disconnect, stompClient,
      chatRoomList, setChatRoomList, getChatRoomList,
      chatOtherUserInfo, setchatOtherUserInfo,
      inputChat, setInputChat, handleChatChange,
      inputSearch, setInputSearch, handleTextareaChange,
      filterSearch, setFilterSearch,
      showChatRoom, setShowChatRoom, handleChatRoom,
      showChat, setShowChat, handleChat,
      chatRoomId, setChatRoomId,
      chatList, setChatList, getChatList,
      isNewMessage, setIsNewMessage, toggleIsNewMessage,
      hideChatRoom, hideChat,
      startChatting,
      sendMessage,
    }}>
      {children}
    </ChatContext.Provider>
  );
};
