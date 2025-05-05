import React from 'react';
import { NavLink } from 'react-router-dom';
import { headerContainer, headerLeftContainer, headerLinkContainer, headerMainContainer, headerMainIconContainer, headerProfileContainer, headerRightContainer, headerSocialContainer } from './style';
import alertIcon from './img/alert.png';
import messageIcon from './img/message.png';
import persenalBuddyIcon from './img/persenalBuddyIcon.png';
import memberProfile from './img/memberProfile.png';


const Header = () => {

    return (
        <div style={headerContainer}>
            <div style={headerMainContainer}>
                <div style={headerLeftContainer}>
                    <div style={headerMainIconContainer}>
                        <img src={persenalBuddyIcon} alt="퍼스널 버디 아이콘" />
                    </div>
                    <div style={headerLinkContainer}>
                        <NavLink to={"/main"}>일정관리</NavLink>
                        <NavLink to={"/main/contents"}>컨텐츠</NavLink>
                        <NavLink to={"/main/community/event"}>이벤트</NavLink>
                        <NavLink to={"/main/community/board"}>커뮤니티</NavLink>
                        <NavLink to={"/main/faq"}>고객센터</NavLink>
                    </div>
                </div>
                <div style={headerRightContainer}>
                    <div style={headerSocialContainer}>
                        <img src={messageIcon} alt="메세지 아이콘" />
                        <img src={alertIcon} alt="알림 아이콘" />
                    </div>
                    <div style={headerProfileContainer}>
                        <img src={memberProfile} alt="멤버 프로필" />
                        <span>nickName 님</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;