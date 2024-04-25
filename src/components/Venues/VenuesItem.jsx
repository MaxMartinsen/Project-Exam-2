// src/components/Venues/VenuesItem.jsx
import Rating from '../Rating/Rating';

import IMAGE from '../../assets/image/default-image.png';
import VenuesDetails from './VenuesDetails';
import VenueBadge from '../Badge/VenueBadge';
import BookingForm from '../Forms/BookingForm';

import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../features/booking/bookingSlice';

function VenuesItem({ venue }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const apiKey = useSelector((state) => state.user.apiKey);
  const bookings = venue.bookings || [];
  const maxGuests = venue.maxGuests || 0;

  const handleBooking = async (bookingData) => {
    console.log('Handle booking with data:', bookingData);
    try {
      await dispatch(createBooking({ bookingData, token, apiKey }));
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  if (!venue) {
    return <div>No venue data available</div>;
  }

  const media = venue.media || [];
  const imageUrl = media.length > 0 ? media[0].url : IMAGE;

  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-5">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full"
              src={imageUrl}
              alt={media.length > 0 ? media[0].alt : 'Default Image'}
            />
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {venue.name}
            </h1>
            <div className="my-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {venue.price} $ Night
              </p>
            </div>

            <Rating rating={venue.rating || 0} maxRating={5} />

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a
                href="#"
                title=""
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                role="button"
              >
                Reserve
              </a>
            </div>

            <hr className="my-6 md:my-8 border-gray-200" />

            <p className="mb-6 text-gray-500">{venue.description}</p>
          </div>
        </div>
        <VenueBadge meta={venue.meta} />
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <VenuesDetails owner={venue.owner} maxGuests={venue.maxGuests} />
        </div>
        <div className="px-5 py-7 mt-7 max-w-96 flex flex-col bg-white rounded-xl shadow-lg lg:p-9">
          <div className="mb-5 pb-5 border-b">
            <h2 className="h-16 flex items-center justify-center bg-athens-gray-700 w-full text-lg font-bold text-white ">
              Availability
            </h2>
          </div>
          <BookingForm
            bookings={bookings}
            maxGuests={maxGuests}
            venueId={venue.id}
            onSubmit={handleBooking}
          />
        </div>
      </div>
    </section>
  );
}

export default VenuesItem;
