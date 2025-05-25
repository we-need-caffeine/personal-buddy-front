import { Stomp } from '@stomp/stompjs';
import { createContext, useRef, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider  = ({ children }) => {

  // 채팅방 목록을 저장하는 변수
  const [chatRoomList, setChatRoomList] = useState([]);
  // 채팅 로그를 저장하는 변수
  const [chatList, setChatList] = useState([]);
  // 헤더 채팅룸 활성화
  const [showChatRoom, setShowChatRoom] = useState(false);
  // 헤더 채팅 활성화
  const [showChat, setShowChat] = useState(false);
  // 활성화된 채팅방의 아이디를 담는변수
  const [chatRoomId, setChatRoomId] = useState(0)
  // 사용자의 채팅 입력값을 받는 변수
  const [inputChat, setInputChat] = useState("");
  // 사용자 입력을 저장할 변수
  const [inputText, setInputText] = useState("");
  // 필터 조건
  const [followFilter, setFollowFilter] = useState("");
  // 컴포넌트가 리렌더링되어도 값이 초기화 되지 않도록 참조 객체를 생성
  const stompClient = useRef(null);

  // 텍스트에리어에서 값을 입력할 때 마다 잡아서 상태변경
  const handleChatChange = (e) => {
    setInputChat(e.target.value);
  };

  // 텍스트에리어에서 값을 입력할 때 마다 잡아서 상태변경
  const handleTextareaChange = (e) => {
    setInputText(e.target.value);
  };

  // 채팅룸의 상태를 바꿔주는 함수
  const handleChatRoom = (state) => {
    setShowChatRoom(state)
  }

  // 채팅의 상태를 바꿔주는 함수
  const handleChat = (state) => {
    setShowChat(state)
  }

  // 채팅방의 리스트를 가져오는 함수
  const getChatRoomList = async(memberId) => {
    let url = "http://localhost:10000/chats/api/chat-room/list";
    let checkInputText = inputText.trim();
    if (checkInputText === "") {
      url = url + `?memberId=${memberId}&filterType=${followFilter}`
    } else {
      url = url + `?memberId=${memberId}&filterType=${followFilter}&searchNickname=${checkInputText}`
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

  // 웹소켓 연결 설정
  const connect = (chatRoomList) => {
    stompClient.current = Stomp.over(() => new WebSocket("ws://localhost:10000/ws"));
    stompClient.current.connect({}, () => {
      chatRoomList.forEach((chatRoom) => {
        stompClient.current.subscribe(`/sub/chatroom/${chatRoom.chatRoomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setChatList(prev => [...prev, newMessage]);
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
      setInputChat('');
    }
  };

  return (
    <ChatContext.Provider value={{
      connect, disconnect,
      chatRoomList, getChatRoomList,
      inputChat, handleChatChange, sendMessage,
      inputText, handleTextareaChange,
      followFilter, setFollowFilter,
      showChatRoom, handleChatRoom,
      showChat, handleChat,
      chatRoomId, setChatRoomId,
      chatList, getChatList
    }}>
      {children}
    </ChatContext.Provider>
  );
};
