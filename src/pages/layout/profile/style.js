import styled from 'styled-components';

const S = {};

S.CardContainer = styled.div`
  position: relative;
  width: 320px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALLETE.white};
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

S.NickName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 4px;
`;

S.StatusMsg = styled.div`
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 18px;
`;

S.FollowInfo = styled.div`
  display: flex;
  gap: 34px;
  margin-bottom: 16px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    strong { font-size: 1.1rem; }
    span { font-size: 0.87rem; color: #888; }
  }
`;

S.ActionBox = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

S.FollowButton = styled.button`
  padding: 7px 18px;
  border-radius: 20px;
  border: 1.2px solid #1bc17a;
  background: ${({ isFollowing }) => isFollowing ? '#1bc17a' : '#fff'};
  color: ${({ isFollowing }) => isFollowing ? '#fff' : '#1bc17a'};
  font-weight: bold;
  cursor: pointer;
`;

S.StarButton = styled.button`
  padding: 7px 14px;
  border-radius: 20px;
  border: 1.2px solid #2575e6;
  background: ${({ isFavorite }) => isFavorite ? '#2575e6' : '#fff'};
  color: ${({ isFavorite }) => isFavorite ? '#fff' : '#2575e6'};
  font-weight: bold;
  cursor: pointer;
`;

S.ExtraActionBox = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  button {
    padding: 7px 14px;
    border-radius: 20px;
    border: 1.2px solid #eee;
    background: #f9f9f9;
    cursor: pointer;
    font-size: 0.92rem;
  }
`;

export default S;
