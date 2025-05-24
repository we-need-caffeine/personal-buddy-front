import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import S from './style';

const LandingPage = () => {
  const playerRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoId = "fgBBIpG3ri4"; // 유튜브 영상 ID
  const videoTitle = "🎵SEVENTEEN - HEY BUDDY 🎵";

  // 페이지 진입 시: 컨페티 + 유튜브 API 로딩
  useEffect(() => {
    // 컨페티 자동 발사
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#00bfff', '#ff69b4', '#ffcc00'],
    });

    // YouTube Iframe API 동적 로드
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // API 로드 완료 시 player 생성
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId,
        playerVars: {
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady: () => {
            setMusicStarted(true); // 음악 정보 표시
          },
        },
      });
    };
  }, []);

  // 클릭 위치에서 컨페티 발사
  const handleClick = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x, y },
      colors: ['#ff8a65', '#f4c20d', '#4db6ac'],
    });
  };

  // 음악 재생 버튼
  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.unMute(); // 소리 ON
      playerRef.current.playVideo(); // 재생
      setIsMuted(false);
    }
  };

  // 뮤트 토글
  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <S.Container onClick={handleClick}>
      <S.Title>HEY BUDDY!</S.Title>
      <S.Subtitle>화면을 클릭해보세요!</S.Subtitle>

      {musicStarted && (
        <S.MusicInfo>
          <div>{videoTitle}</div>
          <S.MusicButton onClick={handlePlay}>▶ 음악 재생</S.MusicButton>
          <S.MuteButton onClick={toggleMute}>
            {isMuted ? '🔇' : '🔊'}
          </S.MuteButton>
        </S.MusicInfo>
      )}

      {/* 유튜브 iframe (숨김) */}
      <div style={{ display: 'none' }}>
        <div id="yt-player"></div>
      </div>
    </S.Container>
  );
};

export default LandingPage;
