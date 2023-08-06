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

const Register = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <StyledRegister>
        <Button
          variant='contained'
          className={styles.register}
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
            />
            <TextField
              margin='dense'
              id='email'
              label='Email address'
              type='email'
              fullWidth
              variant='standard'
            />
            <TextField
              margin='dense'
              id='password'
              label='Create password'
              type='password'
              fullWidth
              variant='standard'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={styles.submit}>
              Cancel
            </Button>
            <Link component={RouterLink} to='/login'>
              {' '}
              <Button onClick={handleClose} className={styles.submit}>
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
