// src/components/Forms/BookingForm.jsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useDisableCalendarDates } from '../../hooks/useDisableCalendarDates';
import NumberForm from './NumberForm';
import { useTotalPrice } from '../../hooks/useTotalPrice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../utils/routes';
import BookingConfirmation from '../Modal/BookingConfirmation';

function BookingForm({
  bookings,
  onSubmit,
  venueId,
  maxGuests,
  pricePerNight,
}) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = Boolean(currentUser);
  const [guests, setGuests] = useState(1);
  const [bookingError, setBookingError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bookingSliceError = useSelector((state) => state.bookings.error);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (bookingSliceError) {
      setBookingError(bookingSliceError);
    }
  }, [bookingSliceError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    const { startDate, endDate } = range[0];

    const numberOfNights = (endDate - startDate) / (1000 * 60 * 60 * 24);

    startDate.setUTCHours(15, 0, 0, 0);
    endDate.setUTCHours(12, 0, 0, 0);

    if (numberOfNights === 0) {
      setBookingError('You need to select both check in and check out dates.');
      return;
    }

    if (startDate >= endDate) {
      console.error('Invalid date range: startDate must be before endDate');
      return;
    }

    const startOfDay = startDate.toISOString();
    const endOfDay = endDate.toISOString();

    const bookingData = {
      dateFrom: startOfDay,
      dateTo: endOfDay,
      guests,
      venueId,
    };

    try {
      setIsLoading(true);

      const result = await onSubmit(bookingData);

      if (result?.error) {
        setBookingError(`Booking failed: ${result.error.message}`);
        return;
      }

      setBookingError('');
      await delay(2000);
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message || error.message;
      setBookingError(`Failed to create booking: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      if (bookingError) {
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
        <div className="flex flex-col justify-center mb-4 gap-4">
          <div className="flex justify-around">
            <h2>Check in</h2>
            <h2>Check out</h2>
          </div>
          <div>
            <DateRange
              ranges={range}
              onChange={(item) => setRange([item.selection])}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              months={1}
              direction="horizontal"
              className="calendarElement w-full"
              rangeColors={['#4e577f']}
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
            className={`w-full mt-4 px-2.5 py-4 rounded text-white font-bold text-xl ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-athens-gray-700 hover:bg-athens-gray-800 active:bg-athens-gray-900'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Booking...' : 'Book'}
          </button>
        ) : (
          <button
            type="button"
            className="w-full mt-4 px-2.5 py-4 rounded text-white font-bold text-xl bg-athens-gray-700 hover:bg-athens-gray-800 active:bg-athens-gray-900"
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            Sign in
          </button>
        )}
        {errors.guests && (
          <p className="text-red-500">Please enter a valid number of guests.</p>
        )}
        {bookingError && <p className="text-red-500">{bookingError}</p>}
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
    </>
  );
}

export default BookingForm;
