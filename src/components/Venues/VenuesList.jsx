import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import IMAGE from '../../assets/image/default-image.png';
import { ROUTES } from '../../utils/routes';

function VenuesList() {
  const { venues, status, error } = useSelector((state) => state.venues);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!venues) return <div>No data available.</div>;

  return (
    <section className="max-w-screen-xl mx-auto p-4">
      <div className="flex flex-col gap-6 md:ml-96">
        {venues.map((venue) => (
          <Link
            key={venue.id}
            to={`${ROUTES.VENUE}/${venue.id}`}
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
                {venue.name}
              </h5>
              <Rating rating={venue.rating} maxRating={5} />
              {venue.location && venue.location.city && (
                <p className="mb-3 flex items-center text-sm font-bold text-gray-500 underline underline-offset-2">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                    />
                  </svg>
                  {venue.location.city}
                </p>
              )}
              <p className="mb-3 font-normal text-gray-700">
                {venue.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default VenuesList;
