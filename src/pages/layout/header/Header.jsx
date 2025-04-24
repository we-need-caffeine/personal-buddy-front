import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => {
    return (
        <div>
            <NavLink to={"/main"}>일정관리</NavLink>
            <NavLink to={"/main/contents"}>컨텐츠</NavLink>
            <NavLink to={"/main/community/event"}>이벤트</NavLink>
            <NavLink to={"/main/community/board"}>커뮤니티</NavLink>
            <NavLink to={"/main/faq"}>고객센터</NavLink>
        </div>
    );
};

export default Header;