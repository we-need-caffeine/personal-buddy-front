import React from 'react';
import S from './style';

const BoardWrite = () => {
    return (
        <>
            <S.Titles>
                <S.SubTitle>Board</S.SubTitle>
                <S.BoardWriteTitle>글쓰기</S.BoardWriteTitle>
            </S.Titles>

            <S.Hr/>

            <S.Title>제목</S.Title>
        </>
    );
};

export default BoardWrite;