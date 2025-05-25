import React, { useState } from 'react';
import S from './style';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const BoardWrite = () => {
  const [title, setTitle] = useState('');// 게시글 제목을 저장하는 상태. 사용자가 제목 입력창에 글을 입력하면 이 값이 바뀜
  const [content, setContent] = useState(''); // 게시글 본문 내용을 저장
  const [files, setFiles] = useState([]); // 사용자가 업로드한 이미지 파일들을 배열 형태로 저장
  const [previewUrls, setPreviewUrls] = useState([]); // 이미지 파일을 base64로 변환한 URL 배열 (브라우저에서 미리보기용으로 사용)
  const [category, setCategory] = useState(null); // react-select는 object 형태

   // 로그인된 유저정보
      const {currentUser} = useSelector((state) => state.member)
    // 로그인된 유저의 아이디
    const memberId = currentUser.id;

    const categoryOptions = [
    { label: '자유 게시글', value: '자유' },
    { label: '관심 일정', value: '관심' },
    { label: '공유 일정', value: '공유' }
  ];


//   1. 화면단에서 파일 업로드가 잘 되는지 부터 확인 
// ( 
//    1.1 file-upload 요청 시점 확인 
//    1.2 file-upload 요청이 잘 왔는지 확인
//    1.3 파일이 저장 되었는지 확인할 것
//       -> 파일 저장 경로랑 파일 이름이 어떻게 되는지
//       (코드 보면 알 수 있는데, 너가 확인해서 모르겠으면 내가 찾아줄게)
//    1.4 파일이 저장된 경로를 잘 응답하였는지
// )
// 2. 게시글 + 이미지 등록 요청이 잘 처리 되었는지 확인 (DB에 데이터가 잘 들어갔는지 볼 것)

 
   // 파일 선택 시 미리보기 생성
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles); 

    const previews = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === selectedFiles.length) {
          setPreviewUrls(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
    // 파일을 FormData로 묶어서 fetch로 보낸다.
    const uploadImages = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append('imgFiles', file));
    formData.append('dataType', 'board');

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/files/api/files-upload`, {
      method: 'POST',
      body: formData
    });
    return await res.json(); // { filePath, fileNames }
  };

  const handleSubmit = async () => {
  if (!title || !content || !category) {
    alert('제목, 내용, 카테고리는 필수입니다.');
    return;
  }

  try {
    let filePath = null;
    let fileNames = [];

    // 이미지 먼저 업로드
    if (files.length > 0) {
      const imageRes = await uploadImages(); // { filePath, fileNames }
      // console.log("imageRes",imageRes);
      filePath = imageRes.filePath;
      fileNames = imageRes.fileNames;
    }

    // 게시글 등록 
    // const memberId = localStorage.getItem('memberId');

    const postRes = await fetch( `${process.env.REACT_APP_BACKEND_URL}/boards/api/write`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boardTitle: title,
        boardContent: content,
        boardHashtag: `#${category.label}`,
        memberId: memberId
      })
    });

    if (!postRes.ok) throw new Error(await postRes.text());
    const boardId = await postRes.json(); 

    // 이미지 정보 DB 등록
    if (filePath && fileNames.length > 0) {
      for (const fileName of fileNames) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/image`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            boardId,
            boardImgPath: filePath,
            boardImgName: fileName
          })
        });
      }
    }

    // 등록 완료 후 알림
    const confirmResult = window.confirm("등록하시겠습니까?");
    if (confirmResult) {
      alert('등록되었습니다!');
      window.location.href = '/main/community/board';
    } else {
      alert('취소되었습니다.');
    }

  } catch (err) {
    console.error(err);
    alert('등록 실패: ' + err.message);
  }
};


  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previewUrls];
    // console.log('이미지 삭제', files[index].name);
    newFiles.splice(index, 1); // 해당 인덱스에서 1개만 제거
    newPreviews.splice(index, 1);
    setFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  // 바이트(byte)를 메가바이트(MB)로 변환해주는 함수
  const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2); 
  };

  // 업로드된 모든 파일들의 총 용량 계산. 총합이 30MB 넘으면 업로드 막기 위해 
  const totalFileSize = files.reduce((acc, file) => acc + file.size, 0);
  // console.log('총 파일 용량', `${formatFileSize(totalFileSize)}MB`);

  // 게시글 작성 폼 유효성 검사
  const isTitleValid = title !== '';
  const isCategoryValid = category !== null;
  const isContentValid = content !== '';
  // 제목/카테고리/내용 모두 입력되었을 때만 등록 버튼이 활성화
  const isFormValid = isTitleValid && isCategoryValid && isContentValid;

  return (
    <>

      <S.Container>
        <S.Titles>
          <S.SubTitle>커뮤니티</S.SubTitle>
          <S.BoardWriteTitle>글쓰기</S.BoardWriteTitle>
        </S.Titles>
        <S.Hr />

        <S.Label>제목
          <span style={{ color: !isTitleValid ? 'red' : 'transparent' }}>*</span>
        </S.Label>
        <S.Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />

        <S.Label>카테고리
          <span style={{ color: !isCategoryValid ? 'red' : 'transparent' }}>*</span>
        </S.Label>
        <div style={{ width: '1000px' }}>
          <div>
            {/* <Select
                options  = {categoryOptions}
                defaultValue = {selectedOption}
                onChange = {setCategory}
                placeholder = "카테고리를 선택하세요."
            /> */}

            {/* 기본 select에 스타일을 커스터마이징 하기 위해 react-select 설치 후 사용. yarn add react-select */}
            <Select
              options={categoryOptions}
              value={category}
              onChange={setCategory}
              placeholder="카테고리를 선택하세요"
              styles={{ // 각 부분별로 스타일 오버라이딩
                  control: (baseStyles, state) => ({ // 셀렉트 박스 전체 영역 스타일
                    ...baseStyles,
                    height: '40px',
                    borderRadius: '10px',
                    borderColor: state.isFocused ? '#999' : '#ccc',
              
                    boxShadow: 'none',
                    fontSize: '14px',
                  
              }),
                option: (baseStyles, state) => ({ // 드롭다운에 펼쳐지는 각 항목 스타일
                    ...baseStyles,
                    backgroundColor: state.isFocused ? '#E6F7FF' : 'white',
                    color: 'black',
                    cursor: 'pointer',
                
              }),
                placeholder: (baseStyles) => ({ // 선택 안 했을 때 뜨는 카테고리를 선택하세요 색
                    ...baseStyles,
                    color: '#999',
                
              }),
            }}
              isSearchable={false}
            />
          </div>
        </div>

        <S.Label>내용
          <span style={{ color: !isContentValid ? 'red' : 'transparent' }}>*</span>
        </S.Label>
        <S.TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={3000}
          placeholder="내용을 입력해주세요 (3000자 제한)"
          />

        {previewUrls.length > 0 && (
          <S.PreviewWrapper>
            {previewUrls.map((url, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <S.ImagePreview src={url} alt={`미리보기${i + 1}`} />
                <S.RemoveImageBtn onClick={() => handleRemoveImage(i)}>삭제</S.RemoveImageBtn>
              </div>
            ))}
          </S.PreviewWrapper>
        )}

        {files.length > 0 && (
          <S.FileSize>
            {files.map((file, i) => (
              <div key={i}>
                {file.name} : {formatFileSize(file.size)}MB
              </div>
            ))}
            <div style={{ marginTop: '6px', fontWeight: 'bold' }}>
              총 용량: {formatFileSize(totalFileSize)}MB / 30MB
            </div>
          </S.FileSize>
        )}

        <S.FileInputWrapper>
          <label htmlFor="file-upload">
            <S.CustomFileBox>
              클릭해서 첨부파일을 등록해주세요
            </S.CustomFileBox>
          </label>
          <S.FileInput
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </S.FileInputWrapper>

        <S.SubmitButton 
          onClick={handleSubmit} 
          disabled={!isFormValid}
          $active={isFormValid}
          >
          등록하기
        </S.SubmitButton>
      </S.Container>
    </>
  );
};

export default BoardWrite;
