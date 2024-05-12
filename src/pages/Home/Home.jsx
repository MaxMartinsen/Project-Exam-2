import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { fetchVenues } from '../../features/venues/venuesSlice';

import VenuesList from '../../components/Venues/VenuesList';
import Hero from '../../components/Hero/Hero';

/**
 * Home component that serves as the primary user interface for venue discovery on the site.
 * It manages local state for search queries and filtering options, and dispatches an action
 * to fetch venue data on component mount. This component integrates a hero section for searches
 * and a list display for venues that react to user input.
 *
 * @param {Object} props - The component props.
 * @param {Function} [props.onSearchInit] - Optional callback to execute when search is initialized.
 * @param {Function} [props.onFiltersChange] - Optional callback to execute when filters are updated.
 * @returns {JSX.Element} The Home component which includes a Hero for initiating searches and a VenuesList that displays venues based on search and filter criteria.
 */

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
