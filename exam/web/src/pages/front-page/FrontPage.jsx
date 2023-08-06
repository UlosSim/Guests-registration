import { Fab, Link } from '@mui/material';
import { StyledPage } from './FrontPage.styled';

import { Link as RouterLink } from 'react-router-dom';
import { green } from '@mui/material/colors';

const FrontPage = () => {
  return (
    <div>
      <StyledPage>
        <Link component={RouterLink} to='/register'>
          <Fab
            size='medium'
            variant='extended'
            sx={{
              ml: 3,
              backgroundColor: '#191308',
              color: '#F79D00',
              padding: '30px',
            }}
          >
            Register
          </Fab>
        </Link>
        <Link component={RouterLink} to='/login'>
          <Fab
            variant='extended'
            sx={{
              ml: 3,
              backgroundColor: '#F79D00',
              borderColor: 'black',
              padding: '30px',
            }}
          >
            Or Login
          </Fab>
        </Link>
      </StyledPage>
    </div>
  );
};

export default FrontPage;
