import React, { useEffect, useState } from 'react';
import S from './style';
import { useSelector } from 'react-redux';

const RecommendInformation = () => {
    const [data, setData] = useState([]);
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
                console.log('🔍 API 응답 데이터:', result);
                const filteredData = result.filter(item => item.interestDataSection === 'info');
                console.log('🔍 filteredData:', filteredData);

                // Set으로 중복 제거 (item 전체를 JSON 문자열로 변환)
                const uniqueSet = new Set();
                const uniqueData = [];
                filteredData.forEach(item => {
                    const key = JSON.stringify(item);  // item 전체 내용을 문자열화
                    if (!uniqueSet.has(key)) {
                        uniqueSet.add(key);
                        uniqueData.push(item);
                    }
                });

                // 랜덤으로 섞고 4개 선택
                const shuffledData = uniqueData.sort(() => Math.random() - 0.5);
                const selectedData = shuffledData.slice(0, 4);

                setData(selectedData);
            })

                        .catch(error => console.error('데이터 불러오기 실패', error));
                    }
                }, [memberId]);

    return (
        <S.ContentWrapper>
            <S.RecommendWrapper>
                <p>오늘 이런 노래 어때요?!!</p>
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
                                        width: 40  // 너비 고정
                                    }}>{key}</span>: <span style={{
                                        fontWeight: 400,
                                        fontSize: 14,
                                        marginLeft: 10
                                    }}>{value}</span>
                                </div>
                            );
                        }

                        return (
                            <S.RecommendInfo key={`${item.id}-${item.interestDataContent}`}>
                                <S.RecommendImg 
                                    src={`${process.env.REACT_APP_BACKEND_URL}/${item.interestDataImgPath}/${item.interestDataImgName}`} 
                                    alt={item.interestDataContent} 
                                    onError={(e) => e.target.src = '/assets/images/error/404ERROR.png'}
                                />
                                <div>{items}</div>
                            </S.RecommendInfo>
                        );
                    })}
                </S.RecommendList>
            </S.RecommendWrapper>
        </S.ContentWrapper>
    );
};

export default RecommendInformation;
