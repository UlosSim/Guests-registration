// import { useEffect, useState } from 'react';
// import { useAuth } from 'react-auth-kit';

// import {
//   Button,
//   Card,
//   CardContent,
//   LinearProgress,
//   Stack,
//   Typography,
// } from '@mui/material';
// import {
//   fetchGuests,
//   createGuest,
//   // updatedGuest,
//   deleteGuest,
// } from '../../api/list/api.js';
// import AddGuestDialog from './AddGuestDialog.jsx';
// import { StyledCardContainer, StyledRegister } from './GuestPage.Styled.jsx';

// const Guests = () => {

//   const [guestList, setGuestList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const [dialogOpen, setDialogOpen] = useState(false);

//   const fetchGuestsList = async () => {

//     try {
//       setIsLoading(true);
//       const { data } = await fetchGuests(auth.authState.token);
//       setGuestList(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (auth.isAuthenticated) {
//       fetchGuestsList();
//     }
//   }, [auth.isAuthenticated]);

//   const dialogClose = () => setDialogOpen(false);

//   const handleAddGuest = async (body) => {
//     try {
//       const response = await createGuest({
//         firstName: body.firstName,
//         lastName: body.lastName,
//         age: body.age,
//         email: body.email,
//       });

//       setGuestList((prev) => [
//         ...prev,
//         {
//           id: response.lastID,
//           firstName: body.firstName,
//           lastName: body.lastName,
//           age: body.age,
//           email: body.email,
//         },
//       ]);
//       setDialogOpen(false);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteGuest = async (id) => {
//     setIsLoading(true);
//     try {
//       await deleteGuest(id);
//       setGuestList((prev) => prev.filter((guest) => guest.id !== id));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const card = (guestData) => {
//     return (
//       <>
//         <CardContent>
//           <Typography variant='h4'>{guestData.firstName}</Typography>
//           <Typography paragraph={true}>{guestData.email}</Typography>
//         </CardContent>
//         <Stack spacing={1} alignItems='center' pb={3}>
//           <Button variant='contained' disabled={isLoading}>
//             View guest info
//           </Button>
//           <Button
//             variant='outlined'
//             disabled={isLoading}
//             onClick={() => handleDeleteGuest(guestData.id)}
//           >
//             Delete Guest
//           </Button>
//         </Stack>
//       </>
//     );
//   };

//   return (
//     <>
//       <StyledRegister>
//         <Button
//           sx={{
//             color: '#F0B706',
//             backgroundColor: '#1A1A18',
//             padding: '30px',
//             borderRadius: '30px',
//             fontSize: 'larger',
//           }}
//           variant='contained'
//           size='medium'
//           onClick={() => setDialogOpen(true)}
//         >
//           Add Guest
//         </Button>
//       </StyledRegister>

//       {isLoading && <LinearProgress />}
//       <StyledCardContainer>
//         {guestList.map((guest) => (
//           <Card key={guest.id} variant='outlined'>
//             {card(guest)}
//           </Card>
//         ))}
//       </StyledCardContainer>
//       {dialogOpen && (
//         <AddGuestDialog
//           loading={isLoading}
//           open={dialogOpen}
//           onClose={dialogClose}
//           onSave={handleAddGuest}
//         />
//       )}
//     </>
//   );
// };

const Guests = () => {
  return <div>guest</div>;
};

export default Guests;
