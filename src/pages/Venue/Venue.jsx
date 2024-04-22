import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchVenueById } from '../../features/venues/venuesSlice';
// import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import VenuesItem from '../../components/Venues/VenuesItem';
import { ROUTES } from '../../utils/routes';

function Venue() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.venues.status);
  const selectedVenue = useSelector((state) => state.venues.selectedVenue);
  const error = useSelector((state) => state.venues.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchVenueById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      navigate(ROUTES.HOME);
    }
  }, [error, navigate]);

  if (status === 'loading') return <div>Loading...</div>;
  if (!selectedVenue) return <div>Venue not found</div>;

  return (
    <>
      {/* <Breadcrumb /> */}
      <VenuesItem venue={selectedVenue} />
    </>
  );
}

export default Venue;
