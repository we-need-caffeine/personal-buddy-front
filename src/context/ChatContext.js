import { Stomp } from '@stomp/stompjs';
import { createContext, useRef, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider  = ({ children }) => {

  // 채팅방 목록을 저장하는 변수
  const [chatRoomList, setChatRoomList] = useState([]);
  // 헤더 채팅룸 활성화
  const [showChatRoom, setShowChatRoom] = useState(false);
  // 헤더 채팅 활성화
  const [showChat, setShowChat] = useState(false);
  // 활성화된 채팅방의 아이디를 담는변수
  const [chatRoomId, setChatRoomId] = useState(0)
  // 채팅 메세지를 담는 변수
  const [messages, setMessages] = useState({});
  // 텍스트에리어값 변수
  const [inputText, setInputText] = useState("");
  // 필터 조건
  const [followFilter, setFollowFilter] = useState("");

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

  // 컴포넌트가 리렌더링되어도 값이 초기화 되지 않도록 참조 객체를 생성
    const stompClient = useRef(null);
  
  // 웹소켓 연결 설정
  const connect = (chatRoomList) => {
    const socket = new WebSocket("ws://localhost:10000/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      chatRoomList.forEach((chatRoom) => {
        stompClient.current.subscribe(`/sub/chatroom/${chatRoom.id}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => ({
            ...prev,
            [chatRoom.id]: [...(prev[chatRoom.id] || []), newMessage],
          }));
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
  const sendMessage = (chatContent, chatWriterMemberId, chatRoomId) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        "/pub/message",
        {},
        JSON.stringify({
          chatContent,
          chatWriterMemberId,
          chatRoomId,
        })
      );
    }
  };

  return (
    <ChatContext.Provider value={{
      connect, disconnect,
      chatRoomList, getChatRoomList,
      messages, sendMessage,
      inputText, handleTextareaChange,
      followFilter, setFollowFilter,
      showChatRoom, handleChatRoom,
      showChat, handleChat,
      chatRoomId, setChatRoomId,
    }}>
      {children}
    </ChatContext.Provider>
  );
};
