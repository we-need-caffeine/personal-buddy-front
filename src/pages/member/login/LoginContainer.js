import React from 'react';
import Login from './Login';
import { Link, Outlet } from 'react-router-dom';

const LoginContainer = () => {
    return (
        <div>
            <div>
                <Link to={"/member/login"}>이메일 로그인</Link>
                <Link to={"/member/login/social"}>간편 로그인</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default LoginContainer;