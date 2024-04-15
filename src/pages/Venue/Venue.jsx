import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetVenueQuery } from '../../features/api/apiSlice';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import VenuesItem from '../../components/Venues/VenuesItem';
import { ROUTES } from '../../utils/routes';

function Venue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: venueResponse, isLoading, error } = useGetVenueQuery(id);

  useEffect(() => {
    if (error) navigate(ROUTES.HOME);
  }, [error, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (!venueResponse) return <div>Venue not found</div>;

  const venue = venueResponse.data;

  return (
    <>
      <Breadcrumb />
      <VenuesItem venue={venue} />
    </>
  );
}

export default Venue;
