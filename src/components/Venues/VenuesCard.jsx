import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetVenueQuery } from '../../features/api/apiSlice';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import VenuesItem from './VenuesItem';
import { ROUTES } from '../../utils/routes';

function VenuesCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: venue, isLoading, error } = useGetVenueQuery(id);

  useEffect(() => {
    if (error) navigate(ROUTES.HOME);
  }, [error, navigate]);

  if (isLoading) return <div>Loading...</div>;
  return venue ? (
    <>
      <Breadcrumb />
      <VenuesItem venue={venue} />
    </>
  ) : (
    <div>Venue not found</div>
  );
}

export default VenuesCard;
