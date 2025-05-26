import styled from 'styled-components';
import { flexCenter } from '../../globals/common';

const S = {};

// 전체 페이지네이션
S.PaginationWrapper = styled.div`
    ${flexCenter};
    gap: 8px;
    margin-top: 30px;
`;

// 페이지 번호 버튼
S.PageButton = styled.button`
    width: 32px;
    height: 32px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    background-color: ${({ isActive, theme }) => // isActive prop에 따라 색상 다르게 설정
        isActive ? theme.PALLETE.primary.mainGreen : 'transparent'}; // 활성화 페이지(현재 선택된 페이지): 배경 그린, 글자 흰색 / 비활성화 페이지: 배경 투명, 글자 회색
    color: ${({ isActive, theme }) => isActive ? theme.PALLETE.white : theme.PALLETE.gray.gray4};
    cursor: pointer;

    &:hover {
        background-color: ${({ isActive, theme }) => isActive ? theme.PALLETE.primary.mainGreen : theme.PALLETE.gray.gray1};
    }
`;

// 화살표 버튼 
S.ArrowButton = styled.button`
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
    font-size: 16px;
    cursor: pointer;

    &:disabled {
        color: ${({ theme }) => theme.PALLETE.gray.gray3};
        cursor: default;
    }
`;

export default S;
