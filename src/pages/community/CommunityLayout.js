import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import S from './style';

const CommunityLayout = () => {
  const location = useLocation();
  const isBoard = location.pathname.includes('/board');

  return (
    <div>
      <S.TabBox>
        <S.TabContainer>
          <S.TabBtn style={{ transform: isBoard ? 'translateX(0)' : 'translateX(100%)' }} />
          
          <S.TabText>
            <NavLink to="/main/community/board">BOARD</NavLink>
          </S.TabText>
          <S.TabText>
            <NavLink to="/main/community/event">EVENT</NavLink>
          </S.TabText>
        </S.TabContainer>
      </S.TabBox>

      <Outlet />
    </div>
  );
};

export default CommunityLayout;
