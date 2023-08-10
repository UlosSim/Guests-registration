import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { StyledRegister, StyledButton } from './Register.styled';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { signUp } from '../../api/list/api';
import { useNavigate } from 'react-router-dom';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';

const Register = () => {
  const [open, setOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
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

  const handleRegister = async () => {
    setIsLoading(true);

    try {
      const userData = {
        firstName: name,
        email: email,
        password: password,
      };

      await signUp(userData.firstName, userData.email, userData.password);
    } catch (error) {
      console.log(error);
      navigate('/register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <StyledRegister>
        <StyledButton
          variant='contained'
          sx={{
            padding: '30px',
            borderRadius: '30px',
            border: '1px solid white',
          }}
          disabled={isloading}
          onClick={handleOpen}
        >
          Register
        </StyledButton>
        <Dialog sx={{ ml: 4 }} open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontSize: '30px' }}>Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To register for the first time, please enter your credentials
            </DialogContentText>
            <TextField
              autoFocus
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
              type='text'
              fullWidth
              variant='standard'
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
                  &nbsp; Your email address
                </div>
              }
              type='email'
              fullWidth
              variant='standard'
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
                  &nbsp; Create password
                </div>
              }
              type='password'
              fullWidth
              variant='standard'
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
            <Link component={RouterLink} to='/login'>
              {' '}
              <Button
                disabled={isloading}
                onClick={handleRegister}
                sx={{
                  backgroundColor: '#1F1E1B',
                  color: '#EEECE7',
                  ':hover': {
                    backgroundColor: '#C70039 ',
                    border: '1px solid #C70039  ',
                  },
                }}
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
