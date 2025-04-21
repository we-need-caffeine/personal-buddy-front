import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <header>헤더</header>
            <main>
                <Outlet />
            </main>
            <footer>푸터</footer>
        </>
    );
};

export default Layout;