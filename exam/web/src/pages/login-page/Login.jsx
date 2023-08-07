import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './Login.module.css';
import { StyledRegister } from './Login.styled';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { login } from '../../api/list/api';
// import { useSignIn } from 'react-auth-kit';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async (e) => {
    try {
      const response = await login({ name, email, password });
      console.log(response.data);

      localStorage.setItem('token', response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <StyledRegister>
        <Button
          variant='contained'
          className={styles.login}
          onClick={handleOpen}
          sx={{
            backgroundColor: '#191308',
            color: 'A29F99',
            padding: '30px',
            borderRadius: '30px',
            fontSize: 'larger',
          }}
        >
          Login to your account
        </Button>
        <Dialog
          sx={{ ml: 4 }}
          className={styles.content}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle className={styles.title}>Login</DialogTitle>
          <DialogContent>
            <TextField
              margin='dense'
              id='name'
              label='Your name'
              type='email'
              fullWidth
              variant='standard'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin='dense'
              id='email'
              label='Your email address'
              type='email'
              fullWidth
              variant='standard'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='dense'
              id='password'
              label='Your password'
              type='password'
              fullWidth
              variant='standard'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={styles.submit}>
              Cancel
            </Button>
            <Link component={RouterLink} to='/guests'>
              {' '}
              <Button onClick={handleLogin} className={styles.submit}>
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
