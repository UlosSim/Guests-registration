import { useEffect, useState } from 'react';
import { fetchGuests } from '../../api/list/api.js';

const Guests = () => {
  const [guestList, setGuestList] = useState([]);

  const fetchGuestsList = async () => {
    try {
      const response = await fetchGuests();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGuestsList();
  }, []);

  return <div>Guest list</div>;
};

export default Guests;
