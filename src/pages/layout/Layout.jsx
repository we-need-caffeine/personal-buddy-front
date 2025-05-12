import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import S from './style';


const Layout = () => {
    return (
        <>
            <Header />
            <S.MainWrapper>
                <Outlet />
            </S.MainWrapper>
            <Footer />
        </>
    );
};

export default Layout;

