import React, { useEffect, useState } from 'react';
import BoardBannerContainer from './banner/BoardBannerContainer';
import BoardPostListContainer from './postList/BoardPostListContainer';
import ScrollToTop from '../../../hooks/scrollToTop/ScrollToTop';
import { Outlet } from 'react-router-dom';

const BoardContainer = () => {

  const [boards, setBoards] = useState([]);
  const [hot, setHot] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [order, setOrder] = useState("")
  const [boardHashtag, setBoardHashtag] = useState("")
  const [searchKeyword, setSearchKeyword] = useState("")

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/board?order=${order}&boardHashtag=${boardHashtag}&searchKeyword=${searchKeyword}`);
        const datas = await response.json();
        // console.log(datas);
        const { boards, hot } = await datas;

        // console.log("hot", hot)

        // 데이터 추가
        setBoards(boards)
        setHot(hot)
      } catch{
        console.error("fetchBoards함수 error");
      }
      
    };
    fetchBoards();

  }, [isUpdate, boardHashtag, order, searchKeyword]);
  
  return (
    <>
      {/* hot */}
      <BoardBannerContainer hot={hot} />
      <hr style={{
        height : "1px",
        border: "none",
        backgroundColor : "#d9d9d9",
        margin: "0 0 100px 0"
      }}/>
      <BoardPostListContainer 
        boards={boards} setIsUpdate={setIsUpdate} setOrder={setOrder} isUpdate={isUpdate}
        setBoardHashtag={setBoardHashtag} setSearchKeyword={setSearchKeyword}
      />
      <ScrollToTop />

    </>
  );
};

export default BoardContainer;



