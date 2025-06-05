import 'aos/dist/aos.css';
import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import AOS from "aos";
import S from './style';

const LandingPage = () => {
  const playerRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoId = "fgBBIpG3ri4"; // 유튜브 영상 ID
  const videoTitle = "🎵 SEVENTEEN - HEY BUDDY 🎵";

  const SECTION_HEIGHT = 1080;

  // 페이지 진입 시: 컨페티 + 유튜브 API 로딩
  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    AOS.init({
      delay: 1500,
      duration: 500,
      once: false,
    });

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
            setMusicStarted(true); // 음악 표시
        },
        onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
            playerRef.current.playVideo(); // loop가 안 먹을시 강제 재시작
            }
        }
        }
      });
    };

    let isScrolling = false;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;

      isScrolling = true;

      // 컨페티 자동 발사
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#00bfff', '#ff69b4', '#ffcc00'],
      });

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentScroll = window.scrollY;
      const currentIndex = Math.round(currentScroll / SECTION_HEIGHT);
      const nextIndex = currentIndex + direction;

      window.scrollTo({
        top: nextIndex * SECTION_HEIGHT,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrolling = false;
      }, 700);
    };

    const handleScroll = () => {
      const videos = document.querySelectorAll('video');
      const aosElements = document.querySelectorAll('[data-aos]');

      videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          video.play().catch(() => {}); // iOS autoplay 대응
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });

      aosElements.forEach((el) => {
        el.classList.remove('aos-animate');
      });
    };

    // 🔁 AOS 감지 갱신
    requestAnimationFrame(() => {
      AOS.refreshHard();
    });

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 렌더 시 재생 상태 맞춤

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      AOS.refreshHard();
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
    <S.Container onClick={(e) => handleClick(e)}>
      {musicStarted && (
        <S.MusicInfo>
          <div>{videoTitle}</div>
          <S.MusicButton onClick={handlePlay}>▶ 음악 재생</S.MusicButton>
          <S.MuteButton onClick={toggleMute}>
            {isMuted ? '🔇' : '🔊'}
          </S.MuteButton>
        </S.MusicInfo>
      )}
      <S.VideoWrapper>
        <S.LoginLink 
          onClick={(e) => e.stopPropagation()}
          to={"/member/login"}
          xPosition={'650px'} 
          yPosition={'680px'} 
          backgroundColor={'#01CD74'} 
          hoverBackgroundColor={'#24C394'}
          color='white'
          data-aos="fade-down-right">
          지금 참여하기
        </S.LoginLink>
        <S.Video 
          autoPlay
          muted
          playsInline
          onEnded={(e) => e.target.pause()}
        >
          <source src='/assets/images/landing/landing01.mp4' type='video/mp4'/>
        </S.Video>
      </S.VideoWrapper>
      <S.VideoWrapper>
        <S.LoginLink 
          onClick={(e) => e.stopPropagation()}
          to={"/member/login"}
          xPosition={'300px'} 
          yPosition={'680px'} 
          backgroundColor={'#2C9465'} 
          hoverBackgroundColor={'#57CD98'}
          color='white'
          data-aos="fade-up-right">
          지금 참여하기
        </S.LoginLink>
        <S.Video 
          autoPlay
          muted
          playsInline
          onEnded={(e) => e.target.pause()}
        >
          <source src='/assets/images/landing/landing02.mp4' type='video/mp4'/>
        </S.Video>
      </S.VideoWrapper>
      <S.VideoWrapper>
        <S.LoginLink 
          onClick={(e) => e.stopPropagation()}
          to={"/member/login"}
          xPosition={'900px'} 
          yPosition={'315px'} 
          backgroundColor={'#60081F'} 
          hoverBackgroundColor={'#C2103F'}
          color='white'
          data-aos="flip-left">
          지금 참여하기
        </S.LoginLink>
        <S.Video 
          autoPlay
          muted
          playsInline
          onEnded={(e) => e.target.pause()}
        >
          <source src='/assets/images/landing/landing03.mp4' type='video/mp4'/>
        </S.Video>
      </S.VideoWrapper>
      <S.VideoWrapper>
        <S.LoginLink 
          onClick={(e) => e.stopPropagation()}
          to={"/member/login"}
          xPosition={'650px'} 
          yPosition={'185px'} 
          backgroundColor={'#002060'} 
          hoverBackgroundColor={'#004BE2'}
          color='white'
          data-aos="fade-down">
          지금 참여하기
        </S.LoginLink>
        <S.Video 
          autoPlay
          muted
          playsInline
          onEnded={(e) => e.target.pause()}
        >
          <source src='/assets/images/landing/landing04.mp4' type='video/mp4'/>
        </S.Video>
      </S.VideoWrapper>
      <S.VideoWrapper>
        <S.LoginLink 
          onClick={(e) => e.stopPropagation()}
          to={"/member/login"}
          xPosition={'380px'} 
          yPosition={'400px'} 
          backgroundColor={'#8E0C2E'} 
          hoverBackgroundColor={'#C0103E'}
          color='white'
          data-aos="zoom-in-up">
          지금 참여하기
        </S.LoginLink>
        <S.Video 
          autoPlay
          muted
          playsInline
          onEnded={(e) => e.target.pause()}
        >
          <source src='/assets/images/landing/landing05.mp4' type='video/mp4'/>
        </S.Video>
      </S.VideoWrapper>
      {/* 유튜브 iframe (숨김) */}
      <div style={{ display: 'none' }}>
        <div id="yt-player"></div>
      </div>
    </S.Container>
  );
};

export default LandingPage;
