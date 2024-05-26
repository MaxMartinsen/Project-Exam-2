import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createBooking } from '../../features/booking/bookingSlice';

import { formatAddress } from '../../utils/addressUtils';

import Rating from '../Rating/Rating';
import VenuesDetails from './VenuesDetails';
import VenueBadge from '../Badge/VenueBadge';
import BookingForm from '../Forms/BookingForm';

import IMAGE from '../../assets/image/default-image.png';

import ImageModal from '../Modal/ImageModal';

/**
 * VenuesItem component provides a detailed view of a specific venue. It displays rich information about the venue,
 * including images, ratings, description, and booking options. It supports image enlargement via a modal and handles booking
 * operations directly.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.venue - The venue object containing all details of a venue such as name, description, media, bookings, etc.
 * @param {string} props.venue.name - Name of the venue.
 * @param {string} props.venue.description - Description of the venue.
 * @param {Array} props.venue.media - Array of media objects for the venue; each object contains a URL and an alt text.
 * @param {number} props.venue.rating - Current rating of the venue.
 * @param {Array} props.venue.bookings - Existing bookings for the venue.
 * @param {number} props.venue.maxGuests - Maximum number of guests the venue can accommodate.
 * @param {number} props.venue.price - Price per night for booking the venue.
 * @param {Object} props.venue.meta - Contains metadata about the venue such as available facilities.
 * @param {Object} props.venue.owner - Owner of the venue, includes information like name and avatar.
 *
 * @returns {JSX.Element} Renders a detailed view of a venue with interactive elements such as a booking form,
 * an image modal for viewing pictures, and venue details including a badge showcasing facilities.
 *
 * The component handles state for modal visibility and the currently displayed images in the modal.
 * It uses Redux actions to manage bookings and Redux state for user authentication data needed for booking operations.
 */

function VenuesItem({ venue }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const apiKey = useSelector((state) => state.user.apiKey);
  const bookings = venue.bookings || [];
  const maxGuests = venue.maxGuests || 0;
  const pricePerNight = venue.price;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  const handleImageClick = () => {
    const defaultImage = [{ url: IMAGE, alt: 'Default Venue Image' }];
    setCurrentImages(media.length > 0 ? media : defaultImage);
    setIsModalOpen(true);
  };

  const handleBooking = async (bookingData) => {
    try {
      await dispatch(createBooking({ bookingData, token, apiKey }));
    } catch (error) {
      console.error('Booking error:', error);
    }
    return dispatch(createBooking({ bookingData, token, apiKey }));
  };

  if (!venue) {
    return <div>No venue data available</div>;
  }

  const media = venue.media || [];
  const imageUrl = media.length > 0 ? media[0].url : IMAGE;

  return (
    <>
      <ImageModal
        images={currentImages}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <section className="pt-24 antialiased">
        <div className="max-w-screen-xxl px-4 mx-auto 2xl:px-0">
          <button className="w-full">
            <img
              onClick={handleImageClick}
              className="w-full object-cover  md:h-[500px] rounded-3xl"
              src={imageUrl}
              alt={media.length > 0 ? media[0].alt : 'Default Image'}
            />
          </button>
          <div className="flex w-full justify-between my-10">
            <div>
              <h1 className="text-xl font-semibold text-fuscous-gray-700 md:text-3xl">
                {venue.name}
              </h1>
              <Rating rating={venue.rating || 0} maxRating={5} />
              <h4 className="text-lg font-semibold text-mountain-mist-400 md:text-xl">
                {formatAddress(venue)}
              </h4>
            </div>
            <div>
              <div className="border-2 px-5 py-2 border-white flex items-center rounded-tr-2xl rounded-bl-2xl justify-center bg-pelorous-400">
                <span className="text-white font-semibold text-xl lg:text-2xl">
                  {Math.floor(venue.rating) || '0'}
                </span>
              </div>
              <div className="text-end">
                <span className="text-sm text-end text-mine-shaft-900">
                  Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white/45 antialiased mb-4">
        <div className="max-w-screen-xxl px-4 mx-auto 2xl:px-0">
          <div className="flex flex-col md:gap-10 md:flex-row md:justify-between items-center md:items-start lg:gap-20">
            <div className="w-full my-7 flex flex-col">
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl xl:text-3xl font-semibold tracking-tight text-fuscous-gray-700 max-w-60 md:max-w-60 lg:max-w-80 xxl:max-w-96 overflow-hidden whitespace-nowrap text-ellipsis">
                  About the Place
                </h3>
                <p className="text-xl text-balance font-normal tracking-tight text-fuscous-gray-700">
                  {venue.description || ' '}
                </p>
              </div>
              <div>
                <VenuesDetails
                  owner={venue.owner}
                  maxGuests={venue.maxGuests}
                  avatar={venue.owner.avatar}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-semibold tracking-tight text-fuscous-gray-700">
                  Facilities
                </h4>
                <VenueBadge meta={venue.meta} />
              </div>
            </div>
            <div className="px-5 py-7 my-7 max-w-96 flex flex-col border-2 border-white bg-white/45 rounded-xl shadow-lg lg:p-9">
              <div className="mb-5 pb-5 border-b border-white">
                <h3 className="flex items-center justify-center bg-athens-gray-700 w-full text-2xl xl:text-3xl font-semibold tracking-tight  text-pelorous-500 ">
                  Availability
                </h3>
              </div>
              <BookingForm
                bookings={bookings}
                maxGuests={maxGuests}
                venueId={venue.id}
                onSubmit={handleBooking}
                pricePerNight={pricePerNight}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default VenuesItem;
