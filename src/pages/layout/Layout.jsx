import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';


const Layout = () => {
    return (
        <>
            <header>
                <Header />
                <div style={{width:'100%', height:'90px'}}></div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer><Footer /></footer>
        </>
    );
};

export default Layout;