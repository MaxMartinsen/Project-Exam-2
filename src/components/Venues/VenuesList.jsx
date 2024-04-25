// src/components/Venues/VenuesList.jsx
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import IMAGE from '../../assets/image/default-image.png';
import FiltersForm from '../Forms/FiltersForm';

function VenuesList({ searchQuery, filterOptions, onFilterChange }) {
  // Accept the searchQuery prop
  const { venues, status, error } = useSelector((state) => state.venues);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!venues) return <div>No data available.</div>;

  // If searchQuery is undefined, consider it an empty string to prevent errors
  const query = (searchQuery || '').toLowerCase();

  // Filter venues based on the search query
  const filteredVenues = venues.filter((venue) => {
    const matchQuery =
      venue.name.toLowerCase().includes(query) ||
      venue.location.city?.toLowerCase().includes(query) ||
      venue.location.country?.toLowerCase().includes(query);

    const matchFacilities =
      (!filterOptions.breakfast || venue.meta.breakfast) &&
      (!filterOptions.pets || venue.meta.pets) &&
      (!filterOptions.wifi || venue.meta.wifi) &&
      (!filterOptions.parking || venue.meta.parking);

    const matchPrice =
      (!filterOptions.minPrice || venue.price >= filterOptions.minPrice) &&
      (!filterOptions.maxPrice || venue.price <= filterOptions.maxPrice);

    return matchQuery && matchFacilities && matchPrice;
  });
  return (
    <section className="max-w-screen-xl mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="hidden md:block md:col-span-3">
          <FiltersForm onFilterChange={onFilterChange} />
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="flex flex-col gap-6">
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <Link
                  key={venue.id}
                  to={`/Venue/${venue.id}`}
                  className="flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100"
                >
                  <img
                    className="object-cover w-full rounded-t-lg h-80 md:w-80 md:rounded-none md:rounded-s-lg"
                    src={venue.media.length > 0 ? venue.media[0].url : IMAGE}
                    alt={
                      venue.media.length > 0
                        ? venue.media[0].alt
                        : 'Default Image'
                    }
                  />
                  <div className="flex flex-col p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {venue.name || 'Unknown Venue'}
                    </h5>
                    <Rating rating={venue.rating || 0} maxRating={5} />
                    {venue.location.city && (
                      <p className="mb-3 flex items-center text-sm font-bold text-gray-500 underline underline-offset-2">
                        {venue.location.city}
                      </p>
                    )}
                    <p className="mb-3 md:max-w-44 lg:max-w-80 font-normal line-clamp-2 lg:line-clamp-3 text-gray-700">
                      {venue.description || 'No description'}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div>No venues found for {searchQuery}.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VenuesList;
