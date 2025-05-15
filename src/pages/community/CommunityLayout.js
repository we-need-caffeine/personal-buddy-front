import { Link, Outlet, useLocation } from 'react-router-dom';
import S from './style';

const CommunityLayout = () => {
  const location = useLocation();
  const isBoard = location.pathname.includes('/board');

  return (
    <div>
      <S.TabBox>
        <S.TabContainer>
          <S.TabBtn style={{ transform: isBoard ? 'translateX(0)' : 'translateX(100%)' }} />
          
          <S.TabText isSelected={isBoard}>
            <Link to="/main/community/board">BOARD</Link>
          </S.TabText>
          <S.TabText isSelected={!isBoard}>
            <Link to="/main/community/event">EVENT</Link>
          </S.TabText>
        </S.TabContainer>
      </S.TabBox>

      <Outlet />
    </div>
  );
};

export default CommunityLayout;
