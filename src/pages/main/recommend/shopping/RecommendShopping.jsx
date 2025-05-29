import React, { useEffect, useState } from 'react';
import S from './style';
import { useSelector } from 'react-redux';

const RecommendShopping = () => {
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
                const filteredData = result.filter(item => item.interestDataSection === 'shopping');
                setData(filteredData);
            })
            .catch(error => console.error('데이터 불러오기 실패', error));
        }
    }, [memberId]);

    

    return (
        <S.ContentWrapper>
            <S.RecommendWrapper>
                <p>쇼핑 추천 입니다</p>
                <S.RecommendList>
                    {data.map(item => (
                        <S.RecommendInfo key={item.id}>
                            <S.RecommendImg 
                                src={`${process.env.REACT_APP_BACKEND_URL}/${item.interestDataImgPath}/${item.interestDataImgName}`} 
                                alt={item.interestDataContent} 
                                onError={(e) => e.target.src = '/assets/images/error/404ERROR.png'}
                            />
                            <span>{item.interestDataContent}</span>
                        </S.RecommendInfo>
                    ))}
                </S.RecommendList>
            </S.RecommendWrapper>
        </S.ContentWrapper>
    );
};

export default RecommendShopping;
