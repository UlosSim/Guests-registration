import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import { useState } from 'react';

const AddGuestDialog = ({ open, onClose, onSave, loading }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Dialog
      open={open}
      maxWidth='sm'
      fullWidth
      onClose={!loading ? onClose : undefined}
    >
      <DialogTitle sx={{ fontSize: '30px' }}>Add new Guest</DialogTitle>
      <DialogContent>
        <Stack pt={2} spacing={2}>
          <TextField
            fullWidth
            label='First Name'
            value={firstName}
            disabled={loading}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            label='Last Name'
            value={lastName}
            disabled={loading}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            fullWidth
            label='Age'
            type='number'
            value={age}
            disabled={loading}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            fullWidth
            label='Email'
            type='email'
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            backgroundColor: '#E7AD02',
            color: '#EEECE7',
            mr: 2,
            ':hover': {
              backgroundColor: '#C70039 ',
              border: '1px solid #C70039  ',
            },
          }}
          disabled={loading}
          onClick={!loading ? onClose : undefined}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: '#1F1E1B',
            pl: 2.5,
            pr: 2.5,
            color: '#EEECE7',
            ':hover': {
              backgroundColor: '#C70039 ',
              border: '1px solid #C70039  ',
            },
          }}
          disabled={loading}
          onClick={() =>
            onSave({
              firstName,
              lastName,
              age,
              email,
            })
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGuestDialog;
