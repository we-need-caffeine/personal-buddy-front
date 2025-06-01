import React, { useEffect, useState } from 'react';
import S from './style';
import { useSelector } from 'react-redux';

const RecommendPlace = () => {
    const [data, setData] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const currentUser = useSelector(state => state.member.currentUser);
    const memberId = currentUser?.id;

    useEffect(() => {
        if (memberId) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/recommends/api/recommend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memberId: memberId })
            })
            .then(response => {
                if (!response.ok) throw new Error('네트워크 오류');
                return response.json();
            })
            .then(result => {
                const types = [...new Set(result.map(item => item.interestDataType))];
                const randomType = types[Math.floor(Math.random() * types.length)];
                setSelectedType(randomType);
                const filteredData = result.filter(item =>
                    item.interestDataType === randomType &&
                    item.interestDataSection === 'place'
                );
                const shuffledData = filteredData.sort(() => Math.random() - 0.5);
                const selectedData = shuffledData.slice(0, 3);
                setData(selectedData);
            })
            .catch(error => console.error('데이터 불러오기 실패', error));
        }
    }, [memberId]);

    return (
        <S.PlaceRecommend>
            <S.PlaceWrapper>
                <S.PlaceList>
                    <S.PlaceTitle1>오늘 이런 {selectedType} 어때요?</S.PlaceTitle1>
                    {data.map((item, index) => {
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
                                        width: 40,
                                        color: '#333333'
                                    }}>{key}</span>: <span style={{
                                        fontWeight: 400,
                                        fontSize: 14,
                                        marginLeft: 10,
                                        color: '#333333'
                                    }}>{value}</span>
                                </div>
                            );
                        }
                        return (
                            <S.PlaceItem key={item.id} className={index === 0 ? 'active' : ''}>
                                <S.PlaceHover />
                                <S.PlaceItemImg 
                                    src={`${process.env.REACT_APP_BACKEND_URL}/${item.interestDataImgPath}/${item.interestDataImgName}`} 
                                    alt={item.interestDataContent}
                                    onError={(e) => e.target.src = '/assets/images/error/404ERROR.png'}
                                />
                                <S.PlaceInfo>{items}</S.PlaceInfo>
                            </S.PlaceItem>
                        );
                    })}
                </S.PlaceList>

                <S.PlaceDetails id="map-container">
                    <div id="map" style={{ width: '100%', height: '600px', borderRadius: '10px' }}></div>
                </S.PlaceDetails>
            </S.PlaceWrapper>
        </S.PlaceRecommend>
    );
};

export default RecommendPlace;
