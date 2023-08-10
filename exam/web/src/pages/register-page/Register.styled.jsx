import { styled } from 'styled-components';
import Button from '@mui/material/Button';

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
export const StyledButton = styled(Button)`
  background-color: #191308;
  color: #a29f99;
  padding: 30px 40px;
  border-radius: 30px;
  font-size: larger;

  background-image: url(${backgroundImageUrl});
  background-position: center;
  background-attachment: fixed;
  background-size: cover;

  &:hover {
    background-color: rgb(31, 24, 26);
  }
`;
