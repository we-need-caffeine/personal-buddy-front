import React, { useState } from 'react';
import S from './style';

const BoardWrite = () => {
  const [title, setTitle] = useState('');// 게시글 제목을 저장하는 상태. 사용자가 제목 입력창에 글을 입력하면 이 값이 바뀜
  const [category, setCategory] = useState(''); // 게시글 분류를 저장하는 상태. 
  const [content, setContent] = useState(''); // 게시글 본문 내용을 저장
  const [files, setFiles] = useState([]); // 사용자가 업로드한 이미지 파일들을 배열 형태로 저장
  const [previewUrls, setPreviewUrls] = useState([]); // 이미지 파일을 base64로 변환한 URL 배열 (브라우저에서 미리보기용으로 사용)
  const [isSelected, setIsSelected] = useState(false); // 카테고리가 선택되었는지 여부 확인용. 선택 여부에 따라 셀렉트박스 스타일이 바뀜
 
  // 사용자가 <input type="file" />에 파일을 올리면 자동으로 실행되는 이벤트 함수
  // 이벤트 객체에는 사용자가 선택한 파일 목록이 들어 있음
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // FileList라는 특수 객체라서 Array.from()을 써서 일반 배열로 바꿔준다.
    setFiles(selectedFiles); // files 상태에 저장

    const fileReaders = []; // 파일을 읽는 도구인 FileReader 객체들을 저장할 배열
    const previews = []; // 실제로 브라우저에 띄워줄 이미지 주소를 담는 배열

    selectedFiles.forEach((file, index) => {
      const reader = new FileReader(); // FileReader: 파일을 base64로 읽기 위한 브라우저 내장 객체
      fileReaders.push(reader);
      reader.onloadend = () => { // 읽기가 끝났을 때 실행될 함수
        previews.push(reader.result); // 변환된 base64 URL을 previews에 추가
        if (previews.length === selectedFiles.length) { 
          setPreviewUrls(previews); // 모든 파일이 다 변환되면 미리보기 상태 저장
        }
      };
      reader.readAsDataURL(file); // 파일을 base64 문자열로 변환
    });
  };
    // 추후 백엔드에 이미지 업로드 연동 시
    // 파일을 FormData로 묶어서 fetch로 보낸다.
    // 서버에서 받은 url 리스트를 previewUrls로 저장한다.

    // const formData = new FormData();
    // formData.append('boardVO.boardTitle', title);
    // formData.append('boardVO.boardContent', content);
    // formData.append('boardVO.boardHashtag', category);
    // formData.append('boardVO.memberId', 1);
    // files.forEach(file => formData.append('images', file));

    // await fetch('/boards/api/image-with-write', {
    // method: 'POST',
    // body: formData 
    // });



  const handleSubmit = async () => {
    if (!title || !content || !category) {
      alert('제목, 내용, 카테고리는 필수입니다.');
      return;
    }

    try {
      const res = await fetch('http://localhost:10000/boards/api/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boardTitle: title, // 제목 입력값
          boardContent: content, // 내용 입력값
          boardHashtag: category, // 선택된 카테고리 (해시태그)
          memberId: 1  // 임시 고정값 — 나중에 로그인 정보에서 가져오기
        })
      });

      if (res.ok) {
        alert('등록되었습니다!');
        window.location.href = '/main/community/board';
      } else {
        const errorText = await res.text();
        alert('등록 실패하였습니다ㅠㅠ: ' + errorText);
      }
    } catch {
      console.error();
      alert('에러 발생하였습니다!.!');
    }
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previewUrls];
    newFiles.splice(index, 1); // 해당 인덱스에서 1개만 제거
    newPreviews.splice(index, 1);
    setFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsSelected(!!e.target.value);  // 셀렉트 UI에 스타일 다르게 주려고
  };

  // 바이트(byte)를 메가바이트(MB)로 변환해주는 함수
  const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2); 
  };

  // 업로드된 모든 파일들의 총 용량 계산. 총합이 30MB 넘으면 업로드 막기 위해 
  const totalFileSize = files.reduce((acc, file) => acc + file.size, 0);

  return (
    <>
      <S.Titles>
        <S.SubTitle>커뮤니티</S.SubTitle>
        <S.BoardWriteTitle>글쓰기</S.BoardWriteTitle>
      </S.Titles>

      <S.Container>
        <S.Hr />

        <S.Label>제목</S.Label>
        <S.Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />

        <S.Label>카테고리</S.Label>
        <S.Select
          value={category}
          onChange={handleCategoryChange}
          className={category ? 'selected' : 'placeholder'}
        >
          <option value="">카테고리를 선택하세요</option>
          <option value="자유">자유 게시글</option>
          <option value="관심">관심 일정</option>
          <option value="공유">공유 일정</option>
        </S.Select>

        <S.Label>내용</S.Label>
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

        <S.FileNotice>첨부파일은 최대 30MB까지 등록 가능합니다.</S.FileNotice>
        <S.FileInputWrapper>
          <S.FileInput type="file" multiple onChange={handleFileChange} />
        </S.FileInputWrapper>

        <S.SubmitButton onClick={handleSubmit}>등록하기</S.SubmitButton>
      </S.Container>
    </>
  );
};

export default BoardWrite;
