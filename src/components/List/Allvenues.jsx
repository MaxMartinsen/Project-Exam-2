import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchVenues } from '../../features/venues/venuesSlice';

function Allvenues() {
  const dispatch = useDispatch();
  const { venues, status, error } = useSelector((state) => state.venues);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!venues) return <div>No data available.</div>;

  return (
    <section>
      <div className="max-w-screen-xl flex flex-col gap-2 items-center justify-between mx-auto p-4">
        {venues.map((venue) => (
          <Link
            key={venue.id}
            to="#" // Link to detailed venue page or handle accordingly
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={
                venue.media.length > 0
                  ? venue.media[0].url
                  : '/path/to/default/image'
              }
              alt={
                venue.media.length > 0 ? venue.media[0].alt : 'Default Image'
              }
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {venue.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {venue.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Allvenues;
