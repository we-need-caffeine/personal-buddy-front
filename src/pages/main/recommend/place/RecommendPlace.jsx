import React, { useEffect, useState, useRef } from 'react';
import S from './style';
import { useSelector } from 'react-redux';

const RecommendPlace = () => {
    const [data, setData] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const currentUser = useSelector(state => state.member.currentUser);
    const memberId = currentUser?.id;

    useEffect(() => {
        const loadKakaoMap = () => {
            if (window.kakao && window.kakao.maps) {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.978),
                    level: 5
                };
                mapRef.current = new window.kakao.maps.Map(container, options);
            } else {
                const script = document.createElement('script');
                script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=1db28d1ca4852174d8ef53ec1d5d9bdf&autoload=false`;
                script.async = true;
                script.onload = () => {
                    window.kakao.maps.load(() => {
                        const container = document.getElementById('map');
                        const options = {
                            center: new window.kakao.maps.LatLng(37.5665, 126.978),
                            level: 5
                        };
                        mapRef.current = new window.kakao.maps.Map(container, options);
                    });
                };
                document.head.appendChild(script);
            }
        };

        loadKakaoMap();
    }, []);

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
                    const selectedData = filteredData.length > 3
                        ? filteredData.sort(() => Math.random() - 0.5).slice(0, 3)
                        : filteredData;

                    setData(selectedData);
                })
                .catch(error => console.error('데이터 불러오기 실패', error));
        }
    }, [memberId]);

    const handlePlaceClick = (item, index) => {
        if (!mapRef.current) {
            alert('지도가 아직 초기화되지 않았습니다.');
            return;
        }

        // 기존 active 클래스 제거
        document.querySelectorAll('.place-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.place-item')[index].classList.add('active');

        const coordsString = item.interestDataLink;  // "위도,경도" 형식
        const [lat, lng] = coordsString.split(',').map(Number);
        const parts = item.interestDataContent.split('|');
        const infoText = parts[1] || '정보 없음';  // 두 번째 값 표시

        if (lat && lng) {
            const position = new window.kakao.maps.LatLng(lat, lng);
            mapRef.current.setLevel(3);
            mapRef.current.setCenter(position);

            if (markerRef.current) {
                markerRef.current.setMap(null);
            }

            markerRef.current = new window.kakao.maps.Marker({
                map: mapRef.current,
                position
            });

            const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px; font-size:14px;">${infoText}</div>`
            });
            infowindow.open(mapRef.current, markerRef.current);
        } else {
            alert('좌표를 올바르게 입력해 주세요.');
        }
    };

    return (
        <S.PlaceRecommend>
            <S.PlaceWrapper>
                <S.PlaceList>
                    <S.PlaceTitle1>{selectedType} 장소 추천 입니다!</S.PlaceTitle1>
                    {data.map((item, index) => {
                        const parts = item.interestDataContent.split('|');
                        const items = [];
                        for (let i = 0; i < parts.length; i += 2) {
                            const key = parts[i];
                            const value = parts[i + 1];
                            items.push(
                                <div key={i} style={{marginBottom: '10px'}}>
                                    <span style={{
                                        fontWeight: 500,
                                        fontSize: 14,
                                        display: 'inline-block',
                                        width: 65,
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
                            <S.PlaceItem key={item.id} className="place-item" onClick={() => handlePlaceClick(item, index)}>
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
                    <div id="map" style={{ width: '680px', height: '520px', borderRadius: '10px', backgroundColor: 'gray' }}></div>
                </S.PlaceDetails>
            </S.PlaceWrapper>
        </S.PlaceRecommend>
    );
};

export default RecommendPlace;
