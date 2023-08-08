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
      <DialogTitle>Add new Guest</DialogTitle>
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
          variant='outlined'
          disabled={loading}
          onClick={!loading ? onClose : undefined}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
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
