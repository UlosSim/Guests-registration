import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './Register.module.css';
import { StyledRegister } from './Register.styled';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { signUp } from '../../api/list/api';

const Register = () => {
  const [open, setOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = async () => {
    setIsLoading(true);

    try {
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      await signUp(userData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <StyledRegister>
        <Button
          variant='contained'
          className={styles.register}
          disabled={isloading}
          onClick={handleOpen}
          sx={{
            backgroundColor: '#191308',
            color: 'A29F99',
            padding: '30px',
            borderRadius: '30px',
            fontSize: 'larger',
          }}
        >
          Register
        </Button>
        <Dialog
          sx={{ ml: 4 }}
          className={styles.content}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle className={styles.title}>Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To register for the first time, please enter your credentials
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Your name'
              type='text'
              fullWidth
              variant='standard'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin='dense'
              id='email'
              label='Email address'
              type='email'
              fullWidth
              variant='standard'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='dense'
              id='password'
              label='Create password'
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
            <Link component={RouterLink} to='/login'>
              {' '}
              <Button
                disabled={isloading}
                onClick={handleRegister}
                className={styles.submit}
              >
                Register
              </Button>{' '}
            </Link>
          </DialogActions>
        </Dialog>
      </StyledRegister>
    </div>
  );
};

export default Register;
