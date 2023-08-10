import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import {
  fetchGuests,
  createGuest,
  deleteGuest,
  updateGuest,
} from '../../api/list/api.js';
import AddGuestDialog from './AddGuestDialog.jsx';
import {
  StyledCardContainer,
  StyledRegister,
  StyledCard,
} from './GuestPage.Styled.jsx';
import UpdateGuestDialog from './UpdateGuestDialog.jsx';

const Guests = () => {
  const [guestList, setGuestList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const fetchGuestsList = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await fetchGuests(token);
      setGuestList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestsList();
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddGuest = async (body) => {
    console.log('Received data in handleAddGuest:', body);
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const { firstName, lastName, age, email } = body;

      await createGuest(token, firstName, lastName, age, email);

      const { data } = await fetchGuests(token);
      setGuestList(data);

      setDialogOpen(false);
    } catch (error) {
      console.log('Error:', error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDialogOpen = (guest) => {
    setSelectedGuest(guest);
    setUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
  };

  const handleUpdateGuest = async (updatedGuest) => {
    console.log('Updating guest with ID:', updatedGuest.id);

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const { id, firstName, lastName, age, email } = updatedGuest;

      await updateGuest(token, id, firstName, lastName, age, email);
      setGuestList((prevGuestList) =>
        prevGuestList.map((guest) =>
          id === guest.id
            ? { ...guest, firstName, lastName, age, email }
            : guest
        )
      );

      setUpdateDialogOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGuest = async (guestId) => {
    console.log('Deleting guest with ID:', guestId);
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await deleteGuest(token, guestId);

      fetchGuestsList();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const card = (guestData) => {
    return (
      <>
        <CardContent>
          <Typography variant='h4'>{guestData.firstName}</Typography>
          <Typography variant='h4'>{guestData.lastName}</Typography>
          <Typography paragraph={true}>{guestData.email}</Typography>
          <Typography paragraph={true}>{guestData.age}</Typography>
        </CardContent>
        <Stack spacing={1} alignItems='center' pb={3}>
          <Button
            sx={{
              backgroundColor: '#E7AD02',
              pl: 2,
              pr: 2,
              color: '#EEECE7',
              ':hover': {
                backgroundColor: '#C70039 ',
                border: '1px solid #C70039  ',
              },
            }}
            disabled={isLoading}
            onClick={() => handleUpdateDialogOpen(guestData)}
          >
            Update Guest
          </Button>

          <Button
            sx={{
              backgroundColor: '#C4150A',
              color: '#EEECE7',

              mr: 2,
              ':hover': {
                backgroundColor: '#C70039 ',
                border: '1px solid #C70039  ',
              },
            }}
            variant='outlined'
            disabled={isLoading}
            onClick={() => handleDeleteGuest(guestData.id)}
          >
            Delete Guest
          </Button>
        </Stack>
      </>
    );
  };

  return (
    <>
      <StyledRegister>
        <Button
          sx={{
            color: '#F0B706',
            backgroundColor: '#1A1A18',
            padding: '30px',
            borderRadius: '30px',
            fontSize: 'larger',
            ':hover': {
              backgroundColor: '#644C4A ',
              border: '1px solid #F49A06  ',
            },
          }}
          variant='contained'
          size='medium'
          onClick={() => setDialogOpen(true)}
        >
          Add Guest
        </Button>
      </StyledRegister>

      {isLoading && <LinearProgress />}

      <StyledCardContainer>
        {guestList.map((guest) => (
          <StyledCard
            sx={{
              border: '1px solid white',
            }}
            key={guest.id}
          >
            {card(guest)}
          </StyledCard>
        ))}
      </StyledCardContainer>

      {dialogOpen && (
        <AddGuestDialog
          loading={isLoading}
          open={dialogOpen}
          onClose={handleDialogClose}
          onSave={handleAddGuest}
        />
      )}

      {updateDialogOpen && selectedGuest && (
        <UpdateGuestDialog
          loading={isLoading}
          open={updateDialogOpen}
          onClose={handleUpdateDialogClose}
          onSave={handleUpdateGuest}
          onCancel={handleUpdateDialogClose}
          guest={selectedGuest}
        />
      )}
    </>
  );
};

export default Guests;
