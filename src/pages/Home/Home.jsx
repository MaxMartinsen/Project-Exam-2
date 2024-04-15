// src/components/Home/Home.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVenues } from '../../features/venues/venuesSlice';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import VenuesList from '../../components/Venues/VenuesList';
import Search from '../../components/Forms/Search';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  return (
    <>
      <Breadcrumb />
      <Search />
      <VenuesList />
    </>
  );
}

export default Home;
