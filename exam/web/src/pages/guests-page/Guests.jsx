import { useEffect, useState } from 'react';

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
  // updatedGuest,
  deleteGuest,
} from '../../api/list/api.js';
import AddGuestDialog from './AddGuestDialog.jsx';
import { StyledCardContainer, StyledRegister } from './GuestPage.Styled.jsx';

const Guests = () => {
  const [guestList, setGuestList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

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

  const dialogClose = () => setDialogOpen(false);

  const handleAddGuest = async (body) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      console.log(body);

      await createGuest(token, {
        firstName: body.firstname,
        lastName: body.lastName,
        age: body.age,
        email: body.email,
      });

      const { data } = await fetchGuests(token);

      setGuestList(data);

      setDialogOpen(false);
    } catch (error) {
      console.log('Error:', error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGuest = async (id) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await deleteGuest(token, id);
      fetchParticipantsList();
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
          <Typography paragraph={true}>{guestData.email}</Typography>
        </CardContent>
        <Stack spacing={1} alignItems='center' pb={3}>
          <Button variant='contained' disabled={isLoading}>
            View guest info
          </Button>
          <Button
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
          <Card key={guest.id} variant='outlined'>
            {card(guest)}
          </Card>
        ))}
      </StyledCardContainer>
      {dialogOpen && (
        <AddGuestDialog
          loading={isLoading}
          open={dialogOpen}
          onClose={dialogClose}
          onSave={handleAddGuest}
        />
      )}
    </>
  );
};

export default Guests;
