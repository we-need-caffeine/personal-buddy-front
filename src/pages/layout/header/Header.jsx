import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { headerContainer, headerLeftContainer, headerLinkContainer, headerMainContainer, headerMainIconContainer, headerProfileContainer, headerProfileImg, headerRightContainer, headerSocialContainer } from './style';


const Header = () => {

    // 로그인 여부
    const isLogin = 1;

    // 헤더 상태
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        const handleWheel = (e) => {
            if (e.deltaY > 0) {
                setShowHeader(false);
            } else if (e.deltaY < 0) {
                setShowHeader(true);
            }
        };
        window.addEventListener("wheel", handleWheel);
    }, []);

    return (
        <div style={{
            ...headerContainer,
            transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
        }}>
            <div style={headerMainContainer}>
                <div style={headerLeftContainer}>
                    <div style={headerMainIconContainer}>
                        <NavLink to={"/main"}>
                            <img src='/assets/images/header/persenalBuddyIcon.png' alt="퍼스널 버디 아이콘" />
                        </NavLink>
                    </div>
                    <div style={headerLinkContainer}>
                        <NavLink to={"/main"}>일정관리</NavLink>
                        <NavLink to={"/main/contents"}>컨텐츠</NavLink>
                        <NavLink to={"/main/community/event"}>이벤트</NavLink>
                        <NavLink to={"/main/community/board"}>커뮤니티</NavLink>
                        <NavLink to={"/main/faq"}>고객센터</NavLink>
                    </div>
                </div>
                {isLogin == null ? (
                    <div style={headerProfileContainer}>
                        <span>로그인</span>
                    </div>
                ) : (
                    <div style={headerRightContainer}>
                        <div style={headerSocialContainer}>
                            <img style={{cursor: "pointer"}} src='/assets/images/header/message.png' alt="메세지 아이콘" />
                            <img style={{cursor: "pointer"}} src='/assets/images/header/alert.png' alt="알림 아이콘" />
                        </div>
                        <div style={headerProfileContainer}>
                            <NavLink to={"/main/mypage"}>
                                <img style={headerProfileImg} src='/assets/images/header/memberProfile.png' alt="멤버 프로필" />
                            </NavLink>
                            <span style={{cursor: "pointer"}}>로그아웃</span>
                        </div>
                    </div>
                )}  
            </div>
        </div>
    );
};

export default Header;