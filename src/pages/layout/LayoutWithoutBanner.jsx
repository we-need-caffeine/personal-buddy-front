import React from 'react';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import S from './style';

const LayoutWithoutBanner = () => {
    return (
        <>
            <header><Header /></header>
            <S.Main>
                <Outlet />
            </S.Main>
            <footer><Footer /></footer>
        </>
    );
};

export default LayoutWithoutBanner;