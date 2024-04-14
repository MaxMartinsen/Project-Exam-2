import { API_VENUE_URL } from '../../utils/constans';

export const fetchVenues = async () => {
  const response = await fetch(`${API_VENUE_URL}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
