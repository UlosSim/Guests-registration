import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

const UpdateGuestDialog = ({ open, onClose, onSave, onCancel, guest }) => {
  const [firstName, setFirstName] = useState(guest.firstName);
  const [lastName, setLastName] = useState(guest.lastName);
  const [age, setAge] = useState(guest.age);
  const [email, setEmail] = useState(guest.email);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFirstName(guest.firstName);
    setLastName(guest.lastName);
    setAge(guest.age);
    setEmail(guest.email);
  }, [guest]);

  const handleFirstNameChange = (key, value) => {
    setFirstName(value);
    setIsEditing(true);
  };

  const handleLastNameChange = (key, value) => {
    setLastName(value);
    setIsEditing(true);
  };

  const handleAgeChange = (key, value) => {
    setAge(value);
    setIsEditing(true);
  };

  const handleEmailChange = (key, value) => {
    setEmail(value);
    setIsEditing(true);
  };
  const handleSubmit = () => {
    const updatedGuest = {
      id: guest.id,
      firstName: firstName,
      lastName: lastName,
      age: age,
      email: email,
    };
    onSave(updatedGuest);
  };

  return (
    <Dialog open={open} maxWidth='sm' fullWidth onClose={onClose}>
      <DialogTitle>Update Guest card</DialogTitle>
      <DialogContent>
        <Stack pt={2} spacing={2}>
          <TextField
            fullWidth
            label='First Name'
            value={firstName}
            onChange={(e) => handleFirstNameChange('firstName', e.target.value)}
          />

          <TextField
            fullWidth
            label='Last Name'
            value={lastName}
            onChange={(e) => handleLastNameChange('lastName', e.target.value)}
          />

          <TextField
            fullWidth
            label='Age'
            type='number'
            value={age}
            onChange={(e) => handleAgeChange('age', e.target.value)}
          />

          <TextField
            fullWidth
            label='Email'
            type='email'
            value={email}
            onChange={(e) => handleEmailChange('email', e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          color='primary'
          disabled={!isEditing}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateGuestDialog;
