// src/components/Home/Home.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVenues } from '../../features/venues/venuesSlice';
import VenuesList from '../../components/Venues/VenuesList';
import Hero from '../../components/Hero/Hero';

function Home() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Hero onSearch={handleSearch} />
      <VenuesList searchQuery={searchQuery} />
    </>
  );
}

export default Home;
