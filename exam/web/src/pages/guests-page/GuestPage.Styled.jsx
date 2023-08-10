import { styled } from 'styled-components';

export const StyledCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  text-align: center;
  color: #a29f99;
`;

const backgroundImageUrl = '/guest.jpg';

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
export const StyledCard = styled.div`
  backgroundcolor: #191308;
  color: #a29f99;
  border-radius: 20px;
  border: 1px solid white;
  margin-top: 20px;
`;
