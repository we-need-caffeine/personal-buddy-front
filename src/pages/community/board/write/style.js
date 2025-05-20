import styled from 'styled-components';
import {
  fontSizeH4, fontSizeH6, fontSizeH8,
  fontWeightRegular, fontWeightMedium, fontWeightBold,
} from '../../../../globals/common';

const S = {};

// 페이지 전체 컨테이너
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 100px;
`;

// 제목 영역 컨테이너
S.Titles = styled.div`
    margin-top: 60px;
    width: 1000px;
`;

// 작은 제목: "커뮤니티"
S.SubTitle = styled.div`
    ${fontSizeH8};
    ${fontWeightRegular};
    color: #555;
    padding-bottom: 3px;
`;

// 큰 제목: "글쓰기"
S.BoardWriteTitle = styled.h2`
    ${fontSizeH4};
    ${fontWeightBold};
    margin-bottom: 20px;
`;

// 구분선
S.Hr = styled.hr`
    width: 1160px;
    border: none;
    border-top: 1px solid #D9D9D9;
    margin: 30px 0;
`;

// 필드 라벨 스타일
S.Label = styled.label`
    ${fontSizeH6};
    ${fontWeightMedium};
    margin-top: 60px;
    margin-bottom: 10px;
    width: 1000px;
`;

// 제목 입력 필드 스타일
S.Input = styled.input`
    width: 1000px;
    height: 40px;
    padding: 0 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 10px;
`;

// 카테고리 선택 셀렉트박스
S.Select = styled.select`
    width: 1000px;
    height: 40px;
    padding: 0 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &.pAlaceholder {
        background-color: white;
        color: #999;
    }

    &.selected {
        appearance: none; // 브라우저 기본 스타일 제거
        -webkit-appearance: none;
        -moz-appearance: none;
        background-color: #E6F7FF;
        color: #000;
        border-color: gray;
    }

    &:focus {
        outline: none;
        border-color: gray;
        background-color: transparent;
    }
`;

// 내용 입력 텍스트에어리어
S.TextArea = styled.textarea`
    width: 1000px;
    height: 400px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 10px;
    resize: none;
`;

// 글자 수 표시용 텍스트
S.Length = styled.div`
    font-size: 12px;
    color: #888;
    width: 1000px;
    text-align: right;
    margin-top: 4px;
`;

// 이미지 미리보기 스타일
S.ImagePreview = styled.img`
    max-width: 200px;
    margin-top: 10px;
`;

// 미리보기 이미지와 삭제버튼 묶는 영역
S.ImageBox = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
`;


// 삭제 버튼
S.RemoveImageBtn = styled.button`
    background: none;
    border: none;
    color: #999;
    font-size: 14px;
    cursor: pointer;    
    &:hover {
      color: #ff4d4f;
    }
`;



// 파일 관련 안내 문구
S.FileNotice = styled.div`
    font-size: 12px;
    color: #888;
    margin-top: 16px;
    width: 1000px;
`;

// 파일 입력창 래퍼
S.FileInputWrapper = styled.div`
    width: 1000px;
    display: flex;
    align-items: center;
    margin-top: 8px;
`;

// 실제 파일 인풋 태그 스타일
S.FileInput = styled.input`
    font-size: 14px;
`;


S.CustomSelectWrapper = styled.div`
    position: relative;
    width: 1000px;
`;

S.CustomSelect = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ $hasValue }) => ($hasValue ? '#E6F7FF' : 'white')};
  color: ${({ $hasValue }) => ($hasValue ? '#000' : '#999')};
  cursor: pointer;
`;

S.OptionList = styled.ul`
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  z-index: 999;
  max-height: 200px;
  overflow-y: auto;
`;

S.OptionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #E6F7FF;
  }
`;


// 등록 버튼
S.SubmitButton = styled.button`
    width: 200px;
    height: 50px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    background-color: ${({ $active }) => ($active ? '#00AEEF' : '#ccc')};
    border: none;
    border-radius: 25px;
    margin-top: 50px;
    cursor: ${({ $active }) => ($active ? 'pointer' : 'not-allowed')};
    pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};    

    /* &:hover {
      background-color: ${({ $active }) => ($active ? '#00AEEF' : '#ccc')};
    } */
`;


// 여러 개 이미지 미리보기 래퍼
S.PreviewWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
`;

// 총 업로드 용량 및 개별 용량 표시 영역
S.FileSize = styled.div`
    font-size: 12px;
    color: #888;
    margin-top: 8px;
    width: 1000px;
    text-align: right;
`;

export default S;
