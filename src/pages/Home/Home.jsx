// src/components/Home/Home.jsx
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVenues } from '../../features/venues/venuesSlice';
import VenuesList from '../../components/Venues/VenuesList';
import Hero from '../../components/Hero/Hero';

function Home() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    breakfast: false,
    pets: false,
    wifi: false,
    parking: false,
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilterOptions(newFilters);
  }, []);

  return (
    <>
      <Hero onSearch={handleSearch} />
      <VenuesList
        searchQuery={searchQuery}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />
    </>
  );
}

export default Home;
