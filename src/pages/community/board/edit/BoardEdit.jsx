import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import S from '../write/style'; 

const BoardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(null);
  const [categoryOptions] = useState([
    { label: '자유 게시글', value: '#자유 게시글' },
    { label: '관심 일정', value: '#관심 일정' },
    { label: '공유 일정', value: '#공유 일정' }
  ]);

  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // 게시글 데이터 로드
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/${id}`);
      const data = await response.json();
      const post = data.board;

      setTitle(post.boardTitle);
      setContent(post.boardContent);
      setCategory(categoryOptions.find(opt => opt.value === post.boardHashtag));

      if (post.boardImgName) {
        const names = Array.isArray(post.boardImgName) ? post.boardImgName : [post.boardImgName];
        const path = post.boardImgPath;
        const imgs = names.map(name => ({
          name,
          url: `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${encodeURIComponent(path)}&fileName=${encodeURIComponent(name)}`
        }));
        setExistingImages(imgs);
      }
    };

    fetchPost();
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleRemoveImage = (name) => {
    setRemovedImages([...removedImages, name]);
    setExistingImages(prev => prev.filter(img => img.name !== name));
  };

  const handleSubmit = async () => {
    if (!title || !content || !category) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    const confirmUpdate = window.confirm("게시글을 수정하시겠습니까?");
    if (!confirmUpdate) return;

    const formData = new FormData();
    const boardVO = {
      id: Number(id),
      boardTitle: title,
      boardContent: content,
      boardHashtag: category.value,
      removedImageNames: removedImages
    };
    formData.append("board", new Blob([JSON.stringify(boardVO)], { type: "application/json" }));
    newFiles.forEach(file => formData.append("images", file));

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/api/post/edit-with-images`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        alert("수정 완료");
        navigate(`/main/community/board/post/${id}`);
      } else {
        alert("수정 실패");
      }
    } catch (err) {
      console.error("수정 오류:", err);
      alert("서버 오류");
    }
  };

  return (
    <S.Container>
      <S.Titles>
        <S.SubTitle>커뮤니티</S.SubTitle>
        <S.BoardWriteTitle>글 수정</S.BoardWriteTitle>
      </S.Titles>
      <S.Hr />

      <S.Label>제목<span style={{ color: !title ? 'red' : 'transparent' }}>*</span></S.Label>
      <S.Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />

      <S.Label>카테고리<span style={{ color: !category ? 'red' : 'transparent' }}>*</span></S.Label>
      <div style={{ width: '1000px' }}>
        <Select
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          placeholder="카테고리를 선택하세요"
          styles={{
            control: (base, state) => ({
              ...base,
              height: '40px',
              borderRadius: '10px',
              borderColor: state.isFocused ? '#999' : '#ccc',
              boxShadow: 'none',
              fontSize: '14px',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#E6F7FF' : 'white',
              color: 'black',
              cursor: 'pointer',
            }),
            placeholder: (base) => ({
              ...base,
              color: '#999',
            }),
          }}
          isSearchable={false}
        />
      </div>

      <S.Label>내용<span style={{ color: !content ? 'red' : 'transparent' }}>*</span></S.Label>
      <S.TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={3000}
        placeholder="내용을 입력해주세요 (3000자 제한)"
      />

      {/* 기존 이미지 */}
      {existingImages.length > 0 && (
        <S.PreviewWrapper>
          {existingImages.map((img, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <S.ImagePreview src={img.url} alt={`기존 이미지 ${i + 1}`} />
              <S.RemoveImageBtn onClick={() => handleRemoveImage(img.name)}>삭제</S.RemoveImageBtn>
            </div>
          ))}
        </S.PreviewWrapper>
      )}

      {/* 새로 업로드한 이미지 */}
      {previewUrls.length > 0 && (
        <S.PreviewWrapper>
          {previewUrls.map((url, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <S.ImagePreview src={url} alt={`새 이미지 ${i + 1}`} />
            </div>
          ))}
        </S.PreviewWrapper>
      )}

      <S.fileMB>첨부파일은 30MB까지 등록 가능합니다.</S.fileMB>
      <S.Label2>파일 첨부</S.Label2>
      <S.FileInputWrapper>
        <label htmlFor="file-upload">
          <S.CustomFileBox>클릭해서 첨부파일을 등록해주세요</S.CustomFileBox>
        </label>
        <S.FileInput
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}teb
        />
      </S.FileInputWrapper>

      <S.SubmitButton onClick={handleSubmit} $active={true}>
        수정하기
      </S.SubmitButton>
    </S.Container>
  );
};

export default BoardEdit;
