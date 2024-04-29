// src/components/Home/Home.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVenues } from '../../features/venues/venuesSlice';
import VenuesList from '../../components/Venues/VenuesList';
import Hero from '../../components/Hero/Hero';

function Home() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilterOptions(newFilters);
  };

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
