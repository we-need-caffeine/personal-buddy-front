import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
`;

export const Logo = styled.img`
  display: block;
  margin: 0 auto 2rem;
`;

export const Wrapper = styled.div`
  margin-bottom: 2rem;
`;

export const Checkbox = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  cursor: pointer;
`;

export const NextButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007BFF')};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;