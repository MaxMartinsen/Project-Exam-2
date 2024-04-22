import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import IMAGE from '../../assets/image/default-image.png';

function VenuesList({ searchQuery }) {
  // Accept the searchQuery prop
  const { venues, status, error } = useSelector((state) => state.venues);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!venues) return <div>No data available.</div>;

  // If searchQuery is undefined, consider it an empty string to prevent errors
  const query = (searchQuery || '').toLowerCase();

  // Filter venues based on the search query
  const filteredVenues = venues.filter((venue) => {
    return (
      venue.name.toLowerCase().includes(query) ||
      venue.location.city?.toLowerCase().includes(query) ||
      venue.location.country?.toLowerCase().includes(query)
    );
  });

  return (
    <section className="max-w-screen-xl mx-auto p-4">
      <div className="flex flex-col gap-6 md:ml-96">
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
                  venue.media.length > 0 ? venue.media[0].alt : 'Default Image'
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
                <p className="mb-3 font-normal text-gray-700">
                  {venue.description || 'No description'}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div>No venues found for {searchQuery}.</div>
        )}
      </div>
    </section>
  );
}

export default VenuesList;
