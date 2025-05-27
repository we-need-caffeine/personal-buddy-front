// src/pages/main/community/board/banner/style.js

import styled from 'styled-components';
import {
  flexCenter,
  fontSizeH4,
  fontSizeH8,
  fontWeightBold,
  fontWeightRegular,
} from '../../../../globals/common';

const S = {};

// ---------- 전체 래퍼 & 제목 -----------
// 전체 HOT 슬라이드 영역을 감싸는 최상위 래퍼
S.HotWrapper = styled.div`
  width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

// 작은 제목 (TOP10)
S.SubTitle = styled.div`
  ${fontSizeH8}
  ${fontWeightRegular}
  color: #555;
  padding-bottom: 3px;
`;

// 메인 제목 (버디들의 HOT)
S.MainTitle = styled.div`
  ${fontSizeH4}
  ${fontWeightBold}
  color: black;
  margin-top: 1px;
  text-align: left;
  padding-bottom: 55px;
`;

// ---------- 슬라이드 컨테이너 및 버튼 -----------
// 슬라이드 전체 감싸는 영역 (버튼 + 슬라이드 포함)
S.HotContainer = styled.div`
  width: 1400px;
  height: 680px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 0 0 60px 0;
`;

// 왼쪽 이동 버튼
S.HotBtnLeft = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
  ${flexCenter}
`;

// 오른쪽 이동 버튼
S.HotBtnRight = styled(S.HotBtnLeft)``;

// ---------- 슬라이더 트랙 & 아이템 박스 -----------
// 실제 슬라이더가 이동되는 트랙
S.Hot = styled.div`
  overflow: hidden;
  width: 1160px;
  position: relative;
  margin: auto;
`;

// 슬라이더 내부 요소를 가로로 나열하는 박스
S.HotSlider = styled.div`
  display: flex;
  gap: 100px;
  width: max-content;
  height: 100%;
  transition: transform 0.5s ease;

`;

// ---------- 개별 HOT 콘텐츠 -----------
// HOT 게시글 1개 (320x670)
S.HotContent = styled.div`
  flex-shrink: 0;
  width: 320px;
  height: 670px;
  display: flex;
  flex-direction: column;
  
    &:hover .number-box {
      width: 80px;
      height: 80px;
      font-size: 32px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: #009dcc;
  }

  
`;

// ---------- 게시글 이미지 & 순위 박스 -----------
// 이미지 영역을 감싸는 박스
S.HotImageBox = styled.div`
  position: relative;
  display: inline-block;
  background: #e8eaed;
  border-radius: 20px;

  .img {
    width: 320px;
    height: 420px;
    object-fit: cover;
    border-radius: 20px;
    background: #e8eaed;
  }

    &::after {
    content: '';
      position: absolute;
      border-radius: 20px;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.75); 
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
  }

    ${S.HotContent}:hover &::after {
      opacity: 1;
    }
  
`;

// 이미지 왼쪽 상단에 보여지는 순위 번호 박스
S.NumberBox = styled.div.attrs(() => ({
    className: 'number-box', // &:hover .number-box를 감지해서 작동하기때문에 클래스를 넣어준다.
  }))`
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background-color: #009dcc;
    color: white;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    line-height: 28px;
    border-radius: 20px 0 20px 0;
    ${flexCenter}
    transition: all 0.3s ease;
    z-index: 2;
`;

// ---------- 게시글 정보 ---------- 
// 해시태그 
S.HotTag = styled.div`
  ${flexCenter}
  width: 86px;
  height: 24px;
  font-size: 14px;
  color: #616161;
  background: #f6f7f8;
  border-radius: 5px;
  text-align: center;
  margin-top: 15px;
  padding-top: 4px;
`;

// 게시글 제목
S.HotTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #424242;
  padding: 14px 0 18px 0;
`;

// 유저 정보(프로필 이미지 + 닉네임)
S.HotUserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  margin-bottom: 10px;
`;

// 프로필 이미지
S.UserProfile = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

// 닉네임(텍스트)
S.UserNickname = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #808080;
`;

// 게시일
S.HotDate = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #808080;
  padding-bottom: 5px;
`;

// 좋아요, 조회수, 댓글 수 표시 영역
S.HotMetaBox = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #808080;
  display: flex;
  gap: 10px;

  .icon {
    width: 10px;
    height: 10px;
    margin-right: 3px;
  }
`;

export default S;
