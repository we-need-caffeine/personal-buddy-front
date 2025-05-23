import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import S from './style';
import Banner from './banner/Banner';


const Layout = () => {
    return (
        <>
            <Header />
            <Banner />
            <S.MainWrapper>
                <Outlet />
            </S.MainWrapper>
            <Footer />
        </>
    );
};

export default Layout;

