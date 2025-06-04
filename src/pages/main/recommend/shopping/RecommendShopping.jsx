import React, { useEffect, useState } from 'react';
import S from './style';
import { useSelector } from 'react-redux';

const RecommendShopping = () => {
    const [data, setData] = useState([]);
    const [selectedType, setSelectedType] = useState('');  // 대분류 상태
    const currentUser = useSelector(state => state.member.currentUser);
    const memberId = currentUser?.id;  // 안전하게 null 체크

    useEffect(() => {
        if (memberId) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/recommends/api/recommend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ memberId: memberId })  // memberId 전달
            })
            .then(response => {
                if (!response.ok) throw new Error('네트워크 오류');
                return response.json();
            })
            .then(result => {
                // 전체 대분류(INTEREST_DATA_TYPE) 추출 (shopping만)
                const shoppingData = result.filter(item => item.interestDataSection === 'shopping');
                const types = [...new Set(shoppingData.map(item => item.interestDataType))];

                // 랜덤으로 대분류 하나 선택
                const randomType = types[Math.floor(Math.random() * types.length)];
                setSelectedType(randomType);

                // 선택된 대분류 + shopping 데이터만 필터링
                const filteredData = shoppingData.filter(item =>
                    item.interestDataType === randomType
                );

                // 랜덤 4개 추출
                const shuffledData = filteredData.sort(() => Math.random() - 0.5);
                const selectedData = shuffledData.slice(0, 4);

                setData(selectedData);
            })
            .catch(error => console.error('데이터 불러오기 실패', error));
        }
    }, [memberId]);

    return (
        <S.ContentWrapper>
            <S.RecommendWrapper>
                <p>{selectedType} 필수템, 한눈에 보기</p>
                <S.RecommendList>
                    {data.map(item => {
                        const parts = item.interestDataContent.split('|');
                        const items = [];
                        for (let i = 0; i < parts.length; i += 2) {
                            const key = parts[i];
                            const value = parts[i + 1];
                            items.push(
                                <div key={i}>
                                    <span style={{
                                        fontWeight: 500,
                                        fontSize: 14,
                                        display: 'inline-block',
                                        width: 40
                                    }}>{key}</span> : <span style={{
                                        fontWeight: 400,
                                        fontSize: 14,
                                        marginLeft: 10
                                    }}>{value}</span>
                                </div>
                            );
                        }

                        return (
                            <S.RecommendInfo key={`${item.id}-${item.interestDataContent}`}>
                                <a href={encodeURI(item.interestDataLink)} target="_blank" rel="noopener noreferrer">
                                <S.RecommendImg 
                                    src={`${process.env.REACT_APP_BACKEND_URL}/${item.interestDataImgPath}/${item.interestDataImgName}`} 
                                    alt={item.interestDataContent} 
                                    onError={(e) => e.target.src = '/assets/images/error/404ERROR.png'}
                                />
                                <div>{items}</div>
                                </a>
                            </S.RecommendInfo>
                        );
                    })}
                </S.RecommendList>
            </S.RecommendWrapper>
        </S.ContentWrapper>
    );
};

export default RecommendShopping;
