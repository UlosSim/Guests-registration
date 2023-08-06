import { styled } from 'styled-components';

const backgroundImageUrl = '/register.jpg';

export const StyledRegister = styled.nav`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${backgroundImageUrl});
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  overflow: hidden;
  border-radius: 20px;
`;
