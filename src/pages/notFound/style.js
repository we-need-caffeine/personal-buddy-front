import styled from 'styled-components';

const S = {};

S.Container = styled.div`
  background-color: #FCF8F3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

S.Image = styled.img`
  width: 600px;
  height: auto;
`;

S.Title = styled.h1`
  font-size: 40px;
  color: #ff6f61;
  margin-bottom: 10px;
`;

S.Description = styled.p`
  font-size: 18px;
  color: #444;
  margin-bottom: 30px;
`;

S.BackButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #01cd74;
  }
`;

export default S;