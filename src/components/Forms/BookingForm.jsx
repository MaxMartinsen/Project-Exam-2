import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useDisableCalendarDates } from '../../hooks/useDisableCalendarDates';
import { useTotalPrice } from '../../hooks/useTotalPrice';
import { useNavigate } from 'react-router-dom';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import NumberForm from './NumberForm';

import { createBooking } from '../../features/booking/bookingSlice';
import { ROUTES } from '../../utils/routes';
import BookingConfirmation from '../Modal/BookingConfirmation';
import BookingError from './../Modal/BookingError';

/**
 * BookingForm component handles the user interaction for making a booking at a venue. It allows users to select check-in
 * and check-out dates, specify the number of guests, and view the calculated total price based on the selected dates and
 * price per night. The form includes validation to ensure the booking dates are selected properly and the number of guests
 * does not exceed the maximum allowed. It displays dynamic feedback based on the booking process status including errors
 * and confirmation prompts.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.bookings - Existing bookings for the venue to disable already booked dates.
 * @param {string} props.venueId - The unique identifier for the venue.
 * @param {number} props.maxGuests - The maximum number of guests allowed for the venue.
 * @param {number} props.pricePerNight - The cost per night to stay at the venue.
 *
 * @returns {JSX.Element} - A form that includes date range selection, guest count input, price calculations, and submission
 * capabilities. Provides modals for booking confirmation and error handling.
 */

function BookingForm({ bookings, venueId, maxGuests, pricePerNight }) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const apiKey = useSelector((state) => state.user.apiKey);
  const isLoggedIn = Boolean(currentUser);
  const [guests, setGuests] = useState(1);
  const [bookingError, setBookingError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bookingSliceError = useSelector((state) => state.bookings.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (bookingSliceError) {
      setBookingError(bookingSliceError);
    }
  }, [bookingSliceError]);

  const { register, handleSubmit } = useForm();

  const { disabledDates } = useDisableCalendarDates({
    bookings,
    venueId,
    maxGuests,
  });

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const totalPrice = useTotalPrice({
    pricePerNight,
    startDate: range[0].startDate,
    endDate: range[0].endDate,
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const submitHandler = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setShowErrorModal(false);

    let { startDate, endDate } = range[0];

    // Set hours for UTC
    startDate = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate(),
        15,
        0,
        0,
        0
      )
    );

    endDate = new Date(
      Date.UTC(
        endDate.getUTCFullYear(),
        endDate.getUTCMonth(),
        endDate.getUTCDate(),
        12,
        0,
        0,
        0
      )
    );

    const numberOfNights = (endDate - startDate) / (1000 * 60 * 60 * 24);

    if (numberOfNights <= 0) {
      setBookingError('Please select the Check-out date.');
      setIsLoading(false);
      return;
    }

    const bookingData = {
      dateFrom: new Date(
        Date.UTC(
          range[0].startDate.getFullYear(),
          range[0].startDate.getMonth(),
          range[0].startDate.getDate(),
          15,
          0,
          0,
          0
        )
      ).toISOString(),

      dateTo: new Date(
        Date.UTC(
          range[0].endDate.getFullYear(),
          range[0].endDate.getMonth(),
          range[0].endDate.getDate(),
          12,
          0,
          0,
          0
        )
      ).toISOString(),

      guests,
      venueId,
    };

    try {
      const actionResult = await dispatch(
        createBooking({ bookingData, token, apiKey })
      );
      const result = actionResult.payload;

      if (actionResult.error || result.error) {
        throw new Error('Booking failed');
      }
      setBookingError('');
      await delay(2000);
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage = error.message || 'Failed to create booking';
      setBookingError(errorMessage);
      await delay(2000);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
      if (!bookingError) {
        setBookingError('');
      }
    }
  };

  useEffect(() => {
    if (bookingError) {
      setBookingError(bookingError);
    }
  }, [bookingError]);

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-3 mt-3"
      >
        <div className="flex flex-col justify-center mb-4">
          <div className="flex justify-around">
            <h2 className="text-xl font-semibold tracking-tight text-fuscous-gray-700">
              Check in
            </h2>
            <h2 className="text-xl font-semibold tracking-tight text-fuscous-gray-700">
              Check out
            </h2>
          </div>
          <div>
            <DateRange
              ranges={range}
              onChange={(item) => setRange([item.selection])}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              months={1}
              direction="horizontal"
              className="w-full rounded-b-2xl bg-white/40"
              rangeColors={['#2f8fab']}
              minDate={new Date()}
              disabledDates={disabledDates}
            />
          </div>
        </div>
        <NumberForm
          guests={guests}
          setGuests={setGuests}
          register={register}
          maxGuests={maxGuests}
        />

        <div className="flex items-start justify-between mt-4">
          <h2>Price per night</h2>
          <p>
            {pricePerNight}
            <span className="ml-1">$</span>
          </p>
        </div>
        <div className="flex items-start justify-between mt-4">
          <h2>Number of nights</h2>
          <span>{totalPrice / pricePerNight}</span>
        </div>
        <div className="flex items-start justify-between mt-4">
          <h2>Number of guest&apos;s</h2>
          <span>{guests}</span>
        </div>

        {isLoggedIn ? (
          <button
            type="submit"
            className={`w-full py-1 px-4 lg:py-2 lg:px-6 flex justify-center items-center  rounded-xl border-2 text-white font-semibold text-lg lg:text-xl border-white bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300 ${
              isLoading ? 'cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Booking...' : 'Book'}
          </button>
        ) : (
          <button
            type="button"
            className="w-full py-1 px-4 lg:py-2 lg:px-6 flex justify-center items-center  rounded-xl border-2 text-white font-semibold text-lg lg:text-xl border-white bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300"
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            Sign in
          </button>
        )}
        <div className="relative">
          {bookingError && (
            <p className="absolute -bottom-3 left-0 text-red-500 text-sm italic mt-1">
              {bookingError}
            </p>
          )}
        </div>
        <div className="flex items-start justify-between mt-2 pt-4 border-t-4">
          <h2 className="">Total price</h2>
          <p>
            {totalPrice}
            <span className="ml-1">$</span>
          </p>
        </div>
      </form>
      {isModalOpen && (
        <BookingConfirmation onClose={() => setIsModalOpen(false)} />
      )}
      {showErrorModal && (
        <BookingError
          message={bookingError}
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </>
  );
}

export default BookingForm;
