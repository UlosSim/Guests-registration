import { Typography } from '@mui/material';

import { StyledHeader } from './Header.styled';

const Header = () => {
  return (
    <div>
      <StyledHeader>
        <Typography variant='h4' align='center'>
          {' '}
          All your guests in one place
        </Typography>
      </StyledHeader>
    </div>
  );
};

export default Header;
