import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { StyledRegister, StyledButton } from './Login.styled';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { login } from '../../api/list/api';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await login({ name, email, password });
      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        document.cookie = `token=${response.data.token};`;
        console.log('Login successful!');
        navigate('/guests');
      } else {
        console.log('Login failed!');
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        console.log('Login error:', error.response.data);
      } else {
        console.log('Login error:', error.message);
        navigate('/');
      }
    }
  };

  return (
    <div>
      <StyledRegister>
        <StyledButton
          variant='contained'
          onClick={handleOpen}
          sx={{
            padding: '30px',
            borderRadius: '30px',
            border: '1px solid white',
          }}
        >
          Login to your account
        </StyledButton>
        <Dialog sx={{ ml: 4 }} open={open} onClose={handleClose}>
          <DialogTitle c>Login</DialogTitle>
          <DialogContent>
            <TextField
              margin='dense'
              id='name'
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <InsertEmoticonOutlinedIcon
                    color='secondary'
                    style={{ marginLeft: '5px' }}
                  />
                  &nbsp; Your name
                </div>
              }
              type='email'
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin='dense'
              id='email'
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <EmailOutlinedIcon
                    color='secondary'
                    style={{ marginLeft: '5px' }}
                  />{' '}
                  &nbsp; Your email
                </div>
              }
              type='email'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='dense'
              id='password'
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FingerprintOutlinedIcon
                    color='secondary'
                    style={{ marginLeft: '5px' }}
                  />{' '}
                  &nbsp; Your password
                </div>
              }
              type='password'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: '#E7AD02',
                color: '#EEECE7',
                mr: 2,
                ':hover': {
                  backgroundColor: '#C70039 ',
                  border: '1px solid #C70039  ',
                },
              }}
            >
              Cancel
            </Button>
            <Link component={RouterLink}>
              {' '}
              <Button
                onClick={handleLogin}
                sx={{
                  backgroundColor: '#1F1E1B',
                  color: '#EEECE7',
                  ':hover': {
                    backgroundColor: '#C70039 ',
                    border: '1px solid #C70039  ',
                  },
                }}
              >
                Login
              </Button>{' '}
            </Link>
          </DialogActions>
        </Dialog>
      </StyledRegister>
    </div>
  );
};

export default Login;
