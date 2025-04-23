import React from 'react';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import Banner from './banner/Banner';

const LayoutWithBanner = () => {
    return (
        <>
            <header><Header /></header>
            <banner><Banner /></banner>
            <main>
                <Outlet />
            </main>
            <footer><Footer /></footer>
        </>
    );
};

export default LayoutWithBanner;